export default {
    install(Vue) {
        Vue.prototype.$alertError = function (error){
            this.$message.error(error.Message);
        }
    }
}