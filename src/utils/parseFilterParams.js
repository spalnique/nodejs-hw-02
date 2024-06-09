const parseContactType = (value) => {
  if (typeof value !== 'string') return;
  if (!['work', 'home', 'personal'].includes(value)) return;

  return value;
};

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!['true', 'false'].includes(value)) return;

  return JSON.parse(value);
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  return {
    contactType: parseContactType(type),
    isFavourite: parseBoolean(isFavourite),
  };
};
