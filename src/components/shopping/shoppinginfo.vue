<template>
  <div class="shoppingInfo">
    <!-- 小球动画 -->
    <transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    >
      <div class="ball" v-show="ballBullen" ref="ball"></div>
    </transition>
    <!-- 轮播图部分 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :PictureList="ShopPhoto" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 价格购买 -->
    <div class="mui-card">
      <div class="mui-card-header">{{shopSome.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
			<p>
            <span class="oldprice">市场价:￥{{shopSome.market_price}}</span> &nbsp;&nbsp;
            <span class="newprice">销售价:￥{{shopSome.sell_price}}</span>
			</p>
			<p>购买数量: &nbsp;&nbsp;<numbox @getNumbox='getNumboxCount' :max='shopSome.stock_quantity'></numbox></p>
          <mt-button type="primary">立即购物</mt-button>
          <mt-button type="danger" @click="ballShow">加入购物车</mt-button>
		  </div>
        </div>
      </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">	
            <p>商品货号:{{shopSome.goods_no}}</p>

			<p>库存情况:{{shopSome.stock_quantity}}件</p>

			<p>上架时间:{{shopSome.add_time | capitalize}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
		  <mt-button class="btn" type="primary" size="large" plain @click="getIntroduce(id)">图文介绍</mt-button>

          <mt-button class="btn" type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
		  </div>
    </div>

  </div>
</template>
<script>
import swiper from "../childcomponent/lunbotu.vue";
import numbox from '../childcomponent/numbox.vue';
export default {
  data() {
    return {
      id: this.$route.params.id,
      ShopPhoto: [],
      shopSome: {},
      ballBullen:false,
      selectedCount:1,
      newprice:''
    };
  },
  created() {
    this.getShopPhoto();
    this.getShopSome();
  },
  
  methods: {
    getShopPhoto() {
      this.axios.get("api/getthumimages/" + this.id).then(res => {
        if (res.data.status === 0) {
          this.ShopPhoto = res.data.message;
        }
      });
    },
    getShopSome() {
      this.axios.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.data.status === 0) {
          this.shopSome = res.data.message[0];
          this.newprice =  this.shopSome.sell_price
        }
      });
    },
    getIntroduce(id){
      this.$router.push('/home/shop/info/'+this.id)
    },
    getComment(id){
      this.$router.push({name:'shopCmt',params:{id}})
    },
    ballShow(){
      this.ballBullen = !this.ballBullen //{id:this.id,price:this.shopSome.sell_price,count:this.selectedCount,swich:true}
      const goodInfo = {
        id:this.id,
        price:this.newprice,
        count:parseInt(this.selectedCount),
        swich:true
      }
    this.$store.commit("addShopInfo",goodInfo);
    },
    //小球动画
     beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el,done){

      //
      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()
      el.offsetWidth;
      const ballTransition = this.$refs.ball.getBoundingClientRect();
      const ballArrive = document.getElementById('ballArrive').getBoundingClientRect();
      const xDist = ballArrive.left - ballTransition.left;
      const yDist = ballArrive.top - ballTransition.top;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballBullen = !this.ballBullen;
    },
    getNumboxCount(count){
      this.selectedCount = count
    }
  },
  components: {
	swiper,
	numbox
  }
};
</script>
<style lang="scss" scoped>
.shoppingInfo {
  background-color: #eee;
  overflow: hidden;
}.oldprice{
	text-decoration: line-through;
	font-size: 12px
}.newprice{
	color: red;
	font-weight: bold;
	font-size: 14px
}.mui-card-footer{
	display: block;
	.btn{
		margin: 10px 0px
	}
	
}.ball{
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 408px;
  left: 150px;
  z-index: 99
}
</style>