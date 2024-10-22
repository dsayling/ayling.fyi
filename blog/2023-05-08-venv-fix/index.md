---
slug: venv-fix
title: Fix the annoying ‘Virtual environment already activated’ error
authors: [dsayling]
tags: [python, software-development]
---

<!--truncate-->

## \*\*shakes fist at poetry and zsh\*\*

If you’re like me, you spend a lot of time in the terminal window of your IDE. Sometimes, you do unrelated project things in this window instead of a system terminal. I appreciate how VS Code automatically loads the project’s virtualenv when I open the terminal window.

If you don’t, you still might need to do something like setting a key as an environment variable in your `~/.zshrc` or, if you’re not a zsh user, you might need to load a new shell when your virtualenv is already active.

If you use poetry for your Python project management, you know what happens when you source the `rc` file.

![poetry error](./problem.gif)

As you can see, the virtualenv can’t be activated with the poetry shell command anymore.

## Simple Fix

Add this to the bottom of your ~/.zshrc, depending on your shell configuration and system.

```bash
if [ -n $VIRTUAL_ENV ]; then
    echo “reactivating virtualenv”
    source “$VIRTUAL_ENV/bin/activate”
fi
```

See it in action:

![poetry fix](./solved.gif)


## Why does this work?

The `venv` module in Python automatically sets the `$VIRTUAL_ENV` environment variable. So this works not just with poetry, but with anything using the built-in `venv` package.

When you source `~/.zshrc` a new `zsh` shell is loaded, thus deactivating the virtual env. If you’re not using `zsh`, when you load a new shell, the virtualenv is also deactivated.

This works by simply checking for the virtualenv path that was active when the new shell launches and activates it again. Viola.

Hope this helps speed up your development!