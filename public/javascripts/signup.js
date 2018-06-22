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
            // 收集使用者輸入的資料
            let lo_info = {};

            lo_info.account = this.account;
            lo_info.password = this.password;
            lo_info.name = this.name;
            lo_info.birthday = this.birthday;
            lo_info.tel1 = this.tel1;
            lo_info.tel2 = this.tel2;

            if (this.account !=='' && this.password !== '') {
                // 發一個請求，驗證資料
                $.post("/signup", lo_info, function (data) {
                    if (data.success) {
                        window.location.pathname = '/';
                    } else {
                        // 註冊失敗回饋錯誤資訊
                        alert(data.message);
                    }
                });
            } else {
                alert('請輸入帳號密碼');
            }

        }
    }
});


