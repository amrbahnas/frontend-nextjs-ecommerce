import Cookies from "js-cookie";

const logOut = () => {
  Cookies.remove("token");
  Cookies.remove("isLogin");
  window.location.href = "/";
};

export default logOut;
