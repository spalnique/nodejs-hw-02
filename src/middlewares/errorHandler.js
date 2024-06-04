import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.log('isHttpError(err) = ', isHttpError(err));
  if (isHttpError(err)) {
    console.log('err: ', err);
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err,
  });
};
