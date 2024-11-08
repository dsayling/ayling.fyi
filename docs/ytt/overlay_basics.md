---
title: Overlay Basics
sidebar_position: 2
toc_max_heading_level: 5
description: Basics of updating, removing, and merging yaml
---

## What is an overlay?

If it wasn't super clear... An overlay is a way to apply changes to a base yaml file. It's a way to keep your base configuration clean and separate from the changes you want to make in other contexts like a specific app. This is especially useful when you have multiple environments or multiple teams working on the same configuration.

## Different Types of Overlays

### Key-Value Update

A key-value update overlay is a way to change a specific key-value pair in a configuration file. This is useful when you want to change a specific value in a configuration file.

```yaml
#@ load("@ytt:overlay", "overlay")
#@overlay/match by=overlay.all
---
metadata:
  #@overlay/match missing_ok=True
  labels:
    #@overlay/match missing_ok=True
    app: yourapp
```

This overlay will change the `app` label in the `metadata` section of a `Deployment` object to `yourapp`.

### Key-Value Remove

A key-value remove overlay is a way to remove a specific key-value pair from a configuration file. This is useful when you want to remove a specific value from a configuration file.

The value can be anything, including a nested object.

```yaml
#@ load("@ytt:overlay", "overlay")
#@overlay/match by=overlay.all
---
spec:
  template:
    spec:
      containers:
        #@overlay/match by=overlay.subset({"name": "myapp"})
        - resources:
            #@overlay/remove
            limits:
```

### Merging Maps aka Updating Maps

You can also merge maps together. This is useful when you want to add or update a map in a configuration file.

```yaml title="merge_maps.yaml"
#@ load("@ytt:overlay", "overlay")
#@overlay/match by=overlay.all
---
metadata:
  #@overlay/match missing_ok=True
  labels:
    #@overlay/match-child-defaults missing_ok=True
    newLabel: "value"
```

In this overlay, we're adding a new label to the `metadata` section. In our `my-values.yaml` we don't have a `labels` section, so we're adding it here and setting a label `newLabel` to `value`.

### Appending to Lists

```yaml title="append_to_list.yaml"
#@ load("@ytt:overlay", "overlay")
#@overlay/match by=overlay.all
---
spec:
  template:
    spec:
      containers:
        #@overlay/append
        - name: sidecar
          image: sidecar:latest
```

In this overlay, we're appending a new sidecar container to the `containers` list.

### Inserting into Lists

We can also insert into a list at a specific index. In this example, we're inserting a new init container at the beginning of the `containers` list.

```yaml title="insert_into_list.yaml"
#@ load("@ytt:overlay", "overlay")
#@overlay/match by=overlay.all
---
spec:
  template:
    spec:
      containers:
        #@overlay/match by=overlay.index(0)
        #@overlay/insert before=True
        - name: init-container
          image: init:latest
```

### Removing from Lists

In this overlay, we're removing the container with the name `myapp` from the `containers` list.

```yaml title="remove_from_list.yaml"
#@ load("@ytt:overlay", "overlay")
#@overlay/match by=overlay.all
---
spec:
  template:
    spec:
      containers:
        #@overlay/match by=overlay.subset({"name": "myapp"})
        #@overlay/remove
        -
```

---

Next, lets go into some more advanced overlay techniques.
