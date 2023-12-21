import cookieUtils from "../cookies/cookiesUtils.js";
import { useRouter } from "vue-router";

const { clearCookies } = cookieUtils;

const logout =  () => {
    const router = useRouter();
    clearCookies();
    router.push("/login");
};

export default {
    logout,
};
