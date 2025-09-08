const axios = require('axios');

async function fetch(url) {
    const response = await axios.get(url);
    return response.data;
}

module.exports = { fetch };