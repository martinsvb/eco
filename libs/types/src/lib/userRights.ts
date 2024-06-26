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
  records: rights.none,
  tasks: rights.none,
  contacts: rights.none,
  users: rights.none,
  companies: rights.none,
  errors: rights.none,
}

const readerScopes = {
  accounts: rights.reader,
  records: rights.reader,
  tasks: rights.reader,
  contacts: rights.reader,
  users: rights.reader,
  companies: rights.reader,
  errors: rights.none,
}

const editorScopes = {
  accounts: rights.editor,
  records: rights.editor,
  tasks: rights.editor,
  contacts: rights.editor,
  users: rights.reader,
  companies: rights.reader,
  errors: rights.none,
}

const approvalEditorScopes = {
  accounts: rights.approvalEditor,
  records: rights.approvalEditor,
  tasks: rights.approvalEditor,
  contacts: rights.editor,
  users: rights.approvalEditor,
  companies: rights.reader,
  errors: rights.none,
}

const adminScopes = {
  ...approvalEditorScopes,
  companies: rights.approvalEditor,
  errors: rights.approvalEditor,
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
