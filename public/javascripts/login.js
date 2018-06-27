// const messages = {
//     "en": {
//         "message": {
//             "hello": "hello world"
//         }
//     },
//     "zh-tw": {
//         "message": {
//             "hello": "こんにちは、世界"
//         }
//     }
// };
//
//
//
// // Create VueI18n instance with options
// let i18n = new VueI18n({
//     locale: 'zh-tw', // set locale
//     messages, // set locale messages
// });


let vm = new Vue({
    el: '#login',
    data: {
        account: "",
        password: ""
    },
    methods: {
        signIn() {
            if (this.account !== '' && this.password !== '') {
                // 收集使用者輸入的帳密
                let lo_info = {};
                let ls_account = this.account;
                let ls_password = this.password;
                // 把收集好的資料放置一個物件容器
                lo_info.account = ls_account;
                lo_info.password = ls_password;
                // 發一個請求
                $.post("/login", lo_info, function (data) {
                    if (data.success) {
                        window.location.pathname = '/';
                    } else {
                        // 登入失敗回饋錯誤資訊
                        alert(data.message)
                    }
                });
            } else {
                alert('請輸入帳號密碼');
            }
        },
        switchLanguage(event) {

            let ls_language = event.currentTarget.dataset.language;

            $.get("/language/"+ ls_language, function(data){
                if (data.success) {

                    // 把語系存在瀏覽器上
                    let lo_local = {
                        language: ls_language
                    };
                    localStorage.setItem('internationalization', JSON.stringify(lo_local));

                    window.location.pathname = '/login';

                }
            });

        }

    }
});


