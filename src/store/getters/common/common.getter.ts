/*********************************************************************
 *
 *                        获取公共的getter操作;
 *
 ********************************************************************/
'use strict';

/** 获取isSystemHavaError状态 */
export const getIsSystemHavaError = (_state: any): boolean => {

    return _state.isSystemHavaError;
}


/** 获取isShowLoading状态 */
export const getIsShowLoading = (_state: any): boolean => {

    return _state.isShowLoading;
}


/** 获取popup状态 */
export const getPopup = (_state: any): object => {

    return _state.popup;
}


/** 获取actionSheet状态 */
export const getActionSheet = (_state: any): object => {

    return _state.actionSheet;
}


/** 获取剪切板剪切的文本 */
export const getCopyText = (_state: any): string => {

    return _state.copyText;
}


/** 获取toast中的内容 */
export const getToast = (_state: any): string => {

    return _state.toast;
}

/** 获取getters数组中的name */
export const getGettersName = (_state: any): string => {

    return _state.gettersName;
}

/** 获取actions数组中的name */
export const getActionsName = (_state: any): string => {

    return _state.actionsName;
}


export const getSideMenuTree = (_state: any): object => {

    return _state.sideMenuList;
}
