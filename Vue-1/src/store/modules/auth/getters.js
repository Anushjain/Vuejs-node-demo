export default {
  userId(state) {
    return state.userId;
  },
  isAuthenticated(state) {
    return !!state.userId;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
