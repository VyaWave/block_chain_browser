<template>
    <div class="smart_container_rightBlock  smart_sendRawTransAction_container">

        <TopNav />

        <div class="smart_container_rightBlock_title">发送交易</div>

        <div class="smart_container_block">
           
            <div class="mv3">
               <label class="fw7 f6">
                   From:
               </label>
               <div class="inputTextBlock web_marginTop10 inputTextBlockBlueFont">
                    {{ from }}
               </div>
            </div>


            <div class="mv3 web_marginTop20">
                <label>
                    To
                </label>
                <div class="inputTextBlock">
                    <input id="to" autocomplete="off" v-model="to" class="inputText"/>
                </div> 
            </div>

            <div class="mv3 web_marginTop20">
                <label>
                    Amount
                </label>
                <div class="inputTextBlock">
                    <input type="number" id="amount" autocomplete="off" v-model="amount" class="inputText"/>
                </div> 
            </div>

            <div class="mv4 web_marginTop20">
                    <button @click="sendRawTransaction">sendTx </button>
                    <span class="ml2 dark-red"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from 'vue';

    import Component from 'vue-class-component';

    import {Buffer} from 'buffer';

    import {getKey, GlobalLoadedWallet, WalletState} from "../../model/wallet";

    import TopNav from './topNav/topNav.vue';

    import {Key} from 'smartxjs';

    import {exec} from '../../lib/api';

    interface TransferNonce{
        nonce: string;
        timestamp: string;
        random: string;
    }

    @Component({
        components:{
            TopNav
        }
    })
    export default class SendRawTransaction extends Vue {

        private from:string = '';

        private to:string   = '';

        private amount:number = 0;

        private key:any;

        // 请求服务器后端获取nonce和timestamp
        private async getTransferNonce():Promise<any>{

           return exec('GET','http://120.132.102.139:5171/v1.0.0/transaction/transfernonce');
            
        }

        /** 初始化函数 */
        private mounted():void {
            
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

            this.from =  this.key.toAddressHexString()
        }

        private sendRawTransaction():void{

            //要求用户确认交易
            const confirmed = window.confirm(
                `Are you sure you want to transfer 1 to  aaa ?`,
            );

            //打包交易
            if (confirmed) {

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
                        //signstr += txNonce.timestamp;
                        signstr += "1";
                        signstr += '-';
                        signstr += address;
                        signstr += '-';
                        //signstr += txNonce.nonce;
                        signstr += "1";
                        signstr += '-';
                        signstr += random;
                        signstr += from;
                        signstr += '-';
                        signstr += this.to;
                        signstr += '-';
                        signstr += amount;

                        let sign:string = Buffer.from(this.key.sign(Buffer.from(signstr)).toBytes().buffer).toString('hex')

                        console.log('hex encode sign is ' +sign);
                        let raw:string = JSON.stringify({btype: btype, timestamp: "1", address: address, nonce: "1", random: random, from: address, to: this.to, amount: amount, sign: sign});
                        console.log('encode raw transaction is ' + raw);
                        raw = encodeURI(raw)

                        exec('POST', `http://120.132.102.139:5171/v1.0.0/transaction/raw?raw=${raw}`)
                        //TODO:请求后端/transaction/raw接口
                })();
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import 'sendRawTransaction';
</style>