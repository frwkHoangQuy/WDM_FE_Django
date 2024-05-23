import axiosClient from "./axiosClient"

export const getRoles = (permission = true) => {
  return axiosClient.get('privilege/roles', {
    params: {
      permission: permission
    }
  });
};

export const getRoleByID = (id, permission = true) => {
  // permission: boolean (to include permission with the role id )
  return axiosClient.get(`privilege/roles/:${id}`, {
    params: {
      permission: permission
    }
  });
};

export const updatePermissionForRole = (roleID, permissionID, action = 'update_permission_for_role') => {
  return axiosClient.post(`privilege/role/update/`, { roleID, permissionID }, {
    params: {
      action: action
    }
  });
};

export const updatePermissionForRoleByPage = (roleID, Permission_page) => {
  // enum Permission_page {
  //   report
  //   user
  //   lobby
  //   order
  //   food_service
  // }
  return axiosClient.post(`privilege/role/update-by-name`, { roleID, page: Permission_page });
};

export const removePermissionFromRole = (roleID, permissionID, action = "remove_permission_for_role") => {
  return axiosClient.delete(`privilege/role/delete/`, { data: { roleID, permissionID } });
};

export const removePermissionFromRoleByPage = (roleID, Permission_page) => {
  // enum Permission_page {
  //   report
  //   user
  //   lobby
  //   order
  //   food_service
  // }
  return axiosClient.delete(`privilege/role/delete-by-page`, { data: { roleID, page: Permission_page, }, });
};

export const updateRoleforUser = (roleID, userID) => {
  return axiosClient.post(`privilege/role/user/update/`, { roleID, userID });
}

export const createRole = (name, permissionList, action = 'create_role') => {
  // permissionList data example = [{id: '123213'}, {id: '23213' }]
  return axiosClient.post(`privilege/role/`, { name, permissionList }, {
    params: {
      action: action
    }
  });
};

export const checkUserPermissionForPage = (userID, page) => { // return boolean (whether user have permission for specific page [  report, user, lobby, order, food_service])

  return axiosClient.get(`auth/check-permission/${userID}`, {
    params: {
      page
    }
  });
};

export const deleteRole = (roleID, action = 'delete_role') => {
  return axiosClient.delete(`privilege/role/delete/${roleID}`, {
    params: {
      action: action
    }
  });
};