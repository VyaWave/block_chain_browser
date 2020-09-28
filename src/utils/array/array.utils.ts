/*********************************************************************
 *
 *                           共用工具库代码;
 *
 *********************************************************************/
'use strict';


/**
 * 数组元素交换位置
 * @param {array} arr 数组
 * @param {number} index1 添加项目的位置
 * @param {number} index2 删除项目的位置
 * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
 */
export const swapArray = (_arr:Array<object>, _index1:number, _index2:number):Array<object> => {

    _arr[_index1] = _arr.splice(_index2, 1, _arr[_index1])[0];
  
    return _arr;
  }
  
  /**
   *  下移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
   *  @param arr
   *  @param index
   */
  export const zIndexDownArray = (_arr:Array<object>, _index:number):Array<object> => {
  
    if (_index != _arr.length - 1) {
  
      return swapArray(_arr, _index, _index + 1);
  
    } else {
  
      console.log('已经处于置底，无法下移');  
      return _arr;
      
    }
  }
  
  /**
   * 上移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
   * @param arr
   * @param index
   * @param length
   */
  export const zIndexUpArray = (_arr:Array<object>, _index:number):Array<object> => {
  
    if (_index - 1 != -1) {
  
      return swapArray(_arr, _index, _index - 1);
  
    } else {
  
      console.log('已经处于置顶，无法上移');
      return _arr;
    }
  }


  /**
   * 通过属性对数组对象进行排序
   * @param property 
   */
  export const sortForArrayObjectProperty = (_arr:Array<object>, _property:string):Array<object>=>{

        return  _arr.sort(compare(_property));
  }


  /**
   * 通过属性对数组对象进行排序
   * @param property 
   */
  export const compare = (_property:string):any =>{

    return (_a:any,_b:any):number =>{

        let _value1 = _a[_property];

        let _value2 = _b[_property];

        return _value1 - _value2;
    }
  }