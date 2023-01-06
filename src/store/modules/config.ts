// import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { updateOrCreateConfig, deleteConfig } from '/@/api/system/index';
import { useMessage } from '/@/hooks/web/useMessage';

export const useConfigStore = defineStore({
  id: 'app-config',
  state: (): ConfigState => ({
    //
  }),
  getters: {
    //
  },
  actions: {
    /**
     * @description: 更新和创建
     */
    async updateOrCreateConfig(data) {
      try {
        await updateOrCreateConfig(data);
      } catch {
        console.log('更新配置失败');
      }
    },

    async deleteConfig(id) {
      const { notification } = useMessage();
      try {
        const res = await deleteConfig(id);
        notification.success({
          message: '删除成功',
        });
        return res;
      } catch {
        console.log('删除配置失败');
      }
    },
  },
});

// Need to be used outside the setup
export function useConfigStoreWithOut() {
  return useConfigStore(store);
}
