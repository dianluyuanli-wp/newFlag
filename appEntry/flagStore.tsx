import { observable } from 'mobx';

// "babel-core": "^6.26.3",
class flagStore {
    @observable funcType: string ;
    @observable userName: string ;
    @observable flagArray: Array<globalDec.flagItem>;
    @observable isMarked: boolean;
    @observable templateArray: Array<globalDec.template>;
    @observable preferTemplate: string;
    @observable record: Array<globalDec.attendance>;
    constructor(opts: globalDec.flagStore) {
        let useProps = !!opts;
        this.funcType = 'show-panel' ;
        this.userName = useProps ? opts.userName : 'needLogin' ;
        this.flagArray = useProps ? opts.flagArray : [];
        this.record = useProps ? opts.record : [];
        this.templateArray = useProps ? opts.templateArray : [];
        this.preferTemplate = useProps ? opts.preferTemplate : '';
    }
}

export default flagStore;
