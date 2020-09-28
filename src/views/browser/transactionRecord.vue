<template>

    <div class="smart_container_rightBlock">

        <TopNav />

        <div class="smart_container_rightBlock_title">
            {{$setI18n('lang_br_tradingBlockInformation','交易块信息')}}
        </div>

        <div class="smart_container_qkMessageBlock">
            <div class="smart_container_qkMessageBlock_left">{{$setI18n('lang_br_basicInformation','基础信息')}}</div>
        </div>


        <div class="smart_tableForAdress">
            <div class="border">
                <div class="border-scroll">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th width='300' align='left' class="textIndent">{{$setI18n('lang_br_transactionHash','交易哈希')}}</th>
                                <th align='left' >{{$setI18n('lang_br_from_to','发送方/接收方')}}</th>
                                <th width='200' align="center">{{$setI18n('lang_br_transactionTime','交易时间')}}</th>
                                <th width='100' align="center">{{$setI18n('lang_br_transactionAmount','交易金额')}}</th>
                                <th width='100' align="center">{{$setI18n('lang_br_serviceCharge','手续费')}}</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="(_item, _index) in accountTransactionsList"
                                :key="_index"
                                @click="handleGotoDetail(_item)">
                                <td valign="middle">
                                    <div class="lis">
                                        <div class="header"><img :src="getBlackLogoPng" /></div>
                                        <div class="content">
                                            {{_item.hash}}
                                        </div>
                                    </div>
                                </td>
                                <td valign="middle">
                                    <div class="labelLis">
                                        <div class="label">
                                            <span class="span1">from</span>
                                            <span class="span2">{{_item.from}}</span>
                                        </div>
                                        <div class="label">
                                            <span class="span1">to</span>
                                            <span class="span2 blue">{{_item.to}}</span>
                                        </div>
                                    </div>
                                </td>

                                <td valign="middle" align='center'>
                                    {{_item.timestamp}}
                                </td>

                                <td valign="middle" align='center'>
                                    {{_item.value}}<br/>
                                    SAT
                                </td>

                                <td valign="middle" align='center'>
                                    {{_item.fee}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
        
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import TopNav from './topNav/topNav.vue';

import axios  from 'axios';

import Utils  from '@/utils/index';

import { mapGetters, mapActions } from "vuex";

/** 加载图片 */
import blackLogoPng  from '@/assets/images/public/logo.png';

@Component({
    components:{
        TopNav
    },
    methods:{
        ...mapActions(['getAccountTransactionsRequestAction'])
    }
})
export default class TransactionRecord extends Vue {
    
    /** 图片 */
    private getBlackLogoPng:any      = blackLogoPng;

    /** 交易列表 */
    private accountTransactionsList:Array<any> = [];

    /** 初始化函数 */
    private mounted():void {

       let _emtry:Array<any> = []; 

       (async()=>{

          let _res =  await this['getAccountTransactionsRequestAction']({
                address:'0xc4d8734269ff4417f9f67320c3e5fc63c45b82a4',
                height: 10
          });

          this.accountTransactionsList = _res.transactionList;

          console.log(this.accountTransactionsList);

       })();
        
    }

    /** 切换到交易详情页 */
    private handleGotoDetail(_item:object):void{

        this.$router.push({path: '/brower/transactionDetails', query:{hash: _item['hash']}})
    }

}

</script>

<style lang="scss">
    @import 'transactionRecord';
</style>
