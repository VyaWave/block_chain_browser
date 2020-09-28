/*********************************************************************
 *
 *                           工具库代码;
 *
 *********************************************************************/
'use strict';

let     _context = require.context('./', true, /.ts$/);      //获取当前目录下的所有的.ts结尾的文件，包括子目录下的也会检索出来;
let     _obj  = {};

_context.keys().forEach((_item)=>{

       /** 排除index.ts文件，因为就是当前文件，不需要require */
       if(_item != './index.ts'){

            _obj   = Object.assign(_obj,_context(_item));
       }
});

export default _obj;





