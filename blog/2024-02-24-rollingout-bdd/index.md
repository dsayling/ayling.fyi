---
slug: rolling-out-bdd
title: Rolling out Behavior-Driven Development
description: Even though you know BDD kind of sucks and you don’t want to
authors: [dsayling]
tags: [devops, bdd, testing, software-development]
---

Even though you know BDD kind of sucks and you don’t want to...

<!--truncate-->

![Inspecting the cucumbers](./cukescientist.png)

This article was originally published on medium: [Rolling out Behavior-Driven Development](https://medium.com/@dsayling/rolling-out-behavior-driven-development-c16910ee3fc0)

## Backstory

I spent plenty of years in the BDD trenches and documented my experiences in my article from the summer of 2023. I recommend checking it out first as a sort of prequel. I’ve pushed back in places where using BDD makes little sense. I’ve also embraced it and its power in acceptance test-driven development. BDD is a very contentious topic for testers and developers alike, including within myself.

See my original post: [Why BDD sucks in practice](../2023-06-08-bdd-sucks/index.md)

I’ll be referencing key principles and lessons learned in my previous article, so if you haven’t read the above, I’d start there first.

Today, I want to talk about how I’m currently rolling out Behavior-Driven Development after considering my lessons learned.

## How We Got Here \[Again\]
A part of the large organization that I work for is completely transforming its value stream.

Obviously, they are now in need of new requirements and even new tests as they begin to understand how they are delivering value within a larger value stream.

Consequently, I began hearing these (possibly embellished) phrases in meetings:

>No one can read these requirements. How are teams supposed to write automated tests? — Director Person

>We need to be able to easily track the requirements being written and know when they are automated. — Principal Engineer-ish

>What about the test reports? — Non-software Manager

>The spreadsheet you created is already out of date based on the implementation of these tests — Me

### So, what did I do?
While I was in a meeting with some of the stakeholders I unconsciously said something to the effect of:

> Look, BDD kind of sucks.<br/>
I’ve used it in a past life, and I’ve even written about how I really don’t like using it, but… I see where it could solve our problems.<br/>
My only request is that we try to do it right.

**So, we got to work.**

## The Big Three
1. Difficulty with adoption
1. Complexity in scenarios
1. Unwieldy Automation

These are the known issues I’ve seen when rolling out, using, and scaling BDD based testing.

My goal is to take the lessons I’ve learned and make sure they don’t happen again.

This is the first question I asked myself after agreeing to consider BDD that day.

>How do I make sure these people really understand the point of BDD and not just see it as some kind of “shortcut” to automated testing?

I put my foot down with the enthusiastic principal engineer ready to begin writing scenarios the same day I told him about BDD and gherkin.

My foot included:

* **Training** — People must learn how to write BDD and gherkin in a declarative way. And, folks should learn when BDD automation is appropriate, and when it’s unnecessary.
* **Purpose-driven test automation** — We must use a well-supported testing framework and not a bespoke one built totally and only for BDD. We must clearly delineate our business logic and technical logic in testing.
* **Source of truth in scenarios** — Even if the test is still manual, the requirement must go into the codebase as a scenario, no external test case management.
* **Buy-in** — We must all buy into this and agree that BDD is going to be our approach across the teams.

Some harsh requirements, I know, but they felt necessary dealing with an immature development organization that is relatively new to the concept of *test-driven development*, let alone *acceptance test-driven development*.

So let’s see how this approach can help us through **the big three**.

### Difficulty with adoption
By pushing **Training** early, ensuring **Source of truth in scenarios**, and getting organizational **Buy-in**, we can solve most of the issues we find in adoption.

1. Requirements Specifiers ***must*** adopt BDD Practices ✅
1. Developers ***should*** contribute when writing scenarios ⚠️
1. QA is ***not*** the only org “doing BDD” ✅

Our flagged potential problem can be mediated by ensuring the developers *continue* to participate in the process — not just when a test fails or when they have to sit in a meeting about it. We must include everyone in the organization that cares about these requirements in the PR review process.

Organizational *Buy-in* is required to ensure requirements specifiers adopt BDD Practices when writing requirements. This also ensures that BDD is not only adopted by QA, who are often the culprits at rolling it out with little plan or foresight.

### Complexity in scenarios
With both **Training** and a **Purpose-driven test automation** framework — built around best practices for testing and test-driven development — we can contain some of the problems that come from complex and verbose BDD scenarios.

1. Scenarios ***must*** be written in a declarative format rather than imperative ✅
1. Non-deterministic or fault-tolerant systems can ***still*** be difficult to express in Gherkin ⚠️
1. Complex scenarios ***must not** be written ✅

Let’s look at the ones with our check mark first.

We can avoid complex scenarios by steering clear of imperative gherkin steps and enforcing a declarative style. This can be achieved through **
**Training** and tools like a linter. The technical complexity of the system must be abstracted away from the scenario authors so they can interact with the system as an end user.

Utilizing **Purpose-driven test automation** encourages us to isolate our *business layer* (think [Arrange, Act, Assert, Cleanup](https://docs.pytest.org/en/6.2.x/fixture.html#what-fixtures-are)) from our technical layer (think REST API calls, page-object-models, database connectors).

Implementing **Purpose-driven test automation** also necessitates that the *technical layer* always considers how the *business layer* will use it, but only from the common API of Arrange, Act, Assert, and Cleanup.

Non-deterministic or fault-tolerant systems can still be challenging to articulate accurately, but with **Training** and **Purpose-driven test automation**, it is possible to simplify the complexity within the business layer and manage intricacies, e.g. model threshold validations, by ensuring the logic exists within the technical layer.

### Unwieldy Automation
Having already talked a lot about the importance of having a **Purpose-driven test automation** framework and **Training**, we’ve pretty much already covered the traps we might fall into.

1. Imperative scenarios ***don’t exist*** to translate into imperative steps. ✅
1. Automation ***must not*** be coupled with features and must be reusable. ✅
1. Lack of connection to requirements tools, ***because we don’t need one***! ✅

By isolating the *business* and *technical layers* of our automation in our **Purpose-driven test automation framework**, and providing specific **Training** on writing declarative scenarios, we can prevent the use of imperative steps and enable the creation of reusable automation that is independent from the tests themselves.

And since it was decided that we’ll have the **Source of truth** in scenarios, there’s no need to worry about the need to connect to a requirements tool. The requirements are right there in the code! If we need to check if the requirement has been executed, we simply check the CI results to see if the scenario has been executed.

## In honor(?) of BDD

> BDD can be a really useful methodology for things like Acceptance Test Driven Development when automation via steps is reusable and scalable; Tests and their results are traceable to the requirements tool — ensuring you have coverage over your requirements. The dream of releasing with fewer bugs and cleaner feature coverage.

I want to release with fewer bugs and know my feature coverage.<br/>
I want to have a scalable automation framework.<br/>
I want to have a cohesive requirements-to-release journey with my team as a whole.<br/>
I guess what I’m trying to say is, I want BDD to be useful.<br/>
I want to see BDD succeed to its fullest potential.<br/>