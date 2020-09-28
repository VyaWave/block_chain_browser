/*********************************************************************
 *
 *                          处理时间
 *
 ********************************************************************/
'use strict';

/**
 *    时间字符串格式化
 */
export const formatTime = (_time, _format): string => {

    let dateStr = _time;
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
    if (typeof dateStr == "string") {
        dateStr = dateStr.replace("T", " ").replace(/-/g, "/");
    }
    let obj = new Date(dateStr);

    let o = {
        "M+": obj.getMonth() + 1, // month
        "d+": obj.getDate(), // day
        "h+": obj.getHours(), // hour
        "m+": obj.getMinutes(), // minute
        "s+": obj.getSeconds(), // second
        "q+": Math.floor((obj.getMonth() + 3) / 3), // quarter
        "S": obj.getMilliseconds()
    }

    if (/(Y+)/.test(_format)) {
        _format = _format.replace(RegExp.$1, RegExp.$1.length == 4 ? obj.getFullYear() : (obj.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp("(" + k + ")").test(_format)) {
            _format = _format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return _format;
};
