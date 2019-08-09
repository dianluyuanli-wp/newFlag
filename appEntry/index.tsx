import * as React from 'react';
import * as ReactDom from 'react-dom';
import Home from './wrapper';

function mountDomOnHtml() {
    const mountNode = document.getElementById('main')
    ReactDom.render(<Home userInfo={} />, mountNode);
}

mountDomOnHtml();
