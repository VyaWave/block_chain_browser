/*********************************************************************
 *
 *                      处理导入导出文件还有处理文件流;
 *
 *********************************************************************/
'use strict';

/**
 *  导出文件对象里面的所有函数的名字;
 *  @param _requireContext
 *  @returns {string[]}
 */
export const exportFileFunName = (_requireContext: any): Array<string> => {

    /**
      *  动态的require  ts文件，类似批量的require当前目录下的所有的ts文件，避免一个一个ts   import进来这么麻烦;
      */
    let _context = _requireContext /** 获取当前目录下的所有的.ts结尾的文件，包括子目录下的也会检索出来; */
    let _obj = {};

    _context.keys().forEach((_item: string) => {

        /** 注意：必须排除掉./index.ts, 否则会报错 */
        if (_item != './index.ts') {
            _obj = Object.assign(_obj, _context(_item));
        }
    });

    /** 把所有的函数名返回出去 */
    return Object.keys(_obj);
}

/**
 * 导出文件对象
 * @param _requireContext
 * @param _type
 */
export const exportFileObject = (_requireContext: any, _type: number): object => {

    /** 默认什么都不填就取0 */
    _type = _type ? _type : 0;

    /**
     *    动态的require  ts文件，类似批量的require当前目录下的所有的ts文件，避免一个一个ts   import进来这么麻烦;
     */
    let _context = _requireContext; /** 获取当前目录下的所有的.ts结尾的文件，包括子目录下的也会检索出来; */
    let _obj: object = {};

    _context.keys().forEach((_item: string) => {

        /** 排除index.js文件，因为就是当前文件，不需要require */
        if (_item != './index.ts') {

            /** 默认是这种不带default的方式 */
            if (_type == 0) {

                _obj = Object.assign(_obj, _context(_item));

            } else {

                _obj = Object.assign(_obj, _context(_item).default);

            }
        }
    });

    return _obj;
}


/**
 *  该函数是计算文件md5中使用的;
 * @param _file
 * @param _fileReader
 * @param _currentChunk
 * @param _chunkSize
 * @param _blobSlice
 */
export const loadNext = (_file, _fileReader, _currentChunk, _chunkSize, _blobSlice) => {

    let _start = _currentChunk * _chunkSize;

    let _end = ((_start + _chunkSize) >= _file.size) ? _file.size : _start + _chunkSize;

    _fileReader.readAsArrayBuffer(_blobSlice.call(_file, _start, _end));
}