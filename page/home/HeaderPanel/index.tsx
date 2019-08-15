import * as React from 'react';
import { FC } from 'react';
//Avatar
import { Radio, Avatar } from 'antd';
//import BaseComponent from '../../../baseStructure/baseComponent';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import './index.scss';

const RadioGroup = Radio.Group;
// @inject("flagStore")
// @observer
// class HeaderPanel extends BaseComponent {
//     getFunctionSelect = () => {
//         return (
//             <RadioGroup 
//                 defaultValue={this.baseStore.funcType} 
//                 onChange={this.changeRadio.bind(this, 'funcType')} 
//                 className='header-group'>
//                 <Radio value={'show-panel'}>展示模式</Radio>
//                 <Radio value={'compile-panel'}>编辑模式</Radio>
//             </RadioGroup>
//         )
//     }
//     consoleStore = () => {
//         console.log(toJS(this.baseStore));
//     }
//     getShowType = () => {
//         const functionType = [
//             {name: '今日总览', value: 'todayStatus'},
//             {name: '过往记录', value: 'pastStatus'},
//             {name: '添加模板', value: 'addModel'}
//         ];
//     }
//     render() {
//         return (
//             <div className='body-panel'>
//                 <Avatar onClick={consoleStore} style={{ backgroundColor: '#87d068' }}icon='user'/>
//                 {this.getFunctionSelect()}
//             </div>
//         )
//     }
// }

const HeaderPanel: FC = () => {
    function getFunctionSelect() {
        return (
            <RadioGroup 
                // defaultValue={this.baseStore.funcType} 
                // onChange={this.changeRadio.bind(this, 'funcType')} 
                className='header-group'>
                <Radio value={'show-panel'}>展示模式</Radio>
                <Radio value={'compile-panel'}>编辑模式</Radio>
            </RadioGroup>
        )
    }
    function consoleStore() {
        //console.log(toJS(this.baseStore));
        console.log(1111);
    }
    return (
        <div className='body-panel'>
            <Avatar onClick={consoleStore} style={{ backgroundColor: '#87d068' }}icon='user'/>
            {getFunctionSelect()}
        </div>
    )
}

export default inject('flagStore')(observer(HeaderPanel));