const helper = require("node-red-node-test-helper");
const nocoBaseNode = require("../nodes/nocobase");
const { APIClient } = require("@nocobase/sdk");
const sinon = require("sinon");
const assert = require("node:assert");
const { awaitInput } = require("./test-helper");

const { afterEach, before, beforeEach, describe, it } = require("node:test");

helper.init(require.resolve("node-red"));

// todo re-evaluate all tests.
// for integration tests use https://docs.nocobase.com/development/server/test

describe.skip("NocoBase Node", function () {

  beforeEach(async () => {
    await new Promise((done) => helper.startServer(done));
  });

  afterEach(async () => {
    // order matters
    sinon.restore();
    await helper.unload();
    await new Promise((done) => helper.stopServer(done));
    await helper.unload();
  });

  it("should load the node", async () => {
    const flow = [{ id: "n1", type: "nocobase", name: "test name" }];
    await helper.load(nocoBaseNode, flow);
    const n1 = helper.getNode("n1");
    assert.strictEqual(n1.name, "test name");
  });

  it("should handle list method", async () => {
    const flow = [
      {
        id: "n1",
        type: "nocobase",
        name: "nocobase",
        method: "list",
        resource: "test",
        wires: [["n2"]],
        baseURL: "http://localhost:13000/api",
      },
      { id: "n2", type: "helper" },
    ];

    await helper.load(nocoBaseNode, flow);
    const n1 = helper.getNode("n1");
    const n2 = helper.getNode("n2");

    sinon.stub(APIClient.prototype, "resource").returns({
      list: async () => ({ data: { results: [1, 2, 3] } }),
    });
    
    n1.receive({ payload: {} });

    await awaitInput(n2, (msg) => {
      assert.deepStrictEqual(msg.payload, { results: [1, 2, 3] });
    });
  });

  it("should handle get method", async () => {
    const flow = [
      {
        id: "n1",
        type: "nocobase",
        name: "nocobase",
        method: "get",
        resource: "test",
        wires: [["n2"]],
        baseURL: "http://localhost:13000/api",
      },
      { id: "n2", type: "helper" },
    ];

    await helper.load(nocoBaseNode, flow);
    const n1 = helper.getNode("n1");
    const n2 = helper.getNode("n2");

    sinon.stub(APIClient.prototype, "resource").returns({
      get: async () => ({ data: { id: 1, name: "test" } }),
    });

    n1.receive({ payload: { id: 1 } });
    
    await awaitInput(n2, (msg) => {
      assert.deepStrictEqual(msg.payload, { id: 1, name: "test" });
    });
  });

  it("should handle create method", async () => {
    const flow = [
      {
        id: "n1",
        type: "nocobase",
        name: "nocobase",
        method: "create",
        resource: "test",
        wires: [["n2"]],
        baseURL: "http://localhost:13000/api",
      },
      { id: "n2", type: "helper" },
    ];

    await helper.load(nocoBaseNode, flow);
    const n1 = helper.getNode("n1");
    const n2 = helper.getNode("n2");

    sinon.stub(APIClient.prototype, "resource").returns({
      create: async () => ({ data: { id: 1, name: "new item" } }),
    });

    n1.receive({ payload: { data: { name: "new item" } } });
    
    await awaitInput(n2, (msg) => {
      assert.deepStrictEqual(msg.payload, { id: 1, name: "new item" });
    });
  });

  it("should handle update method", async () => {
    const flow = [
      {
        id: "n1",
        type: "nocobase",
        name: "nocobase",
        method: "update",
        resource: "test",
        wires: [["n2"]],
        baseURL: "http://localhost:13000/api",
      },
      { id: "n2", type: "helper" },
    ];

    await helper.load(nocoBaseNode, flow);
    const n1 = helper.getNode("n1");
    const n2 = helper.getNode("n2");

    sinon.stub(APIClient.prototype, "resource").returns({
      update: async () => ({ data: { id: 1, name: "updated item" } }),
    });

    n1.receive({ payload: { id: 1, data: { name: "updated item" } } });
    
    await awaitInput(n2, (msg) => {
      assert.deepStrictEqual(msg.payload, { id: 1, name: "updated item" });
    });
  });

  it("should handle delete method", async () => {
    const flow = [
      {
        id: "n1",
        type: "nocobase",
        name: "nocobase",
        method: "delete",
        resource: "test",
        wires: [["n2"]],
        baseURL: "http://localhost:13000/api",
      },
      { id: "n2", type: "helper" },
    ];

    await helper.load(nocoBaseNode, flow);
    const n1 = helper.getNode("n1");
    const n2 = helper.getNode("n2");

    sinon.stub(APIClient.prototype, "resource").returns({
      destroy: async () => ({ data: { success: true } }),
    });
    
    n1.receive({ payload: { id: 1 } });
    
    await awaitInput(n2, (msg) => {
      assert.deepStrictEqual(msg.payload, { success: true });
    });
  });

  it("should handle custom action", async () => {
    const flow = [
      {
        id: "n1",
        type: "nocobase",
        name: "nocobase",
        action: "customAction",
        resource: "test",
        wires: [["n2"]],
        baseURL: "http://localhost:13000/api",
      },
      { id: "n2", type: "helper" },
    ];

    await helper.load(nocoBaseNode, flow);
    const n1 = helper.getNode("n1");
    const n2 = helper.getNode("n2");

    sinon.stub(APIClient.prototype, "resource").returns({
      customAction: async () => ({ data: { custom: "action" } }),
    });

    n1.receive({ payload: {} });

    await awaitInput(n2, (msg) => {
      assert.deepStrictEqual(msg.payload, { custom: "action" });
    });
  });

  it.skip("should handle plugin request", async () => {
    const flow = [
      {
        id: "n1",
        type: "nocobase",
        name: "nocobase",
        plugin: "customPlugin",
        wires: [["n2"]],
        baseURL: "http://localhost:13000/api",
      },
      { id: "n2", type: "helper" },
    ];

    await helper.load(nocoBaseNode, flow);
    const n1 = helper.getNode("n1");
    const n2 = helper.getNode("n2");

    sinon.stub(APIClient.prototype, "plugin").returns({
      request: async () => ({ data: { plugin: "response" } }),
    });


    n1.receive({ payload: {} });
    
    await awaitInput(n2, (msg) => {
      assert.deepStrictEqual(msg.payload, { plugin: "response" });
    });
  });
});
