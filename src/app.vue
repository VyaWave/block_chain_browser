<template>
  <div id="app" style="height:100vh;width:100%;">
    <router-view />
  </div>
</template>

<script lang='ts'>

   import { Vue, Component } from "vue-property-decorator";

   import Utils from '@/utils/index';

   /** 获取所有的getter的名字数组 */
   const _GettersNameArray = require.context("@/store/getters", true, /.ts$/);

   /** 获取所有的action的名字数组 */
   const _ActionsNameArray = require.context("@/store/actions", true, /.ts$/);

   @Component
   export default class App extends Vue {

        private mounted():void {
          
            /** 把所有函数名字打入到Storage中 */
            Utils['setSessionStorage']('gettersName', JSON.stringify(Utils['exportFileFunName'](_GettersNameArray)));

            Utils['setSessionStorage']('actionsName', JSON.stringify(Utils['exportFileFunName'](_ActionsNameArray)));
        }
   }


</script>
<style lang="scss">
@import "app";
</style>


