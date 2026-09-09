---
title: 'Static or server-rendered? How to decide with confidence'
date: '2020-01-02'
description: 'A clear framework for choosing between static generation and server-side rendering when planning a modern website.'
image: '/images/blog/ssg-ssr.png'
category: 'Strategy'
---

We recommend using **Static Generation** whenever possible because your page can be built once and served by a CDN. That makes it fast, resilient, and inexpensive to operate.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

Ask yourself: “Can I pre-render this page ahead of a user’s request?” If the answer is yes, Static Generation is often the right choice.

On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user’s request. Maybe your page shows frequently updated data, or the response changes for every visitor.

In that case, use Server-side Rendering. It can be slower, but the page is generated with current information on each request. You can also combine both approaches: pre-render the stable shell, then load dynamic content where it matters.

## Start with the visitor

The best technical decision is the one that keeps the visitor’s first interaction clear and quick. Start with the content that needs to be discoverable, then add server-rendered or client-side behavior only where it improves the experience.
