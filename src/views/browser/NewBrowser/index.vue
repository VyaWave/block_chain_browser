<template>
  <el-container class="container">
    <Nav/>
    <el-main>Main</el-main>
    <el-footer style="padding: '0'; height: '40px'">
      <Footer/>
    </el-footer>
  </el-container>
</template>


<script lang="ts">
import Nav from './Nav.vue'
import Footer from './Footer.vue'


import { Vue, Component, Prop, Watch } from "vue-property-decorator";
  @Component({
    components:{
      Nav,
      Footer
    }

  })
export default class NewBrowser extends Vue {


  }
</script>

<style lang="scss" scoped>

.container {
  height: 100%;
  width: 100%;

  .el-footer {
    height: 40px;
    padding: 0;
  }
}
</style>
