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

            // 收集使用者輸入的資料
            let lo_info = {};

            lo_info.id = document.getElementById('userId').value;
            lo_info.account = document.getElementById('account').value;
            lo_info.password = document.getElementById('password').value;
            lo_info.name = document.getElementById('name').value;
            lo_info.birthday = document.getElementById('birthday').value;
            lo_info.tel1 = document.getElementById('tel1').value;
            lo_info.tel2 = document.getElementById('tel2').value;
            // 發一個請求，驗證資料
            $.post("/user/edit", lo_info, function (data) {
                if (data.success) {
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

            if (ls_passwordOld !== '' && this.newPassword !== '' && this.confirmPassword !== '') {

                // 驗證舊密碼和新密碼
                if (this.checkMessage === '密碼正確' && this.newPassword === this.confirmPassword) {

                    $.post("/user/password", {account: ls_account, password: this.newPassword}, function (data) {

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


