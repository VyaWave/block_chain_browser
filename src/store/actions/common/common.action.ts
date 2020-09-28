/*********************************************************************
 *
 *                          分享围观action操作;
 *
 *********************************************************************/
'use strict';

/** set getters数组name */
export const setGettersName = ({commit}, _nameArray:Array<String>):void =>{

    commit('SET_GETTERS_NAME', _nameArray);
}

/** set actions数组name */
export const setActionsName = ({commit}, _nameArray:Array<String>):void =>{

    commit('SET_ACTIONS_NAME', _nameArray);
}

/** 捕抓后台发生错误 */
export const systemHavaErrorAction = ({commit}):void =>{

    commit('SYSTEM_HAVE_ERROR');
}

/** 显示loading */
export const  showLoadingAction = ({commit}):void =>{

    commit('SHOW_LOADING');
}

/** 隐藏loading */
export const  hideLoadingAction = ({commit}):void =>{

    commit('HIDE_LOADING');
}

/** 显示popup弹窗 */
export const  showPopupAction = ({commit}, _params:object):void =>{

    commit('SHOW_POPUP',_params);
}

/** 隐藏popup弹窗 */
export const  hidePopupAction = ({commit}):void =>{

    commit('HIDE_POPUP');
}

/** 显示actionSheet弹窗 */
export const  showActionSheetAction = ({commit}, _menus:Array<object>):void =>{

    commit('SHOW_ACTIONSHEET',_menus);
}

/** 隐藏actionSheet弹窗 */
export const  hideActionSheetAction = ({commit}):void =>{

    commit('HIDE_ACTIONSHEET');
}


/** 调用剪切板拷贝文本 */
export const  copyTextAction = ({commit}, _text:string):void =>{

    commit('COPY_TEXT',_text);
}


/** 显示toast提示框 */
export const showToastAction = ({commit}, _params:object):void =>{

    let _isShow: boolean = true;
    let _time: number    = _params['time'];
    let _type: string    = _params['type'];
    let _content: string = _params['content'];

    commit('SHOW_TOAST',{ 
        isShow:_isShow, 
        time: _time, 
        type: _type, 
        content: _content
    });
}

/** Toast */
export const hideToastAction = ({commit}):void =>{

    commit('HIDE_TOAST',{ 
        isShow: false, 
        time: 0, 
        type: '', 
        content: ''
    });
}