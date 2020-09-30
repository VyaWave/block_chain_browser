<template>
  <div class="footer-bottom">
    <p class="mobile">
      © 2020 SmartX Community.
    </p>

    <div class="pc" v-show="false">
      <span>
        © 2020 SmartX Community.
      </span>

      <div>
        22
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

.footer-bottom {

  height: 100%;
  background: #212832;

  line-height: 40px;

  .mobile {
    color: #878787;
    font-size: 16px;
    text-align: center;
  }

   @media only screen and (max-width:750px){

   }
}

</style>
