# Unofficial CSGOEmpire API
The unofficial CSGOEmpire API for JavaScript

You can find the official documentation [here](https://github.com/OfficialCSGOEmpire/API-Docs#csgoempire-api-key-documentation)

The api is not complete yet. If you feel like contributing, open a pull request proposing a change :)


## Usage
```javascript
import CSGOEmpire from "csgoempire-api"

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

