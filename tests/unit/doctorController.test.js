const doctorController = require('../../controllers/doctor');
const db = require('../../models');
const doctorModel = db.doctors;
const httpMocks = require('node-mocks-http');

doctorModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("doctorController.findAll", () => {
    it("should have a findAll function", () => {
        expect(typeof doctorController.findAll).toBe("function");
    });
    it("should call doctorModel.findAll",  async () => {
      await doctorController.findAll(req, res, next);
        expect(doctorModel.findAll).toHaveBeenCalledWith({});
    });
});

describe("doctorController.findOne", () => {
    it("should have a findOne function", () => {
      expect(typeof doctorController.findOne).toBe("function");
    });
  });

describe("doctorController.create", () => {
        it("should have a create function", () => {
      expect(typeof doctorController.create).toBe("function");
    });
    it("should call doctorModel.create", () => {
        doctorController.create(req, res, next);
        expect(doctorModel.create).toBeCalled();
      });
  });

  describe("doctorController.update", () => {
    it("should have a update function", () => {
      expect(typeof doctorController.update).toBe("function");
    });
  });

  describe("adminController.delete", () => {
    it("should have a delete function", () => {
      expect(typeof adminController.delete).toBe("function");
    });
  });