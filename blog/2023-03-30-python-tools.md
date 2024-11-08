---
slug: Python Tools
title: Must Know Tools For Any Python Developer
authors: [dsayling]
tags: [python, software-development]
---

There are many great articles on python libraries, from machine learning with PyTorch or TensorFlow to using Jupyter and Pandas to show the air quality in Antwerp, making a chatbot with ChatGPT and requests to spam your ex, or the ten best python visualization tools besides matplotlib.

Instead, this is a simple list of must-know core development and workflow tools for any python developer, regardless of their field of focus, and my brief opinions and experiences with them. Python developers will see this list and say, yup, yup, yup and be done.

You can find a simple bulleted list of all tools with links at the bottom.

<!-- truncate -->

This article was originally published on medium: [Must Know Tools For Any Python Developer](https://dsayling.medium.com/must-know-tools-for-any-python-developer-e349c144de13)

## poetry

[poetry](https://python-poetry.org/) is the current leader in python dependency management and packaging. With over 24k GitHub stars, it exploded in use over pipenv very quickly.
poetry is not the fastest at everything and commands like poetry shell not working because your virtualenv is [active somewhere](https://github.com/python-poetry/poetry/issues/5323) dampen the experience slightly, but you adapt.

poetry can set up the development and runtime environments, build and publish packages, and more.

Newer versions support a simple plugin architecture, and I’m a big fan of the [poetry-dynamic-versioning](https://github.com/mtkennerly/poetry-dynamic-versioning) plugin that versions your packages based on SCM tags.

## pipenv

[pipenv](https://pipenv.pypa.io/en/latest/) and poetry, while not technically a perfect 1:1 mapping of tools, they do much of the same things, and pipenv generates lock files a LOT slower. Updating a few dependencies to the latest versions will take my entire workday to resolve.

The tool is still worth knowing since it’s from PyPA and will likely stick around.

## tox

[tox](https://tox.wiki/en/latest/) is an all-purpose virtualenv manager and command runner. I like to describe it as `make` for python.

Use it to define independent test environments for simple static checks, documentation generation, unit testing, and publishing. tox will create reusable virtual environments for each test environment and attempts to notice when your dependencies have changed or the virtualenv is out of sync from bespoke package installations. You can also define test environments with multiple python versions to ensure python version compatibility.

tox is my go-to tool for legacy projects using something other than pipenv, poetry, or poorly structured monorepos with multiple independent python packages.

## invoke

[invoke](https://www.pyinvoke.org/) is another tool that’s presented as make for python. It was broken out of fabric, the python library for running commands over ssh.

invoke allows you to define tasks/phony targets in pure python — and that’s pretty much it.

## pyenv

And speaking of multiple python versions, that brings us to [pyenv](https://github.com/pyenv/pyenv).

pyenv is easy to use and can install and manage all the python versions you need. I used to recommend using pyenv-virtualenv to manage and create virtualenvs with pyenv, but I find the overhead unnecessary.

One downside to pyenv that has been brought up numerous times, including by [my former colleague](https://www.feliciano.tech/blog/forking-pyenv-part-1-a-learning-exercise/), is that pyenv has to know about a new python version before it can be installed by adding it to the [build list](https://github.com/edgarrmondragon/pyenv/tree/6b758c8cf96b98b24566b1bc50d06f1ee066b221/plugins/python-build/share/python-build).

Out of the box, tox supports pyenv by automatically detecting your available python versions and using those in your test environments.

## pipx

[pipx](https://pypa.github.io/pipx/) is a PyPA-developed application to install python based tools into their isolated virtualenvs.

pipx is useful to install things like the aws-cli and have them accessible PATH even when you’re in a virtualenv for your project that doesn’t need the aws-cli as a dependency.

I use pipx to install most cli tools useable outside of the project env, including poetry, tox, invoke, black, etc.

## pytest

The days of deciding which test framework to use with python are gone. [pytest](https://docs.pytest.org/en/7.2.x/contents.html) is the testing tool of choice and is rich in features to help improve your testing.

[pytest fixtures](https://docs.pytest.org/en/7.2.x/explanation/fixtures.html#about-fixtures) are extremely powerful and help make your testing scalable.

There are also numerous plugins for pytest for things like reporting, e.g. [pytest-cov](https://pypi.org/project/pytest-cov/) and [allure-pytest](https://docs.qameta.io/allure-report/).

If you’re in the market for a Behavior Driven Development (BDD) test framework, skip behave or the other vegetables and use the pytest-bdd plugin.

## black

With [black](https://black.readthedocs.io/en/stable/), the argument for how to format your code is over. Use a pre-commit check/hook or pull request workflow to check the code for those that don’t use black, and there’s no arguing to be done. It is **the** unopinionated formatter. If you’re still using autopep8, it’s time to upgrade.

## isort

isort sorts your imports. black and isort have struggled to get along, but that’s been reconciled over time. Also great as a pre-commit hook to keep your imports tidy. However, there’s a new contender to replace it, mentioned below.

## pylint

[pylint](https://pylint.readthedocs.io/en/latest/) is pretty much the standard for error and style checking. With plugins to check for code complexity and spelling, it’s a great tool to use.

Some folks complain about the style and convention enforcement as being too opinionated. Still, it is easy enough to disable if you want to use global statements in every module. Who am I to judge?

## pyflakes

Faster than pylint and less opinionated, [pyflakes](https://github.com/PyCQA/pyflakes) is an error checker, and not a style checker, that promises no false positives.

## flake8

Closer to pylint than pyflakes, [flake8](https://flake8.pycqa.org/en/latest/) is a style and error checker with very similar checks to pylint. Unless there’s a specific error flake8 gives you, I recommend using pylint, but since there are some unique rules, it might be worth running both 🤷

## ruff

Recommended to me for the first time relatively recently, [ruff](https://beta.ruff.rs/docs/) is an explosively fast linter for python written in rust that’s had some equally fast growth.

ruff is still in the beta stage, but it’s already been picked up by substantial code bases, like pandas and FastAPI, that need super fast static checks. Linting the cpython codebase, for example, takes over 1 minute with pylint, and it can be done in less than 0.5s with ruff. It does have quite a bit fewer checks than pylint at the moment, but that’s likely to change soon.

ruff also removes imports and sorts them like isort for you. So soon to be a replacement for pylint and isort.

## mypy

As we all know, python was built as a dynamically typed language, and some developers laugh at the fact typing was added to python in 3.5. However, for those that relied on restructured text in our docstrings to help the IDE identify possible typing issues, built-in typing was a relief.

Add typing to your code and run [mypy](https://mypy.readthedocs.io/en/stable/) to check parameters and return types.

## iPython

Upgrade your python shell with [ipython](https://ipython.org/). Formerly a part of jupyter and still integral as the kernel of jupyter, iPython is an “interactive” python shell with magic functions, history, and auto-completion like you’re in an extended Bourne shell.

### ipdb

[ipdb](https://pypi.org/project/ipdb/) is a package to use iPython as your debugger. Giving you all the functions, like auto-completion in your debugging session, and interesting features, like a function decorator that launches the debugger if an exception is raised.

## pre-commit

[pre-commit](https://pre-commit.com/) is a utility that connects your local git hooks to some checks you want to want to run in an easy-to-define way.
While pre-commit is not just for python, it was written in python and deserves a spot on this list.
pre-commit also works excellent with multi-language code bases and allows you to run checks depending on the language file modified and skip others.

---

The shortlist:

- [poetry](https://python-poetry.org/)
- [pipenv](https://pipenv.pypa.io/en/latest/)
- [tox](https://tox.wiki/)
- [pyenv](https://github.com/pyenv/pyenv)
- [pipx](https://pypa.github.io/pipx/)
- [pytest](https://docs.pytest.org/en/7.2.x/)
- [black](https://black.readthedocs.io/en/stable/)
- [isort](https://pycqa.github.io/isort/)
- [mypy](https://mypy.readthedocs.io/en/stable/#)
- [pylint](https://pylint.readthedocs.io/en/latest/)
- [pyflakes](https://github.com/PyCQA/pyflakes)
- [flake8](https://flake8.pycqa.org/en/latest/)
- [ruff](https://beta.ruff.rs/docs/)
- [iPython](https://ipython.org/)
- [ipdb](https://pypi.org/project/ipdb/)
- [pre-commit](https://pre-commit.com/)

---

I hope you nodded your head to all these tools, and if not, I hope you picked up some fresh ones to add to the toolbox.
