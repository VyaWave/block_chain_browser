<template>

    <!-- 未曾登录钱包的界面 -->
    <div class="wallet-container" v-if="isLogin == false">

        <div class="wallet-header-menu" v-if="isShowMenu">
            <div class="wallet-header-menu-container">
               <div class="block_li">
                    <span class="arrow-down">{{ $setI18n('lang_selectLang','选择语言') }}</span>
                    <div class="picker-block">
                        <div class="li" @click="handleClickChangeLang(0)"><i></i>{{ $setI18n('lang_chinese','中文') }}</div>
                        <div class="li" @click="handleClickChangeLang(1)"><i></i>English</div>
                        <div class="li" @click="handleClickChangeLang(2)"><i></i>Indonesia</div>
                        <div class="li" @click="handleClickChangeLang(3)"><i></i>Philippines</div>
                        <div class="li" @click="handleClickChangeLang(4)"><i></i>Russia</div>
                    </div>
               </div>
               <div class="block_li">
                    <span class="arrow-down">Testnet</span>
                    <div class="picker-block">
                        <div class="li"><i></i>{{ $setI18n('lang_alphaVersion','Alpha版本') }}</div>
                    </div>
               </div>
            </div>
            <div class="wallet-header-menu-mesk" @click="isShowMenu = false"></div>
        </div>

        <div class="wallet-header">

            <a href="/" class="logo">
                <img :src="getLogoImage" alt="" />
            </a>

            <div class="wallet-more-btn" @click="isShowMenu = true"></div>
            
            <div class="language-picker">
               <span class="arrow-down">{{ $setI18n('lang_selectLang','选择语言') }}</span>
               <div class="picker-block">
                   <div class="li" @click="handleClickChangeLang(0)">{{ $setI18n('lang_chinese','中文') }}</div>
                   <div class="li" @click="handleClickChangeLang(1)">English</div>
                   <div class="li" @click="handleClickChangeLang(2)">Indonesia</div>
                   <div class="li" @click="handleClickChangeLang(3)">Philippines</div>
                   <div class="li" @click="handleClickChangeLang(4)">Russia</div>
                </div>
            </div>

             <div class="language-picker language-picker-2">
                <span class="arrow-down">Testnet</span>
                <div class="picker-block">
                    <div class="li">{{ $setI18n('lang_alphaVersion','Alpha版本') }}</div>
                </div>
            </div>

        </div>
        <div class="wallet-body">
            <h1 class="welcome-title">{{ $setI18n('lang_welcome','欢迎登陆Smartx钱包') }}</h1>
            <div class="wallet-funcs">
                <div class="funcs-item  funcs-item-bg1" @click="handleClickLoadWallet">
                    <span class="funcs-title">{{ $setI18n('lang_comeinWallet','进入钱包') }}</span>
                    <p>{{ $setI18n('lang_comeinWallet_tips_1','如果已有钱包，请进入钱包') }}</p>
                </div>
                <div class="funcs-item  funcs-item-bg2" @click="handleClickCreateWallet">
                    <span class="funcs-title">{{ $setI18n('lang_createWallet','创建新钱包') }}</span>
                    <p>{{ $setI18n('lang_comeinWallet_tips_2','如果没钱包，请创建新钱包') }}</p>
                </div>
            </div>
        </div>


        <!-- 创建钱包输入密码界面 -->
        <div class="popUp-window" 
             v-if="isCreateWallet == true && isLoadWallet == false"
             :style="isCreateWallet == true && isLoadWallet == false && isShowDownLoadJson == false ? 'display:block':''">

                <div class="window-wrapper pwd-container popUp-window-pwd">
                    <div class="window-content">
                        <p class="pwd-title">{{ $setI18n('lang_comeinWallet_password','密码') }}</p>
                        <div class="input-area">
                            <input type="password" :placeholder="$setI18n('lang_comeinWallet_password_placeholder','请输入密码')" v-model.trim="pwd">
                            <div class="process-bar" :style="{'left': pwdStyle()}"></div>
                        </div>

                        <div class="pwd-level">{{ $setI18n('lang_comeinWallet_power','密码强度') }}：<span class="blue-font">{{ pwdDifficultyText }}</span></div>
                        
                        <div class="input-area">
                            <input type="password" :placeholder="$setI18n('lang_comeinWallet_password_placeholder_again','请再输入密码')" v-model.trim="pwd2">
                        </div>

                        <div class="common-btn enter-wallet" @click="handleClickCreateWalletForWindow">{{ $setI18n('lang_comeinWallet_text','创建钱包') }}</div>
                        
                    </div>
                </div>
                <div class="popUp-window-mesk" @click="handleClickCloseWindow"></div>
        </div>


        <!-- 登录钱包输入密码界面 -->
        <div class="popUp-window" v-if="isInputPwdWallet == true" :style="isInputPwdWallet == true ? 'display:block':''">

                <div class="window-wrapper pwd-container">
                    <div class="window-content">
                        <p class="pwd-title">{{ $setI18n('lang_comeinWallet_password','密码') }}</p>
                        <div class="input-area">
                            <input type="password"  :placeholder="$setI18n('lang_comeinWallet_password_placeholder','请输入密码')"  v-model.trim="pwd3" />
                        </div>

                        <div class="common-btn enter-wallet" @click="loadWalletFromFile">{{ $setI18n('lang_comeinWallet','进入钱包') }}</div>
                        
                    </div>
                </div>

                <div class="popUp-window-mesk" @click="handleClickCloseWindow"></div>
        </div>


        <!-- 上传keystore文件 -->
        <div class="popUp-window"  :style="isShowUpLoadWallet == true ? 'display:block !important':''">

                <div class="window-wrapper upload-keystore-file">
                    <div class="window-content">
                        <div class="circle-box">
                           <img :src="getBlackLogoPng" alt="" />
                        </div>
                        <p class="upload-tips">{{ $setI18n('lang_comeinWallet_pleaseUpload','请上传keystore文件') }}</p>
                        <div class="common-btn continue-btn">
                            <input type="file" class="inputFile"  @change="addFileJson" ref="inputFile" id="load"/>
                            {{ $setI18n('lang_comeinWallet_selectKs','选择keystore文件') }}
                        </div>
                        <div class="warning">{{ $setI18n('lang_comeinWallet_tips_2','如果没钱包，请创建新钱包') }}</div>
                    </div>
                </div>
                <div class="popUp-window-mesk" @click="handleClickCloseWindow"></div>
        </div>

        <!-- 成功创建钱包 -->
        <div class="popUp-window" v-if="isShowSuccessCreateWallet == true" :style="isShowSuccessCreateWallet == true ? 'display:block':''">
                <div class="window-wrapper success-deal create-wallet-success">
                    <div class="window-content">
                        <i class="success-icon"></i>
                        <p class="success-tips">{{ $setI18n('lang_comeinWallet_success_tip','成功创建钱包！') }}</p>
                        <div class="common-btn enter-wallet" @click="isShowSuccessCreateWallet = false">{{ $setI18n('lang_comeinWallet_ok','确定') }}</div>
                    </div>
                </div>
                <div class="popUp-window-mesk" @click="handleClickCloseWindow"></div>
        </div>

        <!-- 下载KeyStore文件 -->
        <div class="popUp-window" v-if="isShowDownLoadJson == true" :style="isShowDownLoadJson == true ? 'display:block':''">
                <div class="window-wrapper download-keystore-file">
                    <div class="window-content">
                        <div class="attetion-container">
                            <div class="attention-item">
                                <i class="no-lose-icon"></i>
                                <p class="title">{{ $setI18n('lang_comeinWallet_donot','不要丢失') }}</p>
                                <div class="description">
                                    {{ $setI18n('lang_comeinWallet_donot_tips','请注意，如果您丢失了文件，将不能恢复钱包') }}
                                </div>
                            </div>
                            <div class="attention-item">
                                <i class="no-share-icon"></i>
                                <p class="title">{{ $setI18n('lang_comeinWallet_donot_share','不要分享') }}</p>
                                <div class="description">
                                    {{ $setI18n('lang_comeinWallet_tips_3','如果你在欺诈网站使用文件，您的资金将会被偷走') }}
                                </div>
                            </div>
                            <div class="attention-item">
                                <i class="no-copy-icon"></i>
                                <p class="title">{{ $setI18n('lang_comeinWallet_backups','做好备份') }}</p>
                                <div class="description">
                                    {{ $setI18n('lang_comeinWallet_tips_4','确保文件安全，也许有一天它会价值千万美金') }}
                                </div>
                            </div>
                        </div>
                        <div class="common-btn download-btn" @click="createWalletFunc">{{ $setI18n('lang_comeinWallet_downloadKs','下载KeyStore文件') }}</div>
                        <div class="warning">{{ $setI18n('lang_comeinWallet_tips_5','如果已经拥有钱包，请进入钱包') }}</div>
                    </div>
                </div>

                <div class="popUp-window-mesk" @click="handleClickCloseWindow"></div>
            </div>
    </div>

   <!-- 已经登录钱包的界面 -->
   <div class="wallet-container" v-else>

        <div class="wallet-header-menu" v-if="isShowMenu2">
            <div class="wallet-header-menu-container">
               <div class="block_li">
                    <span class="arrow-down">{{ $setI18n('lang_selectLang','选择语言') }}</span>
                    <div class="picker-block">
                        <div class="li" @click="handleClickChangeLang(0)"><i></i>{{ $setI18n('lang_chinese','中文') }}</div>
                        <div class="li" @click="handleClickChangeLang(1)"><i></i>English</div>
                        <div class="li" @click="handleClickChangeLang(2)"><i></i>Indonesia</div>
                        <div class="li" @click="handleClickChangeLang(3)"><i></i>Philippines</div>
                        <div class="li" @click="handleClickChangeLang(4)"><i></i>Russia</div>
                    </div>
               </div>
               <div class="block_li">
                    <span class="arrow-down">Testnet</span>
                    <div class="picker-block">
                        <div class="li"><i></i>{{ $setI18n('lang_alphaVersion','Alpha版本') }}</div>
                    </div>
               </div>
                <div class="block_li">
                      <span class="arrow-down" onclick="window.open('https://smartx.one')">{{ $setI18n('lang_website','官网') }}</span>
               </div>
               <div class="block_li">
                      <span class="arrow-down" onclick="window.open('https://miner.smartx.one')">{{ $setI18n('lang_water','水龙头') }}</span>
               </div>
            </div>
            <div class="wallet-header-menu-mesk" @click="isShowMenu2 = false"></div>
        </div>

        <div class="wallet-header white-header">

            <a href="/" class="logo"><img :src="getWhiteLogoPng" alt="" /></a>

            <div class="wallet-more-btn2" @click="isShowMenu2 = true"></div>
            <div class="wallet-user-btn" @click="isShowUserMenu = true"></div>

            <div class="language-picker">
                <span class="arrow-down">{{ $setI18n('lang_selectLang','选择语言') }}</span>
                <div class="picker-block">
                    <div class="li" @click="handleClickChangeLang(0)">{{ $setI18n('lang_chinese','中文') }}</div>
                    <div class="li" @click="handleClickChangeLang(1)">English</div>
                    <div class="li" @click="handleClickChangeLang(2)">Indonesia</div>
                    <div class="li" @click="handleClickChangeLang(3)">Philippines</div>
                    <div class="li" @click="handleClickChangeLang(4)">Russia</div>
                </div>
            </div>
             <div class="language-picker language-picker-2">
                <span class="arrow-down">Testnet</span>
                <div class="picker-block">
                    <div class="li">{{ $setI18n('lang_alphaVersion','Alpha版本') }}</div>
                </div>
            </div>
            <div class="menu-picker-block">
                <div class="li" onclick="window.open('https://smartx.one')">{{ $setI18n('lang_website','官网') }}</div>
                <div class="li" onclick="window.open('https://miner.smartx.one')">{{ $setI18n('lang_water','水龙头') }}</div>
            </div>
        </div>
        <div class="wallet-body myWallet-container">

            <div class="myWallet-menu"  :style="isShowUserMenu ? 'display:block':''">
                <div class="user-infos">
                    <img :src="getUserDefaultPicPng" class="userPic" alt="" />
                    <p class="userName" :alt='address'>{{ address }}</p>
                </div>
                <ul class="menu-list">
                    <li @click="handleClickChangeMoneyList(false)" :class="isShowMoneyList == false ? 'active':''">{{ $setI18n('lang_myWallet','我的钱包') }}</li>
                    <li v-clipboard:copy="address"
                        v-clipboard:success="onCopySuccess"
                        v-clipboard:error="onCopyError">
                        {{ $setI18n('lang_copyUrl','复制地址') }}
                    </li>
                    <li @click="isShowQrcode = true">{{ $setI18n('lang_showUrl','显示地址') }}</li>
                    <li @click="isShowPrivateKeyWindow = true">{{ $setI18n('lang_getKey','获取私钥') }}</li>
                    <li @click="handleClickChangeMoneyList(true)" :class="isShowMoneyList == true ? 'active':''">{{ $setI18n('lang_transferRecord','转账记录') }}</li>    
                    <li class="dot-icon" @click="handleLoginOut">{{ $setI18n('lang_closeWallet','关闭钱包') }}</li>
                </ul>

                <div class="menu-bottom">

                    <div class="li big" style="cursor: pointer;" onclick="window.open('https://smartx.one')">{{ $setI18n('lang_smartxWebsite','Smartx官网') }}</div>
                    <div class="li big">{{ $setI18n('lang_browser','区块链浏览器') }}</div>
                    <div class="li footer">Copyright 2019 <br/>Smartx All rights <br/>Reserved</div>

                </div>
            </div>
            <div class="myWallet-menu-mesk" :style="isShowUserMenu ? 'display:block':''" @click="isShowUserMenu=false"></div> 
            <!-- 基本内容 -->
            
            <div class="myWallet-content">

              <div class="myWallet-topLine"></div>
              <div class="myWallet-content-scroll">

                <div class="myWallet_block" v-show="isShowMoneyList == false">
                    <h1 class="myWallet-title">{{ $setI18n('lang_myWallet','我的钱包') }}</h1>
                    <p class="myWallet-tip">{{ $setI18n('lang_comeinWallet_tips_6','欢迎来到Smartx世界') }}</p>

                    <div class="myWallet-box">
                        <div class="logo-name">
                            <img :src="getBlackLogoPng" alt="" />
                            <p>Smartx</p>
                        </div>
                        <div class="myWallet-money">
                            {{ $setI18n('lang_totalMoney','全部余额') }}<span class="amount" ref="amount">{{ getFloat(amount > 0 ? amount/this.exchangeRateRatio: 0) }}</span>
                        </div>
                        <div class="common-btn send-btn" @click="handleClickSendMoney">{{ $setI18n('lang_send','发送') }}</div>
                        <div class="apply-test-coin">{{ $setI18n('lang_applyForTestCurrency','申请测试币') }}</div>
                    </div>

                    <div class="myWallet-box-bottom">
                        <div class="title">{{ $setI18n('lang_acknowledgementList','致谢名单') }}</div>
                        <div class="ballList">
                            <div class="li li_img_1"></div>
                            <div class="li li_img_2"></div>
                            <div class="li li_img_3"></div>
                            <div class="li li_img_4"></div>
                            <div class="li li_img_5"></div>
                        </div>
                        <div class="tips">{{ $setI18n('lang_comeinWallet_tips_7','感谢所有对 Smartx 区块链有过启发的产品和项目') }}</div>
                    </div>
                </div>
                
                <div class="myWallet_block" v-show="isShowMoneyList == true">

                    <div class="smart_container_rightBlock_title" style="text-align:left">
                        {{ $setI18n('lang_transferRecord','转账记录') }}
                        <span class="titleHash"></span>
                    </div>

                    <div class="smart_container_qkMessageBlock">
                        <div class="smart_container_qkMessageBlock_left">{{ $setI18n('lang_baseInfo','基础信息') }}</div>
                    </div>

                    <div class="smart_nav_list">
                        <div class="lis">
                            <div class="icon"></div>
                            <div class="rightText">
                                <span>{{ accountTransactionsCount }}</span>
                                <span>{{ $setI18n('lang_transactionNumber','交易笔数') }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="smart_tableForAdress">
                        <div class="border">
                            <div class="border-scroll">
                                <table border="0" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr>
                                            <th width='450' align='left' class="textIndent">{{ $setI18n('lang_hash','交易哈希') }}</th>
                                            <th align='left' >{{ $setI18n('lang_sender','发送方/接收方') }}</th>
                                            <th width='80' align="left">{{ $setI18n('lang_value','价值') }}</th>
                                            <th width='80' align="left">{{ $setI18n('lang_serviceCharge','手续费') }}</th>
                                            <th width='150' align="center">{{ $setI18n('lang_time','时间') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(_item, _index) in accountTransactionsList"
                                            :key="_index"
                                            @click="handleGotoDetail(_item)">
                                            <td valign="middle">
                                                <div class="lis">
                                                    <div class="header"><img :src="getSmartxLogoPng" /></div>
                                                    <div class="content">
                                                        {{_item.hash}}
                                                    </div>
                                                </div>
                                            </td>
                                            <td valign="middle">
                                                <div class="labelLis">
                                                    <div class="label">
                                                        <span class="span1">from</span>
                                                        <span class="span2" :class="_item.from==address ? 'blue':''">{{_item.from}}</span>
                                                    </div>
                                                    <div class="label">
                                                        <span class="span1">to</span>
                                                        <span class="span2" :class="_item.to==address ? 'blue':''">{{_item.to}}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td valign="middle">
                                                <strong>{{_item.value/exchangeRateRatio}}</strong><br/>
                                                SAT
                                            </td>

                                            <td valign="middle">
                                                <strong>{{_item.fee}}</strong><br/>
                                                SAT
                                            </td>

                                            <td valign="middle">
                                                {{formatTime(_item.timestamp,'YYYY-MM-dd hh:mm:ss')}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                </div>
            </div>

            <!-- 私钥 -->
            <div class="popUp-window" v-if="isShowPrivateKeyWindow == true" :style="isShowPrivateKeyWindow == true ? 'display:block':''">
                <div class="window-wrapper secrete-key">
                    <div class="window-title">{{ $setI18n('lang_privateKey','私钥') }}</div>
                    <div class="window-content">
                        <div class="key">{{ privateKey }}</div>
                        <div class="key-tip">{{ $setI18n('lang_comeinWallet_tips_8','请不要截屏保存私钥') }}</div>
                    </div>
                </div>
                <div class="popUp-window-mesk" @click="handleClickCloseWindow"></div>
            </div>


            <!-- 申领测试币成功 -->
            <div class="popUp-window">
                <div class="window-wrapper apply-coin-success">
                    <div class="window-content">
                        <i class="success-icon"></i>
                        <div class="apply-success-tip">{{ $setI18n('lang_comeinWallet_tips_9','申领测试币成功！') }}</div>
                        <div class="apply-infos">
                            <p>{{ $setI18n('lang_comeinWallet_tips_10','请30s后查询账户余额变化。') }}SAT:</p>
                            <a href="javascript:;">FAFAAFAFNKASLFASNKNFAKSSNKNFAKS;LFJAS;FASF</a>
                        </div>
                        <div class="common-btn sure-btn">{{ $setI18n('lang_comeinWallet_ok','确定') }}</div>
                    </div>
                </div>
                <div class="popUp-window-mesk" @click="handleClickCloseWindow"></div>
            </div>
           

            <!-- 交易成功 -->
            <div class="popUp-window"   :style="isSendMoneySuccess == true ? 'display:block !important':''">
                <div class="window-wrapper success-deal">
                    <div class="window-content">
                        <div class="success-icon"></div>
                        <div class="success-tips">{{ $setI18n('lang_comeinWallet_tips_11','交易已发送成功') }}</div>
                        <div class="common-btn sure-btn" @click="handleSuccessOk">{{ $setI18n('lang_comeinWallet_ok','确定') }}</div>
                    </div>
                </div>
                <div class="popUp-window-mesk" @click="handleClickCloseWindow"></div>
            </div>

            <!-- 发送交易 -->
            <div class="popUp-window" v-if="isShowSendMoney == true" :style="isShowSendMoney == true ? 'display:block':''">
                <div class="window-wrapper send-deal-container">
                    <div class="window-title">{{ $setI18n('lang_comeinWallet_tips_11s','交易已发送成功') }}</div>
                    <div class="window-content">
                        <div class="send-deal-title">
                            {{ $setI18n('lang_comeinWallet_from','从') }}<span class="gray-font"><strong>{{ from }}</strong></span>
                        </div>
                        <div class="avaliable-money">
                            <p><strong>{{ $setI18n('lang_comeinWallet_availableBalance','可用余额') }}&nbsp;&nbsp;{{ getFloat(amount > 0 ? amount/this.exchangeRateRatio: 0) }}</strong></p>
                            <div class="money-input">
                                <input type="number" placeholder="0"  ref="allAmout" v-model.trim="moneyNum"/><span>SAT</span><span class="transfer-all" @click="handleSetAllMoney">{{ $setI18n('lang_comeinWallet_transferAll','转出全部金额') }}</span>
                            </div>
                        </div>
                        <div class="send-to-area">
                            <span>{{ $setI18n('lang_comeinWallet_to','发送至') }}</span>
                            <input type="text"  v-model.trim="to" />
                        </div>
                        <div class="gas-container">
                            <div class="gas-process-container">
                                <span>Gas</span>
                                <span class="gas-process">
                                    <i class="gas-process-bar"></i>
                                </span>
                            </div>
                            <div class="gas-input">
                                <input type="number" :placeholder="$setI18n('lang_comeinWallet_tips_17','请输入金额')"  value="0" ref="inputNumber" disabled/>
                                <span>Gas</span>
                            </div>
                        </div>
                        <div class="common-btn send-btn" @click="sendRawTransaction">{{ $setI18n('lang_send','发送') }}</div>
                    </div>
                </div>
                <div class="popUp-window-mesk" @click="handleClickCloseWindow"></div>
            </div>

            <!-- 二维码 -->
            <div class="popUp-window"  :style="isShowQrcode == true ? 'display:block !important':''">
                <div class="window-wrapper erweima-container">
                    <div class="window-content">
                        <div class="erweima-code">{{address}}</div>
                        <div class="erweima-pic" ref="code" id="code"></div>
                    </div>
                </div>
                <div class="popUp-window-mesk" @click="handleClickCloseWindow"></div>
            </div>
           
        </div>
    </div>


</template>

<script lang='ts'>

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import { mapGetters, mapActions } from "vuex";

import { Buffer } from 'buffer';

import { Password } from '../../lib/password';

import { readInputFile } from '../../lib/utils';

import {Key} from 'smartxjs';

import {exec} from '../../lib/api';

import Utils from '@/utils/index';

import {
    getKey,
    createNewWallet,
    Wallet,
    WalletState,
    validateWallet,
    validatePassword,
    GlobalLoadedWallet,
} from "../../model/wallet";

/** 剪切板插件 */
import VueClipboard from 'vue-clipboard2';

import QRCode from "qrcodejs2";

/** 加载图片 */
import blackLogoPng      from '@/assets/images/public/logo.png';
import LogoPng           from '@/assets/images/public/black-logo.png';
import whiteLogoPng      from '@/assets/images/public/white-logo.png';
import userDefaultPicPng from '@/assets/images/public/user.svg';
import smartxLogoPng     from '@/assets/images/public/smartx-logo.png';
import erweimaPicPng     from '@/assets/images/public/erweima-pic.png';
import {Hash} from 'smartxjs';

Vue.use(VueClipboard);

 interface TransferNonce{
    nonce: string;
    timestamp: string;
    random: string;
 }

@Component({
    methods:{
        ...mapActions([
            'getAccountTransactionsRequestAction', 
            'getLatestBlockHeightRequestAction'
        ])
    }
})
export default class WalletMain extends Vue { 

   /** 图片 */
   private getBlackLogoPng:any      = blackLogoPng;
   private getLogoImage:any         = LogoPng;
   private getWhiteLogoPng:any      = whiteLogoPng;
   private getUserDefaultPicPng:any = userDefaultPicPng;
   private getSmartxLogoPng:any     = smartxLogoPng;
   private getErWeimaPicPng:any     = erweimaPicPng

   /** 判断是否登录 */
   private isLogin:Boolean  = false;

   /** 是否正在加载钱包; */
   private isLoadWallet:Boolean  = false;

   /** 是否正在创建钱包; */
   private isCreateWallet:Boolean = false;

   /** 是否显示download弹窗;  */
   private isShowDownLoadJson:Boolean = false;

   /** 是否显示创建钱包成功的弹窗; */
   private isShowSuccessCreateWallet:Boolean = false;

   /** 是否显示钱包上传弹窗 */
   private isShowUpLoadWallet:Boolean = false;

   /** 是否弹出输入密码加载钱包 */
   private isInputPwdWallet:Boolean = false;

   /** 是否显示发送交易窗口 */
   private isShowSendMoney:Boolean = false;

   /** 是否显示发送成功弹窗 */
   private isSendMoneySuccess:Boolean = false;

   /** 是否显示签名窗口 */
   private isShowPrivateKeyWindow:Boolean = false;

   /** 是否显示二维码 */
   private isShowQrcode:Boolean = false;

   /** 存储file对象 */
   private myFile:any     = null;

   /** 密码 */
   private pwd:string     = '';

   /** 确认密码 */
   private pwd2:string    = '';

   /** 密码 */
   private pwd3:string    = '';

   /**  */
   private privKey:string = '';

   /** pwd难度文字 */
   private pwdDifficultyText = this['$setI18n']('lang_common',"普通");

   private address:string = '';
 
   private from:string = '';

   private to:string   = '';

   private amount:number = 0;

   /** 转账金额 */
   private moneyNum:any  = 0;

   private key:any;

   private mySign:String  = '';

   private clearInterval:any;

   private exchangeRateRatio: any = 10000;

   /** 私密key */
   private privateKey:string = '';

   /** 交易列表 */
   private accountTransactionsList:Array<any> = [];

   /** 交易笔数 */
   private accountTransactionsCount:Number = 0;

   /** 是否显示交易列表 */
   private isShowMoneyList:Boolean = false;

   /** 是否显示头部的导航 */
   private isShowMenu:Boolean = false;
   private isShowMenu2:Boolean = false;
   private isShowUserMenu:Boolean = false;
   
   /** 监听pwd变化 */
   @Watch('pwd',{ immediate: true, deep: true })
      onChangeForPwd(_new:string, _old:string){

        if(_new != undefined){

            /** 判断是否输入了中文，如果带有中文则删除 */
            if(/.*[\u4e00-\u9fa5]+.*$/g.test(_new)){
                 let reg = /[\u4e00-\u9fa5]/g;
                 this.pwd.replace(reg, "");
            }

            /** 去除前后空格 */
            this.pwd = this.pwd.replace(/(^\s*)|(\s*$)/g, "");
        }
   }

   /** 监听pwd变化 */
   @Watch('pwd2',{ immediate: true, deep: true })
      onChangeForPwd2(_new:string, _old:string){

        if(_new != undefined){

            /** 判断是否输入了中文，如果带有中文则删除 */
            if(/.*[\u4e00-\u9fa5]+.*$/g.test(_new)){
                 let reg = /[\u4e00-\u9fa5]/g;   
                 this.pwd.replace(reg, "");
            }

            /** 去除前后空格 */
            this.pwd2 = this.pwd2.replace(/(^\s*)|(\s*$)/g, "");

        }
   }

   /** 监听pwd变化 */
   @Watch('pwd3',{ immediate: true, deep: true })
      onChangeForPwd3(_new:string, _old:string){

        if(_new != undefined){

            /** 判断是否输入了中文，如果带有中文则删除 */
            if(/.*[\u4e00-\u9fa5]+.*$/g.test(_new)){
                 let reg = /[\u4e00-\u9fa5]/g;
                 this.pwd3.replace(reg, "");
            }

            /** 去除前后空格 */
            this.pwd3 = this.pwd3.replace(/(^\s*)|(\s*$)/g, "");
        }
   }

   private  mounted():void {
       
       this.handleClickChangeLang(1);
   }


   private handleClickChangeMoneyList(_isShowMoneyList:Boolean):void{

         this.isShowMoneyList = _isShowMoneyList;
         
         if(document.body.clientWidth  <= 750 ){

             this.isShowUserMenu = false;
         }
   }
   

   /** 切换语言 */
   private handleClickChangeLang(_type):void { 
       
       if(_type == 0){
       
          this.$i18n['locale'] = 'zh-CN';

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
   }

   /** 转账成功 */
   private handleSuccessOk():void{
 
       (async()=>{

           /** 获取接口余额*/
           let _res:object = await  exec('GET',`${Utils['judgingURLType']()}?v1.0.0&balance&address=${ this.address }`);
                
           if(_res !=undefined){
                    
              this.amount = parseInt(_res['available']);

              (this.$refs['amount'] as any).innerHTML = this.getFloat(_res['available'] > 0 ? _res['available']/this.exchangeRateRatio : 0);
           }

       });

      this.isSendMoneySuccess = false;
 
   }

   /** 销毁页面的时候，清除定时器 */
   private destroyed() {
     
       window.clearInterval(this.clearInterval);
   };

   /** 设置全部金额 */
   private handleSetAllMoney():void{

        (this.$refs as any).allAmout.value = (this.amount > 0 ? this.amount/this.exchangeRateRatio : 0);

        this.moneyNum = (this.amount > 0 ? this.amount/this.exchangeRateRatio : 0 );

   }

   /** 点击创建钱包按钮 */
   private handleClickCreateWallet():void{

            this.isCreateWallet = true;
            this.isLoadWallet   = false;
   }

   /** 点击进入钱包 */
   private handleClickLoadWallet():void{

            this.isCreateWallet = false;
            this.isLoadWallet   = true;

            this.isShowUpLoadWallet = true;
   }

   /** 点击弹窗创建钱包 */
   private handleClickCreateWalletForWindow():void{
       
            if(this.pwd != this.pwd2){

                alert(this['$setI18n']('lang_comeinWallet_tips_12',"两次输入的密码不一致，请重新输入!"));

                return;
            }

            this.isShowDownLoadJson = true;
   }

   /** 关闭窗口(关闭窗口其实等于重置所有的状态) */
   private handleClickCloseWindow():void{

        /** 重置状态 */
        this.resetState();
   }

    /** 还原所有的状态 */
   private resetState():void{

        this.isCreateWallet     = false;
        this.isLoadWallet       = false;
        this.isShowDownLoadJson = false;
        this.isShowSuccessCreateWallet = false;
        this.isShowUpLoadWallet = false;
        this.isInputPwdWallet = false;
        this.isShowSendMoney = false;
        this.isSendMoneySuccess = false;
        this.isShowPrivateKeyWindow = false;
        this.isShowQrcode = false;
       
        this.pwd = '';
        this.pwd2= '';
        this.pwd3= '';

        this.moneyNum = 0;

        this.myFile = null;

        this.pwdDifficultyText  = this['$setI18n']('lang_common',"普通");
   }


   /** 判断字符串中是否包含字母 */
   private hasLetter(str:String):Boolean {
    for (let i in str) {
        var asc = str.charCodeAt(parseInt(i));
        if ((asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
            return true;
        }
    }
    return false;
   }

   /** 密码强度样式 */
   private pwdStyle():string{

       if(this.pwd.length < 3){

           this.pwdDifficultyText = this['$setI18n']('lang_common',"普通");
           return '0%';

       }else if(this.pwd.length > 3 && this.hasLetter(this.pwd) == false){

           this.pwdDifficultyText = this['$setI18n']('lang_secondary',"中等");
           return '33.3%';

       }else if(this.pwd.length >= 6 && this.hasLetter(this.pwd) == true){

           this.pwdDifficultyText = this['$setI18n']('lang_highStrength',"高强");'';
           return '66.6%';
       }

       return '0%';
   }

  
   /** 下载钱包 */
   private funDownload(content, filename):void {

            /** 创建隐藏的可下载链接 */
            let eleLink = document.createElement('a');

            eleLink.download = filename;

            eleLink.style.display = 'none';

            /** 字符内容转变成blob地址 */
            let blob = new Blob([content]);

            eleLink.href = URL.createObjectURL(blob);

            /** 触发点击 */
            document.body.appendChild(eleLink);

            eleLink.click();

            /** 然后移除 */ 
            document.body.removeChild(eleLink);
    };


    
    /** 加载json文件 */
    private addFileJson(){

           let _inputDOM = this.$refs.inputFile;

           /** 通过DOM取文件数据 */
           let _files = _inputDOM['files'];

           if(_files.length > 1){
            
              alert(this['$setI18n']('lang_comeinWallet_tips_13','一次最多只能加载一个文件'));
              return;
           }

           /** 存储这个file对象; */
           this.myFile = _files[0];

           /** 重置状态 */
           //this.resetState();
           this.isShowUpLoadWallet = false;

           /** 输入密码弹窗; */
           this.isInputPwdWallet = true;
    }
    
       
    private inputFileById(id: string): Promise<string> {
          
            return readInputFile(document.getElementById(id) as HTMLInputElement);
    }


    private privateKeysOfTextarea(): string[] {

            if(this.privKey == null){

                console.log('private key input is null')
                return [];
            }

            return this.privKey == '' ? this.privKey.split(/\s/).map((e) => e.trim()).filter((e) => e) : []
    }

    // 创建钱包
    private createWalletFunc ():any {

        (async()=>{

            console.log("create new wallet clicked");
            console.log("password ---- 1" + this.pwd + " password 2 ---" + this.pwd2);

            // 检查密码是否相等
            const password = new Password(this.pwd);
            const password2 = new Password(this.pwd2);

            if (!password.equals(password2)) {
                //TODO: UI上提示用户两次输入的密码不一致
                alert("password do not match")
                return null;
            } else if (password.isEmpty()) {
                //TODO: UI上提示用户密码不能为空
                alert("password is empty")
                return null;
            } else {
                //alert("password equals")
            }

            //let _res:object = await exec('GET',`${Utils['judgingURLType']()}/v1.0.0/info`);
            let _res:object = await exec('GET',`${Utils['judgingURLType']()}/?v=1.0.0&cmd=info`);

            let _network:string = _res['network'];

            // 生成测试网的钱包
            // TODO: createNewWallet的第二个参数，需要请求info接口获取，这里暂时写死成 testnet
            const wallet = createNewWallet(password, _network ,this.privateKeysOfTextarea());
            console.log("creat new wallet address " + wallet.accounts[0].address);
            console.log("create new wallet version " + wallet.version);
            console.log("creaete new wallet network " + wallet.network);
            console.log("create new wallet cipher " + JSON.stringify(wallet.cipher));

            // 打印钱包的公钥和私钥
            // TODO:这里仅仅为了演示如何拿到用户的私钥，正式发布代码时需要去掉这段代码
            const walletState= {wallet,password};
            const key = getKey(walletState,0);
            const hexEncodePrivKey = Buffer.from(key.getPrivateKey().buffer).toString('hex');
            const hexEncodePubKey = Buffer.from(key.getPublicKey().buffer).toString('hex');
            console.log("create new wallet private key is " + hexEncodePrivKey);
            console.log("create new wallet pub key is " + hexEncodePubKey);


            //赋值给全局的wallet
            //TODO:这个全局对象需要有一种类似于cookie的机制，用户退出web钱包后，这个对象也需要被清理
            GlobalLoadedWallet.setWalletState(walletState);

            //TODO: 跳转到下载链接页面walletDownload，让用户下载smartx-wallet.json

            this.funDownload(JSON.stringify(wallet),'smartx-wallet.json');

            /** 重置所有状态 */
            this.resetState();

            /** 弹出成功创建窗口 */
            this.isShowSuccessCreateWallet = true;

            return wallet;

         })();    
    }

    /** 读取钱包 */ 
    private loadWalletFromFile() :any {

            console.log('load wallet clicked ');

            this.inputFileById('load').then((file)=>{

                (async()=>{

                    // 校验钱包文件是否合法
                    console.log("get file json " + file);

                    try{

                        //let _res:object = await exec('GET',`${Utils['judgingURLType']()}/v1.0.0/info`);
                        let _res:object = await exec('GET',`${Utils['judgingURLType']()}/?v1.0.0&cmd=info`);
                        let _network:string = _res['network'];

                        //TODO:testnet这里写死了，需要请求接口获取到main
                        const wallet:Wallet = validateWallet(file, _network);

                        // 检查用户输入的密码是否合法
                        const password = new Password(this.pwd3);
                        const walletState = validatePassword(wallet,password);

                        // 打印钱包信息
                        // TODO:这里仅仅为了演示如何拿到用户的私钥，正式发布代码时需要去掉这段代码
                        const key = getKey(walletState,0);
                        const hexEncodePrivKey = Buffer.from(key.getPrivateKey().buffer).toString('hex');
                        const hexEncodePubKey = Buffer.from(key.getPublicKey().buffer).toString('hex');
                        console.log("create new wallet private key is " + hexEncodePrivKey);
                        console.log("create new wallet pub key is " + hexEncodePubKey);

                        /** 私密key */
                        this.privateKey = hexEncodePrivKey;

                        //TODO:这个全局对象需要有一种类似于cookie的机制，用户退出web钱包后，这个对象也需要被清理
                        GlobalLoadedWallet.setWalletState(walletState);

                        this.resetState();

                        //跳转到发送页面，测试一下读取到的钱包是否有效
                        //TODO:真正上线的时候，应该跳转到账户信息页面而不是发送页面
                        this.isLogin = true;

                        /** 初始化登录界面的数据 */
                        this.initLoginComplate();

                        return wallet;
    
                    }catch (e) {
                        alert('load wallet file failed ' + e);
                        console.log('load wallet file failed ' + e);
                        throw e;
                    }

                })();
            });
            return null;
    }


    /** 发送交易窗口 */
    private handleClickSendMoney():void{

         this.isShowSendMoney = true;
    }


    /** 退出当前登录状态 */
    private handleLoginOut():void{

         window.location.reload();
    }


    /** 初始化登录完成界面 */
    private initLoginComplate():void{

        (async()=>{

            //TODO: 请求服务器后端获取nonce和timestamp
            //let txNonce:TransferNonce = this.getTransferNonce();

            //获取到wallet里面的地址
            let walletState:WalletState = GlobalLoadedWallet.getWalletState();

            //如果没有加载钱包，重定向回去重新加载钱包;
            if(walletState == undefined){

                this.$router.push({path:'/brower/walletLogin'});

                return;
            }

            //TODO:这里暂时写死为第0个account,web钱包只支持一个account
            this.key = getKey(walletState,0);

            this.from =  this.key.toAddressHexString();

            this.address = this.from =  this.key.toAddressHexString();
 
            window.setTimeout(()=>{

                this.initQrcode();

            },1000);
           
            
            /** 获取接口余额*/
            let _res:object = await  exec('GET',`${Utils['judgingURLType']()}/?v1.0.0&cmd=balance&address=${ this.address }`);

            if (_res !=undefined) {
                this.amount = parseInt(_res['available']);
                console.log(_res['available']);
                (this.$refs['amount'] as any).innerHTML = this.getFloat(_res['available'] > 0 ? _res['available']/this.exchangeRateRatio : 0 );
                /** 请求转账记录 */
                await this.getMoneyInfo(this.address);
              
                /** 循环30s读取钱包余额 */
                this.clearInterval = window.setInterval(async()=>{
                     let _res:object = await  exec('GET',
                                                `${Utils['judgingURLType']()}/?v1.0.0&cmd=balance&address=${ this.address }`);
                     if (_res !=undefined) {
                          this.amount = parseInt((_res['available'] > 0 ? _res['available'] : 0 ));
                          (this.$refs['amount'] as any).innerHTML = this.getFloat(_res['available'] > 0 ? _res['available']/this.exchangeRateRatio : 0 );
                          /** 请求转账记录 */
                          await this.getMoneyInfo(this.address);
                     }     

                },30000);
            }
        })();
        
    }


    /** 请求转账记录 */
    private async getMoneyInfo(_address):Promise<any>{

    
            /** 获取全网高度 */
            let _height = await this['getLatestBlockHeightRequestAction']();

            let _res =  await this['getAccountTransactionsRequestAction']({
                        address: _address,
                        height: _height
            });

            this.accountTransactionsCount = _res.transactionCount;

            this.accountTransactionsList   = _res.transactionList;

            console.log(this.accountTransactionsList);

    }


    /** 生成二维码 */
    private initQrcode():Promise<any>{

      return new Promise((resolve, reject) => {

         let qrcode = new QRCode("code", {
          width: 200,
          height: 200,
          text: this.address,
          // 二维码地址
          colorDark: "#000",
          colorLight: "#fff"
        });

        resolve(qrcode);
      });  
    }


    /** 请求服务器后端获取nonce和timestamp */
    private async getTransferNonce():Promise<TransferNonce>{

        return exec('GET',`${Utils['judgingURLType']()}/v1.0.0/transaction/transfernonce`);
            
    }


    /** 转换小数点四位 */
    private getFloat(x:any):any{

        return  x;
        
    }


    /** 发送交易 */
    private sendRawTransaction():void{

            //要求用户确认交易
            // const confirmed = window.confirm(
            //     `Are you sure you want to ${ this.from }\r\n ${ this.moneyNum }\r\n to \r\n ${ this.to } ?`,
            // );

            //打包交易
            //if (confirmed) {

            if(this.moneyNum < 0){
               
                alert('Transfer failed, Format error');
                return;

            }else{

                /** 判断有没小数点 */
                let _result = (this.moneyNum.toString()).indexOf(".");

                /** 含有小数点 */
                if(_result != -1){
                   
                   let _strArr =  String(_result).split('.');

                   /** 如果小数点超过2个以上，就显示格式错误 */
                   if(_strArr.length > 3){
                      
                      alert('Transfer failed, Format error');
                      return;

                    /** 表示小数点只有1个或者2个 **/
                   }else{
                      
                      if(_strArr[1] && _strArr[1].length > 4){

                          alert('Transfer failed, maximum 4 decimal places');
                          return;
                      }
                   }
                }
            }    

            
            if(this.to == '' || this.to.length != 40){

               alert(this['$setI18n']('lang_comeinWallet_tips_14','输入的地址不合法'));
               return;
            }

            if(this.to == this.address){
                alert(this['$setI18n']('lang_comeinWallet_tips_15','不能给自己转账'));
                return;
            }

            

                let txNonce = this.getTransferNonce();

                let _moneyNum:number  = this.moneyNum * this.exchangeRateRatio;

                let _firstNumber:number = 0;

                if(_moneyNum.toString().indexOf(".") != -1){
                     
                    _firstNumber = Number(_moneyNum.toString().split('.')[0]);
                }else{

                    _firstNumber = _moneyNum;
                }

                (async()=>{

                        let txNonce:any =  await this.getTransferNonce();

                        let btype:string   = 'SMARTX_TXS';
                        let random:string  = '1';
                        let address:string = this.key.toAddressHexString();
                        let from:string    = this.key.toAddressHexString();
                        let amount:string  = String(this.amount);

                        //拼凑要签名的数据
                        let signstr:string = "1";
                        signstr += '-';
                        signstr += btype;
                        signstr += '-';
                        signstr += txNonce.timestamp;
                        signstr += '-';
                        signstr += address;
                        signstr += '-';
                        signstr += txNonce.nonce;
                        signstr += '-';
                        signstr += from;
                        signstr += '-';
                        signstr += this.to;
                        signstr += '-';
                        signstr += _firstNumber;


                        let rawHash_first = Hash.h256(Buffer.from(signstr));
                        let sign_string_first:string = Buffer.from(rawHash_first).toString('hex');
                        let sign_string_second:string = sign_string_first.concat(random);
                        let rawHash_second = Hash.h256(Buffer.from(sign_string_second));
                        let final_tx_blk_hash = Buffer.from(rawHash_second).toString('hex');
                        console.log('signstr is ' + final_tx_blk_hash);
                        let sign_bytes = this.key.sign(Buffer.from(final_tx_blk_hash)).toBytes();
                        let sign = Buffer.from(sign_bytes).toString('hex');

                        console.log('hex encode sign is ' +sign);
                        let raw:string = JSON.stringify({hash: final_tx_blk_hash,btype: btype, timestamp: txNonce.timestamp, address: address, nonce: txNonce.nonce, random: random, from: address, to: this.to, amount: _firstNumber, sign: sign});
                        console.log('encode raw transaction is ' + raw);
                        raw = encodeURI(raw)

                        let _res:object =  await exec('POST', `${Utils['judgingURLType']()}/v1.0.0/transaction/raw?raw=${raw}`);
                        //TODO:请求后端/transaction/raw接口


                        if(_res !=undefined){

                            /** 关闭交易窗口 */
                            this.isShowSendMoney = false;

                            /** 显示交易成功窗口 */
                            this.isSendMoneySuccess = true;

                            /** 获取接口余额*/
                            let _res:object = await  exec('GET',`${Utils['judgingURLType']()}/?v1.0.0&cmd=balance&address=${ this.address }`);
                        
                            if(_res !=undefined){
                            
                                this.amount = parseInt((_res['available'] > 0 ? _res['available'] : 0 ));

                                (this.$refs['amount'] as any).innerHTML = this.getFloat(_res['available'] > 0 ? _res['available']/this.exchangeRateRatio : 0 );

                            }
                        }
                })();
            //}
    }



    /** 拷贝成功 */
    private onCopySuccess():void{
        alert(this['$setI18n']('lang_comeinWallet_tips_16','拷贝地址成功！'));
    }


    /** 拷贝失败 */
    private onCopyError():void{
        alert(this['$setI18n']('lang_comeinWallet_tips_17','拷贝地址失败！'));
    }

    /** 格式化时间 */
    private formatTime(_time,_format){

      //  console.log(_time);
   
        return  Utils['formatTime'](parseInt(_time),_format);
    }

}

</script>

<style lang='scss'>
   @import 'wallet';
</style>
