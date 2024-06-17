const { APIClient } = require('@nocobase/sdk');

module.exports = function(RED) {
    function NocoBaseNode(config) {
      RED.nodes.createNode(this, config);
      const node = this;
  
      const api = new APIClient({
        baseURL: config.baseURL,
      });
  
      node.on('input', async function(msg) {
        try {
          const resource = msg.resource || config.resource;
          const method = msg.method || config.method;
          const action = msg.action || config.action;
          const params = msg.params || {};
          const plugin = msg.plugin || config.plugin;
          const schema = msg.schema || config.schema;
          const model = msg.model || config.model;
  
          let response;
  
          const retry = async (fn, retries = 3) => {
            for (let i = 0; i < retries; i++) {
              try {
                return await fn();
              } catch (error) {
                if (i === retries - 1) throw error;
                await new Promise(res => setTimeout(res, 1000));
              }
            }
          };
  
          if (plugin) {
            response = await retry(() => api.plugin(plugin).request(params));
          } else if (action) {
            response = await retry(() => api.resource(resource)[action](params));
          } else if (schema) {
            switch (method.toLowerCase()) {
              case 'list':
                response = await retry(() => api.schema.list());
                break;
              case 'get':
                response = await retry(() => api.schema.get(params.id));
                break;
              case 'create':
                response = await retry(() => api.schema.create(params.data));
                break;
              case 'update':
                response = await retry(() => api.schema.update(params.id, params.data));
                break;
              case 'delete':
                response = await retry(() => api.schema.destroy(params.id));
                break;
              default:
                throw new Error(`Unsupported method: ${method}`);
            }
          } else if (model) {
            switch (method.toLowerCase()) {
              case 'list':
                response = await retry(() => api.model(resource).list(params));
                break;
              case 'get':
                response = await retry(() => api.model(resource).get(params.id));
                break;
              case 'create':
                response = await retry(() => api.model(resource).create(params.data));
                break;
              case 'update':
                response = await retry(() => api.model(resource).update(params.id, params.data));
                break;
              case 'delete':
                response = await retry(() => api.model(resource).destroy(params.id));
                break;
              default:
                throw new Error(`Unsupported method: ${method}`);
            }
          } else {
            switch (method.toLowerCase()) {
              case 'list':
                response = await retry(() => api.resource(resource).list(params));
                break;
              case 'get':
                response = await retry(() => api.resource(resource).get(params.id));
                break;
              case 'create':
                response = await retry(() => api.resource(resource).create(params.data));
                break;
              case 'update':
                response = await retry(() => api.resource(resource).update(params.id, params.data));
                break;
              case 'delete':
                response = await retry(() => api.resource(resource).destroy(params.id));
                break;
              default:
                throw new Error(`Unsupported method: ${method}`);
            }
          }
  
          msg.payload = response.data;
          node.send(msg);
        } catch (error) {
          node.error(error.message, msg);
        }
      });
    }
  
    RED.nodes.registerType("nocobase", NocoBaseNode, {
      credentials: {
        baseURL: { type: "text" }
      }
    });
  };
  