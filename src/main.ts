
/*********************************************************************
 *
 *                            入口函数
 *
 ********************************************************************/
'use strict';
import Vue from 'vue';
import router from '@/router/router';
import store from '@/store/index';
import App from './app.vue';

import ElementUI from 'element-ui';

Vue.use(ElementUI);

import axios  from 'axios';

/** 导入基础配置 */
import BaseConfig from '@/config/base.config';

import i18n from '@/locale'; // 引入vue-i18n

import Iview from 'view-design';

/** 导入iview样式 */
import 'view-design/dist/styles/iview.css';

Vue.use(Iview);

Vue.config.productionTip = false;


/** 开发环境 */
if(process.env.NODE_ENV === 'development'){

      // 都没就默认正式环境接口地址
      //BaseConfig.baseUrl.dev = 'https://testnet2.smartx.one';

      // 内网
      // BaseConfig.baseUrl.dev = "http://192.168.1.101:5000";

      // 外网
      BaseConfig.baseUrl.dev = "http://152.32.189.195:5000";

      new Vue({
            i18n,
            router,
            store,
            render: (h) => h(App),
     }).$mount('#app');

}else{

      /** 如果是打包环境，需要把apk包路径和baseConfig中的路径按域名分配到对应的环境中执行; */
      axios.get('/url.json?v='+ Math.random()).then(response => {

            if(response.status == 200){

                  BaseConfig.baseUrl.pro = response.data.url;

                  new Vue({
                        i18n,
                        router,
                        store,
                        render: (h) => h(App),
                  }).$mount('#app');
            }
      })

}






