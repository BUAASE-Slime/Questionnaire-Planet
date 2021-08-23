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
            // requireNotAuth: true,
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
        path: '/bin',
        name: 'QnBin',
        component: () => import( '../views/qn-manage/QnBin.vue'),
    },
    {
        path: '/create_ques',
        name: 'CreateQues',
        component: () => import('../views/qn-create/CreateQn.vue'),
    },
    {
        path: '/edit',
        name: 'Edit',
        component: () => import('../views/qn-create/qn-form/investigation'),
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('../views/qn-create/qn-form/test'),
    },
    {
        path: '/form',
        name: 'SignUpForm',
        component: () => import('../views/qn-create/qn-form/form'),
    },
    {
        path: '/fill_qn',
        name: 'FillQn',
        component: () => import('../views/qn-fill/FillQn'),
        meta: {
            noNav: true
        },
    },
    {
        path: '/preview_form',
        name: 'PreviewForm',
        component: () => import('../views/qn-fill/FillQnForm'),
        meta: {
            noNav: true
        }
    },
    {
        path: '/preview_test',
        name: 'PreviewTest',
        component: () => import('../views/qn-fill/FillQnTest'),
        meta: {
            noNav: true
        }
    },
    {
        path: '/preview',
        name: 'Preview',
        component: () => import('../views/qn-fill/FillQn'),
        meta: {
            noNav: true
        }
    },
    {
        path: '/test_result',
        name: 'TestResult',
        component: () => import('../views/qn-fill/FinishTest'),
    },
    {
        path: '/stat',
        name: 'QnStat',
        component: () => import('../views/qn-stat/QnStat'),
        children :[
            {
                path: '/recyconcept',
                name: 'recyconcept',
                
                component: () => import('../views/qn-stat/sub-stat/recyconcept')
            },
            {
                path: '/answerdata',
                name: 'answerdata',
                
                component: () => import('../views/qn-stat/sub-stat/answerdata')              
            },
            {
                path: '/chartreport',
                name: 'chartreport',
                
                component: () => import('../views/qn-stat/sub-stat/chartreport')              
            },
            {
                path: '/crossover',
                name: 'crossover',
                
                component: () => import('../views/qn-stat/sub-stat/crossover')              
            },
            {
                path: '/download',
                name: 'download',
                
                component: () => import('../views/qn-stat/sub-stat/download')              
            },
        ]
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
