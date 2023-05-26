const globalErrorHandler = (error, request, response, next) => {
  if (error.status === 400 && request.status === "PUT") {
    response.status(400).json({
      message: "missing fields",
    });
  }

  if (error.status === 400) {
    response.status(400).json({
      message: "missing required name field",
    });
  }

  if (error.status === 404) {
    response.status(404).json({
      message: "Not found",
    });
  }

  if (error.status === 500) {
    response.status(500).json({
      message: error.message || "Something went wrong please try again later",
    });
  }
};

module.exports = { globalErrorHandler };
