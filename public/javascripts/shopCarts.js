const messages = {
    "en": {
        "message": {
            "signOut": "sign out",
            "webTitle": "VUEJS practice - store",
            "productSearch": "product search",
            "carts": "carts",
            "amount": "amount",
            "checkout": "checkout",
            "addToCart": "add to cart",
            "webName": "shopping mall",
            "order": "order",
            "profile": "profile",
        }
    },
    "zh-tw": {
        "message": {
            "signOut": "登出",
            "webTitle": "VUEJS 實戰 - 5倍商城",
            "productSearch": "商品搜尋",
            "carts": "購物車",
            "amount": "小計",
            "checkout": "結帳",
            "addToCart": "放入購物車",
            "webName": "購物商城",
            "order": "購物紀錄",
            "profile": "會員修改",
        }
    }
};


// 取得瀏覽器存的資料
let lo_setLocal = localStorage.getItem('internationalization');
lo_setLocal = JSON.parse(lo_setLocal);


// Create VueI18n instance with options
let i18n = new VueI18n({
    locale: lo_setLocal.language, // set locale
    messages, // set locale messages
});


// 全域元件建立必須在vue的實體之前
Vue.component('nav-bar', {
    template: '<nav class="navbar navbar-inverse">\n' +
    '      <div class="container-fluid">\n' +
    '        <div class="navbar-header">\n' +
    '          <a class="navbar-brand" href="#">{{ $t("message.webName") }}</a>\n' +
    '        </div>\n' +
    '        <ul class="nav navbar-nav navbar-right">\n' +
    '          <li><a href="/user/order"><span class="glyphicon glyphicon-shopping-cart"></span>{{ $t("message.order") }}</a></li>\n' +
    '          <li><a href="/user/edit"><span class="glyphicon glyphicon-user"></span>{{ $t("message.profile") }}</a></li>\n' +
    '          <li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span>{{ $t("message.signOut") }}</a></li>\n' +
    '\n' +
    '\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '    </nav>'
});

//  商品項目
Vue.component('product-item', {
    template: '<div><div class="item" v-for="product in filterProduct(type)">\n' +
    '          <h2>{{ product.name }}:index {{ product.index }}</h2>\n' +
    '          <img class="item-img img-responsive" :src="product.picture" :alt="product.imageType">\n' +
    '          <p>{{ product.info }}</p>\n' +
    '          <p class="item-price ">${{ product.price }}</p>\n' +
    '          <a class="btn btn-primary " @click.prevent="addCart(product)" href="#">{{ $t("message.addToCart") }} <span class="glyphicon glyphicon-chevron-right "></span></a>\n' +
    '        </div></div>',
    props: ['filterItems', 'items', 'type', 'beginItem', 'endItem'],
    methods: {
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

                return la_totalItem;

            }
        },
        addCart(product) {
            this.$emit('update-add-cart', product);
        }

    }
});


// 頁碼
Vue.component('pagination', {
    template: '<ul class="pagination">\n' +
    '          <li>\n' +
    '            <a href="#" aria-label="Previous" @click.prevent="previous">\n' +
    '              <span aria-hidden="true">&laquo;</span>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '          <li v-for="page in countOfPage">\n' +
    '            <a href="#" @click.prevent="switchPage(page)">{{ page }}</a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="#" aria-label="Next" @click.prevent="next">\n' +
    '              <span aria-hidden="true">&raquo;</span>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '        </ul>',
    props: ['pages', 'items', 'currentPage'],
    data: {},
    computed: {
        // 頁碼
        countOfPage() {
            if (!this.pages) {
                let ln_countProduct = this.items.length;
                let lo_pageInfo = {};
                // 設定初始商品顯示項目數量
                let ln_showItem = 10;
                // 計算總共頁碼
                let ln_pages = ln_countProduct % ln_showItem === 0 ? ln_countProduct / ln_showItem : Math.ceil(ln_countProduct / ln_showItem);
                //把子層要更動的資料傳遞給父層
                lo_pageInfo = {
                    showItem: ln_showItem,
                    pages: ln_pages
                };
                this.$emit('update-show-item', lo_pageInfo);
                return this.pages;
            } else if (this.page !== '') {
                return this.pages;
            }
        }
    },
    methods: {
        //分頁上一頁
        previous() {
            // 目前頁數大於第一頁
            if (this.currentPage > 1) {
                this.$emit('update-previous');
            }
        },
        // 分頁下一頁
        next() {
            // 目前頁數小於總頁數
            if (this.currentPage < this.pages) {

                this.$emit('update-next');

            }
        },

        // 切換分頁
        switchPage(number) {

            this.$emit('update-switch-page', number);

        },
    }

});

// 搜尋列
Vue.component('search-bar', {
    template: '<div class="well ">\n' +
    '          <h4>{{ $t("message.productSearch") }}</h4>\n' +
    '          <div class="input-group ">\n' +
    '            <input type="text" class="form-control" v-model="searchName">\n' +
    '            <span class="input-group-btn">\n' +
    '                <button class="btn btn-default" @click="search"><span class="glyphicon glyphicon-search "></span></button>\n' +
    '            </span>\n' +
    '          </div>\n' +
    '        </div>',
    props: ['searchName'],
    methods: {
        search() {
            this.$emit('update-search', this.searchName);
        }
    }
});


// 購物車
Vue.component('shopping-cart', {
    template: '<div class="well cart">\n' +
    '          <h4>{{ $t("message.carts") }}</h4>\n' +
    '\n' +
    '          <ul class="itemsInCart ">\n' +
    '            <li v-for="cartProduct in carts" :key="cartProduct.index">\n' +
    '              <div class="cart-item">\n' +
    '                <div class="cart-title">{{ cartProduct.name }}</div> <span class="price">{{ cartProduct.price }}</span> x\n' +
    '                <span class="count">{{ cartProduct.count }}</span>\n' +
    '                <div class="handler"><a href="#" class="cart-btn plus" @click.prevent="increase(cartProduct)">+</a> <a href="#" class="cart-btn minus" @click.prevent="remove(cartProduct)">-</a></div>\n' +
    '              </div>\n' +
    '            </li>\n' +
    '          </ul>\n' +
    '          <hr>\n' +
    '          <p>{{ $t("message.amount") }}： <span>${{ amount }}</span></p>\n' +
    '          <p>\n' +
    '            <button type="button" class="btn btn-primary" @click="checkout">{{ $t("message.checkout") }}</button>\n' +
    '          </p>\n' +
    '        </div>',
    props: ['carts'],
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
    },
    methods: {
        increase(product) {
            this.$emit('update-increase', product);
        },
        remove(product) {
            this.$emit('update-remove', product);
        },
        checkout() {
            this.$emit('update-checkout');
        }
    }
});

let vm = new Vue({
    el: '#cart-app',
    i18n,
    data() {
        return {
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
        };
    },
    mounted() {
        // 載入資料
        this.getProItems();
    },
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
        changeRemove(product) {
            if (product.count === 1 || product.count === undefined) {
                let ln_cartsIndex = this.carts.indexOf(product);
                this.carts.splice(ln_cartsIndex, 1);
            } else {
                this.carts.forEach(function (cartProduct) {
                    if (cartProduct.index === product.index) {
                        cartProduct.count--;
                    }
                });
            }
        },
        // 商品搜尋
        changeSearch(str) {
            this.searchName = str;
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
        //取得產品資料
        getProItems: function () {
            axios.get("./data/pros-list.json")
                .then((respose) => {
                    this.items = respose.data;
                });
        },

        // 結帳
        changeCheckout() {
            if (this.carts.length > 0) {
                let lo_carts = {};
                lo_carts.item = this.carts;

                let self = this;
                $.post("/user/checkout", lo_carts, function (data) {

                    if (data.success) {
                        self.carts = [];
                        alert(data.message);
                    }
                });
            } else {
                alert('購物車沒有商品');
            }
        },

        chagneShowItem(info) {
            this.showItem = info.showItem;
            this.pages = info.pages;
        },


        changePrevious() {
            this.currentPage--;
            this.beginItem = this.beginItem - this.showItem;
            this.endItem = this.endItem - this.showItem;
        },
        changeNext() {
            this.currentPage++;
            this.beginItem = this.beginItem + this.showItem;
            this.endItem = this.endItem + this.showItem;
        },

        changeSwitchPage(number) {
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

        changeIncrease(product) {
            // product.count++
            this.carts.forEach(function (cartProduct) {
                if (cartProduct.index === product.index) {
                    cartProduct.count++;
                }
            });
        }
    }
});
