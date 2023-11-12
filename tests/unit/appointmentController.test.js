const appointmentController = require('../../controllers/appointment');
const db = require('../../models');
const appointmentModel = db.appointments;
const httpMocks = require('node-mocks-http');

appointmentModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("appointmentController.findAll", () => {
    it("should have a findAll function", () => {
        expect(typeof appointmentController.findAll).toBe("function");
    });
    it("should call appointmentModel.findAll",  async () => {
      await appointmentController.findAll(req, res, next);
        expect(appointmentModel.findAll).toHaveBeenCalledWith({});
    });
});

describe("appointmentController.findOne", () => {
    it("should have a findOne function", () => {
      expect(typeof appointmentController.findOne).toBe("function");
    });
  });

describe("appointmentController.create", () => {
        it("should have a create function", () => {
      expect(typeof appointmentController.create).toBe("function");
    });
    it("should call appointmentController.create", () => {
        appointmentController.create(req, res, next);
        expect(appointmentModel.create).toBeCalled();
      });
  });

  describe("appointmentController.update", () => {
    it("should have a update function", () => {
      expect(typeof appointmentController.update).toBe("function");
    });
  });

  describe("appointmentController.delete", () => {
    it("should have a delete function", () => {
      expect(typeof appointmentController.delete).toBe("function");
    });
  });



