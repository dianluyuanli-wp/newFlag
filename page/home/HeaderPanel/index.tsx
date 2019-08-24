import * as React from 'react';
import { FC } from 'react';
import { Radio, Avatar } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import s from './index.css';
import { useStores, dataFuc } from '@utils/index';

const RadioGroup = Radio.Group;

const HeaderPanel: FC = () => {
    const store = useStores('flagStore');
    function getFunctionSelect() {
        return (
            <RadioGroup 
                defaultValue={store.funcType} 
                onChange={dataFuc.changeInput.bind(this, store, 'funcType')} 
                className={s.header_group}>
                <Radio value={'show-panel'}>展示模式</Radio>
                <Radio value={'compile-panel'}>编辑模式</Radio>
            </RadioGroup>
        )
    }
    const consoleStore = () => {
        console.log(toJS(store));
    }
    return (
        <div className={s.body_panel}>
            <Avatar onClick={consoleStore} style={{ backgroundColor: '#87d068' }}icon='user'/>
            {getFunctionSelect()}
        </div>
    )
}

export default observer(HeaderPanel);