const adminController = require('../../controllers/admin');
const db = require('../../models');
const adminModel = db.admins;
const httpMocks = require('node-mocks-http');

adminModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("adminController.findAll", () => {
    it("should have a findAll function", () => {
        expect(typeof adminController.findAll).toBe("function");
    });
    it("should call adminModel.findAll",  async () => {
      await adminController.findAll(req, res, next);
        expect(adminModel.findAll).toHaveBeenCalledWith({});
    });
});

describe("adminController.findOne", () => {
    it("should have a findOne function", () => {
      expect(typeof adminController.findOne).toBe("function");
    });
  });

describe("adminController.create", () => {
        it("should have a create function", () => {
      expect(typeof adminController.create).toBe("function");
    });
    it("should call adminModel.create", () => {
        adminController.create(req, res, next);
        expect(adminModel.create).toBeCalled();
      });
  });

  describe("adminController.update", () => {
    it("should have a update function", () => {
      expect(typeof adminController.update).toBe("function");
    });
  });

  describe("adminController.delete", () => {
    it("should have a delete function", () => {
      expect(typeof adminController.delete).toBe("function");
    });
  });