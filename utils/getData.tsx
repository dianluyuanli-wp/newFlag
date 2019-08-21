
import apiMap from '@apiMap';
import { netModel, writeCookie, parseCookie, getYearMonthDate } from 'xiaohuli-package';
import { parseCookieObjToString } from './index';

interface flagItem {
    name: string;
    value: boolean
}
interface attendance {
    date?: string,
    flagArray?: Array<flagItem>,
    timeStamp?: Number,
    userName?: string
}
interface dataStore {
    userName?: string;
    preferTemplate?: string,
    templateArray?: Array<template>,
    [propName: string]: any;
}
interface template {
    name: string,
    itemArray: Array<string>
}
const getFlagData = async(cookie: globalDec.anyObj = {}) => {
    let data: dataStore = {};
    let latestRecord: Array<attendance> = [{date: ''}];

    //  获取模板
    const getCookieForServer = cookie ? {cookie: parseCookieObjToString(cookie)} : {};
    const getData = async() => {
        const res = await netModel.post(apiMap.get('readTemplate'), {
            templateName: '模板'
        },getCookieForServer);
        if (res === 'not found') {
            data = {
                templateArray: [],
                preferTemplate: ''
            };
        }
        data = res;
        return res;
    }
    const getRecord = async() => {
        latestRecord = await netModel.get(apiMap.get('recentRecord'), {}, getCookieForServer);
        latestRecord = latestRecord.length ? latestRecord : [{date: ''}];
        return latestRecord;
    }
    
    const ans = await Promise.all([getData(), getRecord()]);
    if (latestRecord[latestRecord.length -1].date ===  getYearMonthDate()) {
        data.flagArray = latestRecord[latestRecord.length -1].flagArray;
        data.isMarked = true;
    } else {
        //  如果没有打卡记录，根据模板生成全false的记录
        const emptyArray: template = {
            name: '测试',
            itemArray : ['跑步']
        };
        let targetTemplate = data.templateArray.filter(item => item.name === data.preferTemplate)[0] || emptyArray;
        data.flagArray = targetTemplate.itemArray.map(item => ({name: item, value: false}));
    }
    data.record = latestRecord;
    return {
        data: data,
        userName: cookie.userName || parseCookie().userName
    };
}
interface out {
    [propName: string]: Function
}
const outPut: out = {
    home: getFlagData,
    login: () => ({}),
    register: () => ({})
}
export default outPut;