import * as React from 'react';
import * as ReactDom from 'react-dom';
import Wrapper from './wrapper';

//  这里根据条件获取数据
function mountDomOnHtml() {
    const mountNode = document.getElementById('main')
    ReactDom.render(<Wrapper userInfo={{str: '123'}} />, mountNode);
}

mountDomOnHtml();
