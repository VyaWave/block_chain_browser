/*********************************************************************
 *
 *                           共用工具库代码;
 *
 *********************************************************************/
'use strict';

/**
 *  递归路由，找出路由带有某个值的某些路由
 */
export const loopRouter = (_routerConfig: Array<object>,  _property: string, _callBack:Function): void => {

    for(let i=0; i< _routerConfig.length; i++){

        let _item:object = _routerConfig[i];
    
        if(_item['children'] !=undefined){
    
            loopRouter(_item['children'], _property, _callBack);
    
        }
    
        if(_item[_property] == true){
    
            _callBack(_item);
               
        }
        
    }
}

/**
 *  切换语言，主要用在变量非模版中的变量国际化;
 *  @param:  _lang 需要翻译的变量;
 *  @param:  _remarks该参数是一个备注，并无实际作用，只是为了代码比较好阅读（该参数是中文形式）;
 */
export const setI18n = (_lang: string, _remarks: string): string => {

    return _lang;
}


/**
 *  去除左右空格
 *  @param: url链接;
 */
export const clearSpace = (str: string): string => {
   
    if (str && typeof str === 'string') {

        return str.trim();

    } else {
        // tslint:disable-next-line: no-console
        console.log('无法出去左右空格--格式不正确', str);
        return '';
    }
}




  



