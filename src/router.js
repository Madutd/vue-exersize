
import VueRouter from 'vue-router'

import home from './components/tabber/home.vue'
import member from  './components/tabber/member.vue'
import cart from  './components/tabber/cart.vue'
import search from  './components/tabber/search.vue'
import NewList from './components/new/NewList.vue'
import NewValue from './components/new/NewValue.vue'
import photoList from './components/photos/photo.vue' 
import photoInfo from './components/photos/photoinfo.vue'
import shop from './components/shopping/shop.vue'
import shoppingInfo from './components/shopping/shoppinginfo.vue'
import shopPhoto from './components/shopping/shopPhoto.vue'
import shopComment from './components/shopping/shopComment.vue'


const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/cart',component:cart},
        {path:'/search',component:search},
        {path:'/home/NewList',component:NewList},
        {path:'/home/NewList/:id',component:NewValue},
        {path:'/home/photoList',component:photoList},
        {path:'/home/photoInfo/:id',component:photoInfo},
        {path:'/home/shop',component:shop},
        {path:'/home/shop/:id',component:shoppingInfo},
        {path:'/home/shop/info/:id',component:shopPhoto},
        {path:'/home/shop/comment/:id',component:shopComment,name:'shopCmt'}
    ],
    linkActiveClass:'mui-active'
})


export default router

