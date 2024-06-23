const parseContactType = (value) => {
  if (typeof value !== 'string') return;
  if (!['work', 'home', 'personal'].includes(value)) return;

  return value;
};

// const parseBoolean = (value) => {
//   if (typeof value !== 'string') return;
//   if (!['true', 'false'].includes(value)) return;

//   return JSON.parse(value);
// };

const parseBoolean = (value) => {
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === 'boolean') return parsed;
    return;
  } catch (err) {
    return;
  }
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  let filter = {};

  if (contactType) filter.contactType = parseContactType(contactType);
  if (isFavourite) filter.isFavourite = parseBoolean(isFavourite);

  return filter;
};
