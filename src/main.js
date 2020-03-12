import Vue from 'vue'
//配置vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//配置路由
import VueRouter from 'vue-router'
import router from './router.js'
Vue.use(VueRouter)


//按需导入mintui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);


//导入mui
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import app from './app.vue'
//导入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
//导入缩略图
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//自定义时间过滤七
import moment from 'moment'
Vue.filter('capitalize',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})
var  car = JSON.parse(localStorage.getItem('car')||'[]')
const store = new Vuex.Store({
    state:{//点击加入购物车将商品信息添加到公共数据存储，方便使用
        car:car
    },//{id}
    mutations:{//商品信息传入 判断：1. 之前是否添加过 
        addShopInfo(state,getShopInfo){
            var  flag = false
            state.car.some(item=>{
                if(item.id==getShopInfo.id){
                    item.count += parseInt(getShopInfo.count);
                    flag = true
                    return true
                }
            })
            if(!flag){
                    state.car.push(getShopInfo)
                }
                localStorage.setItem('car',JSON.stringify(state.car))
        },
        changeShopNumber(state,getShopNumber){
            state.car.some(item=>{
                if(item.id == getShopNumber.id){
                    item.count = parseInt(getShopNumber.count)
                    return true
                }
                
            });
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        deleteShopInfo(state,getShopId){
            state.car.some(item=>{
                state.car.some((item,i)=>{
                    if(item.id == getShopId){
                        state.car.splice(i,1)
                        return true
                    }
                });
            })
        },
        pullSwich(state,getSwich){
            state.car.forEach(item=>{
                 item.swich = getSwich[item.id];  
                }
            )
            localStorage.setItem('car',JSON.stringify(state.car))
        }
        
    },
    getters:{
        getNumber(state){
            var c= 0;
            state.car.forEach(item=>{
                c += parseInt(item.count)
            })
            return c
        },
        getCartNumber(state){
            var o = {};
            state.car.forEach(item=>{
                o[item.id] = item.count
            })
            return o
        },
        getCartSwich(state){
            var p ={};
            state.car.forEach(item=>{
                p[item.id] = item.swich
            })
            
            return p
        },
        getSum(state){
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
              }
              state.car.forEach(item => {
                if (item.swich) {
                  o.count += item.count
                  o.amount += item.price * item.count
                }
              })
              return o
            
        }
    }
})

const vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store
})