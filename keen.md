# To track

Profile View
Item View
Follows
Followers
Item Likes
Contributions

# Queries

Profile visits last 30 days (+ history)
Following/ Follower change
Contributions change

Most liked items
Most viewed items

# Loading the data using Redux

{ type: 'FETCH_STATS' }
{ type: 'FETCH_STATS_FAILURE', error: 'Oops' }
{ type: 'FETCH_STATS_SUCCESS', response: { ... } }

# Extras

Dynamic placeholders
IP to GEO parser
User agent parser
Multi analysis

# Questions

* React/Redux where does analytics tracking belong
* Where do API calls to retrieve analytics belong
http://redux.js.org/docs/advanced/AsyncActions.html
* Where do we place a utility class for analytics?

# Services used
https://getstream.io/
https://algolia.com/


# Keen docs
Batch get the data for the profile page
https://keen.io/docs/api/#multi-analysis

# Issues with keen

* Events take a while to show up. During development this makes debugging hard.
* There is no batch query endpoint. The multi analysis is too restricted.
* You can't return a sorted list. (IE. most viewed items)


# JS + ES6/7
https://github.com/hemanth/es7-features
https://github.com/hemanth/paws-on-es6
https://jsfeatures.in/
http://es6-features.org/
Obscurities related to import syntax:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

# React/Routing
https://github.com/reactjs/react-router

# React/Redux
https://github.com/reactjs/react-redux
http://redux.js.org/docs/advanced/AsyncActions.html
