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
  console.log('path', path);
  console.log('queryStringParameters :>> ', queryStringParameters);
  console.log('referer', referer);

  const url = new URL(path, TMDB_ORIGIN);
  const parameters = querystring.stringify({
    ...queryStringParameters,
    api_key: process.env.TMDB_API_KEY,
  });

  console.log('url :>> ', url);
  console.log('parameters', parameters);
  url.search = parameters;
  console.log('done url :>> ', url);

  try {
    const response = await fetch(url, { headers: { referer } });
    console.log('response :>> ', response);
    const body = await response.json();
    console.log('body', body);

    if (body.error) {
      console.log('error :>> ', error);
      return {
        statusCode: body.error.code,
        ok: false,
        headers,
        body: stringify(body),
      };
    }

    return {
      statusCode: 200,
      ok: true,
      headers,
      body: stringify(body),
    };
  } catch (error) {
    return {
      statusCode: 400,
      ok: false,
      headers,
      body: stringify(error),
    };
  }
};
