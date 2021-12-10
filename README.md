# Unofficial CSGOEmpire API Wrapper
The unofficial CSGOEmpire API JavaScript Wrapper

You can find the official api documentation [here](https://github.com/OfficialCSGOEmpire/API-Docs#csgoempire-api-key-documentation)

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

- Typing interfaces are yet to be made. That means there's no full typings support at the moment
  
## Roadmap
- [ ] Fully typed

