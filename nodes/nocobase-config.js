const { APIClient } = require("@nocobase/sdk");

const retry = async (fn, retries = 10) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, 100));
    }
  }
};

module.exports = function (RED) {
  function NocoBaseConfigNode(config) {
    RED.nodes.createNode(this, config);
    this.baseURL = config.baseURL;
    this.username = config.username;
    this.password = config.password;


    const initializeAPIClient = async () => {
      const api = new APIClient({
        baseURL: this.baseURL,
      });

      if (this.username) {
        try {
          this.status({
            fill: "yellow",
            shape: "dot",
            text: "fetching authenticators",
          });
          await retry(() => api.resource("authenticators").publicList(), 100);
          this.status({ fill: "yellow", shape: "dot", text: "logging in" });
          await api.auth.signIn(
            { account: this.username, password: this.password },
            "basic"
          );
          this.status({ fill: "green", shape: "dot", text: "logged in" });
          return api;
        } catch (e) {
          this.error(e.message);
          this.status({ fill: "red", shape: "dot", text: String(e) });
        }
      }
    };

    this.api = initializeAPIClient();

    this.getApiClient = () => this.api;
  }

  RED.nodes.registerType("nocobase-config", NocoBaseConfigNode, {
    credentials: {
      baseURL: { type: "text" },
      username: { type: "text" },
      password: { type: "password" },
    },
  });
};
