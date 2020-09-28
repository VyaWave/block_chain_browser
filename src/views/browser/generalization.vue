<template>
    <div class="smart_container_rightBlock smart_browser">
        <TopNav @changeLangEvent='changeLangEvent'/>
        <div class="smart_container_rightBlock_scroll">
        <div class="smart_container_rightBlock_title">
            {{$setI18n('lang_br_overview','概览')}}
        </div>
        <div class="smart_hash_list">
            <div class="smart_hash_list_lis smart_nav_bg1" >
                <div class="smart_hash_list_lisLeft">
                    <span class="hash">{{$setI18n('lang_br_calculationPower','哈希算力')}}</span>
                    <span class="ks">{{ topList.globalHashRate }}</span>
                    <!-- <span class="bf"><i class="point"></i>{{ topList.globalHashRate }}</span> -->
                </div>
                
            </div>

            <div class="smart_hash_list_lis smart_nav_bg2">
                <div class="smart_hash_list_lisLeft">
                    <span class="hash">{{$setI18n('lang_br_Whole_network_difficulty','全网难度')}}</span>
                    <span class="ks">{{ topList.globalDifficulty }}</span>
                    <!-- <span class="bf"><i class="point"></i>{{ topList.globalDifficultyPer }}</span> -->
                </div>
            </div>
            <div class="smart_hash_list_lis smart_nav_bg3">
                <div class="smart_hash_list_lisLeft">
                    <span class="hash">{{$setI18n('lang_br_Whole_network_heigh','全网高度')}}</span>
                    <span class="ks">{{ topList.currentBlockHeight }}</span>
                    <!-- <span class="bf"><i class="point"></i>{{ topList.globalDifficultyPer }}</span> -->
                </div>
            </div>
        </div>
        <div class="smart_container_qkMessageBlock">
            <div class="left">
              <div class="smart_block_clearFix">
                   <div class="smart_qkMessageBlock_left smart_qkMessageBlock_left_block" v-text="titleBar"></div>
                   <div class="smart_searchBlock smart_qkMessageBlock_right_block">
                        <div class="smart_searchBlock_border">
                            <span class="smart_searchBlock_allSelect">
                                <span v-for="(_item, _index) in selectAll" 
                                    :key="_index"
                                    v-show="_item.state == 1">{{_item.text}}</span><i class="line"></i>

                                <div class="smart_searchBlock_SelectPlugin">
                                    <div class="li" 
                                        v-for="(_item, _index) in selectAll" 
                                        :key="_index"
                                        @click="handleClickSelect(_index)"
                                        :class="_item.state == 1 ? 'active':''">{{ _item.text }}</div>
                                </div> 
                            </span>
                            <div class="smart_searchBlock_rightText">
                            <input type="text" 
                                   :placeholder="$setI18n('lang_br_search_placeholder','请输入交易记录或需要查询的地址')" 
                                   v-model.trim="addressParms"/>
                            <div class="searchButton" @click="handleSearch"></div>
                            </div> 
                        </div>
                    </div>
              </div>
               <div class="smart_container_tableList  smart_tableForAdress" v-if="isShowDzTable">
                    <table border="0" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr>
                                            <th width='550' align='left' class="textIndent">{{ $setI18n('lang_hash','交易哈希') }}</th>
                                            <th widalign='left' >{{ $setI18n('lang_sender','发送方/接收方') }}</th>
                                            <th width='80' align="left">{{ $setI18n('lang_value','金额') }}</th>
                                            <th width='80' align="left">{{ $setI18n('lang_serviceCharge','手续费') }}</th>
                                            <!--<th width='80' align="left">{{ $setI18n('lang_serviceCharge','aa') }}</th>-->
                                            <th width='150' align="center">{{ $setI18n('lang_time','时间') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(_item, _index) in accountTransactionsList"
                                            :key="_index">
                                            <td valign="middle">
                                                <div class="lis">
                                                    <div class="header"><img :src="getSmartxLogoPng" /></div>
                                                    <div class="content">{{_item.hash}}</div>
                                                </div>
                                            </td>
                                            <td valign="middle">
                                                <div class="labelLis">
                                                    <div class="label">
                                                        <span class="span1">from</span>
                                                        <span class="span2 blue" >{{_item.from}}</span>
                                                    </div>
                                                    <div class="label">
                                                        <span class="span1">to</span>
                                                        <span class="span2 blue" >{{_item.to}}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td valign="middle">
                                                <strong>{{_item.value ? (_item.value/exchangeRateRatio): 0}}</strong><br/>
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
              <div class="smart_container_tableList" v-if="isShowJyTable">
                 <div class="smart_container_dz_table" >
                      <!-- smart_main类型 -->
                      <table border="0" cellspacing="0" cellpadding="0"  v-if="isSmartxMain == true">
                        <thead> 
                            <tr>
                                <!--<th width="20%">aa</th>-->
                               <th width='100'>{{$setI18n('lang_br_blockHeigh','块高度')}}</th>
                               <th>{{$setI18n('lang_br_Whole_network_difficulty','全网难度')}}</th>
                               <th>{{$setI18n('lang_br_gg','矿工')}}</th>
                               <th>{{$setI18n('lang_br_hash','哈希值')}}</th>
                               <th>{{$setI18n('lang_br_serviceCharge','手续费')}}</th>
                               <th>{{$setI18n('lang_br_sjs','随机数')}}</th>
                               <th>{{$setI18n('lang_time','时间')}}</th>
                            </tr>
                        </thead>
                         <tbody v-if="accountTransactionsDetail">
                            <tr >
                               <td>{{ accountTransactionsDetail.height }}</td>
                               <td valign='center'><span class="td_li">{{ accountTransactionsDetail.difficulty}}</span></td>
                               <td><span class="td_li">{{ accountTransactionsDetail.address}}</span></td>
                               <!--<td><span class="blueText td_li">{{ accountTransactionsDetail.address }}</span></td>-->
                               <td><span class="blueText td_li">{{ accountTransactionsDetail.hash }}</span></td>
                               <td>{{ accountTransactionsDetail.fee=='' || accountTransactionsDetail.fee == null ? 0: accountTransactionsDetail.fee }}</td>
                               <td><span class="td_li">{{ accountTransactionsDetail.random}}</span></td>
                               <td>{{ formatTime(accountTransactionsDetail.timestamp,'YYYY-MM-dd hh:ss:mm') }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- smart_txs类型 -->
                    <table border="0" cellspacing="0" cellpadding="0"  v-if="isSmartxMain == false">
                        <thead> 
                            <tr>
                                <th>{{$setI18n('lang_br_blockHeigh','块高度')}}</th>
                                <th>{{$setI18n('lang_br_Whole_network_difficulty','块难度')}}</th>
                               <th>{{$setI18n('lang_br_sjs','随机数')}}</th>
                               <th>{{$setI18n('lang_br_hash','哈希值')}}</th>
                               <th>{{$setI18n('lang_br_serviceCharge','手续费')}}</th>
                               <th>{{$setI18n('lang_br_transactionAmount','交易金额')}}</th>
                               <th>{{$setI18n('lang_time','时间')}}</th>
                            </tr>
                        </thead>
                         <tbody v-if="accountTransactionsDetail">
                            <tr >
                               <td>{{ accountTransactionsDetail.height }}</td>
                               <td valign='center'><span class="td_li">{{ accountTransactionsDetail.difficulty}}</span></td>
                               <td>{{ accountTransactionsDetail.random}}</td>
                               <td><span class="blueText td_li">{{ accountTransactionsDetail.hash }}</span></td>
                               <td>{{ accountTransactionsDetail.fee=='' || accountTransactionsDetail.fee == null ? 0: accountTransactionsDetail.fee }}</td>
                               <td><span class="td_li">{{ accountTransactionsDetail.amount =='' || accountTransactionsDetail.amount == null ? 0 : accountTransactionsDetail.amount/exchangeRateRatio}}</span></td>
                               <td>{{ formatTime(accountTransactionsDetail.timestamp,'YYYY-MM-dd hh:ss:mm') }}</td>
                            </tr>
                        </tbody>
                    </table>
                   </div>
              </div>

              <div class="smart_container_tableList  smart_tableForAdress" v-if="isShowJyTable && isSmartxMain == false && accountTransactionsDetail" style="width:700px">
                        <table border="0" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr>
                                           <th class="textLeft">
                                              <span class="margin-left-25">{{$setI18n('lang_br_detailed','明细')}}</span>
                                           </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="textLeft">
                                               <span class="margin-left-25">
                                                 <strong>{{$setI18n('lang_br_hash','哈希值')}}:</strong>&nbsp;&nbsp;{{ accountTransactionsDetail.hash }}
                                               </span>  
                                           </td>
                                        </tr>

                                        <tr>
                                           <td class="textLeft">
                                              <span class="margin-left-25">
                                                 <strong>{{$setI18n('lang_br_fromer','转入方')}}:</strong>&nbsp;&nbsp;{{ accountTransactionsDetail.from }}
                                               </span>  
                                           </td>
                                        </tr>
                                        <tr>
                                           <td class="textLeft">
                                               <span class="margin-left-25">
                                                 <strong>{{$setI18n('lang_br_toer','转出方')}}:</strong>&nbsp;&nbsp;{{ accountTransactionsDetail.to }}
                                               </span>  
                                           </td>
                                        </tr>
                                    </tbody>
                        </table>
            </div>
                <div class="smart_container_mc  smart_mctxlist" v-if="mctxlist == true">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <thead>
                        <tr>
                            <th class="textLeft">
                                <span class="margin-left-25">{{$setI18n('lang_br_detailed2','交易明细')}}</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="textLeft">
                                   <span class="margin-left-25">
                                     <strong>{{$setI18n('lang_br_hash','哈希值')}}:</strong>&nbsp;&nbsp;{{ accountTransactionsDetail.hash }}
                                   </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
              <div class="smart_container_tableList" v-if="isShowDefalutTable">
                  <div class="smart_container_dz_table">
                   <table>
                        <thead>
                            <tr>
                                <th width=80>{{$setI18n('lang_br_blockHeigh','块高度')}}</th>
                                <th width="40%">{{$setI18n('lang_br_hash','哈希值')}}</th>
                                <th width="30%">{{$setI18n('lang_br_transactionNumber','交易笔数')}}</th>
                                <th width=100>{{$setI18n('lang_br_time','时间')}}</th>
                                <th width=100>{{$setI18n('lang_br_blockReward','出块奖励')}}</th>
                                <th>{{$setI18n('lang_br_broadcasts','播报方')}}</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr v-for="(_item, _index) in tableList" :key="'s1'+_index">
                                <td><strong>{{_item.height}}</strong></td>
                                <td valign="middle" align="center" ><div class="hash">{{_item.hash}}</div></td>
                                <td>{{_item.transactionCount}}</td>
                                <td>{{formatTime(_item.timestamp,'YYYY-MM-dd hh:mm:ss')}}</td>
                                <td>{{_item.reward}}</td>
                                <td valign="middle" align="center" ><div class="hash">{{_item.nodename}}</div></td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </div>
            </div>
        </div>
    </div>
 </div>   
        
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import TopNav from './topNav/topNav.vue';
import i18n from '@/locale';
import { mapGetters, mapActions } from "vuex";
import Utils from '@/utils/index';
import BarChart1Png   from '@/assets/images/public/BarChart1.png';
import BarChart2Png   from '@/assets/images/public/BarChart2.png';
import BarChart3Png   from '@/assets/images/public/BarChart3.png';
import BarChart4Png   from '@/assets/images/public/BarChart4.png';
import BarChart5Png   from '@/assets/images/public/BarChart5.png';
import MapPng         from '@/assets/images/public/Map.png';
import smartxLogoPng  from '@/assets/images/public/smartx-logo.png';
   
@Component({
    components:{
        TopNav
    },
    methods:{
        ...mapActions([
            'globalInfoRequestAction',
            'getLatestBlockRequestAction',
            'getGlobalNodeDistInfoRequestAction',
            'getLatestBlockHeightRequestAction',
            'getAccountTransactionsRequestAction',
            'getAccountTransactionsDetailRequestAction',
            'getbalanceRequestAction',
            'getTXBlockRequestAction'
        ])
    }
})
export default class Generalization extends Vue {
    private getSmartxLogoPng:any     = smartxLogoPng;

    /** 用户输入的地址; */
    private addressParms:String = '';
    /** 图片 */
    private getBarChart1Png = BarChart1Png;
    private getBarChart2Png = BarChart2Png;
    private getBarChart3Png = BarChart3Png;
    private getBarChart4Png = BarChart4Png;
    private getBarChart5Png = BarChart5Png;
    private getMapPng       = MapPng;

    /** 获取的概览的字段 */
    private topList:Object = {};
    /** 最近出块 */
    private tableList:Array<object> = [];
    /** 节点分布 */
    private nodeDistInfoList:Array<object> = [];
    /** 交易信息 */
    private accountTransactionsDetail:any = null;
    /** 查询地址 */
    private accountTransactionsList:any = null;
    /** 当前选中的区块 */
    private selectIndex:any = null;
    /** 是否显示默认列表 */
    private isShowDefalutTable:boolean = false;
    /** 是否显示交易列表 */
    private isShowJyTable:boolean = false;
    /** 是否显示地址列表 */
    private isShowDzTable:boolean = false;
    private exchangeRateRatio: any = 10000;
    /** 判断返回的btype类型是main还是txs */
    private isSmartxMain: boolean = false;

    private mctxlist: boolean = false;

    private titleBar: string = '';
    /** 头部筛选下拉框 */
    private selectAll:Array<object> = [];

    /** 初始化函数 */
    private mounted():void
    {
        this.changeLangEvent();
        (async()=>{
            /** 基础的一些数据 */
            this.topList   =  await this['globalInfoRequestAction']();
            /** 最近出块 */
            let _res =  await this['getLatestBlockRequestAction']();
            if(_res){
                this.tableList = _res;
                this.isShowDefalutTable = true;
            }
        })();
    }

    private changeLangEvent():void
    {
        this.titleBar = this['$setI18n']('lang_br_LastBlock','最新出块');
        this.selectAll = [{
            text: this['$setI18n']('lang_br_allScreening','全部筛选'),
            index: 0,
            state: 1
        },{
            text: this['$setI18n']('lang_br_address','地址'),
            index: 1,
            state: 0
        },{
            text: this['$setI18n']('lang_br_transaction','交易'),
            index: 2,
            state: 0
        }];
    }

    /** 搜索 */
    private async handleSearch():Promise<any>
    {
        if (this.addressParms == '') {
            this.$Message.warning('Please input anything!');
            return;
        }

        let _select = this.selectAll.filter(_item=> _item['state'] == 1);
        this.selectIndex = _select[0]['index'];
        //alert(this.selectIndex);

        if (this.selectIndex == 0) {
            /** 获取全网高度 */
            let _height = await this['getLatestBlockHeightRequestAction']();
            try {
                //先查主块
                this.mctxlist = false;
                this.isSmartxMain = false;
                this.isShowJyTable = true;      // 显示单个主块css显示
                this.isShowDzTable = false;   // 控制账户显示
                this.isShowDefalutTable = false;// 显示所有主块css显示
                this.titleBar = this['$setI18n']('lang_br_transactionDetails','交易详情');
                // 请求主块失败抛出异常
                this.accountTransactionsDetail =  await this['getAccountTransactionsDetailRequestAction'](this.addressParms);
                /** 判断btype是否为main类型，还是Txs类型 */
                if (this.accountTransactionsDetail && this.accountTransactionsDetail.btype) {
                    this.isSmartxMain = this.accountTransactionsDetail.btype == 'SMARTX_MAIN' ? true : false;
                }

                this.mctxlist = true;

            } catch(err) {
                //如果主块查不到 查交易块
                try {
                    this.mctxlist = false;
                    this.isSmartxMain = false;
                    this.isShowJyTable = true;      // 控制单个主块css显示

                    let _res = await this['getTXBlockRequestAction'](this.addressParms);
                    this.accountTransactionsDetail = _res;
                }
                catch(err) {

                    // 查账户
                    this.mctxlist = false;
                    this.isShowJyTable = false;
                    this.isShowDefalutTable = false;
                    this.isShowDzTable = true;      // 控制账户

                    let _res =  await this['getAccountTransactionsRequestAction']({
                        height: 0,
                        address: this.addressParms
                    });

                    let _money =  await this['getbalanceRequestAction'](this.addressParms);
                    if (_money) {
                        this.titleBar = this['$setI18n']('lang_br_allBalanse','全部余额: ')  + _money.available/this.exchangeRateRatio;
                    } else {
                        this.titleBar = this['$setI18n']('lang_br_allBalanse','全部余额: ') + '--';
                    }

                    if(_res){
                        this.accountTransactionsList = _res.transactionList;
                    }
                }
            }
        } else {
            // 这里是账户查询了 因为主块和交易都查不到
            /** 如果选中的是地址查询 */
            if (this.selectIndex == 1) {
                this.mctxlist = false;
                this.isShowJyTable = false;
                this.isShowDzTable = true;
                this.isShowDefalutTable = false;

                /** 获取全网高度 */
                let _height = await this['getLatestBlockHeightRequestAction']();

                let _res =  await this['getAccountTransactionsRequestAction']({
                        height: _height,
                        address: this.addressParms
                });

                if (_res) {
                    this.accountTransactionsList = _res.transactionList;
                }

            /** 如果选中的是交易查询 */
            } else if (this.selectIndex == 2) {
                this.mctxlist = false;
                this.isShowJyTable = true;      // 控制单个主块css显示
                this.isShowDzTable = false;
                let _res = await this['getTXBlockRequestAction'](this.addressParms);
                this.accountTransactionsDetail = _res;
                this.isSmartxMain = false;
            }
        }
    }

    /** 跳到对应的钱包地址 */
    private handleGotoAddressInfor(): void
    {
        this.$router.push({ path: '/browser/addressInformation', query:{ 'address': String(this.addressParms)}});
    }

    /** 切换下拉框 */
    private handleClickSelect(_index:number)
    {
        let _emtry:Array<object> = [];
        this.selectAll.forEach(_item=>{
           if (_index == _item['index']) {
              _item['state'] = 1;
           } else {
              _item['state'] = 0;
           }
        });
        this.selectAll = _emtry.concat(this.selectAll);
        console.log(this.selectAll);
    }

    private formatTime(_time, _format)
    {
      //console.log(Utils['formatTime'](new Date(parseInt(_time)), _format));
      return Utils['formatTime'](new Date(parseInt(_time)), _format);
    }
}

</script>

<style lang="scss">
    @import 'generalization';
</style>
