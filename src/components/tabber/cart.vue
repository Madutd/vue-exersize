<template>
    <div>
        <div class="mui-card" v-for="(item,i) in getCart" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model='getSwich[item.id]' @change="pull"></mt-switch>
                        <img :src='item.thumb_path'>
                        <div class="right">
                            <h1 class="title">{{item.title}}</h1>
                            <span class="newPrice">￥{{item.sell_price}}</span>
                            <numbox :initNumber='$store.getters.getCartNumber[item.id]' :initId='item.id'  ></numbox>
                <a href="#" @click.prevent="del(item.id,i)" >删除</a>
                        </div>
					</div>
				</div>
			</div>
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计(不含运费)</p>
                                <br>
                                <p>已勾选商品<span class="red">{{$store.getters.getSum.count}}</span>件，总价<span  class="red">￥{{ $store.getters.getSum.amount }}</span>
                                </p>
                        </div>
                        <mt-button type="danger"  size="small">结算</mt-button>
					</div>
				</div>
			</div>
            
    </div>
</template>

<script>
import numbox from '../childcomponent/shopnumber.vue'
export default {
    data(){
        return{
            getCart:[],
            getSwich:this.$store.getters.getCartSwich
        }
    },
    created(){
        this.getCartInfo();
         
    },
    methods:{
        getCartInfo(){
            var ids = [];
            this.$store.state.car.forEach(item => ids.push(item.id));
            //本地存储为空 发送请求会报错
            if(ids.length<=0){
                return;
            }
            this.axios.get('api/goods/getshopcarlist/'+ids.join(',')).then(res=>{
                if(res.data.status ===0){
                    this.getCart = res.data.message;
                }
            })
        },
        pull(){
            this.$store.commit('pullSwich',this.getSwich)
        }
        //  del(id,index){
        //      this.getCart.splice(index,1);
        //      this.$store.commit('deleteShopInfo',id);
        //  },
    },
    components:{
        numbox
    }
   
}
</script>
<style lang="scss" scoped>
.mui-card{
    .mui-card-content-inner{
        display: flex;
         
    }
    img{
        width: 60px;
        height: 50px;
    }
    h1{
        font-size: 13px;
        text-align:center;
         padding-bottom: 5px
    }.newPrice{
        color: red;
        font-weight: bold
    }.mui-numbox{
        height: 25px;
    }
.jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}.red{
        color: red;
        font-weight: bold;
        font-size: 16px
    }
}
</style>