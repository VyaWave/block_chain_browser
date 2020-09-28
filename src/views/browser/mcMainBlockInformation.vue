<template>

    <div class="smart_container_rightBlock">

        <TopNav />

        <div class="smart_container_rightBlock_title">
            Mc主块信息列表
        </div>

        <div class="smart_container_qkMessageBlock">
            <div class="smart_container_qkMessageBlock_left">最新主块</div>
        </div>


        <div class="smart_tableForAdress">
            <div class="border">
                <div class="border-scroll">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th width='200' align='left' class="textIndent">高度</th>
                                <th align='left' >哈希</th>
                                <th align="left">矿工</th>
                                <th align="center">难度</th>
                                <th width='100' align="center">手续费上限</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="(_item,_index) in mcList"
                                :key="_index"
                                @click="handleGotoDetail(_item)">
                                <td valign="middle">
                                    <div class="lis">
                                        <div class="header"><img :src="getBlackLogoPng" /></div>
                                        <div class="content">
                                           {{_item.height ? _item.height: ''}}
                                        </div>
                                    </div>
                                </td>
                                <td valign="middle">
                                    <div class="labelLis">
                                        <div class="label">
                                           
                                            <span class="span2">
                                                 {{_item.hash ? _item.hash: ''}}
                                            </span>
                                        </div>
                                        
                                    </div>
                                </td>

                                <td valign="middle">
                                    <div class="labelLis">
                                        <div class="label">
                                            
                                            <span class="span2 blue">
                                                {{_item.address ? _item.address: ''}}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td valign="middle" align='center'>
                                    {{_item.difficulty ? _item.difficulty: ''}}
                                </td>

                                <td valign="middle" align='center'>
                                    {{_item.fee ? _item.fee: ''}}
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

/** 加载图片 */
import blackLogoPng  from '@/assets/images/public/logo.png';

@Component({
    components:{
        TopNav
    },
    methods:{
        ...mapActions([
            'getLatestMcBlockRequestAction',
        ])
    }
})
export default class McMainBlockInformation extends Vue {

    /** 图片 */
    private getBlackLogoPng:any      = blackLogoPng;
    
    private mcList:Array<any> = [];

    /** 初始化函数 */
    private mounted():void {

        (async()=>{

           this.mcList = await this['getLatestMcBlockRequestAction']();

           console.log(this.mcList);
        })();
    }

    /** 切换到交易详情页 */
    private handleGotoDetail(_item:object):void{

        this.$router.push({path: '/brower/transactionDetails', query:{hash: _item['hash']}})
    }
}

</script>

<style lang="scss">
    @import 'mcMainBlockInformation';
</style>
