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

const api = new CSGOEmpire(YOUR_API_KEY)

api.getActiveTrades()
api.getActiveAuctions()
...
```

Accessing the websocket instance:
```javascript 
...
const api = new CSGOEmpire(YOUR_API_KEY)

const socket = api.socket

socket.on(..., () => ...)
```

Disabling websocket
```javascript
const api = new CSGOEmpire(YOUR_API_KEY, false)

const socket = api.socket // undefined
```

## Notes
- **getListedItems** method currently accepts only **page** and **per_page** params

- Complete typing interfaces are yet to be made. That means there's no full typings support at the moment
  
## Roadmap
- [ ] Fully typed api

## Documentation (Work in progress)

### Api class
```javascript
const empire = new CSGOEmpire(apiKey, webSocketEnabled)
```
- apiKey: string (required)
- webSocketEnabled: boolean (optional) (true by default)

### Socket
Extends [socket.io-client's](https://github.com/socketio/socket.io-client) class

```javascript
const socket = empire.socket
```

#### on(event, fn)
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