import Vue from 'vue'
import VueRouter from 'vue-router'
import user from "@/store/user";

Vue.use(VueRouter)

const routes = [
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

    next()
})

export default router
