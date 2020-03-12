<template>
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <mt-swipe-item v-for="item in PictureList" :key="item.id">
          <!-- 操作css  isfull由父元素传递 full:true 则吊full样式-->
        <img :class="{'full':isfull}" :src="item.img == undefined? item.src : item.img" >
      </mt-swipe-item>
    </mt-swipe>
</template>
<script>
export default {
    data() {
    return {
       
    };
  },
    props: ["PictureList","isfull"]
}
</script>
<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
        text-align: center;
        img{
            height: 100%;
        }
    }
}
.full{
    width: 100%
}
</style>