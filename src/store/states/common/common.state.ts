/*************************************************************
 *
 *                         公共的状态
 *
 ************************************************************/

'use strict';

import RouterConfig from '@/config/router.config';

export default {

    /** 捕抓后台是否有错误 */
    isSystemHavaError: false,

    /** 是否显示loading */
    isShowLoading: false,

    /** 弹窗状态 */
    popup: {

        /** 是否显示Popup弹窗 */
        isShowPopup: false,

        /** 弹窗的提示语 */
        popupTip: ''
    },

    /** actionSheet弹窗 */
    actionSheet: {

        isShow: false,
        menus: [],
    },

    /** copyText剪切板剪切到的文本 */
    copyText: '',


    /** toast提示弹框 */
    toast: {
        isShow: false,
        time: 0,
        type: 'bottom',
        content: ''
    },


    /** getters名字数组 */
    gettersName:[],

    /** actions名字数组 */
    actionsName:[],


    sideMenuList: RouterConfig,
}
