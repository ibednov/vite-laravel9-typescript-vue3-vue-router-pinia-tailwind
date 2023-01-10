import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/components/front/index.vue'),
            meta: {
                title: 'Список идей (главная)',
                requiresAuth: false,
            },
            children: [
                {
                    path: ':id',
                    name: 'categoryById',
                    meta: {
                        title: 'Категория #',
                    },
                    component: () =>
                        import('@/components/front/ideasByCats.vue'),
                },
            ],
        },

        {
            path: '/register',
            name: 'register',
            component: () => import('@/components/admin/auth/RegisterPage.vue'),
            meta: {
                title: 'Регистрация',
                requiresAuth: false,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/admin/auth/LoginPage.vue'),
            meta: {
                title: 'Авторизация',
                requiresAuth: false,
            },
        },
        {
            path: '/admin/',
            name: 'admin',
            meta: {
                title: 'Админ панель',
                requiresAuth: true,
            },
            component: () => import('@/components/admin/index.vue'),
            redirect: { name: 'ideas' },
            children: [
                {
                    path: 'ideas',
                    name: 'ideas',
                    component: () =>
                        import('@/components/admin/ideas/index.vue'),
                    redirect: { name: 'ideas-cats' },
                    children: [
                        {
                            path: 'list',
                            name: 'ideas-list',
                            component: () =>
                                import(
                                    '@/components/admin/ideas/pages/list/index.vue'
                                ),
                            redirect: { name: 'ideas-list-index' },
                            children: [
                                {
                                    path: '',
                                    name: 'ideas-list-index',
                                    meta: {
                                        title: 'Список идей',
                                    },
                                    component: () =>
                                        import(
                                            '@/components/admin/ideas/pages/list/list.vue'
                                        ),
                                },
                                {
                                    path: ':id',
                                    name: 'ideas-edit',
                                    meta: {
                                        title: 'Редактирование идей',
                                    },
                                    component: () =>
                                        import(
                                            '@/components/admin/ideas/pages/list/edit.vue'
                                        ),
                                },
                                {
                                    path: 'add',
                                    name: 'ideas-add-idea',
                                    meta: {
                                        title: 'Добавление идей',
                                    },
                                    component: () =>
                                        import(
                                            '@/components/admin/ideas/pages/list/add.vue'
                                        ),
                                },
                            ],
                        },
                        {
                            path: 'tutorial',
                            name: 'ideas-tutorial',

                            meta: {
                                title: 'Инструкция',
                            },
                            component: () =>
                                import(
                                    '@/components/admin/ideas/pages/ideasTutorial.vue'
                                ),
                        },
                        {
                            path: 'cats',
                            name: 'ideas-cats',
                            component: () =>
                                import(
                                    '@/components/admin/ideas/pages/categories/index.vue'
                                ),
                            redirect: { name: 'ideas-cats-index' },
                            children: [
                                {
                                    path: '',
                                    name: 'ideas-cats-index',
                                    meta: {
                                        title: 'Категории идей',
                                    },
                                    component: () =>
                                        import(
                                            '@/components/admin/ideas/pages/categories/cats.vue'
                                        ),
                                },
                                {
                                    path: ':id',
                                    name: 'cats-edit',
                                    meta: {
                                        title: 'Редактирование категории',
                                    },
                                    component: () =>
                                        import(
                                            '@/components/admin/ideas/pages/categories/edit.vue'
                                        ),
                                },
                                {
                                    path: 'add',
                                    name: 'ideas-add-cat',
                                    meta: {
                                        title: 'Добавление категории',
                                    },
                                    component: () =>
                                        import(
                                            '@/components/admin/ideas/pages/categories/add.vue'
                                        ),
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'other',
                    name: 'other',
                    meta: {
                        title: 'Будущее (иначе зачем делать меню слева))',
                    },
                    component: () =>
                        import('@/components/admin/other/index.vue'),
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});

// router.beforeEach((to, from) => {
//     if (to.meta.requiresAuth && !localStorage.getItem('userToken')) {
//         return { name: 'Login' };
//     }

//     if (to.meta.requiresAuth == false && localStorage.getItem('userToken')) {
//         return { name: 'admin' };
//     }
// });

export default router;
