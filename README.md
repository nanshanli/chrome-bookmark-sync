# chrome-bookmark-sync

## Problem
I was part of a team that regularly scanned websites for information to forward along. As different people scanned different websites each day, it was hard to avoid sending along duplicates (things that were already sent out the previous day).

We initially used chrome bookmarks and synced our browsers so that articles already shared show up as bookmarked - however, with 20 people synced up and constantly updating the bookmarks folder, we soon exceeded Google's rate limits.

I decided to pick up a JavaScript course and programmed a simple bookmarking Chrome Extension in 2 days. As a result, my team could keep track of our bookmarks and enjoy the productivity benefits of a less cluttered inbox, faster scanning and a lighter mental load.

## Backend
The backend is hosted on a Ubuntu container, and built using sqlite and Flask.

## Functions
The extension checks if a url is already in the database. If it is, the icon turns yellow.

If the user clicks on the icon, a PUT request is sent to the database, and the icon turns yellow.

Just like the chrome bookmarking function, but without the rate-limits :-)

## Improvements
- Needs to implement unit-testing, integration testing.
  - Tried out jest-chrome as a mock of the chrome API but ran into some issues, need to figure out workarounds
- Does not offer ability to remove bookmarks from database.
