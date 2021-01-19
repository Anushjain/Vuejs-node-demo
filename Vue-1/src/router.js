import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeRouter from './pages/home/home.router';
import NotFound from './pages/NotFound.vue';
import authRoutes from './pages/auth/auth.router';
import store from './store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    ...HomeRouter,
    ...authRoutes,
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/home');
  } else {
    next();
  }
});

export default router;
