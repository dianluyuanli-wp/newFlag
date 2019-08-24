import * as React from 'react';
import { FC } from 'react';
import { observer } from 'mobx-react';
import { Checkbox, Card, Button, Timeline, Popover, Form, Select } from 'antd';
import s from './index.css';
import { getYearMonthDate, netModel } from 'xiaohuli-package';
import apiMap from '@apiMap';
import { useStores, dataFuc, combineCss } from '@utils/index';
import { toJS, runInAction } from 'mobx';

const TimeItem = Timeline.Item;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
        //xs: { span: 2 }
    },
    wrapperCol: {
        sm: { span: 6 },
        //xs: { span: 2 }
    }
};

const ShowPanel: FC = function() {
    const store: globalDec.flagStore = useStores('flagStore');
    const attendance = async() => {
        const res = await netModel.post(apiMap.get('attendance'), {
            ansArray: toJS(store.flagArray),
            date: new Date().toLocaleDateString()
        },{});
        const res2 = await netModel.post(apiMap.get('addOrUpdateTemplate'), {
            preferTemplate: store.preferTemplate,
            templateArray: toJS(store.templateArray)
        },{});
    }
    const changeOwnSelect = (name: string, check: string) => {
        dataFuc.changeSelect(store, name, check);
        let targetTemplate = store.templateArray.filter((item: globalDec.template) => item.name === store.preferTemplate)[0];
        runInAction(() => {
            store.flagArray = targetTemplate.itemArray.map((item: globalDec.flagItem) => ({name: item, value: false}));
        })
    }
    const getCheckoutBox = () => {
        const showCard = (content: Array<globalDec.flagItem>, date = '今日flag', show = false, disable = true, className = s.body_card, showSelcetor = false) => {
            return (<Card title={date} className={className} 
                    extra={show && <Button type="dashed" onClick={attendance.bind(this)}>保存</Button>}>
                    {content.map((item, index: number) => {
                        return (
                            <Checkbox className={s.check_box} checked = {item.value} disabled={disable} onChange={dataFuc.changeCheck.bind(this, item, 'value')} key={index}>
                                {item.name}
                            </Checkbox>
                        )})}
                    {showSelcetor &&             
                        <FormItem {...formItemLayout} label='选择偏好模板'>
                            <Select 
                                style={{ width: '1.5rem' }}
                                defaultValue={store.preferTemplate}
                                onChange={(check) => {changeOwnSelect('preferTemplate', check)}}
                                placeholder={'选择首选flag模板'} >
                                {store.templateArray.map((item: globalDec.template, index: number) => <Option key={index} value={item.name}>{item.name}</Option>)}
                            </Select>
                        </FormItem>
                    }
                </Card>
            )
        };
        const timeLineItem = function() {
            return store.record.map((item: globalDec.attendance, index: number) => {
                const percent = 100 * item.flagArray.filter( item => item.value === true).length / item.flagArray.length
                return (
                    <TimeItem key={index}>
                        <Popover content={showCard(item.flagArray, item.date, false, true, 'small-card')} trigger='click'>
                            {item.date + ' ' + '完成度' + percent + '%'}
                        </Popover>
                    </TimeItem> 
                )
            })
        }
        return (
            <React.Fragment>
                {showCard(store.flagArray, '今日flag', true, false, undefined, true)}
                {store.record[0].date !== '' ? <Card title='历史记录' className={combineCss(s.body_card, s.card_2)}>
                    <Timeline className={s.time}>
                        {timeLineItem()}
                    </Timeline>
                </Card> :
                <div>无最近打卡记录</div>
            }
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            {getCheckoutBox()}
        </React.Fragment>
    )
}
export default observer(ShowPanel);