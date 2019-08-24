import * as React from 'react';
import { FC } from 'react';
import { observer } from 'mobx-react';
import showPanel from './ViewBlock/showPanel';
import template from './ViewBlock/Template';
import { useStores } from '@utils/index';

const BodyPanel: FC = () => {
    const store = useStores('flagStore');
    const PanelContent: globalDec.anyObj = {
        'show-panel': showPanel,
        'compile-panel': template
    }
    const ShowContent = PanelContent[store.funcType];
    return (
        <React.Fragment>
            <ShowContent />
        </React.Fragment>
    )
}

export default observer(BodyPanel);