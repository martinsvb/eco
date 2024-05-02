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
    applicationAdmin: false,
    companyAdmin: false,
  },
  [UserRoles.Reader]: {
    scopes: readerScopes,
    applicationAdmin: false,
    companyAdmin: false,
  },
  [UserRoles.Editor]: {
    scopes: editorScopes,
    applicationAdmin: false,
    companyAdmin: false,
  },
  [UserRoles.ApprovalEditor]: {
    scopes: approvalEditorScopes,
    applicationAdmin: false,
    companyAdmin: false,
  },
  [UserRoles.CompanyAdmin]: {
    scopes: approvalEditorScopes,
    applicationAdmin: false,
    companyAdmin: true,
  },
  [UserRoles.Admin]: {
    scopes: adminScopes,
    applicationAdmin: true,
    companyAdmin: false,
  }
}
