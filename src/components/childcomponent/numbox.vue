<template>
        <div class="mui-numbox" data-numbox-min="1">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" @change="pushNumbox">
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
        pushNumbox(){
            const count = document.getElementById('test').value;
            this.$emit('getNumbox',count)
        }
    },
    watch:{
        max:function(newValue,oldValue){

            //setOption 设置最大值 max为父组件传递的库存总数
            mui('.mui-numbox').numbox().setOption('max',newValue)
        }
    },
    props:['max']
}
</script>
<style lang="scss" scoped>

</style>