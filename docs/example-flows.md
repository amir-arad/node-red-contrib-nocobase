# Example Flows


## Create Method Example

```json
[
  {
    "id": "1",
    "type": "nocobase",
    "z": "flow_id",
    "name": "Create Test",
    "method": "create",
    "resource": "test",
    "baseURL": "http://localhost:13000/api",
    "wires": [["2"]]
  },
  {
    "id": "2",
    "type": "debug",
    "z": "flow_id",
    "name": "Debug",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "targetType": "full",
    "wires": []
  }
]
```

## Update Method Example

```json
[
  {
    "id": "1",
    "type": "nocobase",
    "z": "flow_id",
    "name": "Update Test",
    "method": "update",
    "resource": "test",
    "baseURL": "http://localhost:13000/api",
    "wires": [["2"]]
  },
  {
    "id": "2",
    "type": "debug",
    "z": "flow_id",
    "name": "Debug",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "targetType": "full",
    "wires": []
  }
]
```

## Delete Method Example

```json
[
  {
    "id": "1",
    "type": "nocobase",
    "z": "flow_id",
    "name": "Delete Test",
    "method": "delete",
    "resource": "test",
    "baseURL": "http://localhost:13000/api",
    "wires": [["2"]]
  },
  {
    "id": "2",
    "type": "debug",
    "z": "flow_id",
    "name": "Debug",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "targetType": "full",
    "wires": []
  }
]
```

## Custom Action Example

```json
[
  {
    "id": "1",
    "type": "nocobase",
    "z": "flow_id",
    "name": "Custom Action Test",
    "action": "customAction",
    "resource": "test",
    "baseURL": "http://localhost:13000/api",
    "wires": [["2"]]
  },
  {
    "id": "2",
    "type": "debug",
    "z": "flow_id",
    "name": "Debug",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "targetType": "full",
    "wires": []
  }
]
```

## Plugin Example

```json
[
  {
    "id": "1",
    "type": "nocobase",
    "z": "flow_id",
    "name": "Plugin Test",
    "plugin": "customPlugin",
    "baseURL": "http://localhost:13000/api",
    "wires": [["2"]]
  },
  {
    "id": "2",
    "type": "debug",
    "z": "flow_id",
    "name": "Debug",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "targetType": "full",
    "wires": []
  }
]
```

## Schema Management Example

```json
[
  {
    "id": "1",
    "type": "nocobase",
    "z": "flow_id",
    "name": "Schema Management Test",
    "method": "list",
    "schema": true,
    "baseURL": "http://localhost:13000/api",
    "wires": [["2"]]
  },
  {
    "id": "2",
    "type": "debug",
    "z": "flow_id",
    "name": "Debug",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "targetType": "full",
    "wires": []
  }
]
```

## Data Modeling Example

```json
[
  {
    "id": "1",
    "type": "nocobase",
    "z": "flow_id",
    "name": "Data Modeling Test",
    "method": "list",
    "model": true,
    "resource": "test",
    "baseURL": "http://localhost:13000/api",
    "wires": [["2"]]
  },
  {
    "id": "2",
    "type": "debug",
    "z": "flow_id",
    "name": "Debug",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "targetType": "full",
    "wires": []
  }
]
```