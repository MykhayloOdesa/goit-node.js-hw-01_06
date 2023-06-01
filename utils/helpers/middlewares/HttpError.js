const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  422: "Unprocessable Entity",
};

class HttpError extends Error {
  constructor(status, message = messages[status]) {
    super(message);
    this.status = status;
  }
}

module.exports = { HttpError };

// if (!body) {
//   throw new HttpError(422, "missing field favorite");
// }

// if (!body) {
//   throw new HttpError(422, "missing fields");
// }
