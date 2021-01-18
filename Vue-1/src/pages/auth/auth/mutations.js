export default {
  setUser(state, payload) {
    // eslint-disable-next-line no-console
    console.log(payload);
    state.userId = payload.userId;
  },
};
