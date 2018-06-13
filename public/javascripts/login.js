let vm = new Vue({
    el: '#login',
    data: {
        account: "",
        password: ""
    },
    methods: {
        signIn() {
            // 收集使用者輸入的帳密
            let lo_info = {};
            let ls_account = this.account;
            let ls_password = this.password;
            // 把收集好的資料放置一個物件容器
            lo_info.account = ls_account;
            lo_info.password = ls_password;
            // 發一個請求
            $.post("./api/account", lo_info, function (data) {
                if (data.message === '登入成功') {
                    window.location.pathname = '/';
                } else {
                    // 登入失敗回饋錯誤資訊
                    alert(data.message)
                }
            });
        }
    }
});


