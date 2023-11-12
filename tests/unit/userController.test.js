const userController = require('../../controllers/user');
const db = require('../../models');
const userModel = db.users;
const httpMocks = require('node-mocks-http');
const newUser = require("../mock-data/new-user.json");
const allUsers = require("../mock-data/all-users.json");

jest.mock('../../models/user');

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn() || null;
  });

describe("userController.findAll", () => {
    it("should have a findAll function", () => {
        expect(typeof userController.findAll).toBe("function");
    });
    it("should call userModel.findAll",  async () => {
      await userController.findAll(req, res, next);
        expect(userModel.findAll).toHaveBeenCalledWith({});
    });
    it("should return response with status 200 and all users", async () => {
        userModel.findAll.mockReturnValue(allUsers);
        await userController.findAll(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allUsers);
      });
});

describe("userController.findOne", () => {
    it("should have a findOne function", () => {
      expect(typeof userController.findOne).toBe("function");
    });
    it("should call userModel.findByPk with route parameters", async () => {
      req.params.id = id;
      await userController.findOne(req, res, next);
      expect(userModel.findByPk).toBeCalledWith(id);
    });
    it("should return json body and response code 200", async () => {
        userModel.findByPk.mockReturnValue(newUser);
        await userController.findOne(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newUser);
        expect(res._isEndCalled()).toBeTruthy();
      });
  });

  describe("userController.create", () => {
    beforeEach(() => {
      req.body = newUser;
    });
    it("should have a create function", () => {
      expect(typeof userController.create).toBe("function");
    });
    it("should call userModel.create", () => {
      userController.create(req, res, next);
      expect(userModel.create).toBeCalledWith(newUser);
    });
    it("should return json body in response", async () => {
      userModel.create.mockReturnValue(newUser);
      await userController.create(req, res, next);
      expect(res._getJSONData()).toStrictEqual(newUser);
    });
  });

  describe("userController.update", () => {
    it("should have a update function", () => {
      expect(typeof userController.update).toBe("function");
    });
    it("should update with userModel.update", async () => {
      req.params.id = id;
      req.body = newUser;
      await userController.update(req, res, next);
      expect(userModel.update).toHaveBeenCalledWith(id, newUser, {
        new: true,
        useFindAndModify: false
      });
    });
    it("should return a response with json data and http code 200", async () => {
      req.params.id = id;
      req.body = newUser;;
      userModel.update.mockReturnValue(newUser);
      await userController.update(req, res, next);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(newUser);
    });
  });

  describe("userController.delete", () => {
    it("should have a delete function", () => {
      expect(typeof userController.delete).toBe("function");
    });
    it("should call destroy", async () => {
      req.params.id = id;
      await userController.delete(req, res, next);
      expect(userModel.destroy).toBeCalledWith(id);
    });
    it("should return 200 OK and deleted usermodel", async () => {
      userModel.destroy.mockReturnValue(newUser);
      await userController.delete(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(newUser);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });