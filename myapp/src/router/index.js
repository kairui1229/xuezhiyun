import { createRouter, createWebHistory } from "vue-router";
import RoutesConfig from "./config";
import { useRouterStore } from "../store/useRouterStore";
import { useUserStore } from "../store/useUserStore";
import NotFound from "../views/notfound/NotFound.vue"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: () => import('../views/Mainbox.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:routes
})
//路由拦截
router.beforeEach((to, from, next) => {
  NProgress.start()
  const { isGetterRouter } = useRouterStore()
  const {user} = useUserStore()
  if(to.name === 'login'){
    next()
  }else{
    if(!user.role){
      next('/login')
    }else{
      //动态配置路由
      if(!isGetterRouter){
        router.removeRoute('mainbox')
        ConfigRouter()
      next({
        path: to.fullPath
      })
      }else{
        next()
      }
    }
  }
})
const ConfigRouter = () => {
  const {changeRouter} = useRouterStore()
  router.addRoute({
    path: '/mainbox',
    name: 'mainbox',
    component: () => import('../views/Mainbox.vue'),
  })
  RoutesConfig.forEach(item => {
   checkPermisson(item) && router.addRoute("mainbox", item)
  })
  //加重定向
  router.addRoute('mainbox',{path:'/',redirect:'/index'})
  //404
  router.addRoute('mainbox',{path:'/:pathMatch(.*)*',name:'not found',component: NotFound})
  changeRouter(true)
}
const checkPermisson = ({path}) => {
  const {user:{role:{rights}}} = useUserStore()
  //console.log(rights);
  return rights.includes(path)
}
router.afterEach((to, from, next) => {
  //结束进度条
  NProgress.done()
})
export default router