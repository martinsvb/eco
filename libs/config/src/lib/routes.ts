export const routes = {
    base: '/',
    notFound: '*',
    accounts: '/accounts',
    accountsNew: '/accounts/new',
    accountsEdit: '/accounts/edit/:id',
    companies: '/companies',
    contacts: '/contacts',
    content: {
        article: {
            list: '/articles',
            new: '/articles/new',
            detail: '/articles/detail/:id',
        },
        record: {
            list: '/records',
            new: '/records/new',
            detail: '/records/detail/:id',
        },
        task: {
            list: '/tasks',
            new: '/tasks/new',
            detail: '/tasks/detail/:id',
        },
        new: {
            list: '/news',
            new: '/news/new',
            detail: '/news/detail/:id',
        },
    },
    errors: '/errors',
    home: '/home',
    invitation: '/invitation',
    users: '/users',
    usersEdit: '/users/edit/:id',
}
