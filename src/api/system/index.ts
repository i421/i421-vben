import {
  AccountParams,
  DeptListItem,
  LogListItem,
  ConfigListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  ConfigListGetResultModel,
  LogListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  accountList = '/system/getAccountList',
  updateOrCreateAccount = '/system/updateOrCreateAccount',
  updatePassword = '/system/updatePassword',
  deleteAccount = '/system/deleteAccount',
  isAccountExist = '/system/accountExist',

  configList = '/system/getConfigList',
  updateOrCreateConfig = '/system/updateOrCreateConfig',
  deleteConfig = '/system/deleteConfig',

  logList = '/system/getLogList',
  deleteLog = '/system/deleteLog',

  deptList = '/system/getDeptList',
  updateOrCreateDept = '/system/updateOrCreateDept',
  deleteDept = '/system/deleteDept',

  menuList = '/system/getMenuList',
  updateOrCreateMenu = '/system/updateOrCreateMenu',
  deleteMenu = '/system/deleteMenu',

  rolePageList = '/system/getRoleListByPage',
  setRoleStatus = '/system/setRoleStatus',
  getAllRoleList = '/system/getAllRoleList',
  updateOrCreateRole = '/system/updateOrCreateRole',
  deleteRole = '/system/deleteRole',
}

// 账号
export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.accountList, params });

export const updateOrCreateAccount = (data) =>
  defHttp.post({ url: Api.updateOrCreateAccount, params: data });

export const updatePassword = (data) => defHttp.post({ url: Api.updatePassword, params: data });

export const deleteAccount = (id) => defHttp.delete({ url: Api.deleteAccount, params: { id: id } });

export const isAccountExist = (account: string, userId: number) =>
  defHttp.post(
    { url: Api.isAccountExist, params: { account, userId } },
    { errorMessageMode: 'none' },
  );

// 部门
export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.deptList, params });

export const updateOrCreateDept = (data) =>
  defHttp.post({ url: Api.updateOrCreateDept, params: data });

export const deleteDept = (id) => defHttp.delete({ url: Api.deleteDept, params: { id: id } });

// 日志
export const getLogList = (params?: LogListItem) =>
  defHttp.get<LogListGetResultModel>({ url: Api.logList, params });

export const deleteLog = (id) => defHttp.delete({ url: Api.deleteLog, params: { id: id } });

// 配置
export const getConfigList = (params?: ConfigListItem) =>
  defHttp.get<ConfigListGetResultModel>({ url: Api.configList, params });

export const updateOrCreateConfig = (data) =>
  defHttp.post({ url: Api.updateOrCreateConfig, params: data });

export const deleteConfig = (id) => defHttp.delete({ url: Api.deleteConfig, params: { id: id } });

// 菜单
export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.menuList, params });

export const updateOrCreateMenu = (data) =>
  defHttp.post({ url: Api.updateOrCreateMenu, params: data });

export const deleteMenu = (id) => defHttp.delete({ url: Api.deleteMenu, params: { id: id } });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.rolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.getAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const updateOrCreateRole = (data) =>
  defHttp.post({ url: Api.updateOrCreateRole, params: data });

export const deleteRole = (id) => defHttp.delete({ url: Api.deleteRole, params: { id: id } });
