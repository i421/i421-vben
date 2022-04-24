<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :replaceFields="{ title: 'menuName', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';

  import { getMenuList } from '/@/api/system';

  import { useRoleStore } from '/@/store/modules/role';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          treeData.value = (await getMenuList()) as any as TreeItem[];
        }
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const roleStore = useRoleStore();

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          // 增加父节点
          let appendMenus = [];
          for (let i = 0; i < values.menu_ids.length; i++) {
            let temp = familyTree(values.menu_ids[i], treeData.value);
            if (temp) {
              appendMenus.push(...temp);
            }
          }
          const unique = (arr) => [...new Set(arr)];
          values.menu_ids = unique(appendMenus);

          await roleStore.updateOrCreateRole(values);
          // console.log(values);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      // 自动添加父节点
      function familyTree(id, list = [], result = []) {
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (item.id === id) {
            result.push(item.id);
            if (result.length === 1) return result;
            return true;
          }

          if (item.children) {
            result.push(item.id);
            const find = familyTree(id, item.children, result);
            if (find) {
              return result;
            }

            result.pop();
          }
        }

        return false;
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
      };
    },
  });
</script>
