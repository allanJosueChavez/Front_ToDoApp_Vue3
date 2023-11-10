import Cookies from 'js-cookie';

const authGuard = (to, from, next) => {
  const userToken = Cookies.get('user_jwt');
  if (to.meta.requiresAuth && !userToken) {
    console.log('Not logged in. Going to the login page.');
    next('/login');
  } else if (!to.meta.requiresAuth && userToken) {
    console.log('Already logged in. Going to the to-do-list.');
    next('/to-do-list');
  } else {
    console.log('Coming in');
    next();
  }
};

export default authGuard;