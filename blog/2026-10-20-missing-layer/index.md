---
slug: the-missing-layer-is-the-model
title: The missing layer is the model
description: Requirements and Gherkin were never the hard part. The layer underneath them is.
authors: [dsayling]
tags: [bdd, testing, software-development, devops]
---

I've been doing this long enough to know the requirements aren't the hard part. Building the thing that knows what the requirements mean is.

<!--truncate-->

## Backstory

I've done software development and software testing in a bunch of different spaces. Requirements, architecture, modeling, testing, verification, validation, end to end. A lot of it in distributed systems and complex systems, like vehicles.

I worked with VICTORY, the Army initiative — vehicular integration for C4ISR/EW. If you haven't lived in that world, it's a bunch of systems that were never designed together, on a vehicle, that now have to work together. That'll teach you pretty quick that no single box is the system.

When I came to Ford, there was no Gherkin. No BDD. None of it.

So I said something to the effect of:

> Hey, you know, you could describe the features and behaviors of the vehicle in BDD. And then you could define an automation layer underneath it that actually knows how the vehicle works.

I didn't call it an architectural model layer at the time, but that's what it was. A layer that knows what CAN message has the data for the vehicle state. That knows what power mode the vehicle is in. That knows the stuff every test needs to know, so every test doesn't have to figure it out again on its own.

I've written about this before, twice now. See [Why BDD sucks in practice](../2023-06-08-bdd-sucks/index.md) and [Rolling out Behavior-Driven Development](../2024-02-24-rollingout-bdd/index.md).

I still think BDD kind of sucks. I just keep coming back to the layer underneath it, because I don't think we've replaced that part with anything better.

## Where it gets stuck

Now I see all this consternation about how to define a requirement, and how to bind that requirement to CAN.

> How do we write this requirement so it maps to a signal? — somebody in a meeting, probably

> Does functional safety go in Gherkin? What about power? — somebody else in the same meeting

And I get it, those are real questions. I just don't think they're the first question.

Whether something goes in Gherkin or not isn't the point. The point is whether you have the layer underneath it.

You can describe functional safety in Gherkin. You can describe power in Gherkin. Or you don't have to. You can build those rules into that same automation layer, make them reusable with the Gherkin, and just assert on them directly.

```gherkin
Feature: Vehicle state

  Scenario: The vehicle is awake and ready
    Given the vehicle is in the expected power mode
    When I ask for the vehicle state
    Then I should see the state the model says I should see
```

That's the declarative version. Nobody writing that scenario should have to know which message, which signal, or which bit carries that state. The layer knows.

And when a scenario is the wrong shape for a rule — and for safety and power, it often is — you skip the scenario and assert on the layer itself:

```python
def test_power_mode_matches_model(model, vehicle):
    assert vehicle.power_mode == model.expected_power_mode
    assert vehicle.state == model.expected_state
```

Same layer. Same source of truth. Two ways to use it.

And look, we've done this before. If you've done any UI automation, you've used a Page Object Model.

A page object is just a model of a page. It knows where the button is, how to fill in the field, how to tell if the page actually loaded. Your tests don't go hunting for elements all over the place, because the page object already did that work, once, in one place.

And nobody argues about whether a page object should be “used by Gherkin or not.” Of course it can be. A step definition can call it. A plain test can call it. Whatever sits on top of it, the model underneath is the same, and that's kind of the whole point of building it.

The architectural model is the same idea, just for a system instead of a page. Which, I know, is a bigger system. That's why it matters more, not less.

And the deeper that model can go, the more capable the testing and validation can go.

If your model only knows a message exists, all you can really test is that the message showed up. Congrats, I guess.

If it knows the timing, the state transitions, the power sequence, which system woke which other system up, how this variant is supposed to be different from that one — now you can test how the system actually behaves. You can validate the weird cases. You can ask what happens when things happen in the wrong order, or at the wrong time.

The depth of the model is the ceiling for the testing. You can't validate deeper than the thing you're validating against knows.

Folks keep arguing about the top layer like it's the system. It isn't. Gherkin is just one way to talk to the model. Assertions are another. If you only build the top, you've built the part that reads nice in a review and nothing that scales.

## The part nobody builds

Here's the conclusion I've come to, and I wish it wasn't one:

> _People don't know how to build complex systems in a scalable way._

Not because they're not smart. Because the model layer is nobody's job.

Requirements are somebody's job. They get a tool, and a process, and credit for closing them out. Safety has a team. Power has a team. Network has a team. Testing has a team.

So each team writes down what it knows, in its own place, in its own format. Then the test code has to go figure it all out again. One test re-learns the CAN binding. The next test re-learns it a slightly different way. A third test just hard-codes what somebody remembered in a meeting.

That doesn't scale, and honestly, it never did. We just didn't have systems this distributed, with this much state in this many places, where you could get away with it and not notice right away.

In a complex system, state isn't in one place. It's the power mode, _and_ the message timing, _and_ the variant, _and_ what the last system that woke up did. If your automation doesn't have a model of that, you aren't testing the system. You're testing fragments of it and hoping they add up when somebody puts them together (hope your car doesn't turn off while you're driving!).

## Use it on the real thing

The last piece is the one I really don't understand why companies don't get.

You build that architectural model — fine, great — then use it to test and validate the actual running production thing.

Does it match the damn model?

Not a copy of the model in test code. Not a spreadsheet somebody updated last quarter. The same model you used to describe the behavior, run against the real system, asking: is this what we said it would be?

If it isn't, one of two things is wrong. The system is wrong, or the model is wrong. Either way, now you know, and now you have something specific to fix. That's a better conversation than “the test failed” and six people in a room arguing about whose document is right.

## In honor(?) of the model

I want BDD to be useful, and I've said that before too.

Now I think I was one layer too high when I said it.

I want a model that one team builds and every team can use.<br/>
I want safety and power to check against the same truth as the features do.<br/>
I want to run that model against the real thing and get a straight answer.<br/>

I guess what I'm trying to say is, I want us to stop arguing about the sentences and go build the layer underneath them.
