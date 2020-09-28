/*********************************************************************
 *
 *                           用于处理浏览器的一些代码;
 *
 *********************************************************************/
'use strict';

/**
 * 判断当前浏览器是什么语言
 */
export const getUrlParam = (_name:string) => {
    var reg = new RegExp("(^|&)"+ _name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}

/**
 * 判断当前浏览器是什么语言
 */
export const judgingSystemLanguage = (): string => {

    let lang: any = /\blang=([^&]+)\b/gi.exec(location.search);

    if (lang) lang = lang[1];

    let language: string = (lang || navigator['browserLanguage'] || navigator['language']).toLowerCase();

    switch (language) {
        case 'zh-tw':
        case 'zh-cn':
            return 'zh-CN';
        case 'km-kh':
            return 'km-KH';
        default:
            return 'en-US';
    }
}


/**
 *  判断当前浏览器系统是安卓系统还是IOS系统;
 */
export const judgeBrowserSystemType = (): string => {

    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {

        return 'ios';

    } else if (/(Android)/i.test(navigator.userAgent)) {

        return 'android';

    } else {

        return 'pc';
    }
}


/** 判断浏览器语言 */
export const getBrowserLanguage = (): string => {

    let lang: any = /\blang=([^&]+)\b/gi.exec(location.search);
    if (lang) lang = lang[1];

    let _language = (
        lang ||
        navigator['browserLanguage'] ||
        navigator.language
    ).toLowerCase();

    switch (_language) {

        case "zh-cn":
            return "zh";

        case "km-kh":
            return "km";

        default:
            return "en";
    }
}
