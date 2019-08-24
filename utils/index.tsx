import { MobXProviderContext } from 'mobx-react';
import { action } from 'mobx';
import * as React from 'react';

export function lookbehindAssertion(content: string, target: string) {
    const reverse = (content: string) => content.split('').reverse().join('');
    const contentRe = reverse(content);
    const rank = contentRe.indexOf(reverse(target));
    if (rank !== -1) {
        return reverse(contentRe.slice(0, rank));
    }
    return '';
}

export const parseCookieObjToString = (obj: globalDec.anyObj) => {
    let ans = '';
    for (let key in obj) {
        ans += key + '=' + escape(obj[key]) + ';';
    }
    return ans;
}

const changeInput = action(function(obj: globalDec.anyObj, propertyName:string, event: React.ChangeEvent<HTMLInputElement>) {
    obj[propertyName] = event.target.value;
});

const changeCheck = action(function(obj: globalDec.anyObj, propertyName:string, event: React.ChangeEvent<HTMLInputElement>) {
    obj[propertyName] = event.target.checked;
});

const changeSelect = action(function(obj: globalDec.anyObj, propertyName:string, checked: string) {
    obj[propertyName] = checked;
});

export function useStores(name: string) {
    return React.useContext(MobXProviderContext)[name];
}

export function combineCss(...arg: Array<string>) {
    return arg.map(item => `${item}`).join(' ');
}

export const dataFuc = {
    changeInput,
    changeCheck,
    changeSelect
}