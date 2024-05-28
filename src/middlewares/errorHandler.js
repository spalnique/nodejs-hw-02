import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    const responseBody = {
      status: err.status,
      message: err.name,
      data: err,
    };

    if (err.errors) {
      responseBody.errors = err.errors;
    }

    res.status(err.status).json(responseBody);
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
