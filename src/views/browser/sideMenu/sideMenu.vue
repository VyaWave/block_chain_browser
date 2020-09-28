
 <template>
  <div class="smart_sideMenu">
      <div class="smart_logo"></div>
      <div class="smart_nav">
         <div class="lis" @click="handleGotoIndex">{{$setI18n('lang_br_home','首页')}}</div>
         <div class="lis" @click="handleGotoWallet">{{$setI18n('lang_br_blockTransaction','区块交易')}}</div>
      </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import { mapGetters, mapActions } from "vuex";

@Component
export default class SideMenu extends Vue {

  @Prop({ default: "light" }) readonly theme!: string;

  /** 刷新本页 */
  private handleGotoIndex():void{

      this.$router.push({path: '/browser'});

      window.setTimeout(()=>{

           window.location.reload();

      },600);
     
      
  }

  /** 跳钱包登录页面 */
  private handleGotoWallet():void{

      this.$router.push({path: '/browser/transactionRecord'});
  }
  
}
</script>

<style lang="scss">
@import "sideMenu";
</style>

