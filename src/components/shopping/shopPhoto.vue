<template>
    <div class="textInfo">
        <h3>{{textInfo.title}}</h3>
        <hr>
        <p v-html="textInfo.content"></p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            textInfo:{}
        }
    },
    created(){
        this.getPhotoSome();
    },
    methods:{
        getPhotoSome(){
        this.axios.get('api/goods/getdesc/'+this.id)
        .then(res=>{
          if(res.data.status===0){
              this.textInfo = res.data.message[0]
          }
        })
    }
    }
}
</script>
<style lang="scss" >
.textInfo{
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    p{  
        width: 100%;
        padding: 0 5px;
        .gomeImgLoad{
            width: 100%;
        }
    }
    
}
</style>