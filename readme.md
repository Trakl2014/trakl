## HackAkl 2014

The initial version of Trakl was built during the [HackAkl: Transport](http://hackakl.org.nz) event, where it received an Honorable Mention. The competition was held on [ChallengePost](http://hackakl-2014.challengepost.com) ([the trakl page](http://challengepost.com/software/trakl)) and it even got some, albeit cheeky, [news coverage](http://www.3news.co.nz/Hackers-descend-on-Auckland-for-hackathon/tabid/423/articleID/345630/Default.aspx).

## What's included

This repo contains a [web site](http://trakl.herokuapp.com) and an associated REST API. There are a couple of other companion repos under the [Trakl2014 org](http://github.com/Trakl2014) for mobile apps and supporting REST APIs.

On the web site, you can choose from one of a number of predefined routes and see them on a map. Shortly after a choice is made, the site will display an approximate number of minutes to drive that route given current traffic conditions, and whether the traffic is currently trending better or worse.

The REST API supports the web site and [mobile apps](http://github.com/Trakl2014/trakl-cordova-apps) with travel minutes and trend direction. This API consumes the [trakl-traffic-api](http://github.com/Trakl2014/trackl-traffic-api), which exposes data from the [NZTA open data](https://infoconnect.highwayinfo.govt.nz/opencms/opencms/infoconnect) source.

##user registation 

http://trakl.herokuapp.com/login-home - sign in with email/pass and link your Facebook and twitter accounts.  at the moment you will need the email/pass setup to login from app.  At a future date login can be strait Facebook or twitter.



## What's not included

There is 1 missing features that prevent the Trakl platform from being useful to the masses: custom routes .

Currently you can only choose a predefined route. We need to add the ability to choose specific start and destination locations of a route and make all calculations and notifications based on the specified route.


## Installation

This GitHub repo is only intended to be installed by developers. If you're interested in the user experience, the [web interface is here](http://trakl.herokuapp.com) and the [Android app is in the Play store](https://play.google.com/store/apps/details?id=com.berzerk.trakl). If you are a developer and interested in contributing:

1. Install [Node.js](http://nodejs.org)
2. Clone this repo
3. `npm install`
4. Party on!

