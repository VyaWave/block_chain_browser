<template>

    <div class="smart_container_rightBlock  smart_walletLogin_container">

        <TopNav />

        <div class="smart_container_rightBlock_title">创建或登录钱包</div>

         <div class="smart_container_block web_marginBottom50">

            <div class="mv2">
                <label>
                    <div class="radio" :class="myFile != null && isCreateWallet == false ? 'radio_active':''"></div>
                    Load wallet from file
                    <input class="fileClip" type="file"  @change="addFileJson" ref="inputFile" id="load"/>
                </label>
            </div>

            <div class="mv2">
                <label @click="createWallet">
                    <div class="radio" :class="isCreateWallet == true ? 'radio_active':''"  @click="handleClickRadio"></div>
                    Create new wallet file
                </label>
            </div>

            <div class="web_block web_marginTop20" v-if="isLoadWallet == true && isCreateWallet == false">
                <div class="mv3">
                    <label class="fw7 f6">
                        Password:
                    </label>
                    <div class="inputTextBlock">
                        <input key="password" id="password" type="password" autocomplete="off" v-model="pwd" class="inputText"/>
                    </div>
                </div>

                <div class="mv4 web_marginTop20">
                    <button @click="loadWalletFromFile">Load wallet</button>
                    <span class="ml2 dark-red"></span>
                </div>
            </div>


            <div class="web_block" v-if="isCreateWallet == true && isLoadWallet == false">
               <div class="mv3 web_marginTop20">
                    <label class="fw7 f6">
                        Password:
                    </label>
                    <div class="inputTextBlock">
                        <input key="password" id="password" type="password" autocomplete="off" v-model="pwd" class="inputText"/>
                    </div>
               </div>

                <div class="mv3 web_marginTop20">
                    <label class="fw7 f6">
                        Repeat password
                    </label>
                    <div class="inputTextBlock">
                        <input key="password2" id="password2" type="password" autocomplete="off" v-model="pwd2" class="inputText"/>
                    </div>
                </div>

                <div class="mv3 web_marginTop20">
                    <label class="fw7 f6">
                        <div class="checkBox" @click="handleClickCheckBox" :class="isImportKey == true ? 'checkBox_active':''"></div>
                        Import keys
                    </label>
                </div>
                <div class="mv3 web_marginTop20" v-if="isImportKey == true">
                    <label class="fw7 f6">
                        <div class="web_block">Private keys</div>
                        <div class="web_block web_marginTop10">
                            <textarea class="w-100 textAreaText web_marginTop10" id="privateKeys" v-model="privKey" />              
                        </div>
                    </label>
                </div>

                <div class="mv4 web_marginTop20" v-if="isCreateWallet == true">
                    <button @click="createWallet">
                    Create new wallet and save the file!
                    </button><span class="ml2 dark-red"></span>
                </div>
          </div>
       </div>   
    </div>
</template>

<script lang="ts">

    import Vue from 'vue';
    
    import Component from 'vue-class-component';

    import { Buffer } from 'buffer';

    import {Password} from '../../lib/password';

    import {readInputFile} from '../../lib/utils';

    import TopNav from './topNav/topNav.vue';

    import {
        getKey,
        createNewWallet,
        Wallet,
        WalletState,
        validateWallet,
        validatePassword,
        GlobalLoadedWallet,
    } from "../../model/wallet";

    @Component({
        components:{
            TopNav
        }
    })
    export default class WalletLogin extends Vue {

        /** 是否正在加载钱包 */
        private isLoadWallet:Boolean  = false;

        /** 是否正在创建钱包 */
        private isCreateWallet:Boolean = false;

        /** 是否导入key */
        private isImportKey:Boolean    = false;

        /** 存储file对象 */
        private myFile:any = null;

        private pwd:string     ='';

        private pwd2:string    ='';

        private privKey:string ='';

        /** 点击切换添加钱包的单选按钮 */
        private handleClickRadio():void{

            if(this.isCreateWallet == false){

                this.isCreateWallet = true;
                this.isLoadWallet   = false;
            }else{

                this.isCreateWallet = false;
                this.isLoadWallet   = true;
            }
        }


        /** 切换复选 */
        private handleClickCheckBox():void{
          
          if(this.isImportKey == false){

                this.isImportKey = true;
           }else{

                this.isImportKey = false;
           }
        }

       /** 下载钱包 */
       private funDownload(content, filename):void {
            // 创建隐藏的可下载链接
            let eleLink = document.createElement('a');
            eleLink.download = filename;
            eleLink.style.display = 'none';
            // 字符内容转变成blob地址
            let blob = new Blob([content]);
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);

            console.log("download the wallet - sxh");
       };

       /** 加载json文件 */
       private addFileJson(){

           let _inputDOM = this.$refs.inputFile;

           // 通过DOM取文件数据
           let _files = _inputDOM['files'];

           if(_files.length > 1){
            
              alert('一次最多只能加载一个文件');
              return;
           }

           /** 存储这个file对象; */
           this.myFile = _files[0];

           /** 显示输入密码 */
           this.isLoadWallet = true;

           this.isCreateWallet = false;
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
        private createWallet ():any {
            console.log("create new wallet clicked");
            console.log("password 1" + this.pwd + " password 2 " + this.pwd2);

            // 检查密码是否相等
            const password = new Password(this.pwd);
            const password2 = new Password(this.pwd2);

            if (!password.equals(password2)) {
                //TODO: UI上提示用户两次输入的密码不一致
                console.log("password do not match")
                return null;
            } else if (password.isEmpty()) {
                //TODO: UI上提示用户密码不能为空
                console.log("password is empty")
                return null;
            } else {
                console.log("password equals")
            }

            // 生成测试网的钱包
            console.log("11111");

            // TODO: createNewWallet的第二个参数，需要请求info接口获取，这里暂时写死成 testnet
            const wallet = createNewWallet(password,'TESTNET',this.privateKeysOfTextarea());

            console.log("11112");
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

            return wallet;
        }

        // 读取钱包
        loadWalletFromFile() :any {

            console.log('load wallet clicked ');

            this.inputFileById('load').then((file)=>{

                // 校验钱包文件是否合法
                console.log("get file json " + file);

                try{
                    //TODO:testnet这里写死了，需要请求接口获取到main
                    const wallet:Wallet = validateWallet(file, "TESTNET");

                    // 检查用户输入的密码是否合法
                    const password = new Password(this.pwd);
                    const walletState = validatePassword(wallet,password);

                    // 打印钱包信息
                    // TODO:这里仅仅为了演示如何拿到用户的私钥，正式发布代码时需要去掉这段代码
                    const key = getKey(walletState,0);
                    const hexEncodePrivKey = Buffer.from(key.getPrivateKey().buffer).toString('hex');
                    const hexEncodePubKey = Buffer.from(key.getPublicKey().buffer).toString('hex');
                    console.log("create new wallet private key is " + hexEncodePrivKey);
                    console.log("create new wallet pub key is " + hexEncodePubKey);

                    //TODO:这个全局对象需要有一种类似于cookie的机制，用户退出web钱包后，这个对象也需要被清理
                    GlobalLoadedWallet.setWalletState(walletState);

                    //跳转到发送页面，测试一下读取到的钱包是否有效
                    //TODO:真正上线的时候，应该跳转到账户信息页面而不是发送页面
                    this.$router.push({path: '/brower/sendRawTransaction'});

                    return wallet;

                }catch (e) {
                    console.log('load wallet file failed' + e.msg);
                    throw e;
                }
            });
            return null;
        }
    }

</script>

<style lang="scss">
    @import 'walletLogin';
</style>