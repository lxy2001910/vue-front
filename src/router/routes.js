const routes = [
    {
        path: '/',
        name: "layout",
        title: "首页",
        redirect: "/dashboard",
        component: () => import('@/layout/index.vue'),
        children: []

    }, {
        path: '/login',
        name: "login",
        title: "登录",
        component: () => import('@/views/login.vue'),


    },
    {
        path: '/:pathMatch(.*)*',
        name: "404",
        title: "404",
        component: () => import('@/views/404.vue'),

    },

]




export  {routes}