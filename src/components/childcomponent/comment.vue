<template>
    <div class="comment">
        <h3>发表评论</h3>
        <hr>
        <textarea class="tex" placeholder="请输入要评论的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="sub">发表评论</mt-button>
        <div class="cms-box">
            <div class="cms-item" v-for="(item, index) in newComment" :key="item.add_time">
                <div class="cms-title">
                    第{{index+1}}楼&nbsp;&nbsp;用户:{{item.username}}&nbsp;&nbsp;发表时间:{{item.add_time | capitalize}}
                </div>
                <div class="cms-content">
                    {{item.content ==='undefined'?'此用户很懒':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多评论</mt-button>
    </div>
    

</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            pageindex:1,
            newComment:[],
            msg:''
        }
    },
    created(){
        this.getComment();
    },
    methods:{
        getComment(){
            this.axios.get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
            .then(res=>{
                if(res.data.status===0){
                    this.newComment = this.newComment.concat(res.data.message)
                }else{
                    Toast('加载评论失败')
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getComment()
        },
         sub(){
            if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空！");
      }

      // 发表评论
      // 参数1： 请求的URL地址
      // 参数2： 提交给服务器的数据对象 { content: this.msg }
      // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
      this.axios
        .post('/api/postcomment/'+ this.id, {
          content: this.msg.trim()})
        .then(res=>{
        
          if (res.data.status === 0) {
            // 1. 拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.newComment.unshift(cmt);
            this.msg = "";
          }
        });
    }
  },
    props: ["id"]
}
</script>
<style lang="scss" scoped>
.comment{
    h3{
        font-size: 16px
    }
    textarea{
        height: 85px;
        font-size: 14px;
        margin: 0
    }
    .cms-box{
        margin: 5px 0
    }
    .cms-item{
        font-size: 14px;
        line-height: 30px;
        .cms-title{
            background-color: #ccc;
            line-height: 35px;
        }
        .cms-content{
            text-indent: 2em;
            line-height: 30px;
        }
    }
}
</style>