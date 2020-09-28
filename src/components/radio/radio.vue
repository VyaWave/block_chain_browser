<template>
    <div class="camchat_radioBlock">
         <i class="camchat_radio" :class="radioActive" @click="handleChangeRadio"></i>{{ text }}
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Radio extends Vue {

   @Prop({
     type:String,      //父组件传递给子组件的数据类型;
     required:true,    //是否必填;
     default: '',      //默认值;
   }) text!: String;

   /** 选中状态的样式 */
   private radioActive:String = '';

   /** 是否选中的状态 */
   private isCheck:Boolean    = false;

   /** 切换radio */
   private handleChangeRadio():void{

        this.radioActive = this.radioActive =='' ? 'camchat_radioActive' : '';
        this.isCheck     = this.radioActive =='' ?  true : false;
        this.$emit('checkRadio',this.isCheck);
        
    }
}

</script>

<style lang="scss" scoped>
    @import 'radio';
</style>