const protocol = window.location.protocol;
declare const apiFromLocal: any;
declare const process: any;
const apiDomain = (process.env.NODE_ENV === 'production' || apiFromLocal.PLACE === 'remote') ? protocol + '//tangshisanbaishou.xyz/api/' : 'http://localhost:3000/api/';
const hostObject = {
    animal: {
        api: apiDomain + '123',
        nickName: '动物接口测试'
    },
    addOrUpdateTemplate: {
        api: 'addOrUpdateTemplate',
        nickName: '新增或更新模板'
    },
    readTemplate: {
        api: 'readTemplate',
        nickName: '读取模板'
    },
    attendance: {
        api: 'attendance',
        nickName: '打卡接口'
    },
    isMarked: {
        api: 'isMarked',
        nickName: '是否打卡'
    },
    recentRecord: {
        api: 'recentRecord',
        nickName: '拉取最近记录'
    },
    addUser: {
        api: 'addUser',
        nickName: '添加用户'
    },
    verify: {
        api: 'verify',
        nickName: '验证用户'
    }
}
const Api = {
    get: function(name: string) {
        return apiDomain + hostObject[name].api
    }
};

export default Api;