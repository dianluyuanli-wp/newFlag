import * as React from 'react';
import { FC } from 'react';
import { Button, Row, Col, Card, Checkbox, Select, Input, Form, Collapse } from 'antd';
import { observer } from 'mobx-react';
import { toJS, runInAction } from 'mobx';
import { netModel, writeCookie, parseCookie } from 'xiaohuli-package';
import { useStores, dataFuc } from '@utils/index';
import apiMap from '@apiMap';
import s from './index.css';

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

const Template: FC = function() {
    const store = useStores('flagStore');
    const submitTemplate = async function() {
        await netModel.post(apiMap.get('addOrUpdateTemplate'), {
            preferTemplate: store.preferTemplate,
            templateArray: toJS(store.templateArray)
        },{});
    }
    const getTemplate = () => {
        return store.templateArray.map((item: globalDec.template, index: number) => {
            const tagArray = ['读英文', '锻炼', '早起'];
            const tagValues = toJS(item.itemArray);
            return (
                <Collapse key={index}>
                    <Collapse.Panel key={index} header={item.name}>
                        <FormItem {...formItemLayout} label={'模板名称'}>
                            <Input placeholder={'请输入内容'} defaultValue={item.name} onChange={dataFuc.changeInput.bind(this, item, 'name')}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="选项池">
                            <Select
                                mode="tags"
                                // style={{ width: 200 }}
                                defaultValue={tagValues}
                                placeholder={'立下你的flag'}
                                onChange={(value) => {runInAction(() => {item.itemArray = value})}}
                            >
                                {tagArray.map((item, index) => {
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    );
                                })}
                            </Select>
                        </FormItem>
                        <FormItem {...formItemLayout} >
                            <Button type="danger" onClick={() => {store.templateArray.splice(index, 1)}}>删除模板</Button>
                        </FormItem>
                    </Collapse.Panel>
                </Collapse>
            );
        })
    }
    const addTemplate = () => {
        store.templateArray.push({name: '模板', itemArray: ['读英文']});
    }
    const getPreferTemplate = () => {
        return (
            <FormItem {...formItemLayout} label='选择偏好模板'>
                <Select 
                    style={{ width: '1.5rem' }}
                    defaultValue={store.preferTemplate}
                    onChange={dataFuc.changeSelect.bind(this, store, 'preferTemplate')} 
                    placeholder={'选择首选flag模板'} >
                    {store.templateArray.map((item: globalDec.template, index: number) => <Option key={index} value={item.name}>{item.name}</Option>)}
                </Select>
            </FormItem>
        )
    }
    return (
        <React.Fragment>
            <Card title={'模板编辑'} className='body-card' extra={<Button type="dashed" onClick={submitTemplate.bind(this)}>提交</Button>}>
                {getPreferTemplate()}
                {getTemplate()}
                <FormItem {...formItemLayout} className={s.tem_add_button}>
                    <Button type="primary" onClick={addTemplate}>添加模板</Button>
                </FormItem>
            </Card>
        </React.Fragment>
    )
}

export default observer(Template);