// import Vue from 'vue'
import {
    REG_USER_INFO,
    FIND_PASS_ACCOUNT,
    ACCOUNT_GRADE
} from './mutations-type'


export default {
    [REG_USER_INFO] (state, {regUserInfo}) {
        state.regUserInfo = regUserInfo
    },
    [FIND_PASS_ACCOUNT] (state, {findPasswordAccount}) {
        state.findPasswordAccount = findPasswordAccount
    },
    [ACCOUNT_GRADE] (state, {accountGrade}) {
        localStorage.setItem("DBJAccountGrade", accountGrade)
        state.accountGrade = accountGrade
    }
}
