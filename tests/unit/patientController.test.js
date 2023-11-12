const patientController = require('../../controllers/disease');
const db = require('../../models');
const patientModel = db.patients;
const httpMocks = require('node-mocks-http');

patientModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("patientController.findAll", () => {
    it("should have a findAll function", () => {
        expect(typeof patientController.findAll).toBe("function");
    });
    it("should call patientModel.findAll",  async () => {
      await patientController.findAll(req, res, next);
        expect(patientModel.findAll).toHaveBeenCalledWith({});
    });
});

describe("patientController.findOne", () => {
    it("should have a findOne function", () => {
      expect(typeof patientController.findOne).toBe("function");
    });
  });

describe("patientController.create", () => {
        it("should have a create function", () => {
      expect(typeof patientController.create).toBe("function");
    });
    it("should call patientModel.create", () => {
        patientController.create(req, res, next);
        expect(patientModel.create).toBeCalled();
      });
  });

  describe("patientController.update", () => {
    it("should have a update function", () => {
      expect(typeof patientController.update).toBe("function");
    });
  });

  describe("patientController.delete", () => {
    it("should have a delete function", () => {
      expect(typeof patientController.delete).toBe("function");
    });
  });