# node-red-contrib-nocobase

Connect to [NocoBase](https://docs.nocobase.com/) from [Node-RED](https://nodered.org/).

## Node Configuration

- `Base URL`: The base URL of your NocoBase API.
- `Resource`: The resource you want to interact with (e.g., `test`).
- `Method`: The method to use (e.g., `list`, `get`, `create`, `update`, `delete`).
- `Action`: The custom action to use (e.g., `customAction`).
- `Plugin`: The plugin to use (e.g., `customPlugin`).
- `Schema`: Indicates schema management.
- `Model`: Indicates data modeling.

### Input Message Properties

- `msg.resource`: (Optional) The resource to interact with.
- `msg.method`: (Optional) The method to use.
- `msg.params`: (Optional) Parameters for the request.
- `msg.action`: (Optional) Custom action to perform.
- `msg.plugin`: (Optional) Plugin to use.
- `msg.schema`: (Optional) Indicates schema management.
- `msg.model`: (Optional) Indicates data modeling.

### Output Message Properties

- `msg.payload`: The response data from the NocoBase API.

[Example Flows](docs/example-flows.md)
