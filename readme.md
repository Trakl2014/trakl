## HackAkl 2014

The initial version of TrAkl was built during the [HackAkl: Transport](http://hackakl.org.nz) event, where it won Honorable Mention. The competition was held on [ChallengePost](http://hackakl-2014.challengepost.com) ([the TrAkl page](http://challengepost.com/software/trakl)) and it even got some, albeit cheeky, [http://www.3news.co.nz/Hackers-descend-on-Auckland-for-hackathon/tabid/423/articleID/345630/Default.aspx](news coverage).

## What's included

This repo contains a web site and an associated REST API. There are a couple of other companion repos under the [Trakl2014 org](http://github.com/Trackl2014).

On the web site, you can choose from one of a number of predefined routes and see them on a map. Shortly after a choice is made, the site will display an approximate number of minutes to drive that route given current traffic conditions, and whether the traffic is currently trending better or worse.

The REST API supports the web site and [mobile apps](/trackl2014/trakl-cordova-apps) with travel minutes and trend direction. This API consumes the [trakl-traffic-api](/trackl2014/trakl-traffic-api), which exposes data from the NZTA open data source.

## What's not included

There are 2 features that are currently missing that prevent the Trakl platform from being useful to the masses: custom routes and user registration.

Currently you can only choose a predefined route. We need to add the ability to choose specific start and destination locations of a route and make all caculations and notifications based on that route.

A user registration feature will allow the platform to associate individual users with their specific route. We intend to use OAuth2 with popular social networks (Twitter, Facebook, Google, Microsoft, etc) as a starting place. Of course a username/password option makes a lot of sense too.

## Installation

This GitHub repo is only intended to be installed by developers. If you're interested in the user experience, the [web interface is here](http://trakl.herokuapp.com) and the [Android app is in the Play store](https://play.google.com/store/apps/details?id=com.berzerk.trakl). If you are a developer and interested in contributing:

1. Install [Node.js](http://nodejs.org)
2. Clone this repo
3. `npm install`

