/*************************************************************
 *
 *                      导出所有mutations
 *
 ************************************************************/
'use strict';

import Utils  from  '@/utils';

/** 导出当前目录下所有的action.js对象 */
export default  Utils['exportFileObject'](require.context('./', true, /.ts$/));