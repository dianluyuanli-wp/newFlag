declare module '*.css' {
    const content: any;
    export default content;
}

declare namespace globalDec {
    interface anyObj {
        userName?: string,
        password?: string,
        [propName: string]: any;
    }
}