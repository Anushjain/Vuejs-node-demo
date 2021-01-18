import UserAuth from './UserAuth.vue';
import OtpVerification from './OtpVerification.vue';

export default [
  {
    path: '/auth',
    name: 'Auth',
    component: UserAuth,
    meta: { requiresUnauth: true },
  },
  {
    path: '/verifyOtp',
    name: 'Verify OTP',
    component: OtpVerification,
    meta: { requiresUnauth: true },
  },
];
