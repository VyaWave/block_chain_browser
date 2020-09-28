/*********************************************************************
 *
 *                           通讯工具库代码;
 *
 *********************************************************************/
'use strict';

/** 导入基础配置 */
import  BaseConfig from '@/config/base.config';

/** 导入api code码配置 */
import  ApiCodeConfig from '@/config/apiCode.config';

/** 导入公共工具库 */
import * as BrowserUtils  from  '@/utils/browser/browser.utils';

import * as FileUtils  from  '@/utils/file/file.utils';

/**
 *  校验错误码
 *  @param: 请求回来的结果，里面包含了code，通过code值判断请求是否成功;
 *  @param: 回调函数;
 */
export const checkErrorCode = (res:object, callBack:Function, errorCallBack:Function):void => {

    if (res['code'] !== 0) {

        let errorTips = getErrorCodeTips(res['code'], ApiCodeConfig, BrowserUtils.judgingSystemLanguage());

        if(errorTips == ''){
            console.error('你肯定是没有定义该错误码了，赶紧去定义错误码和错误码的国际化吧!');
            return;
        }
       
        /** 错误的回调 */
        if (errorCallBack) {
            errorCallBack(res['code']);
        }

    } else {

        /** 正确的回调 */
        callBack(res['code']);
    }
}


/** 判断url类型 */
export const judgingURLType = ():string => {

    return (process.env.NODE_ENV === 'development' ? BaseConfig.baseUrl.dev : BaseConfig.baseUrl.pro);
}

/**
 *  轮询错误提示
 *  @param {*} apiCode         api code 错误码;
 *  @param {*} apiCodeConfig   api code 错误码配置;
 *  @param {*} lang            国际化语言
 */
export const getErrorCodeTips = (_apiCode:number, _apiCodeConfig:any, _lang:string):string => {

    let _languageErrorTips:any = {};

    /**  拿到当前是那种语言，然后导入相应的语言包进来 */
    if (_lang == 'zh-CN') {

        _languageErrorTips = FileUtils.exportFileObject(require.context('@/locale/zh-CN', true, /.ts$/),1);

    } else if (_lang == 'en-US') {

        _languageErrorTips = FileUtils.exportFileObject(require.context('@/locale/en-US', true, /.ts$/),1);

    }

    if (_apiCode != 0) {

        for (let key in _apiCodeConfig) {

            if (_apiCodeConfig[key].code == _apiCode) {

                /**  判断语言包中的key值是否和apiCodeConfig中的tips相匹配 */
                for (let errorTipKey in _languageErrorTips) {
                    
                    if (_apiCodeConfig[key].tips == errorTipKey) {

                        return _languageErrorTips[errorTipKey];
                    }
                }

                break;
            }
        }
    }

    return '';
  
}


/**
 *  补上http前缀
 *  @param: url链接;
 */
export const complementPrefix = (_link: string): string => {

    if (/http/g.test(_link) == false) {

        return `//${_link}`;

    } else {

        return _link;
    }
}
  
  