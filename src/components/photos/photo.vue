<template>
    <div>
        <!-- 头部区域滚动 -->
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
    <div class="mui-scroll">
        <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in topList" :key="item.id" @click="getPhoto(item.id)">
            {{item.title}}  
        </a>
    </div>
</div>
    <!-- 图片部分 -->
   
       <ul class="photo-list">
  <router-link  v-for="item in photoList" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
    <img v-lazy="item.img_url"  > 
    
    <div class="info">
        <h1 class="info-title">{{item.title}}</h1>
        <p class="info-text">{{item.zhaiyao}}</p>
    </div>
  </router-link>
</ul>
    
	</div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js';

export default {
	data(){
		return{
            topList:[],
           photoList:[]
        }
    },
    created(){
        this.getTopList(),
        this.getPhoto(0)
    },
	mounted(){
		mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
    },
    methods:{
        getTopList(){
            this.axios.get('api/getimgcategory')
            .then(res=>{
                if(res.data.status===0){
                    this.topList = res.data.message;
                    this.topList.unshift({ title:'全部', id:0 })
                }
            })
        },
        getPhoto(cateid){
            this.axios.get('api/getimages/'+cateid)
            .then(res=>{
                if(res.data.status===0){
                    this.photoList = res.data.message;
                }
            })
            }
    }
}
</script>

<style lang="scss" scoped>
*{
     touch-action: pan-y; 
}
img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photo-list{
    list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
    li{
       margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    list-style: none;
    position: relative;
    img{
        width: 100%;
        vertical-align: middle;
    }
    .info{
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 0;
    color: white;
    max-height: 80px;
    text-align: left;
    .info-title{
        font-size: 14px
    }
    .info-text{
        font-size: 13px;
        color: white;
    }
}
    
}
}



</style>