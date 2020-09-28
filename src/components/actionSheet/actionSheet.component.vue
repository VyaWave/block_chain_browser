<template>
    <ActionSheet :data='menus' v-model="isShow"  @cancel="handleCancel" cancelMode closeOnClickModal class="camchat_actionSheet"/>
</template>

<script lang='ts'>

import { Vue, Component , Watch } from 'vue-property-decorator';

import { mapGetters, mapActions }  from 'vuex';

/** 弹窗插件 */
import { ActionSheet } from 'vue2-dialog';

/** 弹窗插件样式 */
import 'vue2-dialog/dist/VueDialog.css';

 @Component({

})
export default class ActionSheetComponent extends Vue {

      private isShow:boolean =  false;

      private menus:Array<object>  =  [];

      /** 点击取消按钮 */
      private handleCancel():void{

          this['hideActionSheetAction']();
      }


      @Watch('getActionSheet',{ immediate: true, deep: true })
      onChangeForGetActionSheet(_new:object, _old:object){
            if(_new != undefined){

               this.isShow = _new['isShow'];
               this.menus  = _new['menus'];
            }
      }
}

</script>

<style lang="scss">

    .camchat_actionSheet_block{
        padding: 0.3rem;
        white-space: nowrap;
        font-size: 0.38rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        justify-content: center;
    }

    .camchat_actionSheet {
        .cancel{
            padding: 0.3rem;
            white-space: nowrap;
            font-size: 0.4rem;
        }
    }
</style>