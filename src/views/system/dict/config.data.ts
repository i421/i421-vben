import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { formatTimestampToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '码',
    dataIndex: 'code',
    align: 'left',
  },
  {
    title: '值',
    dataIndex: 'c_key',
  },
  {
    title: '名称',
    dataIndex: 'value',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    format: (v) => formatTimestampToDateTime(v),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: '码',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '序号',
    component: 'InputNumber',
    show: false,
    required: false,
  },
  {
    field: 'code',
    label: '码',
    component: 'Input',
    required: true,
  },
  {
    field: 'c_key',
    label: '值',
    component: 'Input',
    required: true,
  },
  {
    field: 'value',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'order',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
