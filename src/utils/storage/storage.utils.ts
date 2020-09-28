/*********************************************************************
 *
 *                          设置本地存储
 *
 ********************************************************************/
'use strict';

import JsCookies from 'js-cookie';

import BaseConfig from '@/config/base.config';


/** cookie失效时间 */
export const cookieExpires = BaseConfig['cookieExpires'];

/**
*
* @param {*} key
* @param {*} value
*/
export const setSessionStorage = (key:string, value:any):void => {
    writeData(key, value)
}

/**
* @param {*} key
* @param {*} value
*/
export const getSessionStorage = (key:string):any => {
    const session = readData(key)
    if (session) return session
    else return false
}

/**
 *
 * @param {*} key
 */
export const readData = (key:string):any => {
    if (window.sessionStorage) {
        return window.sessionStorage.getItem(key)
    } else {
        return JsCookies.get(key)
    }
}

/**
 *
 * @param {*} key
 * @param {*} value
 */
export const writeData = (key:string, value:any):any => {
    if (window.sessionStorage) {
        window.sessionStorage.setItem(key, value)
    } else {
        JsCookies.set(key, value, { expires: cookieExpires || 1 })
    }
}

/**
  * 输入框失焦时做本地存储（存储为Json格式的对象）
  * 数据格式grandFatKey{ parKye { sonKey：value, sonKey：value },parKye { sonKey：value }}
  * 1、grandFatKey:存入的名称
  * 2、parKye：外层的键（模块的名称）
  * 3、sonKey：存入数据的健
  * 4、value:值
  */
export const setSessionObj = (grandFatKey:string, parKye: string, sonKey: string, value: string):void => {
        
    let data = getSessionStorage(grandFatKey),
        params = {};

    if (data) {

        let dataParse = JSON.parse(data);

        if (dataParse[parKye]) {
            // 如果本地存储已经有该对象

            dataParse[parKye][sonKey] = value;

        } else {
            // 如果没有该对象，则需要先创建
            dataParse[parKye] = {};
            dataParse[parKye][sonKey] = value;
        }
        setSessionStorage(grandFatKey, JSON.stringify(dataParse));

    } else {
        params[parKye] = {};
        params[parKye][sonKey] = value
        setSessionStorage(grandFatKey, JSON.stringify(params));
    }
}

export const getSessionObj = (grandFatKey:string, parKye: string, sonKey: string):any =>{

    if( getSessionStorage ( grandFatKey ) ){
        
        let grandFatvalue =JSON.parse( getSessionStorage( grandFatKey ) );
        
        if( grandFatvalue[ parKye ] ){

           let parValue = grandFatvalue[ parKye ];

           return parValue[sonKey]?parValue[sonKey]:'';
        }
      }
      return '';
}