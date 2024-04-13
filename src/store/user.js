import {defineStore} from 'pinia';
import {router, transformToRoutes} from "@/router/index.js";
// import {asyncRoutes} from "@/router/routes.js";

export const useUserStore = defineStore('user', {


    state: () => ({
        // your state properties here
        user: {}
    }),


    getters: {
        getUser: (state) => {
            return state.user
        }
    },

    actions: {
        // your actions here
        setUser(user) {
            this.user = user
        },
        removeUser() {


            this.user = {}
        }
        // updateRoute() {
        //     let userData = JSON.parse(localStorage.getItem('user')).user
        //
        //     // console.log('piniaUser', piniaUser);
        //     // console.log('userData', userData);
        //     //userData和piniaUser一样哪个存在用哪个
        //
        //     const userRolesNames = userData.roles ? userData.roles.map(role => role.roleName) : [];
        //
        //     // 筛选 asyncRoutes，只保留当前用户有权限访问的路由
        //     const accessibleRoutes = asyncRoutes.filter(route => {
        //         if (!route.meta || !route.meta.roles) {
        //             // 如果路由没有定义 meta.roles，则认为这个路由不限制角色，所有用户都可以访问
        //             return true;
        //         }
        //         // 检查路由定义的角色是否和用户角色名称有交集
        //         return route.meta.roles.some(role => userRolesNames.includes(role));
        //     });
        //
        //     asyncRoutes.forEach(route => {
        //         router.addRoute('layout', route)
        //     })
        //
        //     // const userRoles
        //
        //
        // }
    },
    persist: {
        paths: ['user'],

        serializer: {

            deserialize: (value) => {
                return JSON.parse(value)
            },
            serialize: (value) => {
                return JSON.stringify(value)
            },

        },
        debug: true,
    }

});
