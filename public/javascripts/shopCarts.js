

var vm = new Vue({
    el: '#cart-app',
    data: {
        items: [],
        filterItems: [],
        searchName: "",
        pages: "",
        showItem: "",
        beginItem: 0,
        endItem: 10,
        currentPage: 1,
        carts: [],
        type: 1,
    },
    mounted() {
        // 載入資料
        this.getProItems();
    },
    computed: {
        // 計算購物車商品總金額
        amount() {
            let ln_amount = 0;
            if (this.carts.length > 0) {
                for (let i = 0; i < this.carts.length; i++) {
                    let ln_price = this.carts[i].price;
                    let ln_number = this.carts[i].count;
                    let ln_total = ln_price * ln_number;
                    ln_amount += ln_total;
                }
            }
            return ln_amount;
        },

        // 頁碼
        countOfPage() {
            if (!this.pages) {
                let ln_countProduct = this.items.length;
                // 設定初始商品顯示項目數量
                this.showItem = 10;
                let ln_showItem = this.showItem;
                // 計算總共頁碼
                let ln_pages = ln_countProduct % ln_showItem === 0 ? ln_countProduct / ln_showItem : Math.ceil(ln_countProduct / ln_showItem);
                this.pages = ln_pages;
                return this.pages;
            } else if (this.page !== '') {
                return this.pages;
            }

        }
    },
    watch: {},
    methods: {
        // 商品增加至購物車
        addItem(product) {
            let ln_checkCarts = this.carts.indexOf(product);

            // 購物車不存在此商品，新增商品
            if (ln_checkCarts === -1) {
                this.carts.push(product);
                // 假如沒有count，指定count並給予數量預設值為1
                this.$set(product, 'count', 1);
            }
        },
        //  減少商品數量
        remove(product) {
            if (product.count === 1 || product.count === undefined) {
                let ln_cartsIndex = this.carts.indexOf(product);
                this.carts.splice(ln_cartsIndex, 1);
            } else {
                product.count--;
            }
        },

        // 顯示商品，搜尋時會篩選符合商品
        filterProduct(type) {
            if (type === 1) {
                let la_totalItem = [];
                for (let i = this.beginItem; i < this.endItem; i++) {
                    la_totalItem.push(this.items[i]);
                }

                return la_totalItem;
            } else if (type === 2) {

                let la_totalItem = [];


                for (let i = this.beginItem; i < this.endItem; i++) {


                    if (this.filterItems[i] !== undefined) {
                        la_totalItem.push(this.filterItems[i]);
                    }
                }

                // console.log("=========================");
                // console.log(la_totalItem);
                return la_totalItem;

            }
        },
        // 商品搜尋
        search() {
            if (this.searchName !== '') {
                this.type = 2;
                this.filterItems = this.items.filter((product) => {
                    // 檢查每個商品項目，比對商品名稱，回傳符合的項目
                    // 不等於負1成立，代表有此項目
                    return product.name.indexOf(this.searchName) !== -1;
                });
                // 商品搜尋後並重新計算頁碼顯示數量
                let ln_showItem = this.showItem;
                let la_filterItems = this.filterItems;
                let ln_pages = la_filterItems.length % ln_showItem === 0 ? la_filterItems.length / ln_showItem : Math.ceil(la_filterItems.length / ln_showItem);
                this.pages = ln_pages;
            }

        },
        // 切換分頁
        switchPage(number) {
            // 分頁第一頁之後
            if (number > 1) {
                this.currentPage = number;
                this.beginItem = number * this.showItem - this.showItem;
                this.endItem = number * this.showItem;
                // 分頁目前是第一頁
            } else if (number === 1) {
                this.currentPage = number;
                this.beginItem = 0;
                this.endItem = 10;
            }

        },
        //分頁上一頁
        previous() {
            // 目前頁數大於第一頁
            if (this.currentPage > 1) {
                this.currentPage--;
                this.beginItem = this.beginItem - this.showItem;
                this.endItem = this.endItem - this.showItem;
            }
        },
        // 分頁下一頁
        next() {
            // 目前頁數小於總頁數
            if (this.currentPage < this.pages) {
                this.currentPage++;
                this.beginItem = this.beginItem + this.showItem;
                this.endItem = this.endItem + this.showItem;
            }
        },
        //取得產品資料
        getProItems: function () {
            axios.get("./data/pros-list.json")
                .then((respose) => {
                    this.items = respose.data;
                });
        }
    }
});