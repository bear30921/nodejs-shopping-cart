var vm = new Vue({
    el: '#cart-app',
    data: {
        items: [],
        filterItems: [],
        searchName: "",
        currPage: 1,
        countOfPage: 7,
        carts: [],
        type: 1,

    },
    mounted() {
        this.getProItems();
    },
    computed: {
        amount() {
            let amount = 0;
            if (this.carts.length > 0) {
                for (let i = 0; i < this.carts.length; i++) {
                    let price = this.carts[i].price;
                    let number = this.carts[i].count;
                    let total = price * number;
                    amount += total;
                }
            }
            return amount;
        }
    },
    watch: {},
    methods: {
        addItem(product) {
            let checkCarts = this.carts.indexOf(product);

            // 購物車不存在此商品，新增商品
            if(checkCarts === -1) {
                this.carts.push(product);
                // 假如沒有count，指定count並給予數量預設值為1
                this.$set(product, 'count',  1);
            }
        },
        add(product) {
            product.count++;
        },
        remove(product) {
            if(product.count === 1 || product.count === undefined) {
                let cartsIndex = this.carts.indexOf(product);
                this.carts.splice(cartsIndex, 1);
            } else {
                product.count--;
            }
        },
        filterProduct(type) {

            if(type === 1){
                return this.items;
            } else if (type === 2) {
                return this.filterItems;
            }
        },
        search(){
            let input = document.querySelector('.form-control');
            if(input.value !== '') {
                this.type = 2;
                this.filterItems = this.items.filter((product) => {
                    // 檢查每個商品項目，比對商品名稱，回傳符合的項目
                    // 不等於負1成立，代表有此項目
                    return product.name.indexOf(input.value) !== -1;
                });
                return this.filterItems;
            }

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
