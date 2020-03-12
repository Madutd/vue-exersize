<template>
        <div class="mui-numbox" data-numbox-min="1">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="initNumber" @change="changeNumber" ref="numbox">
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data(){
        return{}
    },
    mounted(){
        mui('.mui-numbox').numbox();
    },
    methods:{
        changeNumber(){
            var changeShopInfo = {
                id:this.initId,
                count:this.$refs.numbox.value
            };
             this.$store.commit('changeShopNumber',changeShopInfo)
        }
    },
    
   props:['initNumber','initId']
}
</script>
<style lang="scss" scoped>

</style>