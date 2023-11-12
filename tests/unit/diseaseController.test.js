const diseaseController = require('../../controllers/disease');
const db = require('../../models');
const diseaseModel = db.diseases;
const httpMocks = require('node-mocks-http');

diseaseModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("diseaseController.findAll", () => {
    it("should have a findAll function", () => {
        expect(typeof diseaseController.findAll).toBe("function");
    });
    it("should call diseaseModel.findAll",  async () => {
      await diseaseController.findAll(req, res, next);
        expect(diseaseModel.findAll).toHaveBeenCalledWith({});
    });
});

describe("diseaseController.findOne", () => {
    it("should have a findOne function", () => {
      expect(typeof diseaseController.findOne).toBe("function");
    });
  });

describe("diseaseController.create", () => {
        it("should have a create function", () => {
      expect(typeof diseaseController.create).toBe("function");
    });
    it("should call diseaseController.create", () => {
        diseaseController.create(req, res, next);
        expect(diseaseModel.create).toBeCalled();
      });
  });

  describe("diseaseController.update", () => {
    it("should have a update function", () => {
      expect(typeof diseaseController.update).toBe("function");
    });
  });

  describe("diseaseController.delete", () => {
    it("should have a delete function", () => {
      expect(typeof diseaseController.delete).toBe("function");
    });
  });



