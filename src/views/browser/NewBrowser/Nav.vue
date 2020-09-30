<template>
    <el-header class="nav-box">
      <div class="nav-row">
        <div :span="4" class="logo-box">
          <img :src="logoImg" class="img-logo"/>
        </div>
        <div class="main-box">
          <span class="item home">首页</span>
          <a href="https://smartx.one/" target="_blank" class="item">{{$setI18n('lang_website','官网')}}</a>
          <a href="https://#" target="_blank" class="item">{{$setI18n('lang_airdrop','空投')}}</a>
          <span class="item">区块交易</span>
          <span class="item">Test NetWork</span>
          <el-dropdown trigger="click" @command="handleLangClick">
            <span class="item lang-box el-dropdown-link"><img :src="langImg" />{{$setI18n('lang_selectLang','选择语言')}}</span>
            <el-dropdown-menu slot="dropdown" placement="bottom-end">
              <el-dropdown-item command="zh-CN">{{$setI18n('lang_chinese','中文')}}</el-dropdown-item>
              <el-dropdown-item command="en-US">English</el-dropdown-item>
              <el-dropdown-item command="en-ID">Indonesia</el-dropdown-item>
              <el-dropdown-item command="en-PH">Russia</el-dropdown-item>
              <el-dropdown-item command="ru-RU">Philippines</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="main-box-phone">
            <span
              class="item lang-box el-dropdown-link"
              @click="handlePhoneLangClick"
            >
              <img :src="langImg" />
            {{$setI18n('lang_selectLang','选择语言')}}</span>

          <img :src="menuImg" class="menu-img" @click="handlePhoneMoreClick"/>

        </div>


      </div>
      <el-drawer
        :visible.sync="drawer"
        direction="ltr"
         :with-header="false"
         size="60%"
        >
        <div class="drawer-box">


           <template v-if="showLangMenu">
            <span class="item title">
              {{$setI18n('lang_selectLang','选择语言')}}
            </span>


            <span class="item" @click="() => handleLangClick('zh-CN')">
              {{$setI18n('lang_chinese','中文')}}
            </span>

            <span class="item"  @click="() => handleLangClick('en-US')">
              English
            </span>

            <span class="item"  @click="() => handleLangClick('en-ID')">
                Indonesia
            </span>

            <span class="item"  @click="() => handleLangClick('en-PH')">
              Russia
            </span>
            <span class="item"  @click="() => handleLangClick('ru-RU')">
                Philippines
            </span>

           </template>
          <template v-if="showMore">
            <span class="item home" @click="handleCloseModal">首页</span>
            <a href="https://smartx.one/" @click="handleCloseModal" target="_blank" class="item">{{$setI18n('lang_website','官网')}}</a>
            <a href="https://#" target="_blank" @click="handleCloseModal" class="item">{{$setI18n('lang_airdrop','空投')}}</a>
            <span class="item" @click="handleCloseModal">区块交易</span>
            <span class="item" @click="handleCloseModal">Test NetWork</span>
          </template>

        </div>
      </el-drawer>

    </el-header>


</template>

<script lang="ts">
import Utils from '@/utils/index';

import { Vue, Component, Prop, Watch } from "vue-property-decorator";


import LogoImg from '@/assets/logo.png';
import LangImg from '@/assets/lang.png';
import MenuImg from '@/assets/menu.png';

@Component({
    components:{}
})
export default class NewBrowser extends Vue {

  private logoImg: any = LogoImg
  private langImg: any = LangImg
  private menuImg: any = MenuImg

  private drawer: boolean = false

  private showMore: boolean = false
  private showLangMenu: boolean = false

  private handleGotoDetail(_item:object):void{
      this.$router.push({path: '/wallet/transactionDetails', query:{hash: _item['hash']}})
  }

  private handleLangClick(_type):void {

    this.$i18n['locale']  = _type

    Utils['setSessionStorage']('lang', this.$i18n['locale']);

    this.$emit('changeLangEvent', this.$i18n['locale'])

    this.drawer = false
  }

  private handlePhoneMoreClick() {

    this.drawer = true
    this.showLangMenu = false
    this.showMore = true
  }

  private handlePhoneLangClick() {
    this.drawer = true
    this.showLangMenu = true
    this.showMore = false

     console.info(   this.showLangMenu,
    this.showMore)
  }

  private handleCloseModal(){
    this.drawer = false
  }
}

</script>

<style lang="scss">

.nav-box {
  background: #212832;
  padding: 0;

  .nav-row {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
  }

  .logo-box {
    .img-logo {
      height: 20px;
    }
  }


  .main-box {
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: white;
    font-size: 16px;

    .el-dropdown{

      color: white;
    }

    .item {

      padding: 0 20px;
      &.home {
        color: #EAA830;
      }
    }


    a {
      color: white;
    }

    .lang-box {

      img {
        width: 18px;
        margin-right: 5px;
      }
    }

  }

   .main-box-phone {
      display: none;
   }

   .drawer-box {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     height: 100%;

     color: #515a6e;

     .item {
       height: 30px;
       font-size: 16px;
       line-height: 30px;
       margin: 15px 0;
     }


     .home {
        color: #EAA830;
      }

      a {
        color: #515a6e;
      }
   }

  @media only screen and (max-width:750px){


    .main-box {
      display: none;
    }

    .nav-row {
      padding: 0;
    }

    .main-box-phone {
      flex: 1;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: flex-end;


      .lang-box {

        img {
          width: 18px;
          margin-right: 5px;
        }
        display: flex;
        align-items: center;

        color: white;
      }

      .menu-img {
        width: 24px;
        margin-left: 10px;
      }

    }
  }

}

</style>
