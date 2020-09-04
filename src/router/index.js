import Vue from 'vue'
import VueRouter from 'vue-router'
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: '首页'
        },
        component: () => import('../views/home/Home')
    },
    {
        path: '/carApplication',
        name: 'carApplication',
        meta: {
            title: '车辆申请'
        },
        component: () => import('../views/home/carApplication')
    },
    {
        path: '/myApplication',
        name: 'myApplication',
        meta: {
            title: '我的申请'
        },
        component: () => import('../views/home/myApplication')
    },
    {
        path: '/returnVehicle',
        name: 'returnVehicle',
        meta: {
            title: '车辆归还'
        },
        component: () => import('../views/home/returnVehicle')
    },
    {
        path: '/leaderList',
        name:'leaderList',
        meta:{},
        component:()=>import('../views/home/leaderList')
    },
    {
        path: '/leaderReview',
        name: 'leaderReview',
        meta: {
            title: '领导审核'
        },
        component: () => import('../views/home/leaderReview')
    }, {
        path: '/leaderAssigned',
        name: 'leaderAssigned',
        meta: {
            title: '领导分配'
        },
        component: () => import('../views/home/leaderAssigned')
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title: '我的',
        },
        component: () => import('../views/user/user')
    },
    {
        path: '/user/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () => import('../views/user/login')
    },
    {
        path: '/user/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        component: () => import('../views/user/register')
    },
    {
        path: '/user/info',
        name: 'info',
        meta: {
            title: '其他'
        },
        component: () => import('../views/user/info')
    }
]

const router = new VueRouter({
    routes
})

export default router
