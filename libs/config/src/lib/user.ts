export enum UserRoles {
  Reader = 'reader',
  Editor = 'editor',
  ApprovalEditor = 'approvalEditor',
  Admin = 'admin',
}

export const readerRights = {
  create: false,
  edit: false,
  read: true,
  delete: false,
  approve: false,  
}

export const readerScopes = {
  accounts: readerRights,
  tasks: readerRights,
}

export const readerUserRights = {
  scopes: readerScopes,
  companyAdmin: false
}

export const editorRights = {
  create: true,
  edit: true,
  read: true,
  delete: true,
  approve: false,  
}

export const editorScopes = {
  accounts: editorRights,
  tasks: editorRights,
}

export const editorUserRights = {
  scopes: editorScopes,
  companyAdmin: false
}

export const approvalEditorRights = {
  ...editorRights,
  approve: true,
}

export const approvalEditorScopes = {
  accounts: approvalEditorRights,
  tasks: approvalEditorRights,
  users: approvalEditorRights,
}

export const approvalEditorUserRights = {
  scopes: approvalEditorScopes,
  companyAdmin: false
}

export const adminRights = {
  scopes: approvalEditorScopes,
  companyAdmin: true
}
