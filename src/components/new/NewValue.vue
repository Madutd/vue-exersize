<template>
    <div class="value-container">
        <h1>{{NewValueContent.title}}</h1>
    <p class="newTitle">
        <span>发表时间:{{NewValueContent.add_time | capitalize}}</span>
        <span>点击:{{NewValueContent.click}}次</span>
    </p>
    <hr>
    <p class="content" v-html="NewValueContent.content"></p>
    <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
import comment from '../childcomponent/comment.vue'
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            id:this.$route.params.id,
            NewValueContent:{}
        }
    },
    created(){
        this.getNewValue();
    },
    methods:{
        getNewValue(){
            this.axios.get('api/getnew/'+ this.id)
            .then(res=>{
                if(res.data.status===0){
                    this.NewValueContent = res.data.message[0];
                }else{
                    Toast('信息加載錯誤')
                }
            })
        }
    },
    components:{
        "comment-box":comment
    }
}
</script>
<style lang="scss" scoped>
.value-container{
    padding: 0 4px;
    h1{
        font-size: 16px;
        color: red;
        text-align: center;
        margin: 15px 0;
    }
    .newTitle{
        color: #226aff;
        display: flex;
        justify-content: space-between
    }
    }
</style>