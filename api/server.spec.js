const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");
afterEach(async () => {
  await db("hobbits").truncate();
});

describe("server.js", () => {
  describe("GET/endpoint", () => {
    it("should respond with status code 200 ok", async () => {
      let res = await request(server).get("/");

      expect(res.status).toBe(200);
    });
    it("should respond with JSON", async () => {
      let res = await request(server).get("/");
      expect(res.type).toMatch(/json/i);
    });
  });
  describe("GET/hobbits endpoint", () => {
    it("should respond with status code 200 ok", async () => {
      let res = await request(server).get("/hobbits");
      expect(res.status).toBe(200);
    });
    it("should respond with JSON", async () => {
      let res = await request(server).get("/hobbits");
      expect(res.type).toMatch(/json/i);
    });
    it("should respond with an array", async () => {
      let expected = [
        { id: 1, name: "random name1" },
        { id: 2, name: "random name2" }
      ];
      let res = await request(server)
        .post("/hobbits")
        .send({ name: "random name1" });
      res = await request(server)
        .post("/hobbits")
        .send({ name: "random name2" });
      res = await request(server).get("/hobbits");
      expect(res.body).toEqual(expected);
    });
  });
  describe("POST/hobbits endpoint", () => {
    it("should respond with status code 201 created", async () => {
      let body = { name: "random dwarf" };
      let res = await request(server)
        .post("/hobbits")
        .send(body);
      expect(res.status).toBe(201);
    });
    it("should return the id of the item created", async () => {
      let body = { name: "random dwarf" };
      let res = await request(server)
        .post("/hobbits")
        .send(body);
      // k
      expect(res.body).toEqual([1]);
    });
  });
  describe("DELETE/hobbits/:id endpoint", () => {
    it("should return the number of item deleted", async () => {
      let res = await request(server)
        .post("/hobbits")
        .send({ name: "random name" });
      res = await request(server).delete("/hobbits/1");
      expect(res.body).toBe(1);
    });
  });
});
