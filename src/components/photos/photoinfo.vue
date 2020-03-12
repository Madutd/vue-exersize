<template>
    <div class="photoInfo">
        <div class="photoHeader">
            <h4 class="title">{{photoinfo.title}}</h4>
            <p class="text">
        <span>发表时间:{{photoinfo.add_time | capitalize}}</span>
        <span>点击:{{photoinfo.click}}次</span>
    </p>
        </div>
        <hr>
        <div class="thumds">
            
        <vue-preview :slides="slide1" @close="handleClose" ></vue-preview>


        </div>
        <p class="photo-content" v-html="photoinfo.content">
        </p>
        <hr>
        <comment-box :id='this.id'></comment-box>
    </div>
</template>
<script>
import comment from '../childcomponent/comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            photoinfo:{},
            slide1:[]
        }
    },
    created(){
        this.getinfo();
        this.getthumb()
    },
    methods:{
        getinfo(){
            this.axios.get('api/getimageInfo/'+this.id)
            .then(res=>{
                if(res.data.status===0){
                    this.photoinfo = res.data.message[0]
                }
            })
        },
        getthumb(){
            this.axios.get('api/getthumimages/'+this.id)
            .then(res=>{
                if(res.data.status===0){
                    res.data.message.forEach(item=>{
                        item.w =  600;
                        item.h = 400;
                        item.msrc = item.src;
                        
                    })
                    this.slide1 = res.data.message;
                    console.log(this.slide1)
                    
                }
            })
        },
        handleClose () {
        console.log('close event')
      }
    },
    components:{
        'comment-box':comment
    }
}
</script>
<style lang="scss">
.photoInfo{
    padding: 0 4px;
    h4{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .text{
        color: #226aff;
        display: flex;
        justify-content: space-between
    }
    }
    .photo-content{
        font-size: 12px;
        color: black
    }

    //去掉thumbs并且不能scoped
.my-gallery {
    display: flex;
    flex-wrap: wrap;
    figure {
        margin: 5px;
      width: 30%;
      img {
        width: 100%;
      }
    }
  
}

    

</style>