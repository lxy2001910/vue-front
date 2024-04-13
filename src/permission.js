import { toast } from "@/utils/message.js";
import { addRoutes, router } from "@/router/index.js";
import { start, done } from "@/utils/nprogress.js";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/user.js";

// 全局前置守卫

const registerFlag = ref(false); //默认路由没有注册

router.beforeEach(async (to, from, next) => {
  start();
  const token = Cookies.get("token");

  // 没有登录，强制跳转回登录页
  if (!token && to.path != "/login") {
    toast("警告", "请先登录", "warning");
    return next({ path: "/login" });
  }

  // 防止重复登录
  if (token && to.path == "/login") {
    // toast("请勿重复登录","error")
    toast("警告", "请勿重复登录", "warning");
    return next({ path: from.path ? from.path : "/dashboard" });
  }

  // 如果用户登录了，自动获取用户信息，并存储在vuex当中
  let hasNewRoutes = false;
  if (token && !registerFlag.value) {
    const { user } = useUserStore();
    registerFlag.value = true;
    // 动态添加路由
    hasNewRoutes = addRoutes(user.menus);
  }

  hasNewRoutes ? next(to.fullPath) : next();
});

router.afterEach(() => {
  done();
});
