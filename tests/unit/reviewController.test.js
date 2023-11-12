const reviewController = require('../../controllers/review');
const db = require('../../models');
const reviewModel = db.reviews;
const httpMocks = require('node-mocks-http');

reviewModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("reviewController.findAll", () => {
    it("should have a findAll function", () => {
        expect(typeof reviewController.findAll).toBe("function");
    });
    it("should call reviewModel.findAll",  async () => {
      await reviewController.findAll(req, res, next);
        expect(reviewModel.findAll).toHaveBeenCalledWith({});
    });
});

describe("reviewController.findOne", () => {
    it("should have a findOne function", () => {
      expect(typeof reviewController.findOne).toBe("function");
    });
  });

describe("reviewController.create", () => {
        it("should have a create function", () => {
      expect(typeof reviewController.create).toBe("function");
    });
    it("should call reviewController.create", () => {
        reviewController.create(req, res, next);
        expect(reviewModel.create).toBeCalled();
      });
  });

  describe("reviewController.update", () => {
    it("should have a update function", () => {
      expect(typeof reviewController.update).toBe("function");
    });
  });

  describe("reviewController.delete", () => {
    it("should have a delete function", () => {
      expect(typeof reviewController.delete).toBe("function");
    });
  });



