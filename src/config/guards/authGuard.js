import Cookies from 'js-cookie';

const authGuard = (to, from, next) => {
  const userToken = Cookies.get('user_jwt');
  if (to.meta.requiresAuth && !userToken) { // User is not logged in.
    console.log('Not logged in. Going to the login page.');
    next('/login');
  } else if (!to.meta.requiresAuth && userToken && to.meta.verifyLogin) { // User is already logged in.
    console.log('Already logged in. Going to the to-do-list.');
    next('/lists');
  } else { // User getting to the desired page
    console.log('User getting to the desired page');
    next();
  }
};

export default authGuard;