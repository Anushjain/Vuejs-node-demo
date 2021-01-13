export default {

  async getUser() {
    const url = 'http://localhost:8080/api/user';

    const response = await fetch(url, {
      method: 'GET',
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to Fetch.',
      );
      throw error;
    }
    return responseData;
  },

};
