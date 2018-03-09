const getOrigin = (input) => {
  const reg = /^http:\/\/[^/:]+(?::\d+)?/;

  const matches = input.match(reg);

  if (!matches) {
    return '';
  }

  return matches[0];
};

export default getOrigin;
