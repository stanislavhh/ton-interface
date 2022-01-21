# Introduction

This project has been created for ton defi


## Install & Run
To run project in dev mode you need to install modules:
###`yarn install`

Then you can start `dev`:
###`yarn dev`

## Build
To build use: 
###`yarn build`


## Features:

#### - app configuration
#### - working ui for swap, pools, pool stats, add/remove liquidity

*Some things may work incorrect, because I am aware of business logic for DEFI only partially, didn't have much time to deep into, and a lot of things were done just by my feeling. just hope it is not fully wrong:D


## Initial Code structure
I have tried to keep code consistent, reusable and use SOLID as much as I can.

`assets/`: icons, images, fonts etc

`components/`: basic reusable components for ui

`helpers/`: helpers related to some general peaces of code/behavior

`hooks/`: general hooks

`mock/`: some mock, that I believe can be removed

`modules/`: all features are splitted by modules, usually they consist of the next pieces:
```
-components
-views (components handling routes)
-hooks
-constants
-selectors
-slices (includes actions, reducers, reduce handlers etc)
-types
-enums
```

`utils/`: some common functions

## Dependencies 
All libs were chosen for reason:

`redux-toolkit` - has integrated and full ecosystem for redux. It isn't lightweight, but includes all needed stuff to support from sm to big apps

`material`  - I know this is not the lightweight lib, but again it allows to use many features, has a great support and smooth ui in comparison with others

`react-transition-group` - just a common animation lib for react (allows us to make animations for transition between routes or with material components)


### Others:
There are 3 dependencies I had to add in order to reduce bundle size for material components

`"customize-cra": "^1.0.0",` - allows configuring babel without ejecting creat-app (create-react-app sacrifice) 

`"react-app-rewired": "^2.1.11"` - allows configuring babel without ejecting creat-app (create-react-app sacrifice)

`"babel-plugin-import": "^1.13.3",` - transform import and prevents importing for unused components
