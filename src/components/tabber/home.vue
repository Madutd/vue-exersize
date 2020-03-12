<template>
  <div>
    <siwper :PictureList='PictureList' :isfull="true"></siwper>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/NewList">
		                    <img src="../../lib/img/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/photoList">
		                    <img src="../../lib/img/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/shop">
		                    <img src="../../lib/img/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="#">
		                    <img src="../../lib/img/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="#">
		                    <img src="../../lib/img/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="#">
		                    <img src="../../lib/img/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		            
		        </ul>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import siwper from '../childcomponent/lunbotu.vue'
export default {
    data() {
    return {
        PictureList:[]
    };
  },
  created() {
    this.getPicture();
  },
    methods:{
        getPicture(){
            this.axios.get('api/getlunbo/')
            .then(res=> {
                if(res.data.status===0){
                    this.PictureList = res.data.message
                }else{
                    Toast("加载轮播图失败。。。")
                }
            })
            .catch(function (error) {console.log(error);});
        }
    
},
components:{
        siwper
    }
}
</script>
<style lang="scss" scoped>
.mui-grid-view.mui-grid-9{
    background-color: white;
    img{
        width: 60px;
        height: 60px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none
}
</style>