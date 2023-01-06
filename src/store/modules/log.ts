// import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { deleteLog } from '/@/api/system/index';
import { useMessage } from '/@/hooks/web/useMessage';

export const useLogStore = defineStore({
  id: 'app-log',
  state: (): LogState => ({
    //
  }),
  getters: {
    //
  },
  actions: {
    async deleteLog(id) {
      const { notification } = useMessage();
      try {
        const res = await deleteLog(id);
        notification.success({
          message: '删除成功',
        });
        return res;
      } catch {
        console.log('删除日志失败');
      }
    },
  },
});

// Need to be used outside the setup
export function useLogStoreWithOut() {
  return useLogStore(store);
}
