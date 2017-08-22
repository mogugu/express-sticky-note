require("less/toast.less");

function Toast(msg,time){
    this.msg=msg;
    this.dissTime=time || 1000;
    this.createToast();
    this.showToast();
}
Toast.prototype={
    createToast:function () {
        var htl="<div class='toast'>"+this.msg+"</div>";
        this.$toast=$(htl);
        $('body').append(this.$toast);
    },
    showToast:function () {
        var self=this;
        self.$toast.fadeIn(300,function () {
            setTimeout(function () {
                self.$toast.fadeOut(300,function () {
                    self.$toast.remove();
                })
            },self.dissTime)
        });
    }
};
function toast(msg,time) {
    return new Toast(msg,time)
}
window.toast=toast;
module.exports.toast=toast;
