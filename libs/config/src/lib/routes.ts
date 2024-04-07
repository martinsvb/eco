import { ContentTypes } from '@eco/types';

export const routes = {
    base: '/',
    accounts: 'accounts',
    accountsNew: 'accounts/new',
    accountsEdit: 'accounts/edit/:id',
    content: {
        [ContentTypes.Article]: {
            list: 'articles',
            new: 'articles/new',
            edit: 'articles/edit/:id',
        },
        [ContentTypes.Task]: {
            list: 'tasks',
            new: 'tasks/new',
            edit: 'tasks/edit/:id',
        },
        [ContentTypes.New]: {
            list: 'news',
            new: 'news/new',
            edit: 'news/edit/:id',
        },
    },
    home: 'home',
    users: 'users',
}
