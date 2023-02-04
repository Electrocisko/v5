import SuperTest from "supertest";
import Chai from "chai";
import { faker } from '@faker-js/faker';
import dotenvConfig from "../src/config/dotenv.config.js";

const PORT = dotenvConfig.app.PORT;
const HOST = dotenvConfig.app.HOST;


const expect = Chai.expect;
const requester = SuperTest(`http://${HOST}:${PORT}`);

let randomPrice =parseInt(Math.random() * 100000000);
let fakerMail = faker.internet.email()

describe("Products Testing", () => {
  describe("GETS", () => {
    it("the base request should return 200", async () => {
      let response = await requester.get("/api/products");
      expect(response.status).to.be.equals(200);
    });
    it("should return an array of products", async () => {
      let response = await requester.get("/api/products");
      const { _body } = response;
      expect(_body).to.be.an("array");
    });
  });
  describe("PUTS", () => {
    it("modify product price by Id", async () => {
      let product = {
        price: randomPrice,
        stock: "4",
      };
      const response = await requester
        .put("/api/products/639664747cbb6e804bf950ea")
        .send(product);
      const { _body } = response;
      expect(_body.status.modifiedCount).to.be.equal(1);
    });
  });
});



describe("User Testing", () => {
  describe("GETS", () => {
    it("Return 200", async () => {
      let response = await requester.get("/api/users");
      const { _body } = response;
      expect(response.status).to.be.equals(200);
    });
  });
});



describe("Session Testing register and login", () => {
  describe("POST", () => {
    it("login test with an existing user", async () => {
      let user = {
        email: "chicacoder@correo.com",
        password: "123",
      };
      let response = await requester.post("/api/sessions/login").send(user);
      expect(response.status).to.be.equals(200);
    });
  });
  describe("POST", () => {
    it("login test with an non existing user", async () => {
      let user = {
        email: "noexisto@correo.com",
        password: "123",
      };
      let response = await requester.post("/api/sessions/login").send(user);
      expect(response.status).to.be.not.equal(200);
    });
  });
  describe("POST", () => {
    it("register a new user and check if create a cart", async () => {
      let user =   {
        "name": "Tester",
        "email": fakerMail,
        "password": "123",
        "passwordCheck":"123",
        "address": "Av San Martin 1200 CABA",
        "age": 22,
        "phoneNumber": "2345-3455",
        "imageUrl": "1668343114260-chica (1).png",
      };
      let response = await requester.post("/api/sessions/register").send(user);
      const result = response.body
      expect(result.payload).to.include.keys('cart')
    });
  });
});
