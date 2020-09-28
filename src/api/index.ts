/*************************************************************
 *
 *                      导出所有request
 *
 ************************************************************/
'use strict';

import  Utils  from  '@/utils/index';

/** 导出当前目录下所有的api.ts对象 */
export default  Utils['exportFileObject'](require.context('./', true, /.ts$/));
