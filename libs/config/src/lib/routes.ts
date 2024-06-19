export const routes = {
    base: '/',
    home: '/home',
    invitation: '/invitation',
    notFound: '*',
    app: '/app',
    appHome: '/app/home',
    accounts: '/app/accounts',
    accountsNew: '/app/accounts/new',
    accountsEdit: '/app/accounts/edit/:id',
    companies: '/app/companies',
    contacts: '/app/contacts',
    content: {
        article: {
            list: '/app/articles',
            new: '/app/articles/new',
            detail: '/app/articles/detail/:id',
        },
        record: {
            list: '/app/records',
            new: '/app/records/new',
            detail: '/app/records/detail/:id',
        },
        task: {
            list: '/app/tasks',
            new: '/app/tasks/new',
            detail: '/app/tasks/detail/:id',
        },
        new: {
            list: '/app/news',
            new: '/app/news/new',
            detail: '/app/news/detail/:id',
        },
    },
    errors: '/app/errors',
    errorsDetail: '/app/errors/:id',
    users: '/app/users',
    usersEdit: '/app/users/edit/:id',
}
