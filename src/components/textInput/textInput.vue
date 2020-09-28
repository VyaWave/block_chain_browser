<template>

    <div class="camchat_block camchat_relative">

        <div class="camchat_inputBlock" :class="inputBottomLine">
           
            <input :type="tempType" :value="value"  :placeholder="placeholder" @input="handleInput($event.target.value)" @blur="handleBlur" :maxlength="max" @keyup="keyup"/>
 
            <div :class="btnTypeClassName" @click="handleClick"></div>
        </div>

        <div class="inputErrorTips" v-if="isError">{{ error }}</div>

    </div> 
</template>

<script lang='ts'>

   import { Vue, Component, Prop } from 'vue-property-decorator';

   @Component
   export default class TextInput extends Vue {
        
        /*** 文本域类型; */
        @Prop({
            type:String,          //父组件传递给子组件的数据类型;
            required:true,        //是否必填;
            default: 'text',      //默认值;
        }) type!: String;

        /** 文本默认显示文本 */
        @Prop({
            type:String,          //父组件传递给子组件的数据类型;
            required:true,        //是否必填;
            default: '',          //默认值;
        }) placeholder!: String;

        /** 文本域出现错误的文本 */
        @Prop({
            type:String,          //父组件传递给子组件的数据类型;
            required:true,        //是否必填;
            default: '',          //默认值;
        }) error!: String;

        @Prop({
            type:Boolean,         //父组件传递给子组件的数据类型;
            required:true,        //是否必填;
            default: '',          //默认值;
        }) isError!: Boolean;

        /*** 最大输入字符数量; */
        @Prop({
            type:Number,          //父组件传递给子组件的数据类型;
            required:false,        //是否必填;
            default: 50,      //默认值;
        }) max!: Number;

        @Prop({
            type:String,          //父组件传递给子组件的数据类型;
            required:false,        //是否必填;
            default:'',      //默认值;
        }) value!: String;

        /** 临时类型变量 */
        private tempType:String = '';

        /** 文本域中的内容; */
        // private value:String = '';

        /** 文本后面的按钮的样式类型; */
        private btnTypeClassName:String = '';

        /** 文本域底部线条样式; */
        private inputBottomLine:String  = '';

        /** 初始化函数 */
        private mounted():void {
            
             this.tempType = this.type;

             if(this.type == 'text'){

                this.btnTypeClassName =  'closeBtn';
                
             }else if(this.type == 'password'){

                this.btnTypeClassName =  'eyeBtn';

             }
        }

        private keyup():void{
            this.$emit('keyup');
        }

        /** 光标点击时候触发; */
        private handleInput(val):void{

            /** 如果字符个数大于0 */
            if(val.length > 0){

                this.inputBottomLine = 'inputBottomLine';
            }

            this.$emit('getInputValue', val);
        }

        /** 光标移开时候触发 */
        private handleBlur():void{

            this.inputBottomLine = '';
        }

        /** 鼠标点击触发 */
        private handleClick():void{

            /** 当是文本域的时候，这个按钮的功能就是清空文本域中的内容; */
            if(this.type == 'text'){
                
            //    this.value = '';
               this.inputBottomLine = '';
               this.$emit('isError',false);
            
            /** 如果文本域是密码类型的时候 */
            }else if(this.type == 'password'){

                 if(this.tempType == 'password'){

                      this.tempType =  'text';
                      this.btnTypeClassName =  'eyeBtn eyeBtn_active';

                 }else{

                      this.tempType =  'password';
                      this.btnTypeClassName =  'eyeBtn';
                 }
               
            }

        }
   }

</script>

<style lang="scss">
    @import 'textInput';
</style>