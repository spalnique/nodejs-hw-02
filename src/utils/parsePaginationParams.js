const parseNumber = (value, defaultValue) => {
  const isString = typeof value === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(value);
  if (Number.isNaN(parsedNumber) || parsedNumber <= 0) return defaultValue;
  return parsedNumber;
};

// const parseNumber = (value, defaultValue) =>
//   parseInt(value) > 0 ? parseInt(value) : defaultValue;

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return { page: parsedPage, perPage: parsedPerPage };
};
