const specialtyController = require('../../controllers/specialty');
const db = require('../../models');
const specialtyModel = db.specialties;
const httpMocks = require('node-mocks-http');

specialtyModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("specialtyController.findAll", () => {
    it("should have a findAll function", () => {
        expect(typeof specialtyController.findAll).toBe("function");
    });
    it("should call specialtyModel.findAll",  async () => {
      await specialtyController.findAll(req, res, next);
        expect(specialtyModel.findAll).toHaveBeenCalledWith({});
    });
});

describe("specialtyController.findOne", () => {
    it("should have a findOne function", () => {
      expect(typeof specialtyController.findOne).toBe("function");
    });
  });

describe("specialtyController.create", () => {
        it("should have a create function", () => {
      expect(typeof specialtyController.create).toBe("function");
    });
    it("should call specialtyController.create", () => {
        specialtyController.create(req, res, next);
        expect(specialtyModel.create).toBeCalled();
      });
  });

  describe("specialtyController.update", () => {
    it("should have a update function", () => {
      expect(typeof specialtyController.update).toBe("function");
    });
  });

  describe("specialtyController.delete", () => {
    it("should have a delete function", () => {
      expect(typeof specialtyController.delete).toBe("function");
    });
  });



