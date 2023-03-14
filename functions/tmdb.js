const fetch = require('node-fetch');
const querystring = require('querystring');
const stringify = require('../utils/stringify.js');

const TMDB_ORIGIN = 'https://api.themoviedb.org/3';
const headers = {
  'Access-Control-Allow-Origin': process.env.HOST,
  'Content-Type': 'application/json; charset=utf-8',
};

exports.handler = async (event) => {
  const {
    path,
    queryStringParameters,
    headers: { referer },
  } = event;

  const url = new URL(TMDB_ORIGIN + path.replace('tmdb', ''));
  const parameters = querystring.stringify({
    ...queryStringParameters,
    api_key: process.env.TMDB_API_KEY,
  });

  url.search = parameters;

  try {
    const response = await fetch(url, { headers: { referer } });
    const body = await response.json();

    if (body.error) {
      return {
        statusCode: body.error.code,
        ok: false,
        headers,
        body: JSON.stringify(body),
      };
    }

    return {
      statusCode: 200,
      ok: true,
      headers,
      body: JSON.stringify(body),
    };
  } catch (error) {
    return {
      statusCode: 400,
      ok: false,
      headers,
      body: JSON.stringify({ error: { message: error.message } }),
    };
  }
};
