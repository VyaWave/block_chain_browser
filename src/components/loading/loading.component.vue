<template>
   
      <div class="camchat_loadingWindow" v-if="isShow == true">
        <div class="camchat_loading" :class="isShow == true ? 'ani-fadein':''">
            <div class="container animation-2">
                   <div class="shape shape1"></div>
                   <div class="shape shape2"></div>
                   <div class="shape shape3"></div>
                   <div class="shape shape4"></div>
            </div>
            <div class="camchat_loadingTips">Loading...</div>
        </div>
        <div class="camchat_windowTips_mesk"></div>
      </div>
    
</template>

<script lang="ts">

import { mapGetters } from 'vuex';

export default {

    name: 'loading',

    watch:{
      'getIsShowLoading':{
          handler(_new, _old){

              if(_new != undefined){
                 this['isShow'] = _new
              }
          },
          immediate: true,
          deep: true
      }
    },

    computed:{
         ...mapGetters(['getIsShowLoading'])
    },

    data():any{
      return{
         isShow: false,
      }
    }
}
</script>
<style lang="scss">
    @import 'loading.component';
</style>