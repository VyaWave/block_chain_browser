/*********************************************************************
 *
 *                          axios扩展;
 *
 *********************************************************************/
'use strict';

import axios from 'axios';

import Store from '@/store';

import ApiCodeConfig from '@/config/apiCode.config';

import Router from '@/router/router';

import { Message, LoadingBar } from 'view-design';

// 基础配置
import BaseConfig from '@/config/base.config';

/** 导入工具库 */
import Utils from '@/utils';

export default {

  /** 请求接口方法 */
  request(_options: object) {

    /** 创建一个实例，这时的超时时间为系统默认的 0 */
    let instance = axios.create();

    /** 通过instance.defaults重新设置超时时间为2.5s，因为优先级比系统默认高 */
    instance.defaults.timeout = 60000;

    /** 混合配置; */
    _options = Object.assign({
      baseURL: Utils['judgingURLType'](),
      headers: {}
    }, _options);

    /** 作拦截处理 */
    this.interceptors(instance, _options['url']);

    return instance(_options);
  },

  /** 输出错误提示 */
  addErrorLog(_errorInfo: any) {

    const { statusText, status, request: { responseURL } } = _errorInfo;

    let info = {
      type: 'ajax',
      code: status,
      mes: statusText,
      url: responseURL
    }
    if (!responseURL.includes('save_error_logger')) {
      Store.dispatch('addErrorLog', info);
    }
  },

  /** 请求拦截 */
  interceptors(_instance: any, _url: string) {

    /** 添加一个请求拦截器 */
    _instance.interceptors.request.use((config: any) => {


      // return config;  //添加这一行，否则报错;
      let token = Utils['getSessionStorage'](BaseConfig['tokenKey']);
      if(token){
        config = Object.assign(config, {
          headers: {
            'X-TOKEN': token
          }
        })
      }

     
      return config;

    }, (error: any) => {

      console.error('request:', error);
      LoadingBar.finish();


      /** 请求错误时做些事(接口错误、超时等)*/

      /**  1.判断请求超时  */
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {

        /** 清除loading */
        Store.dispatch('hideLoadingAction');

        /** 显示请求错误弹窗 */
        Store.dispatch('showPopupAction', {
          isShowPopup: true,
          popupTip: `服务请求超时 ${error.code}`
        });

        /** 捕抓后台错误 */
        Store.dispatch('systemHavaErrorAction');

      }

      /**  2.需要重定向到错误页面 */
      let errorInfo = error.response;

      console.error(errorInfo);

      if (errorInfo) {

        //error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
        let errorStatus = errorInfo.status; // 404 403 500 ... 等

        Router.push({
          path: `/${errorStatus}`
        });

      }

      return Promise.reject(error);
    });


    /** 添加一个响应拦截器 */
    _instance.interceptors.response.use((res: any) => {

      // 去掉定时轮询的接口
      if (_url != '/v1/publisher/qrcode/pre_auth/status' && _url != '/v1/publisher/official/unread/count') {
        LoadingBar.finish();
      }

      let result = {
        code: res.data.code,
        data: res.data.data,
        status: res.status,
        response: res
      }

      let _lang: string = Utils['judgingSystemLanguage()'];

      _lang = _lang == '' || _lang == null ? 'zh-CN' : _lang;

      /**  捕抓500错误 */
      if (result.code == undefined) {

        if (result.response.data.resp_code == '500') {

          /** 清除loading */
          Store.dispatch('hideLoadingAction');

          /** 派发弹窗提示; */
          Store.dispatch('showPopupAction', {
            isShowPopup: true,
            popupTip: `服务器500,${result.response.data.resp_msg}`
          });

          /** 捕抓后台错误 */
          Store.dispatch('systemHavaErrorAction');

          return Promise.reject(result);
        }
      }


      let _resultTips = Utils['getErrorCodeTips'](result.code, ApiCodeConfig, _lang);

      if (_resultTips != '') {

        /** 清除loading */
        Store.dispatch('hideLoadingAction');

        Message['error'](_resultTips);

        /** 捕抓后台错误 */
        Store.dispatch('systemHavaErrorAction');

        return Promise.reject(result);

      } else {

        return result;
      }

    }, (error: any) => {

      console.error('response:', error);
      LoadingBar.finish();

      /** 假如服务器超时的话 */
      if (error === undefined || error.code === 'ECONNABORTED') {

        /** 清除loading */
        Store.dispatch('hideLoadingAction');

        /** 派发弹窗提示; */
        Store.dispatch('showPopupAction', {
          isShowPopup: true,
          popupTip: `服务请求超时 ${error.code}`
        });

        /** 捕抓后台错误 */
        Store.dispatch('systemHavaErrorAction');
      }

      let errorInfo = error.response;

      console.error(errorInfo);

      if (errorInfo) {

        /** 清除loading */
        Store.dispatch('hideLoadingAction');

        /** 这里是拦截路由 */
        Store.dispatch('showPopupAction', {
          isShowPopup: true,
          popupTip: `请求发生错误, 错误信息：${error}`
        });

        /** 捕抓后台错误 */
        Store.dispatch('systemHavaErrorAction');

        let errorStatus = errorInfo.status; // 404 403 500 ... 等

        //   switch (err.response.status) {
        //     case 400:
        //       err.message = '请求错误'
        //       break
        //
        //     case 401:
        //       err.message = '未授权，请登录'
        //       break
        //
        //     case 403:
        //       err.message = '拒绝访问'
        //       break
        //
        //     case 404:
        //       err.message = `请求地址出错: ${err.response.config.url}`
        //       break
        //
        //     case 408:
        //       err.message = '请求超时'
        //       break
        //
        //     case 500:
        //       err.message = '服务器内部错误'
        //       break
        //
        //     case 501:
        //       err.message = '服务未实现'
        //       break
        //
        //     case 502:
        //       err.message = '网关错误'
        //       break
        //
        //     case 503:
        //       err.message = '服务不可用'
        //       break
        //
        //     case 504:
        //       err.message = '网关超时'
        //       break
        //
        //     case 505:
        //       err.message = 'HTTP版本不受支持'
        //       break
        //
        //     default:
        //   }
        // }

        // Router.push({
        //   path: `/${errorStatus}`
        // });

      } else {

        /** 这里是拦截http请求 */
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error));

        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }

        /** 清除loading */
        Store.dispatch('hideLoadingAction');

        Store.dispatch('showPopupAction', {
          isShowPopup: true,
          popupTip: `请求发生错误, HTTP返回码：${errorInfo}`
        });

        /** 捕抓后台错误 */
        Store.dispatch('systemHavaErrorAction');
      }

      return Promise.reject(error);
    })

  }
}

