<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getLogList } from '/@/api/system';

  import { columns, searchFormSchema } from './log.data';

  import { useLogStore } from '/@/store/modules/log';

  export default defineComponent({
    name: 'LogManagement',
    components: { BasicTable, TableAction },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '日志列表',
        api: getLogList,
        columns,
        formLog: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      const logStore = useLogStore();

      function handleDelete(record: Recordable) {
        logStore.deleteLog(record.id).then((res) => {
          if (res == 0) {
            reload();
          }
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        // registerModal,
        // handleCreate,
        // handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
