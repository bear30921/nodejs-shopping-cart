var vm = new Vue({
    el: '#cart-app',
    data: {
        items: [],
        filterItems: [],
        searchName: "",
        pages: "",
        currentPage: 1,
        carts: [],
        type: 1,
    },
    mounted() {
        this.getProItems();
    },
    computed: {
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
        countOfPage() {
            let ln_countProduct = this.items.length;
            let ln_showItem = 10;
            let ln_pages = ln_countProduct % ln_showItem === 0 ? ln_countProduct / ln_showItem : Math.ceil(ln_countProduct / ln_showItem);
            this.pages = ln_pages;
            return this.pages;
        }
    },
    watch: {},
    methods: {
        addItem(product) {
            let ln_checkCarts = this.carts.indexOf(product);

            // 購物車不存在此商品，新增商品
            if (ln_checkCarts === -1) {
                this.carts.push(product);
                // 假如沒有count，指定count並給予數量預設值為1
                this.$set(product, 'count', 1);
            }
        },

        remove(product) {
            if (product.count === 1 || product.count === undefined) {
                let ln_cartsIndex = this.carts.indexOf(product);
                this.carts.splice(ln_cartsIndex, 1);
            } else {
                product.count--;
            }
        },
        filterProduct(type) {
            if (type === 1) {
                let ln_showItem = 10;
                let lo_container = {};
                for (let i = this.currentPage - 1; i < ln_showItem; i++) {
                    // container.push(this.items[i]);
                }

                return this.items;
            } else if (type === 2) {
                return this.filterItems;
            }
        },
        search() {

            if (this.searchName !== '') {
                this.type = 2;
                this.filterItems = this.items.filter((product) => {
                    // 檢查每個商品項目，比對商品名稱，回傳符合的項目
                    // 不等於負1成立，代表有此項目
                    return product.name.indexOf(this.searchName) !== -1;
                });
                return this.filterItems;
            }

        },
        switchPage() {

        },
        //取得產品資料
        getProItems: function () {
            axios.get("./pros-list.json")
                .then((respose) => {
                    this.items = respose.data;
                });

        }
    }
});
