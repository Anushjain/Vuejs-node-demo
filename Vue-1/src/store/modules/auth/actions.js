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
    let url = 'http://localhost:8080/api/auth/login';

    if (mode === 'signup') {
      url = 'http://localhost:8080/api/auth/signup';
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,

      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.',
      );
      throw error;
    }

    if (mode === 'login') {
      localStorage.setItem('userId', responseData.email);
      context.commit('setUser', {
        token: responseData.accessToken,
        userId: responseData.email,
      });
    } else {
      localStorage.setItem('userId', payload.email);
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
    const url = 'http://localhost:8080/api/auth/logout';
    const response = await fetch(url, {
      method: 'GET',
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.',
      );
      throw error;
    }
    localStorage.removeItem('userId');

    context.commit('setUser', {
      userId: null,
    });
  },

  async verifyOtp(context, payload) {
    const url = 'http://localhost:8080/api/auth/verifyOtp';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: localStorage.getItem('userId'),
        otp: payload.otp,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.',
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
