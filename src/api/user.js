import service from ".";

const login = (data) => {
  return service.post("/auth/login", data);
};

const test = () => {
  return service.get("/auth/hello");
};

const flushToken = (refresh_token) => {
  return service.post("/auth/refreshToken?refreshToken=" + refresh_token);
};

const getUserInfo = (username) => {
  return service.post("/user/userInfo?username=" + username);
};

export { login, test, getUserInfo, flushToken };
