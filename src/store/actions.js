import { REG_USER_INFO, FIND_PASS_ACCOUNT, ACCOUNT_GRADE } from './mutations-type'


export default {

    // 同步记录注册用户信息
    recordUser({ commit }, regUserInfo) {
        commit(REG_USER_INFO, { regUserInfo })
    },
    // 记录account
    recordAccount({ commit }, findPasswordAccount) {
        commit(FIND_PASS_ACCOUNT, { findPasswordAccount })
    },
    // 记录角色
    recordAccountGrade({commit}, accountGrade){
        commit(ACCOUNT_GRADE, { accountGrade })
    }
}








