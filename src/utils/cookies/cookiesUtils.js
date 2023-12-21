import Cookies from "js-cookie";

const clearCookies = () => {
    Cookies.remove("user_jwt");
    Cookies.remove("user_name");
};
  

export default {
    clearCookies,
};
