import Vue from 'vue'
import VueRouter from 'vue-router'
import user from "@/store/user";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home/Home.vue')
    },
    {
        path: '/login',
        name: 'SignIn',
        component: () => import('../views/user-sign/SignIn.vue'),
        meta: {
            requireNotAuth: true,
        }
    },
    {
        path: '/register',
        name: 'SignUp',
        component: () => import('../views/user-sign/SignUp.vue'),
        meta: {

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
        path: '/home',
        name: 'QnCenter',
        component: () => import( '../views/qn-manage/QnCenter.vue')
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

    // require not sign in
    if (userInfo && to.meta.requireNotAuth) {
        next({
            name: 'Home',
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
