import Vue from 'vue'
import VueRouter from 'vue-router'
import user from "@/store/user";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home/Home.vue'),
        meta: {
            requireNotAuth: true,
        },
    },
    {
        path: '/login',
        name: 'SignIn',
        component: () => import('../views/user-sign/SignIn.vue'),
        meta: {
            requireNotAuth: true,
            noNav: true
        }
    },
    {
        path: '/register',
        name: 'SignUp',
        component: () => import('../views/user-sign/SignUp.vue'),
        meta: {
            noNav: true
        }
    },
    {
        path: '/unverified_email',
        name: 'EmailVerify',
        component: () => import('../views/user-sign/EmailVerify.vue'),
        meta: {
            requireAuth: true,
            requireAuthNotConfirmed: true
        }
    },
    {
        path: '/confirm',
        name: 'EmailConfirm',
        component: () => import('../views/user-sign/EmailConfirm.vue'),
    },
    {
        path: '/index',
        name: 'QnCenter',
        component: () => import( '../views/qn-manage/QnCenter.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/create_ques',
        name: 'CreateQues',
        component: () => import('../views/qn-create/CreateQn.vue'),
    },
    {
        path: '/investigation',
        name: 'Investigation',
        component: () => import('../views/qn-create/qn-form/investigation'),
    },
    {
        path: '/stat',
        name: 'QnStat',
        component: () => import('../views/qn-stat/QnStat'),
    },

    {
        path: '/*',
        name: 'PageNotFound',
        component: () => import('../views/error/PageNotFound'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const userInfo = user.getters.getUser(user.state())

    // require sign in
    if (!userInfo && to.meta.requireAuth) {
        next({
            name: 'Home',
        })
    }

    // require not sign in
    if (userInfo && to.meta.requireNotAuth) {
        next({
            name: 'QnCenter',
        })
    }

    //邮箱验证后不能访问的页面 如再次验证邮箱
    if (userInfo && userInfo.user.confirmed && to.meta.requireAuthNotConfirmed) {
        next({
            name: 'Home',
        })
    }

    next()
})

export default router
