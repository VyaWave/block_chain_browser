
/*********************************************************************
 *
 *                          路由的配置
 *
 ********************************************************************/
'use strict';

import Vue from 'vue';

import Router from 'vue-router';

import i18n from '@/locale';

import RouterConfig from '@/config/router.config';

import BaseConfig from '@/config/base.config';

import Utils from '@/utils/index';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: RouterConfig
});

 /** 不需要登录的路由数组 */
 let _noRequiredLoginRouter:Array<object> = [];

 /** 把不需要的路由全部放到_noRequiredLoginRouter这个数组中; */
 Utils['loopRouter'](RouterConfig, 'isNoRequiredLogin', (_res)=>{
   
     _noRequiredLoginRouter.push(_res['name']);
 });

 /** 把这些不需要登录也能跳转的路由名字存到sessionStorage中 */
 Utils['setSessionStorage']('noRequiredLoginRouter', JSON.stringify(_noRequiredLoginRouter));


/**
 * 设置不需要登录的页面
 * BaseConfig['noLoginRequired']
 */
router.beforeEach((to, from, next) => {

      console.log('路由切换到 : ' + to.name);

      /** 路由的名字; */
      let _name: any = to.name;

      i18n.locale = Utils['getSessionStorage']('lang') ? Utils['getSessionStorage']('lang'): 'en-US';

      // /** 获取存储在本地的token值; */
      // let token = Utils['getSessionStorage'](BaseConfig['tokenKey']);


      // /** 未登陆且要跳转的是不需要登录验证的页面 */
      // if (!token && _noRequiredLoginRouter.indexOf(_name) > -1){

      //     /** 正常跳转 */
      //     next();    

      // /** 未登录且要跳转的页面是需要登录验证的 */  
      // }else if(!token && _noRequiredLoginRouter.indexOf(_name) == -1){

      //     /** 跳转到登录页 */
      //     next({
      //       name: BaseConfig.loginRouterName     
      //     });

      // /** 已登录且要跳转的页面是登录页 */
      // }else if(token && _noRequiredLoginRouter.indexOf(_name) > -1){

      //     /** 跳转到homeName页 */
      //     next({
      //       name: BaseConfig.homeRouterName
      //     });
      
      // }

      next();
      
});

router.afterEach(to => {

    window.scrollTo(0, 0);

});

export default router;

