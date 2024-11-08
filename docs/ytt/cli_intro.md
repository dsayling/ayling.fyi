---
title: CLI Intro
sidebar_position: 1
toc_max_heading_level: 5
description: What is ytt and how to use it
---

![ytt Diagram](./../../blog/2024-11-1-ytt/flow.jpg)

## The Basics

If you didn't spend anytime going over the diagram at the top, have a look now and store in your brain the terms templates, overlays, and data-values as new jargon you'll learn today. We're going to keep it simple. We're going to avoid the schemas and libraries (terms that ytt define and use, but are not necessary for the basic use cases we'll cover).

Also, I'm going to skip the installation instructions. Go read [the instructions on the ytt website](https://carvel.dev/ytt/docs/v0.50.x/install/) to install the software.

Since ytt is clearly a command-line tool, let's look at the command…

```bash
ytt -f config.yaml -f my-values.yaml
```

This command is the most basic form of using ytt. It takes our overlay file, `config.yaml`, and a source file, `my-values.yaml`, and outputs the templated configuration as a new yaml file.

### Your Input File

Not to be confused with a "data-values" file? At it's most simplest, a yaml file can be used as a source file that's simply basic yaml. This is the data for the templating process.

Let's walk through an example using a pod spec, as it's a common Kubernetes resource that many users are familiar with.

Say we have the following `my-values` file:

```yaml title="my-values.yaml"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: nginx:1.14.2
          ports:
            - containerPort: 80
          resources:
            limits:
              cpu: 500m
              memory: 512Mi
            requests:
              cpu: 250m
              memory: 256Mi
```

If we want to remove the resource limits, we can use ytt's overlay feature. Create the file called config.yaml

### An Overlay File

```yaml title="config.yaml"
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

### Putting it all together

Now run the command:

```bash
ytt -f config.yaml -f my-values.yaml > output.yaml
```

And you'll get the following output:

```yaml title="output.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: nginx:1.14.2
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: 250m
              memory: 256Mi
```

What happened here? The overlay file removed the `limits` section from the `resources` section of the container.

## Another Example

Now, say we want to change the name of the app from `myapp` to `yourapp`. We can use the overlay feature to change the name of the app.

### Multiple Overlay Blocks

```yaml title="ya_config.yaml"
#@ load("@ytt:overlay", "overlay")

#@overlay/match by=overlay.all
---
metadata:
  #@overlay/match missing_ok=True
  labels:
    #@overlay/match missing_ok=True
    app: yourapp

#@overlay/match by=overlay.all
---
spec:
  #@overlay/match missing_ok=True
  selector:
    #@overlay/match missing_ok=True
    matchLabels:
      #@overlay/match missing_ok=True
      app: yourapp

#@overlay/match by=overlay.all
---
spec:
  template:
    #@overlay/match missing_ok=True
    metadata:
      #@overlay/match missing_ok=True
      labels:
        #@overlay/match missing_ok=True
        app: yourapp
```

#### Overlay Notes

Note the following:

1. We've defined the `app` label as `yourapp` in the overlay file.
1. We have to know the structure of the input file to create the overlay file.
1. We have to know all the locations where the `app` label is used in the input file.

We'll go into more detail on the overlay file in the next section, but keep these points in mind as you work with ytt.

Now run the command:

```bash
ytt -f ya_config.yaml -f my-values.yaml > output_ya.yaml
```

```yaml title="output_ya.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: yourapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: yourapp
  template:
    metadata:
      labels:
        app: yourapp
    spec:
      containers:
        - name: myapp
          image: nginx:1.14.2
          ports:
            - containerPort: 80
          resources:
            limits:
              cpu: 500m
              memory: 512Mi
            requests:
              cpu: 250m
              memory: 256Mi
```

Notice that the `app` label has been changed to `yourapp` in the output!

---

Next, we'll dive into more overlay features and how to use them to manipulate your yaml files.
