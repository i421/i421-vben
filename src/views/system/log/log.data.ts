import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { formatTimestampToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'user_id',
    align: 'left',
  },
  {
    title: '名称',
    dataIndex: 'title',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    format: (v) => formatTimestampToDateTime(v),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];
