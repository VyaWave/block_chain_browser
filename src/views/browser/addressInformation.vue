<template>

    <div class="smart_container_rightBlock">

        <TopNav />

        <div class="smart_container_rightBlock_title">
            转账记录
            <span class="titleHash"></span>
        </div>

        <div class="smart_container_qkMessageBlock">
            <div class="smart_container_qkMessageBlock_left">基础信息</div>
        </div>

        <div class="smart_nav_list">
            <div class="lis">
                <div class="icon"></div>
                <div class="rightText">
                    <span>{{ accountTransactionsCount }}</span>
                    <span>交易笔数</span>
                </div>
            </div>
        </div>

        <div class="smart_tableForAdress">
            <div class="border">
                <div class="border-scroll">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th width='450' align='left' class="textIndent">交易哈希</th>
                                <th align='left' >发送方/接收方</th>
                                <th width='80' align="left">价值</th>
                                <th width='80' align="left">手续费</th>
                                <th width='150' align="left">时间</th>
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
                                     {{formatTime(_item.timestamp,'YYYY-MM-dd hh:ss:mm')}}
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

import { mapGetters, mapActions } from "vuex";

import Utils from '@/utils/index';

/** 加载图片 */
import blackLogoPng  from '@/assets/images/public/logo.png';
import whiteLogoPng  from '@/assets/images/public/smartx-logo.png'

@Component({
    components:{
        TopNav
    },
    methods:{
        ...mapActions([
            'getAccountTransactionsRequestAction', 
            'getLatestBlockHeightRequestAction'
        ])
    }
})
export default class AddressInformation extends Vue {

    private exchangeRateRatio: number = 10000;

    /** 图片 */
    private getBlackLogoPng:any      = whiteLogoPng;
    
    /** 交易列表 */
    private accountTransactionsList:Array<any> = [];

    /** 交易笔数 */
    private accountTransactionsCount:Number = 0;

    /** 初始化函数 */
    private mounted():void {

       let _address:String = String(this.$route.query['address']);

       let _emtry:Array<any> = []; 

       (async()=>{

          /** 获取全网高度 */
          let _height = await this['getLatestBlockHeightRequestAction']();

          let _res =  await this['getAccountTransactionsRequestAction']({
                address: _address,
                height: _height
          });

          this.accountTransactionsCount = _res.transactionCount;

          this.accountTransactionsList   = _res.transactionList;

          console.log(this.accountTransactionsList);

       })();
        
    }

    /** 切换到交易详情页 */
    private handleGotoDetail(_item:object):void{

        this.$router.push({path: '/wallet/transactionDetails', query:{hash: _item['hash']}})
    }

    /** 格式化时间 */
    private formatTime(_time,_format){
   
        return  Utils['formatTime'](parseInt(_time),_format);
    }
}

</script>

<style lang="scss">
    @import 'addressInformation';
</style>
