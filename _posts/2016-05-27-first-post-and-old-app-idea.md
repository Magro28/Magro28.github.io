---
layout: post
title: First post and the life advise oracle
subtitle: A Siri-like app proof of concept
---

So it seems like this will be my first post for this blog even if I don't really know what
this blog should be about. But time will tell.

So here is my proof of concept of an old app idea:

### The Murmuring Wave Life Advise Oracle

One day I had the crazy idea to use my webscraping skills and combine them with
an application which imitates a service like Apples Siri.
I wanted to create an app which gives you life advise in a very personal way.
So the idea was that you just say your question like "I think my girlfriend
cheats on me. What should I do?" or "What is better IOS or Android?" (but in german) and the app should give you an
answer.

The google speech recognition API is easy to use to do a simple Speech-To-Text.
So this part is easy to achieve with some simple JavaScript on the client side
which sends an AJAX call with the question text to the backend.
The backend side of the app is implemented as a Spring Boot REST server which
processes the text and tries to get a "personal"
answer. Therefore I use the JSoup library to search on a popular german life advise
community page for a similar question and scrape randomly one of the user answers.
Then the backend sends the response back to the client which uses then Googles
Text-to-Speech API to read out the answer.

 The results were hilarious. Sometimes the answers were fitting just perfectly.
 Sometimes you get strange, scary or completely dumb things back.

 Anyway here's the app. Its in german so you should ask in german. ;)

 <iframe width="300" height="550" src="https://murmuring-wave-7351.herokuapp.com/"
 frameborder="0"></iframe>

(It's an heruko hosted app so it can take some time to wake up the dyno.
The scraping requests take also it's time. So be patient.
And you have to activate your microphone.)

Tech used:

- JavaScript
 - jQuery
 - Google-Speech-APIs
- Java
 - Spring-Boot
 - JSoup
