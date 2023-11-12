const conflictController = require('../../controllers/conflict');
const db = require('../../models');
const conflictModel = db.conflicts;
const httpMocks = require('node-mocks-http');

conflictModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("conflictController.findAll", () => {
    it("should have a findAll function", () => {
        expect(typeof conflictController.findAll).toBe("function");
    });
    it("should call conflictModel.findAll",  async () => {
      await conflictController.findAll(req, res, next);
        expect(conflictModel.findAll).toHaveBeenCalledWith({});
    });
});

describe("conflictController.findOne", () => {
    it("should have a findOne function", () => {
      expect(typeof conflictController.findOne).toBe("function");
    });
  });

describe("conflictController.create", () => {
        it("should have a create function", () => {
      expect(typeof conflictController.create).toBe("function");
    });
    it("should call conflictController.create", () => {
        conflictController.create(req, res, next);
        expect(conflictModel.create).toBeCalled();
      });
  });

  describe("conflictController.update", () => {
    it("should have a update function", () => {
      expect(typeof conflictController.update).toBe("function");
    });
  });

  describe("conflictController.delete", () => {
    it("should have a delete function", () => {
      expect(typeof conflictController.delete).toBe("function");
    });
  });



