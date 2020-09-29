<template>
    <div class="smart_container_rightBlock_top">

            <div class="smart_rightBlock_block">
                <div class="lis"><a href='https://smartx.one' target="_blank">{{$setI18n('lang_website','官网')}}</a></div>
                <div class="lis"><a href='https://#' target="_blank">{{$setI18n('lang_airdrop','空投')}}</a></div>

                <div class="lis picker-new" >
                    <div class="arrow-down">Test NetWork</div>
                    <div class="picker-block"><div class="li">Alpha Ver</div></div>
                </div>

                <div class="lis picker-new" style="margin-left:2%;">
                      <div class="arrow-down">{{$setI18n('lang_selectLang','选择语言')}}</div>
                      <div class="picker-block">
                          <div class="li"  @click="handleClickChangeLang(0)">{{$setI18n('lang_chinese','中文')}}</div>
                          <div class="li"  @click="handleClickChangeLang(1)">English</div>
                          <div class="li"  @click="handleClickChangeLang(2)">Indonesia</div>
                          <div class="li"  @click="handleClickChangeLang(3)">Philippines</div>
                          <div class="li"  @click="handleClickChangeLang(4)">Russia</div>
                    </div>
                </div>


            </div>

            <div class="bottom_line"></div>


            <div class="smart_container_rightBlock_top_phone">
                <img :src="LogoImage" class="logo"/>
                <div class="lang-box">
                    <span>
                        {{$setI18n('lang_chinese','中文')}}
                    </span>
                    <img :src="MenuImage" @click="onClickLang"/>
                </div>
            </div>

            <div class="smart_container_rightBlock_top_lang_menu" v-show="showLangMenu">
                <div class="li">{{$setI18n('lang_selectLang','选择语言')}}</div>
                <div class="li" @click="handleClickChangeLang(0)">{{$setI18n('lang_chinese','中文')}}</div>
                <div class="li" @click="handleClickChangeLang(1)">English</div>
                <div class="li" @click="handleClickChangeLang(2)">Indonesia</div>
                <div class="li" @click="handleClickChangeLang(3)">Philippines</div>
                <div class="li" @click="handleClickChangeLang(4)">Russia</div>
            </div>
     </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import { mapGetters, mapActions } from "vuex";

import LogoImage from '@/assets/images/public/phone-logo.png';
import MenuImage from '@/assets/images/public/phone-menu.png';


import Utils from '@/utils/index';

@Component
export default class TopNav extends Vue {

    /** 用户输入的地址; */
    //private addressParms:String = '';

    // /** 头部筛选下拉框 */
    // private selectAll:Array<object> = [{
    //     text: '全部筛选',
    //     index: 0,
    //     state: 1
    // },{
    //     text: '地址',
    //     index: 1,
    //     state: 0
    // },{
    //     text: '主板',
    //     index: 2,
    //     state: 0
    // },{
    //     text: '交易',
    //     index: 3,
    //     state: 0
    // }]

    /** 切换下拉框 */
    // private handleClickSelect(_index:number){

    //     let _emtry:Array<object> = [];

    //     this.selectAll.forEach(_item=>{

    //        if(_index == _item['index']){

    //           _item['state'] = 1;

    //        }else{

    //           _item['state'] = 0;
    //        }
    //     });

    //     this.selectAll = _emtry.concat(this.selectAll);
    // }

    /** 跳到对应的钱包地址 */
    // private handleGotoAddressInfor():void{

    //     this.$router.push({ path: '/browser/addressInformation', query:{ 'address': String(this.addressParms)}});
    // }

    private LogoImage:any =  LogoImage;
    private MenuImage:any =  MenuImage;
    private showLangMenu: boolean =  false;

        private  mounted():void {

        this.handleClickChangeLang(0);
    }


    private onClickLang():void {
        this.showLangMenu = true
    }

   /** 切换语言 */
   private handleClickChangeLang(_type):void {

       if(_type == 0){

         this.$i18n['locale']  = 'zh-CN';

      }else if(_type == 1){

          this.$i18n['locale'] = 'en-US';

       }else if(_type == 2){

          this.$i18n['locale'] = 'en-ID';

       }else if(_type == 3){

          this.$i18n['locale'] = 'en-PH';

       }else if(_type == 4){

          this.$i18n['locale'] = 'ru-RU';
       }

       Utils['setSessionStorage']('lang', this.$i18n['locale']);

       this.$emit('changeLangEvent', this.$i18n['locale'])

       this.showLangMenu = false

   }
}

</script>

<style lang="scss">
    @import 'topNav';
</style>
