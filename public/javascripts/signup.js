let vm = new Vue({
    el: '#login',
    data: {
        account: "",
        password: "",
        name: "",
        birthday: "",
        tel1: "",
        tel2: ""
    },
    methods: {
        signup() {
            // 收集使用者輸入的帳密
            let lo_info = {};
            let ls_account = this.account;
            let ls_password = this.password;
            let ls_name = this.name;
            let ls_birthday = this.birthday;
            let ls_tel1 = this.tel1;
            let ls_tel2 = this.tel2;

            // 把收集好的資料放置一個物件容器
            lo_info.account = ls_account;
            lo_info.password = ls_password;
            lo_info.name = ls_name;
            lo_info.birthday = ls_birthday;
            lo_info.tel1 = ls_tel1;
            lo_info.tel2 = ls_tel2;

            // 發一個請求，驗證資料
            $.post("/signup", lo_info, function (data) {
                if (data.message === '註冊成功') {
                    window.location.pathname = '/';
                } else {
                    // 註冊失敗回饋錯誤資訊
                    alert(data.message)
                }
            });
        }
    }
});


