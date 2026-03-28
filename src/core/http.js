const axios = require('axios');
const { BASE_URL } = require('./constants');
const { veriTemizle } = require('./normalize');

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'tdk-sozluk-npm/1.0.0',
  },
});

async function get(path, params = {}) {
  try {
    const response = await client.get(path, { params });
    return veriTemizle(response.data);
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        throw new Error('Sonuç bulunamadı.');
      }

      throw new Error(`TDK API hatası: ${status} - ${error.response.statusText}`);
    }

    if (error.request) {
      throw new Error('TDK API\'ye bağlanılamadı. İnternet bağlantınızı kontrol edin.');
    }

    throw new Error(`Beklenmeyen hata: ${error.message}`);
  }
}

module.exports = {
  client,
  get,
};
