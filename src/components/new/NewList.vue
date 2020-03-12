<template>
    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in NewListContent" :key="item.id">
					<router-link :to="'/home/NewList/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class="mui-ellipsis">
                                <span>发表时间:{{item.add_time | capitalize}}</span>
                                <span>点击:{{item.click }}次</span>
                            </p>
						</div>
					</router-link>
				</li>
				
			</ul>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            NewListContent:[]
        }
    },
    created(){
        this.getNewList();
    },
    methods:{
        getNewList(){
            this.axios.get('api/getnewslist')
            .then(res=>{
                if(res.data.status===0){
                    this.NewListContent = res.data.message
                }else{
                    Toast('新闻加载失败')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-media-body{
    h1{
        font-size: 14px
    }
    .mui-ellipsis{
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content:space-between; 
    }
}
</style>