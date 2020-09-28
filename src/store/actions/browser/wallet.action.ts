/*********************************************************************
 *
 *                         action操作;
 *
 *********************************************************************/
'use strict';

import RequestApis from '@/api/index';

import Utils from '@/utils/index';

/** 
 * 根据地址和高度查询交易流水 
 */
interface AccountTransactionsType{
   address: string
   height:  number
}
export const getAccountTransactionsRequestAction = ({ commit }, _params:AccountTransactionsType):Promise<any> => {

    return new Promise(async (resolve, reject) => {

        try {

            let res: any = await RequestApis.getAccountTransactionsRequest(_params.address, _params.height);

            if(res.status == 200){

               if(res.response.data.success == true){

                  resolve(res.response.data);
               }
            
            }else{
                
                resolve([]);
            }

        } catch (error) {

            reject(error);
            return;
        }
    })

}

/** 
 * 查交易详情的接口 
 */
 export const getAccountTransactionsDetailRequestAction = ({ commit }, _hash:string):Promise<any> => {
 
     return new Promise(async (resolve, reject) => {
 
         try {
 
             let res: any = await RequestApis.getAccountTransactionsDetailRequest(_hash);
 
             if(res.status == 200){
 
                if(res.response.data.success == true){
 
                   resolve(res.response.data.result);
                }
             
             }else{
                 
                 resolve([]);
             }
 
         } catch (error) {
 
             reject(error);
             return;
         }
     })
 
 }


 /** 
 * 查交易详情的接口 
 */
export const getLatestMcBlockRequestAction = ({ commit }):Promise<any> => {
 
    return new Promise(async (resolve, reject) => {

        try {

            let res: any = await RequestApis.getLatestMcBlockRequest();

            if(res.status == 200){

               if(res.response.data.success == true){

                  resolve(res.response.data.mcBlockList);
               }
            
            }else{
                
                resolve([]);
            }

        } catch (error) {

            reject(error);
            return;
        }
    })

}


/** 
 * 查交易详情的接口 
 */
export const globalInfoRequestAction = ({ commit }):Promise<any> => {
 
    return new Promise(async (resolve, reject) => {

        try {

            let res: any = await RequestApis.globalInfoRequest();

            if(res.status == 200){

               if(res.response.data.success == true){

                  resolve(res.response.data);
               }
            
            }else{
                
                resolve([]);
            }

        } catch (error) {

            reject(error);
            return;
        }
    })

}

/** 
 * 最近出块 
 */
export const getLatestBlockRequestAction = ({ commit }, _hash:string):Promise<any> => {
 
    return new Promise(async (resolve, reject) => {

        try {

            let res: any = await RequestApis.getLatestBlockRequest(_hash);

            if(res.status == 200){

               if(res.response.data.success == true){

                  resolve(res.response.data.mcBlockList);
               }
            
            }else{
                
                resolve([]);
            }

        } catch (error) {

            reject(error);
            return;
        }
    })

}

/** 
 * 支点分布 
 */
export const getGlobalNodeDistInfoRequestAction = ({ commit }):Promise<any> => {
 
    return new Promise(async (resolve, reject) => {

        try {

            let res: any = await RequestApis.getGlobalNodeDistInfoRequest();

            if(res.status == 200){

               if(res.response.data.success == true){

                  resolve(res.response.data.nodeDistInfoList);
               }
            
            }else{
                
                resolve([]);
            }

        } catch (error) {

            reject(error);
            return;
        }
    })

}
