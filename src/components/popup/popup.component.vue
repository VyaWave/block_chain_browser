<template>
    <div class="camchat_windowTips" v-if="isShow == true">
        <div class="camchat_windowTips_layui" :class="isShow == true ? 'ani-fadein':''">
            <span class="tips" v-text="popupTip"></span>
            <span class="btn" contenteditable="false" @click="onRefresh">重新加载</span>
        </div>
        <div class="camchat_windowTips_mesk"></div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Watch } from 'vue-property-decorator';

import { mapGetters } from 'vuex';

@Component({
    computed:{
         ...mapGetters(['getPopup']),
    }
})
export default class PopupComponent extends Vue {

    private isShow: boolean  = false;

    private popupTip: string = '';

    /** 刷新接口; */
    private onRefresh():void{

        window.location.reload();
    }

    /** 监听弹窗值的变化 */
    @Watch('getPopup',{ immediate: true, deep: true })
    onChangeForGetPopup(_new:object, _old:object){
  
        if(_new != undefined){

            this['isShow']   = _new['isShowPopup'];
            this['popupTip'] = _new['popupTip'];
        }
    }
}
</script>

<style lang="scss" scoped >
    @import 'popup.component';
</style>