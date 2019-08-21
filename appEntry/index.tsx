import * as React from 'react';
import * as ReactDom from 'react-dom';
import Wrapper from './wrapper';
import apiMap from '@apiMap';
import { lookbehindAssertion } from '../utils/index';
import getData from '../utils/getData';
import { netModel, writeCookie, parseCookie } from 'xiaohuli-package';

const verifyLogin = async () => {
    const cookie = parseCookie();
    const res = await netModel.post(apiMap.get('verify'), {
        userName: cookie.userName,
        passWord: cookie.password
    },{});
    return res === 'verified';
}
//  这里根据条件获取数据

async function mountDomOnHtml() {
    const reg = /.*(?=\.html)/;
    const ans = reg.exec(window.location.pathname)[0];
    //  后向断言自实现
    const currentRoute = lookbehindAssertion(ans, '/');
    if (currentRoute === 'home' && !await verifyLogin()) {
        window.location.href='/login.html'
    }
    const data = getData[currentRoute]();
    const mountNode = document.getElementById('main');
    ReactDom.render(<Wrapper userInfo={data} />, mountNode);
}

mountDomOnHtml();
