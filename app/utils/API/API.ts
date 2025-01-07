export default class API {
  constructor(baseUrl) {
    return this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    return this._fetch(endpoint, "GET")
  }
   async post(endpoint, data) {
     return this._fetch(endpoint, "POST", data)
   }

  async _fetch(endpoint, method, data) {
    const url = `${this.baseUrl}${endpoint}`;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error(`API call failed: ${error.message}`);
      throw error; // Re-throw the error so the calling code can handle it
    }
  }
}
