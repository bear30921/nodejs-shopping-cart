let vm = new Vue({
    el: '#userEdit',
    methods: {
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
        openDialog() {
            $( "#dialog" ).dialog();
        },
        checkPassword(event) {

            let lo_info = {};
            lo_info.passwordOld = event.currentTarget.value;
            $.post("/user/edit", lo_info, function (data) {
                console.log(data);
            });
        },

    }
});


