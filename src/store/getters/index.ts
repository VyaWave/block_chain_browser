/*************************************************************
 *
 *                      导出所有getters
 *
 ************************************************************/
'use strict';

/**
 *    动态的require  ts文件，类似批量的require当前目录下的所有的ts文件，避免一个一个ts   import进来这么麻烦;
 */
let     _context = require.context('./', true, /.ts$/);      //获取当前目录下的所有的.ts结尾的文件，包括子目录下的也会检索出来;
let     _obj  = {};

_context.keys().forEach((_item:string)=>{

       /** 排除index.js文件，因为就是当前文件，不需要require */
       if(_item != './index.ts'){

            _obj   = Object.assign(_obj,_context(_item));
       }
});

export default _obj;