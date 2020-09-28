<template>
    <div class="signUp_error" :class="tipReg=='suc'?'signUp_success':''" v-show="tipReg">
        <Icon type="ios-checkmark-circle" class="checkmark_circle_icon" v-show="tipReg=='suc'"/>
        {{tipText}}
    </div> 
</template>

<script lang='ts'>

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class InputTip extends Vue {
    @Prop({
     type:String,      //父组件传递给子组件的数据类型;
     required:true,    //是否必填;
     default: '',      //默认值;
   }) tipReg!: String;

   @Prop({
     type:String,      //父组件传递给子组件的数据类型;
     required:true,    //是否必填;
     default: '',      //默认值;
   }) tipText!: String;


}


</script>

<style lang="scss">
    @import 'inputTip';
</style>