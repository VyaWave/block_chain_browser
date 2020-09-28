<template>
    <div class="smart_container_rightBlock">

        <TopNav />

        <div class="smart_container_rightBlock_title">交易详细信息</div>

        <div class="smart_container_qkMessageBlock">
            <div class="smart_container_qkMessageBlock_left">交易区块</div>
            <div class="smart_container_qkMessageBlock_right">{{ nowHash }}</div>
        </div>

        <div class="smart_container_jy_table">
            <table border="0" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td>区块高度</td>
                        <td>{{ accountTransactionsDetail.height ? accountTransactionsDetail.height: '' }}</td>
                    </tr>
                    <tr>
                        <td>区块难度</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>矿工</td>
                        <td>{{ accountTransactionsDetail.address ? accountTransactionsDetail.address: '' }}</td>
                    </tr>
                    <tr>
                        <td>区块哈希</td>
                        <td><span class="blueText">{{ accountTransactionsDetail.address ? accountTransactionsDetail.address: '' }}</span></td>
                    </tr>
                    <tr>
                        <td>手续费</td>
                        <td>{{ accountTransactionsDetail.fee ? accountTransactionsDetail.fee: ''}}</td>
                    </tr>
                    <tr>
                        <td>随机数</td>
                        <td>{{ accountTransactionsDetail.random ? accountTransactionsDetail.random: ''}}</td>
                    </tr>
                    <tr>
                        <td>时间戳</td>
                        <td>{{ accountTransactionsDetail.timestamp ? accountTransactionsDetail.timestamp: ''}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import TopNav from './topNav/topNav.vue';

import { mapGetters, mapActions } from "vuex";

import Utils from '@/utils/index';


@Component({
    components:{
        TopNav
    },
    methods:{
        ...mapActions([
            'getAccountTransactionsDetailRequestAction',
        ])
    }
})
export default class TransactionDetails extends Vue {
    
    /** 交易列表 */
    private accountTransactionsDetail:Object = [];

    /** 当前交易区块 */
    private nowHash:string = '';

    /** 初始化函数 */
    private mounted():void {


        let _hash = Utils['getUrlParam']('hash');

        if(_hash =='' || _hash == undefined){

           let r = window.confirm('您当前页面没有对应的hash值');

           if(r==true){

               this.$router.push({path:'/brower/transactionRecord'});
           }

           return;
        }

        (async()=>{

          this.nowHash = _hash;  

          this.accountTransactionsDetail =  await this['getAccountTransactionsDetailRequestAction'](_hash);

          console.log(this.accountTransactionsDetail);

       })();

    }
}

</script>

<style lang="scss">
    @import 'transactionDetails';
</style>