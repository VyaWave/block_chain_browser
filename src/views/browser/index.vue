<template>
    <div class="smart_container">
        <router-view  class="smart_container_right"/>
    </div>
</template>

<script>

import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import { mapGetters, mapActions } from "vuex";

import SideMenu from './sideMenu/sideMenu';

@Component({
    components:{
        SideMenu
    }
})
export default class Index extends Vue {

}

</script>

<style lang="scss">
    @import 'index';
</style>
