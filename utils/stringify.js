const keyReplacer = (_, value) => {
  if (typeof value !== 'string') {
    return value;
  }

  return value.replace(process.env.TMDB_API_KEY, '');
};

const stringify = (subject) => JSON.stringify(subject, keyReplacer, ' ');

module.exports = stringify;
