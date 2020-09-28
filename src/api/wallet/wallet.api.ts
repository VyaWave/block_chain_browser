/*********************************************************************
 *
 *                          api请求接口
 *
 *********************************************************************/
'use strict';


import HttpRuqest from '@/router/axios.extend';

// 查账户
export const getAccountTransactionsRequest = (_address:string, _height:number) => {
    
    console.log(`?v=1.0.0&cmd=transactions&address=${_address}&height=${_height}&index=0`);
    return HttpRuqest.request({
        //url: `/v1.0.0/account/transactions?address=${_address}&height=${_height}`,
        url: `?v=1.0.0&cmd=transactions&address=${_address}&height=${_height}&index=0`,
        method: 'GET',
    });
};

// 查块信息 不管是主块还是交易块
// 改成：只查主块 -->AccountTransactionsDetail
export const getAccountTransactionsDetailRequest = (_hash:string) => {

    console.log(`查交易详情的接口:/v1.0.0/block-by-hash?hash=${_hash}`);

    return HttpRuqest.request({
        //url: `/v1.0.0/block-by-hash?hash=${_hash}`,
        //v=1.0.0&cmd=block-by-hash&hash=1dfc34625c7406d4a468b9be8ab2be8b0af96dfe4396b6ccd1de8b5f14fc606f

        url: `?v=1.0.0&cmd=block-by-hash&hash=${_hash}`,
        method: 'GET',
    });
};

// 根据哈希查询查询交易块
export const getTXBlockRequest = (_hash:string) => {

    console.log(`根据hash查询交易块:` + _hash);

    return HttpRuqest.request({
        //url: `/v1.0.0/account/transactions?address=${_address}&height=${_height}`,
        url: `?v=1.0.0&cmd=block-by-tranhash&hash=${_hash}`,
        method: 'GET',
    });
};


/** 
 *  根据地址和高度查询交易流水(类型和hash参数查询)
 *  _address:交易地址
 *  _height：高度
 */
export const getAccountTransactionsForHashRequest = (_type:number, _hash:string) => {
    
    console.log(`根据地址和高度查询交易流水:/v1.0.0/account/transactions?type=${_type}&hash=${_hash}`);
   
    return HttpRuqest.request({
        url: `/v1.0.0/account/transactions?type=${_type}&hash=${_hash}`,
        method: 'GET',
    });
};


/** 
 * 获取MC主块信息列表的接口 
 */
export const getLatestMcBlockRequest = () => {
    
    console.log(`获取MC主块信息列表的接口:/v1.0.0/latest-mc-block`);
   
    return HttpRuqest.request({
        url: `/v1.0.0/latest-mc-block`,
        method: 'GET',
    });
};


/** 
 *  概览 
 */
export const globalInfoRequest = () => {
    
    console.log(`获取概览的接口:/v1.0.0/global-info`);
   
    return HttpRuqest.request({
        //url: `/v1.0.0/global-info`,
        url: `?v=1.0.0&cmd=global-info`,
        method: 'GET',
    });
};


/** 
 *  最近出块 
 *  _hash:哈希
 */
export const getLatestBlockRequest = (_hash:string) => {
   
    if(_hash && _hash !=''){

        console.log(`获取最近出块的接口:/v1.0.0/latest-block?hash=${_hash}`);
   
        return HttpRuqest.request({
            //url: `/v1.0.0/latest-block?hash=${_hash}`,
            url:`?v=1.0.0&cmd=latest-block&index=0`,
            method: 'GET',
        });

    }else{

        console.log(`获取最近出块的接口:/v1.0.0/latest-block`);
   
        return HttpRuqest.request({
            //url: `/v1.0.0/latest-block`,
            url:`?v=1.0.0&cmd=latest-block&index=0`,
            method: 'GET',
        });
    }

   
};


/** 
 *  节点分布 
 *  _hash:哈希
 */
export const getGlobalNodeDistInfoRequest = () => {
    
    console.log(`获取概览的接口:/v1.0.0/global-node-dist-info`);
   
    return HttpRuqest.request({
        url: `/v1.0.0/global-node-dist-info`,
        method: 'GET',
    });
};


/** 
 *  获取全网高度
 */
export const getLatestBlockHeightRequest = () => {
    
    console.log(`获取全网高度的接口:/v1.0.0/latest-block-height`);
   
    return HttpRuqest.request({
        //url: `/v1.0.0/latest-block-height`,
        url:`?v=1.0.0&cmd=latest-block-height`,
        method: 'GET',
    });
};


/** 
 *  查询余额
 */
export const getbalanceRequest = (_address:string) => {
    
    console.log(`?v1.0.0&cmd=balance&address=${_address}`);
   
    return HttpRuqest.request({
        url: `?v1.0.0&cmd=balance&address=${_address}`,
        method: 'GET',
    });
};


