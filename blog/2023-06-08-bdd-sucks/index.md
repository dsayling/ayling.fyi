---
slug: bdd-sucks
title: Why BDD sucks in practice
authors: [dsayling]
tags: [devops, bdd, testing, software-development]
---

A few years in the BDD trenches taught me why BDD is just about impractical

<!--truncate-->

This article was originally published on medium: [Why BDD sucks in practice](https://dsayling.medium.com/why-bdd-sucks-in-practice-ea42266fdfa0)

![Cucumbers suck](./cukes.png)

To the uninitiated, Behavior-Driven Development (BDD) is a software development methodology that emphasizes collaboration between developers, testers, and business stakeholders to ensure that software products are delivered as per business requirements.

When implementing BDD, it is crucial to establish a common language that all parties involved in the development process can understand to ensure success. This shared language is communicated through scenarios written in gherkin syntax, which outlines how the application should perform from an end user's perspective. The scenarios are written in a simple declarative language that prioritizes what the application should accomplish rather than how it should do it.

By creating Gherkin scenarios, BDD helps ensure that everyone involved in the development process has a clear understanding of what the application should do and how it should behave under different circumstances.


```gherkin
Feature: Login
    Login scenarios

    Scenario: Login success
        Given I'm a valid user
        And I'm on the login page
        When I try to login
        Then I should not see an error message
        And I should see my account page
```

```python

from pytest_bdd import scenario, given, when, then

@scenario('login_success.feature', 'Login success')
def test_login_success():
    pass

@given("I'm an a valid user")
def valid_user(auth, user):  # user could be any type of fixture to get creds
    auth['user'] = user.creds


@given("I'm on the login page", target_fixture="page")
def page(browser):
    return browser.visit(urljoin(browser.url, 'login/'))

@when("I try to login")
def go_to_article(browser, valid_user):
    browser.find('name=username').fill(valid_user.username)
    browser.find('name=password').fill(valid_user.password)
    browser.find('button[name=login]').click()


@then("I should not see an error message")
def no_error_message(browser):
    with pytest.raises(ElementDoesNotExist):
        browser.find_by_css('.message.error').first


@then("I should see my account page")
def article_is_published():
    browser.find_by_text("My Account")
```

While BDD promises to deliver higher-quality software products, in practice, it can be a frustrating experience — ‘cause adopting BDD, well, sucks.

## The Problems
Using BDD starts with the adoption and, if done poorly, can cause a lot of issues downstream.

### Difficulty with adoption

1. Requirements Specifiers, e.g. Product Managers, don't adopt BDD Practices
1. Developers do not contribute when creating Scenarios
1. QA is the only org “doing BDD”

Writing requirements in BDD format can be time-consuming if the team or product managers are unwilling to learn and adapt to BDD practices.

Some organizations push BDD practices on just the QA team. Testers find themselves spending a significant amount of time translating requirements into BDD format, which can be time-consuming and error-prone. If testers are the only stakeholders using BDD, this leads to a net-zero benefit. I would even argue a net-negative benefit, as you’ll see below.

BDD is intended to be a collaborative process that involves all members of the team, including developers, product managers, and testers. If developers or product managers are not involved in writing the automation code or reviewing the test cases, they may not fully understand the intent of the test cases, leading to misunderstandings and bugs that could have been avoided.

### Complexity in scenarios

1. Scenarios are written using an imperative format rather than a declarative format
1. Non-deterministic or fault-tolerant systems can be difficult to express in Gherkin
1. Complex scenarios create complex automation

Imperative scenarios are step-by-step instructions for how to test a particular feature, while declarative scenarios describe the expected behavior of the system. If you can take a scenario and show it to someone with no expertise in the system, they should be able to understand the feature or functionality the scenario is trying to test.

When Product Managers are not involved in the process of writing these scenarios, they are often created in an imperative fashion that no one, other than the testers themselves, can read.

Non-deterministic systems can be challenging to describe in BDD format because they don’t always behave in a predictable manner. Testers may struggle to come up with scenarios that cover all possible outcomes, which can lead to incomplete testing and missed bugs that product managers might have understood earlier in the definition process.

### Unwieldy Automation

1. Imperative scenarios translate into imperative steps
1. Automation is coupled with features and not reusable
1. Lack of connection to requirements tools

Another challenge with BDD in practice is writing automation that is reusable. BDD scenarios are intended to be automated, but creating this automation without intentionality and proper runway leads to disaster.

When we write BDD scenarios, we create step definitions that describe the actions and assertions. These step definitions should be written in a way that can be easily reused across multiple test cases. However, if the company is not effectively re-using step definitions, you’ll find too much copy-paste between step definitions between features.

If the automation code is often written in a way that requires step code to be refactored constantly, making it difficult to maintain and update test cases, it can become a maintenance nightmare and lead to a decrease in productivity.

Lastly, if QA is usually the only one writing these scenarios, there is likely no connection to the requirements software, creating a traceability nightmare. This usually concludes with a giant regression suite of scenarios that run because there’s no way of knowing what does or does not need to be tested anymore.

## In memoriam, BDD

BDD can be a really useful methodology for things like Acceptance Test Driven Development when automation via steps is reusable and scalable; Tests and their results are traceable to the requirements tool — ensuring you have coverage over your requirements. The dream of releasing with fewer bugs and cleaner feature coverage.

> *The problem is so many folks just simply use it wrong.*

BDD is not a silver bullet and requires collaboration from all members of the team to be successful. To avoid the pitfalls that I’ve experienced, it’s important to have buy-in from all team members, including product managers, developers, and testers, and to invest in a well-designed automation architecture that supports reusability and maintainability. By doing so, an organization can reap the benefits of BDD and deliver high-quality software that meets the needs of customers.

---

To understand more about how you could use BDD effectively, see my article on how the [perfect pipeline doesn’t exist](../2023-03-20-perfect-pipeline/index.md). It’s not particularly tied to BDD, but BDD as a testing methodology would fit in such a perfect pipeline if it existed.

For more info on BDD problems and anti-patterns, see these wonderful resources:

- http://www.thinkcode.se/blog/2016/06/22/cucumber-antipatterns
- https://cucumber.io/blog/collaboration/the-worlds-most-misunderstood-collaboration-tool/
- https://cucumber.io/docs/guides/anti-patterns/?lang=java
