---
slug: rules-for-sw
title: Drew's Rules to Deliver Value
authors: [dsayling]
tags: [software-development, devops]
---

I compiled this list after leaving a prominent DevOps company that I’ll keep anonymous. Observing their stagnant state for the entire year I was there, I was certain that my contributions wouldn’t be valuable to the company in the long run. Nevertheless, I did learn a few valuable lessons from their company practices and the areas where they fell short.

<!--truncate-->

Here they are:

1. First and foremost, prioritize continuous delivery of new features that enhance your customer’s value with built-in quality assurance measures, including usage metrics, Mean Time to Repair (MTTR), deployment frequency, and A/B production testing.
2. Clearly define and quantify the business value of your work. Understand how you want to assess and measure this value.
3. Quantify the value of technical debt compared to any feature value. While this may not always be perfect, it’s essential for making informed business decisions.
4. Consider backwards compatibility and identify bottlenecks. Avoid introducing significant changes that may create bottlenecks when introducing new value to customers. Ensure that your customers can adapt quickly without compromising their continuous delivery capabilities. Ideally, enable them to extract value even faster, which in turn accelerates their ability to deliver value. Continuously improve the experience of receiving value at every touchpoint.
5. Your customer may be internal or external to your company. In large organizations, it’s often an internal software development team. Understand your direct customer thoroughly. In horizontal agile literature, the focus is often on the external customer as the entity receiving value. However, in large organizations, this may be limited to a select number of teams.
6. Understand your team’s place within the organization’s team topologies. By comprehending the software architectural layout and value stream delivery through your teams, you can identify systemic bottlenecks in continuous delivery. (We’re all measuring continuous delivery, right?)
7. Understand how and where in the organization your customers derive value. Customers receive value from various parts of the organization, including documentation, support engineers, marketing documentation, and systematic or micro upgrades of products. Optimize value delivery at these points by leveraging software. Additionally, optimize the value delivery of the platform underneath these points, where teams collaborate to deliver value to each other. This needs to be better articulated.
8. Integrate other business functions within the software development team. Collaboration between non-engineering and product groups is paramount. Even in high-performing organizations, this collaboration often ceases at “auxiliary” teams such as documentation, IT, support, and compliance. Teams such as sales, marketing, revenue, and others are excluded, which is a mistake. Align the customary key performance indicators (KPIs) with the value delivery of the software, and you are truly achieving excellence.
9. Software developers should have a strong understanding of other parts of the business. Other business functions convey the value of the software you deliver, and understanding them can enable you to deliver even more customer value.
10. Always be flexible and willing to trade costs whenever necessary. This requires human connection and conversation, not just risk calculation. Sometimes, that’s all you’ve got (skew the numbers however you need to!). Understand that you will encounter unknown unknowns.
11. A generative culture does not mean “do what you want.” The primary business objectives still apply. If the work does not contribute to achieving these objectives, it should not be done. Teams should be able to understand how their value delivery aligns with these business objectives. Once they grasp this connection, enable them to achieve it as they see fit (assuming good engineering discipline) and ensure they can demonstrate the value.

Continuous delivery of new features with built-in quality assurance measures is crucial for enhancing customer value. Understanding the business value of work and quantifying the value of technical debt compared to feature value are essential for making informed business decisions. Collaboration between software development teams and other business functions is vital for aligning KPIs with value delivery and achieving excellence.
