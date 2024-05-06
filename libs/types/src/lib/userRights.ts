import { UserRoles } from "./user"

const rights = {
  [UserRoles.None]: {
    create: false,
    edit: false,
    read: false,
    delete: false,
    approve: false,  
  },
  [UserRoles.Reader]: {
    create: false,
    edit: false,
    read: true,
    delete: false,
    approve: false,
  },
  [UserRoles.Editor]: {
    create: true,
    edit: true,
    read: true,
    delete: true,
    approve: false,
  },
  [UserRoles.ApprovalEditor]: {
    create: true,
    edit: true,
    read: true,
    delete: true,
    approve: true,
  }
}

const noneScopes = {
  accounts: rights.none,
  tasks: rights.none,
  users: rights.none,
  companies: rights.none,
}

const readerScopes = {
  accounts: rights.reader,
  tasks: rights.reader,
  users: rights.reader,
}

const editorScopes = {
  accounts: rights.editor,
  tasks: rights.editor,
  users: rights.reader,
}

const approvalEditorScopes = {
  accounts: rights.approvalEditor,
  tasks: rights.approvalEditor,
  users: rights.approvalEditor,
}

const adminScopes = {
  ...approvalEditorScopes,
  companies: rights.approvalEditor,
}

export const userRights = {
  [UserRoles.None]: {
    scopes: noneScopes,
  },
  [UserRoles.Reader]: {
    scopes: readerScopes,
  },
  [UserRoles.Editor]: {
    scopes: editorScopes,
  },
  [UserRoles.ApprovalEditor]: {
    scopes: approvalEditorScopes,
  },
  [UserRoles.CompanyAdmin]: {
    scopes: approvalEditorScopes,
  },
  [UserRoles.Admin]: {
    scopes: adminScopes,
  }
}
