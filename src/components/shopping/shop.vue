<template>
    <div class="shopContent">
        <div class="shopinfo" v-for="item in shopList" :key="item.id" @click="getRouter(item.id)">
               <img :src="item.img_url" alt="">
                <h3>{{item.title}}</h3> 
            <div class="shopbotton">
                <div class="price">
                <span class="newPrice">￥{{item.sell_price}}</span>
                <span class="oldPrice">￥{{item.market_price}}</span>
                </div>
                <div class="shoptext">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </div>
            </div>
        </div>
        <mt-button type="danger" size='large' @click='next'>加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            shopList:[],
            pageindex:1
        }
    },
    created(){
        this.getshop()
    },
    methods:{
        getshop(){
            this.axios.get('api/getgoods?pageindex='+this.pageindex)
            .then(res=>{
                if(res.data.status===0){
                    this.shopList = this.shopList.concat(res.data.message);
                }
            })
        },
        next(){
            this.pageindex++;
            if(this.pageindex>=3){
                Toast('无更多商品')
            }
            this.getshop();
        },
        getRouter(id){
            this.$router.push('/home/shop/'+id)
        }
    }
}
</script>
<style lang="scss" scoped>
.shopContent{
    padding:7px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
    .shopinfo{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        display: flex;
        padding: 2px;
        margin: 3px 0;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        .shopbotton{
            width: 100%;
            background-color: #eee;
            color: #999;
            .price{
                padding-left: 6px;
                margin:4px
            }
            .newPrice{
                color: red;
                font-weight: bold;
                font-size: 16px
            }
            .oldPrice{
                font-size: 12px;
                text-decoration: line-through
            }
            .shoptext{
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                margin: 4px
                }
        }
        img{
            width: 100%;
        }
        h3{
        font-size: 14px;
    }
    }
    
}
</style>