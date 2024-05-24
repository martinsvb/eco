export const routes = {
    base: '/',
    accounts: '/accounts',
    accountsNew: '/accounts/new',
    accountsEdit: '/accounts/edit/:id',
    companies: '/companies',
    content: {
        article: {
            list: '/articles',
            new: '/articles/new',
            edit: '/articles/edit/:id',
        },
        record: {
            list: '/records',
            new: '/records/new',
            edit: '/records/edit/:id',
        },
        task: {
            list: '/tasks',
            new: '/tasks/new',
            edit: '/tasks/edit/:id',
        },
        new: {
            list: '/news',
            new: '/news/new',
            edit: '/news/edit/:id',
        },
    },
    home: '/home',
    invitation: '/invitation',
    users: '/users',
    usersEdit: '/users/edit/:id',
}
