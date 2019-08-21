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