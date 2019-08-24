declare module '*.css' {
    const content: any;
    export default content;
}

declare namespace globalDec {
    interface anyObj {
        userName?: string;
        password?: string;
        [propName: string]: any;
    }
    interface flagStore {
        funcType: string;
        userName: string;
        flagArray?: any;
        isMarked?: any;
        templateName?: any;
        templateArray?: any;
        preferTemplate?: any;
        record?: Array<attendance>;
    }
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
}