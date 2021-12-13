# Unofficial CSGOEmpire API Wrapper
The unofficial CSGOEmpire API JavaScript Wrapper

You can find the **Official CSGOEmpire Api** documentation [here](https://github.com/OfficialCSGOEmpire/API-Docs#csgoempire-api-key-documentation)

This wrapper is not complete yet. If you feel like contributing, open a pull request proposing a change :)

## Installation
With npm:
```
npm install csgoempire-api
```
With Yarn:
```
yarn add csgoempire-api
```

## Usage
```javascript
import { CSGOEmpire } from "csgoempire-api"

const empire = new CSGOEmpire(YOUR_API_KEY)

empire.getActiveTrades()
empire.getActiveAuctions()
...
```

Initializing websocket:
```javascript 
import { CSGOEmpire } from "csgoempire-api"

const empire = new CSGOEmpire(YOUR_API_KEY)

empire.initSocket((socket) => {
    socket.on("new_item", (data) => {
        // ...
    })
})

// empire.socket can be undefined
const socket = empire.socket
```
Note: Not running `initSocket` will result in a undefined socket instance
### initSocket(fn)
| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| fn | Function? | - | A callback function that gets executed when the socket is initialized and authenticated |

## Documentation

### Api 
```javascript
const empire = new CSGOEmpire(apiKey)
```
- apiKey: string (required)
- webSocketEnabled: boolean (optional) (true by default)

---

### Socket
Extends [socket.io-client's](https://github.com/socketio/socket.io-client) class. Can be `undefined` if not initialized

```javascript
const socket = empire.socket
```

#### on(event, fn)

`socket.on` is a `io().on` wrapper that provides typings support for CSGOEmpire's events

```javascript
socket.on(event, fn)
```
- event: string (required)
    - "new_item" 
    - "updated_item"
    - "auction_update"
    - "deleted_item"
    - "trade_status"
    - "timesync" 
- fn: Function (required)

Each event function has typings support. 

```javascript
socket.on("new_item", (data) => {
    /**
     * data extends NewItemSocketData interface
     * 
     * Available properties: 
     * { 
     *      id: number,
     *      name: string,
     *      ...
     * }
     */
    const { id, name } = data
})
```

You can check all events example responses [here](https://github.com/OfficialCSGOEmpire/API-Docs#websocket-events)

---

### getMetadata
Returns the user object, which is used to identify via websocket, as well as socket token (authorizationToken) & socket signature (signature) which are used to authenticate on websocket.

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| - | - | - | - |

```javascript
empire.getMetadata().then(res => {
    ...
})
```
You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/getMetadata.ts)

---

### getActiveTrades
Returns an array of all items currently being deposited or withdrawn by this account. This does not include bids placed on active items until the auction ends.

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| - | - | - | - |

```javascript
empire.getActiveTrades().then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/getActiveTrades.ts)

---

### getActiveAuctions
Returns an array of all auctions currently being bid on by this account.

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| - | - | - | - |

```javascript
empire.getActiveAuctions().then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/getActiveAuctions.ts)

---

### updateSettings
Used to update your tradelink and/or Steam API key

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| data | Object | - | An object containing a trade_url (required) and a steam_api_key (optional)  |

```javascript
empire.updateSettings().then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/updateSettings.ts)

---

### Deposits

Deposit related methods

#### getCSGOInventory
Fetch your inventory from steam and caches it to the database for 1 hour.

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| invalid | boolean | false | Filters invalid items, defaults to no filtering |

```javascript
empire.getCSGOInventory().then(res => {
    ...
})
```
You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/csgoInventory.ts)

#### getUniqueInfo
Get inspected unique info for items in user inventory. Examples include float/sticker data

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| - | - | - | - |

```javascript
empire.getUniqueInfo().then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/getUniqueInfo.ts)


#### createDeposit
Creates an item deposit

Notes: coin_value is in **coin cents**, so 100.01 coins is represented as 10001

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| data | Object | - | An object containing an array of items to deposit |

```javascript
empire.createDeposit({
    items: [
        {
            "id": 3731677704,
            "custom_price_percentage": 32,
            "coin_value": 576811
        }
    ]
}).then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/createDeposit.ts)

#### cancelDeposit
Cancels processing deposit without any bids. Once a bid has been placed items are no longer eligible to be cancelled.

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| deposit_id | number | - | The deposited item's id |

```javascript
empire.cancelDeposit(28391470).then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/cancelDeposit.ts)

#### sellNow
Sells an on going auction item to the current auction highest bidder

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| deposit_id | number | - | The deposited item's id |

```javascript
empire.sellNow(28391470).then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/sellNow.ts)

---

### Withdraw
Withdraw related methods

#### getListedItems
Get a list of all items listed on the withdrawals page

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| page | number | - | The page to fetch the data from |
| per_page | number | - | The ammount of items to be fetched per page |
| options | Object? | - | An object containing filtering options |

```javascript
empire.getListedItems(1, 50, { sort: "asc" }).then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/getListedItems.ts)

#### getDepositorStats
Get the depositing users stats from a unique deposit ID

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| deposit_id | number | - | The deposited item's id |

```javascript
empire.getDepositorStats(28391470).then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/depositorStats.ts)


#### createWithdrawal
Withdraw item directly if the auction has expired without being won.

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| deposit_id | number | - | The deposited item's id |

```javascript
empire.createWithdrawal(28391470).then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/createWithdrawal.ts)

#### placeBid
Place a bid on an auction.

| Option | Type | Default Value | Description |
| :----: | :--: | :----: | :----: | 
| deposit_id | number | - | The deposited item's id |
| bid_value | number | - | The ammount to bid |

```javascript
empire.placeBid(28391470, 60).then(res => {
    ...
})
```

You can find the response Object interface [here](https://github.com/gustavo-dev/csgoempire-api/blob/master/lib/typings/requests/placeBid.ts)