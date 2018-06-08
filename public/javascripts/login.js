// $(document).ready(function () {
//    console.log('hello');
// });

$(document).ready(function(){
    $('.signIn').on('click', function() {
        // 收集使用者輸入的帳密
        let la_info = {};
        let ln_account = $('.account').val();
        let ln_password = $('.password').val();
        // 把收集好的資料放置一個物件容器
        la_info.account = ln_account;
        la_info.password = ln_password;
        // 發一個請求
        $.ajax({
            url: './api/account',
            data: la_info,
            dataType: 'json',
            success: function(data) {
                console.log(data);
            }
        });
    });
});


