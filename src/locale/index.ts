/*************************************************************
 *
 *                      vue-i18n国际化
 *
 ************************************************************/
'use strict';

import Vue from 'vue';

import VueI18n from 'vue-i18n';

import Utils  from  '@/utils/index';


/** 导出当前目录下所有的.ts对象 */
let customZhCn:object   =   Utils['exportFileObject'](require.context('./zh-CN', true, /.ts$/),1);
let customEnUs:object   =   Utils['exportFileObject'](require.context('./en-US', true, /.ts$/),1);
let customEnID:object   =   Utils['exportFileObject'](require.context('./en-ID', true, /.ts$/),1);
let customEnPH:object   =   Utils['exportFileObject'](require.context('./en-PH', true, /.ts$/),1);
let customRuRu:object   =   Utils['exportFileObject'](require.context('./ru-RU', true, /.ts$/),1);

// vue-i18n 6.x+写法
const messages = {
  'zh-CN'  : Object.assign({}, customZhCn),
  'en-US'  : Object.assign({}, customEnUs),
  'en-ID'  : Object.assign({}, customEnID),
  'en-PH'  : Object.assign({}, customEnPH),
  'ru-RU'  : Object.assign({}, customRuRu)
}

// 自动根据浏览器系统语言设置语言
const navLang   =  navigator.language;
const localLang = (navLang === 'zh-CN' || 
                   navLang === 'en-US' || 
                   navLang === 'en-ID' || 
                   navLang === 'en-PH' || 
                   navLang === 'ru-RU'
                  ) ? navLang : false;
const lang          =  localLang  || 'zh-CN';

Vue.use(VueI18n);

Vue.config['lang'] = lang;

Vue.prototype.$setI18n = function(_key:any, _value:any){
  if (!_key) { return '未识别'; }
  //console.log(i18n.messages[i18n.locale]);
  return i18n.messages[i18n.locale][_key];
};

const i18n = new VueI18n({
  locale: lang,
  messages
})

export default  i18n

