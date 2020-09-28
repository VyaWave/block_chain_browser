<template>
    <Toast v-model="isShow" :data="toast"/>
</template>

<script lang="ts">

import { Vue, Component , Watch } from 'vue-property-decorator';

import { mapGetters, mapActions }  from 'vuex';

/** 弹窗插件 */
import { Toast } from 'vue2-dialog';

/** 弹窗插件样式 */
import 'vue2-dialog/dist/VueDialog.css';

@Component({
    components:{
        Toast
    },
    computed:{
        ...mapGetters(['getToast'])
    },
    methods:{
        ...mapActions(['showToastAction','hideToastAction'])
    }
})
export default class ToastComponent extends Vue {
    
    /**
     *          key	value	description	required	default
                time	[Number]	control the time of the Toast	No	500
                content	[String] or [HTML Tag]	content of the Toast	Yes	/
                type	[String]	how to show Toast,has 12 types	No	default
                --------top	slide from the top
                        bottom	slide from the bottom
                        default	show on the window of 30%
                        middle	show on the window of 50%
                        succes	show with success icon
                        fail	show with fail icon
                        warn	show with warn icon
                        text	show with lots of words
                        loading-circle	show with a circle loading
                        loading-ball	show with a ball loading
                        loading-wave	show with a wave loading
                        mini-loading	show with a mini loading
    */
    private isShow:boolean = false;

    private toast:object   = {};

    @Watch('getToast', { immediate: true, deep: true })
    onChangeForGetToast(_new:object, _old:object){

        if(_new != undefined){
                 
            this.isShow           = _new['isShow']; 
            this.toast['time']    = _new['time'];
            this.toast['type']    = _new['type'];
            this.toast['content'] = _new['content']; 
        }
    }  
}
</script>

<style lang="scss">
    @import 'toast.component';
</style>