/*********************************************************************
 *
 *                           通讯工具库代码;
 *
 *********************************************************************/
'use strict';

/** set getters数组name */
export const SET_GETTERS_NAME = (_state: any, _nameArray:Array<String>): void => {

   _state.gettersName = _nameArray;
}

/** set actions数组name */
export const SET_ACTIONS_NAME = (_state: any, _nameArray:Array<String>): void => {

   _state.actionsName = _nameArray;
}

/** 捕抓后台发生错误 */
export const SYSTEM_HAVE_ERROR = (_state: any): void => {

   _state.isSystemHavaError = true;
}


/** 显示loading */
export const SHOW_LOADING = (_state: any): void => {

   _state.isShowLoading = true;

}

/** 隐藏loading */
export const HIDE_LOADING = (_state: any): void => {
   _state.isShowLoading = false;
}
 
/** 显示POPUP */
export const SHOW_POPUP = (_state: any, _params: object): void => {

   _state.popup = {

      isShowPopup: _params['isShowPopup'],
      popupTip: _params['popupTip'],
   }

   _state.popup = Object.assign({},_state.popup)
}

/** 隐藏POPUP */
export const HIDE_POPUP = (_state: any): void => {

   _state.popup = {

      isShowPopup: false,
      popupTip: '',
      errorCode: null,
   }
}

/** 显示action sheet */
export const SHOW_ACTIONSHEET = (_state: any, _menus: Array<object>): void => {

   _state.actionSheet = {

      isShow: true,
      menus: _menus,
   }
}

/** 隐藏action sheet */
export const HIDE_ACTIONSHEET = (_state: any): void => {

   _state.actionSheet = {

      isShow: false,
      menus: [],
   }
}

/** 调用剪切板剪切文本 */
export const COPY_TEXT = (_state: any, _text: string): void => {

   _state.copyText = _text;
}


/** 显示Toast提示框 */
export const SHOW_TOAST = (_state: any, _params: object): void => {

   _state.toast = _params;
}

/** 显示Toast提示框 */
export const HIDE_TOAST = (_state: any, _params: object): void => {

   _state.toast = _params;
}



