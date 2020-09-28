/*************************************************************
 *
 *                      导出所有state
 *
 ************************************************************/
'use strict';

import Utils  from  '@/utils/index';

/** 导出当前目录下所有的action.js对象 */
export default Utils['exportFileObject'](require.context('./', true, /.ts$/),1);