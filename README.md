# chrome-bookmark-sync

## Problem
See [blog post](https://nanshanli.github.io/post/2020/chrome-bookmark-sync) for more details.

## Functions
The extension checks if a url is already in the database. If it is, the icon turns yellow.

If the user clicks on the icon, a PUT request is sent to the database, and the icon turns yellow.

Just like the chrome bookmarking function, but **without the rate-limits** :-)

## Backend
The backend is hosted on a Ubuntu container, and built using `sqlite`, `Flask` & `tortoise`.
