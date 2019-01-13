class BadRequest extends Error {
    constructor(message = `Request is not valid`) {
        super();
        this.name = 'BadRequest';
        this.message = message;
    }
}
module.exports = {
  BadRequest
};
