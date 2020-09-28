<template>

    <div class="smart_container">
        
        <router-view/>

    </div>

</template>

<script>

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import { mapGetters, mapActions } from "vuex";

import '@/utils/jsPlugins/flexible.min.js';

@Component
export default class Index extends Vue {

  
}

</script>

<style lang="scss">
    @import 'index';
</style>