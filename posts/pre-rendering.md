---
title: 'Build faster websites with the right rendering strategy'
date: '2020-01-01'
description: 'A practical guide to static generation and server-side rendering, and how to choose the right approach for a fast, scalable website.'
image: '/images/blog/pre-rendering.png'
category: 'Performance'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

The right rendering strategy can make a major difference to perceived performance, search visibility, and the experience of maintaining a growing website.

Importantly, Next.js lets you choose which pre-rendering form to use for each page. You can create a hybrid app by using Static Generation for most pages and using Server-side Rendering for others.

For content that changes infrequently, static generation is usually the strongest starting point: it gives visitors fast HTML and lets a CDN serve the page close to them. Use server rendering when the content needs to be current at request time.

The best implementation is rarely a framework-wide decision. Treat each route as its own product surface and choose the simplest rendering model that meets its content and business needs.

## A useful rule of thumb

If you can generate a page before a visitor asks for it, prefer Static Generation. If the page depends on request-specific or frequently changing data, consider Server-side Rendering.

That balance keeps a website quick for visitors while leaving room for dynamic features where they actually add value.
