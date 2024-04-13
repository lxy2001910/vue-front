// Import necessary modules
import {createWebHistory, createRouter} from "vue-router";

import {routes} from "./routes"; // Importing additional routes from another file

// Create router instance
const router = createRouter({
    history: createWebHistory('/'),
    routes: routes
});

// Define a function to load components dynamically
function loadComponent(view) {

    return () => import(`@/views/${view}/index.vue`);
}
// Define a function to transform menu data to routes
function transformToRoutes(menuData) {

    let newRoutes = []
   for (let i = 0; i < menuData.length; i++) {
        let item = menuData[i]
       //如果父级有子路由 只添加子路由 不要父级路由
        if (item.children && item.children.length > 0) {
            newRoutes = newRoutes.concat(transformToRoutes(item.children))

        }else {
            newRoutes.push({
                path: item.path,
                name: item.menuName,
                title: item.title,
                component: loadComponent(item.component),
                children: item.children && item.children.length > 0 ? transformToRoutes(item.children) : [],
            });
        }
    }
    return newRoutes
}

function addRoutes(menus){

let hasNewRoutes = false
    let ms= transformToRoutes(menus)
    // console.log('ms',ms);

    const findAndAddRoutesByMenus = (arr) =>{
        arr.forEach(e=>{
            // console.log('e',e);

            if(!router.hasRoute(e.path)){
                router.addRoute('layout',e)
                hasNewRoutes=true
            }
           if(e.children.length>0){
            findAndAddRoutesByMenus(e.children)
           }
        })
    }
    findAndAddRoutesByMenus(ms)
    return hasNewRoutes
}



// Export router instance nd addDynamicRoutes function
export {router,addRoutes,transformToRoutes};
