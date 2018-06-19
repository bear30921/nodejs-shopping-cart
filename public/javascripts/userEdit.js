let vm = new Vue({
    el: '#userEdit',
    data: {
        message: '',
        check: false,
        newPassword: '',
        confirmPassword: '',
        checkMessage: ''

    },
    methods: {

        // 修改個人資料
        update() {

            // 收集使用者輸入的帳密
            let lo_info = {};
            let ls_id = document.getElementById('userId').value;
            let ls_account = document.getElementById('account').value;
            let ls_password = document.getElementById('password').value;
            let ls_name = document.getElementById('name').value;
            let ls_birthday = document.getElementById('birthday').value;
            let ls_tel1 = document.getElementById('tel1').value;
            let ls_tel2 = document.getElementById('tel2').value;

            // 把收集好的資料放置一個物件容器
            lo_info.id = ls_id;
            lo_info.account = ls_account;
            lo_info.password = ls_password;
            lo_info.name = ls_name;
            lo_info.birthday = ls_birthday;
            lo_info.tel1 = ls_tel1;
            lo_info.tel2 = ls_tel2;
            // 發一個請求，驗證資料
            $.post("/user/edit", lo_info, function (data) {
                if (data.message === '資料更新成功') {
                    window.location.reload();
                    alert(data.message);
                }
            });
        },

        // 打開修改密碼Dialog
        openDialog() {
            $("#dialog").dialog();
        },

        // 舊密碼驗證
        checkPassword(event) {

            let lo_info = {};
            lo_info.id = document.getElementById('userId').value;
            lo_info.passwordOld = event.currentTarget.value;


            let self = this;
            $.post("/user/check", lo_info, function (data) {
                self.checkMessage = data.message;
                console.log(self.checkMessage);
                self.check = true;
                self.message = data.message;
            });

        },

        // 保存更改密碼
        changePassword() {

            let ls_account = document.getElementById('account').value;
            let ls_passwordOld = document.getElementById('passwordOld').value;
            let ls_newPassword = this.newPassword;
            let ls_confirmPassword = this.confirmPassword;
            let ls_checkMessage = this.checkMessage;

            if (ls_passwordOld !== '' && ls_newPassword !== '' && ls_confirmPassword !== '') {

                // 驗證舊密碼和新密碼
                if (ls_checkMessage === '密碼正確' && ls_newPassword === ls_confirmPassword) {

                    $.post("/user/password", {account: ls_account, password: ls_newPassword}, function (data) {

                        // 關閉dialog視窗
                        $("#dialog").dialog('close');

                        // 清除表單資料
                        document.getElementById('passwordOld').value = '';
                        this.newPassword = '';
                        this.confirmPassword = '';
                        this.check = false;

                        // 密碼更新成功提示
                        alert(data.message);

                        // 刷新網頁
                        window.location.reload();
                    });
                } else {
                    alert('舊密碼或新密碼錯誤');
                }
            }
        }
    }
});


