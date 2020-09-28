/*********************************************************************
 *
 *                          路由的配置
 *
 ********************************************************************/
'use strict';

   /**
     *  isNoRequiredLogin:true
     * 
     * 设置不需要登录的页面
     * 
     * 登录模块：    
     * 
     * 修改密码模块：
     * 
     * 注册账号模块： 
     * 
    */

export default [
   {

      /*************************** /////////钱包模块///////// ***************************/
      name:'',
      path: '',
      meta: {
         name: '',
         title: '',
         isShow: false,
      },
      component: require('@/views/index.vue').default,

      children: [

         /*************************** 钱包模块 *****************************/
         {
            path: '/',
            name: '/',
            component: require('@/views/wallet/index.vue').default,
            meta: {
               title: '钱包',
            },
            isNoRequiredLogin:true,

            children:[{
               path: '/',
               name: '/wallet/index',
               component: require('@/views/wallet/wallet.vue').default,
               meta: {
                   title: '钱包',
               },
               isNoRequiredLogin:true,
            },{
               path: '/wallet',
               name: '/wallet/index',
               component: require('@/views/wallet/wallet.vue').default,
               meta: {
                   title: '钱包',
               },
               isNoRequiredLogin:true,
            }]
         }, 

         /*************************** 浏览器模块 *****************************/
         {
            path: '/browser',
            name: 'browser',
            component: require('@/views/browser/index.vue').default,
            meta: {
               title: '首页',
            },
            isNoRequiredLogin:true,

            children:[{
               path: '/browser',
               name: 'generalization',
               component: require('@/views/browser/generalization.vue').default,
               meta: {
                  title: '概览',
               },
               isNoRequiredLogin:true,
            },
            {
               path: '/browser/transactionRecord',
               name: 'transactionRecord',
               component: require('@/views/browser/transactionRecord.vue').default,
               meta: {
                  title: '交易块记录',
               },
               isNoRequiredLogin:true,
            },
            {
                  path: '/browser/transactionDetails',
                  name: 'transactionDetails',
                  component: require('@/views/browser/transactionDetails.vue').default,
                  meta: {
                     title: '交易详细信息',
                  },
                  isNoRequiredLogin:true,
            }, 
            {
                  path: '/browser/addressInformation',
                  name: 'addressInformation',
                  component: require('@/views/browser/addressInformation.vue').default,
                  meta: {
                     title: '地址信息',
                  },
                  isNoRequiredLogin:true,
            },  
            {
               path: '/browser/mcMainBlockInformation',
               name: 'mcMainBlockInformation',
               component: require('@/views/browser/mcMainBlockInformation.vue').default,
               meta: {
                  title: 'Mc主块信息',
               },
               isNoRequiredLogin:true,
            }]
         }
      ],
   }
];


