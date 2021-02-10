
// 正则
export const VCODE_REG = /\d{6}/;

export const PHONE_REG = /^1(3|4|5|7|8|9)\d{9}$/;

export const EMAIL_REG = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/

export const ID_CARD_15_REG = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/

export const ID_CARD_18_REG = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/

export const DOCTOR_CARD_REG = /^(\d{4})(\d{2})([1-4]|X)(\d{2})((^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$)|(^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$))$/

export const DOCTOR_LICENSE_REG = /^([1-2])(10|20|30|4[1-8])(\d{6})(\d{5}[1-9])$/

export const PASSWORD_REG = /^(?![^a-zA-Z]+$)(?!\D+$)/

export const POSITIVE_NUMBER_REG = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/

export const INTEGER_NUMBER_REG = /^[+]{0,1}(\d+)$/



// 验证方法
export const checkPhone = (rule, value, callback) => {
    if (!PHONE_REG.test(value)) {
        callback(new Error("手机号码格式不对"));
    } else {
        callback();
    }
};

export const checkEmail = (rule, value, callback) => {
    const patt = EMAIL_REG;
    if (!patt.test(value)) {
        callback(new Error("邮箱格式不对"));
    } else {
        callback();
    }
};
export const checkCaptchCode = (rule, value, callback) => {
    if (!VCODE_REG.test(value)) {
        callback(new Error("必须是6位数字"));
    } else {
        callback();
    }
};
export const checkmMailCode = (rule, value, callback) => {
    if (!VCODE_REG.test(value)) {
        callback(new Error("必须是6位数字"));
    } else {
        callback();
    }
};
export const checkPassword = (rule, value, callback) => {
    if (!PASSWORD_REG.test(value)) {
        callback(new Error("密码包含字母和数字"));
    } else if (value.length < 6) {
        callback(new Error("密码至少6位"));
    } else {
        callback();
    }
};
export const checkLicenseNumber = (rule, value, callback) => {
    if (DOCTOR_LICENSE_REG.test(value)) {
      callback();
    } else {
      callback(new Error("执业证书编码格式不对"));
    }
  };
