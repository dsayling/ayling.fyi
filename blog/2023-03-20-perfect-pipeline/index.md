---
slug: the-perfect-pipeline
title: The perfect development pipeline doesn’t exist ... but I can imagine one
authors: [dsayling]
tags: [automation, testing, devops, software-development]
---

I have worked in various organizations with different software development pipelines as a software developer, automation engineer, test engineer, DevOps engineer, etc. In all that time, I have never seen a _perfect pipeline_. Now, all development pipelines have room for improvement, but I’ve never seen a genuinely bulletproof one with built-in metrics, complete and total automation, and fast feedback.

<!--truncate-->

In this article, I will describe my imagined perfect software development pipeline for delivering customer value via a reliable, efficient pipeline that provides fast feedback at all stages. Many of these concepts should be familiar to some, but hopefully, this content will help demonstrate the value of a holistic, complete pipeline.

## Continuous Exploration

### Requirements Gathering and Design

The first step in building any software development feature is to gather requirements. This phase is critical to the project’s success, as it sets the foundation for all subsequent development efforts. However, many organizations struggle with requirements gathering, which is often time-consuming and error-prone. However, the more complex the organization, the more detailed this process needs to be.

The perfect pipeline starts with a dedicated requirement and exploration phase. It’s critical to start any new feature with a clear understanding of what it is meant to do, who it’s for, and how it will be used. This requires collaboration between product managers, designers, developers, and other stakeholders. The product owner works closely with these stakeholders to capture and document all of the requirements for the feature.

Now, how to define those requirements, either with stories, behavioral scenarios, \[fill-in-the-blank\] requirements documents, or acceptance criteria, is incredibly subjective, and everyone has their preferences. It doesn’t matter how, as long as they are traceable and understood by the developers.

The requirements are tracked in a centralized system easily accessible by the entire team. This system should allow for easy search and filtering of requirements and be mappable to other artifacts like tests and code changes.

This tracking ensures that requirements can be traced from inception to implementation, and it plays a crucial role in reporting and analytics later in the pipeline.

As the requirements are gathered, the team should explore potential solutions and consider alternative approaches. The exploration phase can help identify potential issues and risks before development begins, reducing the likelihood of costly rework or delays later.

In my perfect pipeline, we would use a dedicated requirements tracking tool like Jira or Trello, allowing easy filtering and mappable requirements. If requirements need updating, changing, or fixing, these should be visible to the team via the tracking tool. A great Jira workflow would require the issue type to move back to an “In Progress” state and require additional development and test tasks (or confirmation none are required).

## Continuous Integration

### Development and Review

Continuous integration (CI) is a must-have in any software development pipeline to ensure high-quality code and catch issues early in the development process.

In the perfect pipeline, the development process is highly streamlined, focusing on best practices and continuous improvement. As part of CI, developers should protect their main branch by running pre-merge checks, including unit tests, ensuring code coverage, coding styles, security checks, and other static analysis tools.

In addition to writing unit tests, developers should also write acceptance tests. Acceptance tests are written to ensure that the feature or story being developed meets the requirements specified by the product owner. All tests should be tagged to be traced back to the corresponding requirement(s) in the requirements tracking tool.

Once a developer has completed a set of tasks, they create a pull request to merge their code into the main codebase. However, before the merge can happen, pre-merge checks must be run. Developers should define the “mergeablity” of a pull request via the pre-merge checks. This is also often related to the Definition of Done (DoD) for certain development tasks.

Pre-merge checks are automated tests that ensure the code meets specific quality standards. If any of these checks fail, the pull request is blocked, and the developer must fix the issues before the changes can be merged into the main branch. Ideally, developers can run all pre-merge checks locally.

One key benefit of a complete CI pipeline is that developers get fast feedback on the quality of their changes. If something is broken, they know about it immediately and can fix it before it causes more significant problems down the line. This feedback loop is essential to catch issues early and ensure a stable and reliable codebase. And by tying requirements to code changes, it’s also possible to get feedback from the product team very quickly.

An integral part of the pre-merge checks is ensuring the proposed changes are linked to a Jira story or ticket in the requirements tracking tool. This is important because it helps tie the code changes to the specific requirements they address. When a requirement is tied to a set of code changes, tracking our coverage and completion of the feature becomes easier. Once the code is merged to the default branch, the ticket can automatically advance to the next step in the workflow, staging.

### Staging and End-to-End Testing

In a perfect pipeline, the merges to the main (default) branch use a modern workflow like [a merge queue](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request-with-a-merge-queue). In a worst-case scenario for our perfect pipeline, the code should be tested to report current test coverage and requirements coverage after the merge. If the merged code fails the more extensive testing, the code is reverted.

Testing in this phase is a critical part of a software development pipeline, and it can help you achieve faster and more efficient software releases.

The main branch should be staged to an environment and tested for regressions as appropriate. The automated checks should know what code has been changed and what tests should be run to verify nothing has regressed.

If regressions begin appearing, validation should be shifted to early parts of the pipeline to prevent these regressions. This could vary from simply running the tests before the merge; making new, lower-level tests to run before the merge; or understanding requirements that may be outdated or need retiring earlier in the requirements gathering.

Once the code is staged, and since we’ve been tracking our changes with Jira issues and know what change has just been staged, we can automatically move the issue to the next step, acceptance.

Having a demonstrable staging environment allows stakeholders to approve and release. Suppose this step was fraught with manual processes like having an SRE notify a developer code is staged and for that developer to inform the product manager who’s busy at the moment but needs to accept the feature, and someone forgot about the QE that needed to verify something last minute. In that case, the lead-time to deployment is impossible to track and monitor from this stage.

Automating our workflows, as well as our core software deployment, is essential to a perfect pipeline.

How the code is staged is entirely dependent on the infrastructure and end production environment for the software. Still, the critical point is that the code is staged to demonstrate to stakeholders, perform final user acceptance testing, and provide possible training purposes before the production launch.

Continuous Deployment techniques explained below could provide methods for staging and deploying.

## Continuous Deployment

Continuous Deployment and Continuous Delivery/Release may sound the same to many, and people regularly use them interchangeably, but these terms are different. Developers should architect their software and their pipeline to decouple deployment from release.

Like when staging new code, deploying new code depends on the infrastructure and release paradigms. However, these paradigms can apply to many applications, not just SaaS applications (which we’ll have to save for another time).

Deployment can be broken down into a few stages:

1. Deploy
1. Verify
1. Monitor
1. Rollback (if necessary)

Canary deployments are an effective means of deploying software continuously. Canary deployments are where you deploy a new version of your software (with features disabled) to a spare server or node, run various tests, and monitor parts of the infrastructure.

To ensure your canary deployment is reliable, you must have “built-in” testing. This means that the deployment should cause a set of tests to run. These tests ideally should be lightweight but can do anything from infrastructure monitoring, final API contract validation, connectivity testing, etc.

Tests should map to requirements and report results to some database where you can visualize the results to verify feature completeness in environments where features are enabled, verify non-functional requirements, or identify flakey code or configurations. If these tests fail or infrastructure thresholds are not met, the node/server is rolled back without impact on users.

A/B (or Blue/Green) Deployments are also common but are less lean. A/B Deployments (not to be confused with A/B Testing) use two separate environments that allow one production environment to switch to the other production environment after the environment is deployed and tested similarly to the canary deployment. If the testing fails, the environment is not switched over.

A/B Deployments are fraught with a significant downside. If you’ve experienced a micro-service monolith before, you understand this anti-pattern. They can encourage bulk aggregation of changes to the environment before deploying to end users. If using this deployment method, users want to ensure the A/B deployment environments have a high deployment frequency and do not become a bottleneck.

## Continuous Delivery

Once the software has been successfully deployed into a stable environment, it’s time to focus on continuous delivery. Continuous delivery involves enabling features for end users, monitoring the success of those features, and making data-driven decisions based on user feedback and system performance. We’ve already mentioned them before, but we start our delivery process by enabling features with feature flags.

Feature flags, also known as feature toggles, allow us to decouple the deployment and release of features and allow teams to experiment with new functionality in a controlled manner. In our perfect pipeline, feature flags would be implemented to enable or disable features in different environments, such as staging and production, throughout the development lifecycle. Many companies, like LaunchDarkly, now provide tooling around feature flags to gather data we’ll discuss below.

Measure everything. Once features have been enabled, tracking their performance and impact on the overall system is essential. This includes measuring key performance indicators (KPIs), such as response times, error rates, and user satisfaction. These metrics should be collected and analyzed to determine the success of the new features and identify potential areas for improvement.

A/B testing, also known as a dark launch, compares two versions of a software feature to determine which one performs better. In our perfect pipeline, we would use A/B testing to roll out new features to a small subset of users and compare their performance against the existing feature set. This allows developers to make data-driven decisions about whether to fully release a new feature or make additional changes before rolling it out to all users.

Now, scale-out features. As new features prove successful, they can be rolled out to a larger audience. As more features are rolled out, the team should continue to refine and optimize their development pipeline to ensure a seamless delivery process. This process should be gradual and data-driven, with developers carefully monitoring the impact of each feature on system performance and user satisfaction.

## Continuous Improvement

In a perfect software development pipeline, continuous improvement is an ongoing process. When requirements are mapped to development tasks, test cases, test results, and usage statistics, we can gather valuable metrics. By linking this data together, we can analyze our software development pipeline more accurately and efficiently.

Fix the bottlenecks. We can track how long it takes to complete each task and identify any bottlenecks in the development process. This data can be used to set realistic timelines for future development and optimize our workflow. We can also track how long it takes to run our tests and deployments and identify any flakey tests or deployments that take excessive time. This information can be used to optimize our pipeline and ensure that our tests are providing value without taking up too much time and our infrastructure is appropriately provisioned.

This example pipeline helps demonstrate the underlying connections between all pipeline stages and why automated tracking can improve your process time and lead times in all stages.

## TL;DR

By implementing a comprehensive pipeline, teams can ensure that their software is always up-to-date and delivers maximum user value. This process should be data-driven, focusing on continuous improvement and optimization, enabling organizations to maintain a competitive edge in today’s fast-paced software development landscape.

---

If you have ever seen a pipeline like this, comment below [when you can or on medium]. I’d love to hear real experiences from folks living in this dream world.
