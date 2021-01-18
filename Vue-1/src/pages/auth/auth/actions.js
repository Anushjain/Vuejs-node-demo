import { HTTP } from '../../../../http-common';

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const { mode } = payload;
    let url = 'auth/login';

    if (mode === 'signup') {
      url = 'auth/signup';
    }
    const response = await HTTP.post(
      url,
      payload,
    );

    const responseData = response.data;
    // eslint-disable-next-line no-console
    console.log(response);
    if (response.status !== 200) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.',
      );
      throw error;
    }

    if (mode === 'login') {
      localStorage.setItem('userId', responseData.email);
      context.commit('setUser', {
        userId: responseData.email,
      });
    } else {
      localStorage.setItem('userId', responseData.email);
    }
  },
  tryLogin(context) {
    const userId = localStorage.getItem('userId');

    if (userId) {
      context.commit('setUser', {

        userId,
      });
    }
  },
  async logout(context) {
    const url = 'auth/logout';
    const response = await HTTP.get(url);
    const responseData = response.data;
    if (response.status !== 200) {
      const error = new Error(
        responseData.message || 'Failed to Logout.',
      );
      throw error;
    }
    localStorage.removeItem('userId');

    context.commit('setUser', {
      userId: null,
    });
  },

  async verifyOtp(context, payload) {
    const url = 'auth/verifyOtp';
    const response = await HTTP.post(url, {
      email: localStorage.getItem('userId'),
      otp: payload.otp,
    });

    const responseData = response.data;

    if (response.status !== 200) {
      const error = new Error(
        responseData.message || 'Failed to authenticate',
      );
      throw error;
    }
    localStorage.setItem('userId', responseData.email);
    context.commit('setUser', {
      token: responseData.accessToken,
      userId: responseData.email,
    });
  },

};
