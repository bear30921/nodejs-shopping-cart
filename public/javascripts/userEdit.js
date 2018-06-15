let vm = new Vue({
    el: '#login',
    methods: {
        save() {

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


