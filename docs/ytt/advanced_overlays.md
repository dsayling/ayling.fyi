---
title: Advanced Overlays
sidebar_position: 3
toc_max_heading_level: 5
description: Using advanced techniques like lambda functions and regex
---

## Advanced Overlays

In the [last section](./overlay_basics.md), we covered the basics of overlays. We learned how to update, remove, and merge maps. In this section, we'll cover more advanced overlays.

To start, lets begin with a more complex example. Say we have the following `advanced-values.yaml`

```yaml title="advanced-values.yaml"
version: 2.1
environment: staging

services:
  - name: api-server
    image: api:v1.2.3
    replicas: 3
    ports:
      - 8080
      - 8443
  - name: auth-service
    image: auth:v2.1.0
    replicas: 2
    ports:
      - 9000

databases:
  - name: user-db
    type: postgresql
    version: "12"
    size: medium
  - name: content-db
    type: mongodb
    version: "4.2"
    size: large

load_balancers:
  - name: frontend-lb
    type: nginx
    target_services:
      - api-server
      - auth-service
  - name: backend-lb
    type: haproxy
    target_services:
      - content-db

monitoring:
  enabled: true
  retention_days: 30
```

Let's see how we can use overlays to update this configuration.

For the following examples, you can use the `ytt` command to apply the overlays to the `advanced-values.yaml` file.

```bash
ytt -f advanced-values.yaml -f overlay.yaml
```

Simply replace `overlay.yaml` with the overlay file you want to apply.

### Conditional Overlays

If we know the name of the service we want to update, we can use the `name` field directly in the config

```yaml title="match_simple.yaml"
#@ load("@ytt:overlay", "overlay")

#@overlay/match by=overlay.all
---
services:
#@overlay/match by="name"
- name: api-server
  replicas: 4
```

You can also use `overlay.subset` to match on a subset of the configuration.

```yaml title="match_subset.yaml"
#@ load("@ytt:overlay", "overlay")

#@overlay/match by=overlay.all
---
services:
#@overlay/match by=overlay.subset({"name": "api-server"}), expects="0+"
- replicas: 4
```


### Lambda Functions

What if you don't know the name of the service you want to update? You can use a lambda function to match on a condition.

We can also define an overlay to update the `replicas` of any `api` service to `4` by using a lambda function.

```yaml title="simple_lambda.yaml"
#@ load("@ytt:overlay", "overlay")

#@overlay/match by=overlay.all
---
services:
#@overlay/match by=lambda i, left, right: "api" in left['name'], expects="0+"
- replicas: 4
```

#### Regular Expressions

We can also use regular expressions to match on a condition.

```yaml title="match_regex.yaml"
#@ load("@ytt:overlay", "overlay")
#@ load("@ytt:regexp", "regexp")

#@overlay/match by=overlay.all
---
services:
#@overlay/match by=lambda i, left, right: regexp.match("^api", left["name"]), expects="0+"
- replicas: 4
```

#### Multiple Conditionals

We can use as many conditionals as need to update the configuration.

For example, if we want to update the `replicas` to now be `2` for any service with `api` in the name and has two ports, we can add another conditional.

```yaml title="multi_conditionals.yaml"
#@ load("@ytt:overlay", "overlay")

#@overlay/match by=overlay.all
---
services:
#@overlay/match by=lambda i, left, right: "api" in left['name'] and len(left['ports']) > 1, expects="0+"
-
  replicas: 2
```

### Updates in the Match Block

You can also update the field you're matching on too.

```yaml title="update_in_place.yaml"
#@ load("@ytt:overlay", "overlay")

#@overlay/match by=overlay.all
---
services:
#@overlay/match by=lambda i, left, right: "api" in left['name'], expects="0+"
- name: deployment
  replicas: 4
```

In this example, we're updating the `name` field to `deployment`replicas` to `4` for any service with `api` in the name.

### overlay.replace

We can also use `overlay.replace` to update the configuration. Here we're updating the `name` field to replace `-db` with `-database`.

```yaml title="replace.yaml"
#@ load("@ytt:overlay", "overlay")

#@overlay/match by=overlay.all
---
databases:
#@overlay/match by=overlay.all, expects="1+"
-
  #@overlay/replace via=lambda left, right: left.replace("-db", "-database")
  name: ""
```

### Functions

We can also use a function to update the `name` field to replace `-db` with `-database`.

```yaml title="replace_via_func.yaml"
#@ load("@ytt:overlay", "overlay")

#@ def rename_db(name, *args):
#@   return name.replace("-db", "-database")
#@ end

#@overlay/match by=overlay.all
---
databases:
#@overlay/match by=overlay.all, expects="1+"
-
  #@overlay/replace via=rename_db
  name:
```

#### Reusing functions

We can also reuse functions across multiple overlays. Here we're using the `rename_server` function to update the `name` field in the `services` section to use `service` over `server` and in the `target_services` section in the `load_balancers` section.

```yaml title="func_reuse.yaml"
#@ load("@ytt:overlay", "overlay")

#@ def rename_server(name, *args):
#@   return name.replace("-server", "-service")
#@ end

#@overlay/match by=overlay.all
---
services:
#@overlay/match by=overlay.all, expects="0+"
-
  #@overlay/replace via=rename_server
  name:

load_balancers:
#@overlay/match by=overlay.all, expects="0+"
-
  target_services:
  #@overlay/match by=overlay.all, expects="0+"
  - #@overlay/replace via=rename_server
    ""
```

### Replacing Keys

You can also replace keys in the configuration. Here we're going to replace `target_services` with `targets` in the `load_balancers` section.

```yaml title="replace_key.yaml"
#@ load("@ytt:overlay", "overlay")

#@ def rename_target_services(lb, *args):
#@   return {k if k != "target_services" else "targets": lb[k] for k in lb}
#@ end

#@overlay/match by=overlay.all
---
load_balancers:
#@overlay/match by=overlay.all, expects="0+"
#@overlay/replace via=rename_target_services
-
```

---

Next, we'll cover how the `overlay/match` block works in more detail.
