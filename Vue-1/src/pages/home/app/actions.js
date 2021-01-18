import { HTTP } from '../../../../http-common';

export default {

  async getUser() {
    const url = 'user';

    const response = await HTTP.post(url);
    const responseData = response.data;

    if (response.status !== 200) {
      const error = new Error(
        responseData.message || 'Failed to Fetch.',
      );
      throw error;
    }
    return responseData;
  },

};
