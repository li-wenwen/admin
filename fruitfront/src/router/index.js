import Vue from 'vue'
import VueRouter from 'vue-router'
import {store} from '../store/index'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'index', component: () => import('../views/content/index'),meta:{title:'社区便利店'}},
  {path: '/list', name: 'list', component: () => import('../views/content/list'),meta:{title:'列表'}},
  {path: '/categorys', name: 'categorys', component: () => import('../views/content/categorys'),meta:{title:'分类'}},
  {path: '/classify', name: 'classify', component: () => import('../views/content/classify'),meta:{title:'分类'}},
  {path: '/car', name: 'car', component: () => import('../views/shop/car'),meta:{title:'购物车',auth:true}},
  {path: '/mine', name: 'mine', component: () => import('../views/info/mine'),meta:{title:'我的',auth:true}},
  {path: '/setting', name: 'setting', component: () => import('../views/info/setting'),meta:{title:'设置'}},
  {path: '/register', name: 'register', component: () => import('../views/info/register'),meta:{title:'注册'}},
  {path: '/login', name: 'login', component: () => import('../views/info/login'),meta:{title:'登录'}},
  {path: '/detail', name: 'detail', component: () => import('../views/content/detail'),meta:{title:'商品详情'}},
  {path: '/orders', name: 'orders', component: () => import('../views/shop/orders'),meta:{title:'确认订单',auth:true}},

  {path: '/demo1', name: 'demo1', component: () => import('../views/demo/demo1'),meta:{title:'demo1'}},
  {path: '/demo2', name: 'demo2', component: () => import('../views/demo/demo2'),meta:{title:'demo2'}},
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
    document.title = to.meta.title || '社区便利店';
    if(to.meta.auth){
        if(store.state.token.trim()){
          next();
        }else{
          next({name:'login',query:{redirect:to.name}})
        }
    }else{
      next();
    }
})



export default router
