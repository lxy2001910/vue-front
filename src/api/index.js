import axios from "axios";

import { start, done } from "nprogress";
import { toast } from "@/utils/message";

import Cookies from "js-cookie";

const dev_url = "/api";

const prod_url = "http://localhost:8500";

const service = axios.create({
  baseURL: dev_url,
  timeout: 5000,
});

service.interceptors.request.use(
  start(),
  (config) => {
    const token = Cookies.get("token");

    // config.headers("Access-Control-Allow-Origin","*")
    if (token) {
      config.headers.Cookie = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    // console.log(response.data);
    done();
    if (response.data.code == 200) {
      return response.data;
    }
    done();

    // toast(response.data.msg, "error");
    toast("error", response.data.msg, "error");
    return Promise.reject(response.data);
  },

  (error) => {
    console.log(error);
    done();

    toast("error", error, "error");
    return Promise.reject(error);
  },
);

export default service;
