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


## Features(modules):


### Layout module
responsible for connecting all modules and layout components, such as: header, mobile navigation, content layouts
redux for layout includes common things like transaction settings, tokens and their prices etc.

### Wallet module
Has data related to wallet, like tokens and balances. 
You can't proceed with swap/adding/removing liquidity until you connect to the wallet

### Swap module
Includes swap functionality. There are a couple of tokens that have balance and TON is the first one.
I order to proceed with the swap you need to connect wallet, select two tokens and enter the amount of tokens.
Inputs work automatically, once you selected both tokens and type an amount in one input the second one should change according to their rate.
Rate works randomly. When you select a token, I emit the call to get its price (which is probably not a correct way, and getting all prices is much easier, but it helps to get the latest price).
After amount and tokens are selected you can click on swap and see confirmation popup, where you can confirm the transaction.
It also includes settings popup where you can change slippage tolerance and transaction decline time.

### Liquidity module
Liquidity has a similar UI to swap. You need to connect to a wallet, select tokens and enter an amount.
It automatically finds a pool with provided tokens and fee and if pool is not found shows the notification that user is going to create a pool and choose the token's rate.
If a pool already exists than entering an amount for any token will affect other amount (50%/50%).
User can proceed with adding liquidity or creating a pool only if tokens are selected & amount/balances correct.
To test it you can use the tokens in the top of the list. Some of are not allowed from the wallet, so you might see allow token button.

### Pools module
Includes 2 views: all pools and my pools. In order to see the list of users pools you need to connect to a wallet.
The all pools list includes common data related to a pool, like liquidity, apr, usdVolume etc. My pools list has the data related to connected wallet.
Both lists have search/sorting functionality.
Both lists have action 'add liquidity' that opens dialog where you already have preselected tokens and fee according to pool.
The flow for adding liquidity is the same as adding liquidity modules. actually in uses mostly the same peace of code and state.
My list also has an action 'remove liquidity' where you can select the amount in % of how much liquidity you will remove and to see calculation changes.

#####NOTE: 
Mocks for pools and tokens are inconsistent. So you might not see logos for some pools in the list. But it also means that adding liquidity for some pools is not possible.
But its should be the case for consistent&real data.


## Initial Code structure
I split code my modules, so it could be scalable for future features

`assets/`: icons, images, fonts etc

`components/`: basic reusable components for ui

`helpers/`: helpers related to some general peaces of code/behavior

`hooks/`: general hooks

`mock/`: some mock, that I believe can be removed

`modules/`: usually they consist of the next pieces:
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
`redux-toolkit` - has integrated and full ecosystem for redux. It isn't lightweight, but includes all needed stuff to support from small to large apps

`material`  - I know this is not the lightweight lib, but again it allows to use many features, has a great support and smooth ui in comparison with others


### Others:
There are 3 dependencies I had to add in order to reduce bundle size for material components

`"customize-cra": "^1.0.0",` - allows configuring babel without ejecting creat-app (create-react-app sacrifice) 

`"react-app-rewired": "^2.1.11"` - allows configuring babel without ejecting creat-app (create-react-app sacrifice)

`"babel-plugin-import": "^1.13.3",` - transform import and prevents importing for unused components
