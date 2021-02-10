import Vue from "vue";
import Router from "vue-router";

import Login from "../pages/Login/Login.vue";
// router lazy load
// const Login = () => import('../pages/Login/Login.vue')
const Register = () => import('../pages/Register/Register.vue')

const RegisterUserInfo = () => import('../pages/Register/RegisterUserInfo/RegisterUserInfo.vue')
const RegisterActive = () => import("../pages/Register/RegisterActive/RegisterActive.vue")
const RegisterFinishInfo = () => import("../pages/Register/RegisterFinishInfo/RegisterFinishInfo.vue")
const RegisterSuccess = () => import("../pages/Register/RegisterSuccess/RegisterSuccess.vue")
const RegisterJudgeDoctor = () => import("../pages/Register/RegisterJudgeDoctor/RegisterJudgeDoctor.vue")

const FindPassword = () => import("../pages/FindPassword/FindPassword.vue")
const FindWay = () => import("../pages/FindPassword/FindWay/FindWay.vue")
const FindVcode = () => import("../pages/FindPassword/FindVcode/FindVcode.vue")
const SetNewPassword = () => import("../pages/FindPassword/SetNewPassword/SetNewPasswrod.vue")
const FindPasswordSuccess = () => import("../pages/FindPassword/FindPasswordSuccess/FindPasswordSuccess.vue")

const Msite = () => import("../pages/Msite/Msite.vue")
const Case = () => import("../pages/Case/Case.vue")
const Review = () => import("../pages/Review/Review.vue")
const Account = () => import("../pages/Account/Account.vue")
const Setting = () => import("../pages/Setting/Setting.vue")
const Expert = () => import("../pages/Expert/Expert.vue")
const AllCase = () => import("../pages/AllCase/AllCase.vue")

const UploadVideo = () => import("../pages/UploadVideo/UploadVideo.vue")
const UploadPPT = () => import("../pages/UploadPPT/UploadPPT.vue")


Vue.use(Router);

//push 
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch(err => err)
}

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            redirect: "/msite"
        },
        {
            path: "/login",
            component: Login,
            meta: {
                showUserInfo: true,
                activeNum: "3",
                title: '登录'
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                showUserInfo: false
            },
            children: [
                {
                    path: '/register',
                    redirect: '/register/userinfo'
                },
                {
                    path: '/register/userinfo',
                    component: RegisterUserInfo,
                    meta: {
                        stepActiveNum: 0,
                        subTitle: "设置注册信息"
                    }
                },
                {
                    path: '/register/active',
                    component: RegisterActive,
                    meta: {
                        stepActiveNum: -1,
                        subTitle: "邮箱激活"
                    }
                },
                {
                    path: '/register/finishinfo',
                    component: RegisterFinishInfo,
                    meta: {
                        stepActiveNum: 1,
                        subTitle: "完善个人信息"
                    }
                },
                {
                    path: '/register/regsuccess',
                    component: RegisterSuccess,
                    meta: {
                        stepActiveNum: 2,
                        subTitle: "注册成功"
                    }
                },
                {
                    path: '/register/registerjudge',
                    component: RegisterJudgeDoctor,
                    meta: {
                        stepActiveNum: -2,
                        subTitle: "点评专家注册"
                    }
                }
            ]
        },
        {
            path: "/findpassword",
            component: FindPassword,
            meta: {
                showUserInfo: false,
            },
            children: [
                {
                    path: '/findpassword',
                    redirect: '/findpassword/findway'
                },
                {
                    path: '/findpassword/findway',
                    component: FindWay,
                    meta: {
                        subTitle: "密码找回-找回方式"
                    }
                },
                {
                    path: '/findpassword/findvcode',
                    component: FindVcode,
                    meta: {
                        subTitle: "密码找回-获取验证码"
                    }
                },
                {
                    path: '/findpassword/setnewpassword',
                    component: SetNewPassword,
                    meta: {
                        subTitle: "密码找回-设置新密码"
                    }
                },
                {
                    path: '/findpassword/findsuccess',
                    component: FindPasswordSuccess,
                    meta: {
                        subTitle: "密码找回-密码设置成功"
                    }
                },
            ]
        },
        {
            path: "/msite",
            component: Msite,
            meta: {
                showUserInfo: true,
                requireAuth: false,
                activeNum: "1",
                title: '项目介绍'
            }
        },
        {
            path: "/case",
            component: Case,
            meta: {
                showUserInfo: true,
                requireAuth: true,
                activeNum: "5",
                title: '提交案例'
            }
        },
        {
            path: "/review",
            component: Review,
            meta: {
                showUserInfo: true,
                requireAuth: true,
                activeNum: "6",
                title: '案例审核'

            }
        },
        {
            path: "/account",
            component: Account,
            meta: {
                showUserInfo: true,
                requireAuth: true,
                activeNum: "7",
                title: '用户管理'

            }
        },
        {
            path: "/allCase",
            component: AllCase,
            meta: {
                showUserInfo: true,
                requireAuth: true,
                title: '查看案例'
            }
        },
        {
            path: "/setting",
            component: Setting,
            meta: {
                showUserInfo: true,
                requireAuth: true,
                activeNum: "8",
                title: '账号设置'

            }
        },
        {
            path: "/Expert",
            component: Expert,
            meta: {
                showUserInfo: true,
                requireAuth: false,
                activeNum: "2",
                title: '点评专家介绍'

            }
        },
        {
            path: "/UploadVideo",
            component: UploadVideo,
        },
        {
            path: "/UploadPPT",
            component: UploadPPT,
        }
    ]
});

export default router;

router.beforeEach((to, from, next) => {
    // const title = to.matched[0].meta.title;
    console.log('ct 路径，', to)
    // document.title = title;

    if (Object.keys(to.meta).length) {
        if (to.meta.requireAuth) {
            //一天有效期
            if (localStorage.DBJLoginDate) {
                const date = new Date().toDateString()
                if (date !== localStorage.DBJLoginDate) {
                    localStorage.removeItem("UltraToken");
                    localStorage.removeItem("DBJLoginInfo");
                    localStorage.removeItem("DBJLoginName");
                    localStorage.removeItem("DBJLoginDate");
                    localStorage.setItem("DBJAccountGrade", -1)
                    router.app.$options.store.dispatch("recordAccountGrade", -1);
                }
            } else {
                localStorage.removeItem("UltraToken");
                localStorage.removeItem("DBJLoginInfo");
                localStorage.removeItem("DBJLoginName");
                localStorage.removeItem("DBJLoginDate");
                localStorage.setItem("DBJAccountGrade", -1)
                router.app.$options.store.dispatch("recordAccountGrade", -1);
            }
            // 没有对比剂token直接返回login
            if (!localStorage.getItem('UltraToken')) {
                next('/login');
            } else {
                next();
            }
        } else {
            next();
        }
    } else {
        next()
    }
});
