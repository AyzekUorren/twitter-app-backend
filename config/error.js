class BadRequest extends Error {
  constructor(message = `Request is not valid`) {
    super();
    this.name = "BadRequest";
    this.message = message;
  }
}

class MongoError extends Error {
  constructor(message = `Mongo Request failed`) {
    super();
    this.name = "MongoError";
    this.message = message;
  }
}
module.exports = {
  BadRequest,
  MongoError
};
