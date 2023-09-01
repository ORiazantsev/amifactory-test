//import * as Vue from "vue";
import axios from "axios";
import router from "./router";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (404 === error.response.status) {
      router.push("/404");
    } else if (500 <= error.response.status) {
      // Vue.swal({
      //   title: "Sorry, something went wrong!",
      //   confirmButtonText: "Ok",
      // }).then(() => {});
    } else {
      return Promise.reject(error);
    }
  }
);

export default axios;
