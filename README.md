# article-srs
Article SRS Google Apps script

What is this?
=================

This is a project based on Simon Hørup Eskildsen's article: https://sirupsen.com/playlists/
It helps acquired knowledge to stick better by sending out email summaries of the 

How does it work?
=================

There is my "Queues and reviews" spreadsheet where I put my article reviews.

Then there is my "Article SRS" spreadsheet, that builds chunks of my articles read in the past.
It repeats articles with good ratings more often than ones with bad ratings. (Ratings 1-2 are never even sent.)
As I already have 1,350 reviews and just started this project, I made it capable of sending old articles as well,
and it will catch up to new articles in a year or so.

And this is the script that's triggered every morning to send out email reminders.

How to use it?
==============

Run the `sendArticleReminder` function to send out the latest article reminders that are due.
To auto-send, set up a trigger for it, say, for every 4am.
Find all settings in the `sendArticleReminder` function.
To send more articles per day, just set the QUERY LIMIT on the "Next" sheet from 10 to anything you like.

Version history
===============

  - 2018-08-25 Project created, first version of script written.

License
=======

Copyright (c) 2018 Dávid Veszelovszki (veszelovszki@gmail.com)
