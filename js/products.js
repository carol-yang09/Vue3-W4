import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.2/vue.esm-browser.min.js';

import Pagination from '../components/pagination.js';
import Toast from '../components/toast.js';
import EditProductModal from '../components/editProductModal.js';
import DelProductModal from '../components/delProductModal.js';

const app = createApp({
  data() {
    return {
      api: {
        url: 'https://vue3-course-api.hexschool.io/',
        path: 'carolyang-vue3',
      },
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: [],
      },
      message: {
        text: '',
        bg: '',
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      axios.get(`${this.api.url}api/${this.api.path}/admin/products?page=${page}`)
      .then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        } else {
          const message = {
            text: `${res.data.message}`,
            bg: 'bg-danger',
          };
          this.showToast(message);
          
          window.location = 'index.html';
        }
      })
      .catch(() => {
        const message = {
          text: '取得產品列表失敗',
          bg: 'bg-danger',
        };
        this.showToast(message);
      })
    }, toggleProductEnable(product) {
      this.tempProduct = { ...product };
      if (product.is_enabled) {
        this.tempProduct.is_enabled = 0;
      } else {
        this.tempProduct.is_enabled = 1;
      }
      axios.put(`${this.api.url}api/${this.api.path}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            const message = {
              text: `${product.is_enabled == '1' ? '啟用產品成功' : '關閉產品成功'}`,
              bg: 'bg-success',
            };
            this.showToast(message);
            this.getProducts();
          } else {
            const message = {
              text: `${res.data.message}`,
              bg: 'bg-danger',
            };
            this.showToast(message);
          }
        })
        .catch(() => {
          const message = {
            text: `${product.is_enabled ? '啟用產品失敗' : '關閉產品失敗'}`,
            bg: 'bg-danger',
          };
          this.showToast(message);
        })
    },
    openModal(action, product) {
      switch (action) {
        case 'new':
          this.tempProduct = {
            imagesUrl: [],
          }
          break;
        case 'edit':
          this.tempProduct = {...product};
          break;
        case 'del':
          this.tempProduct = { ...product };
      }
      this.showModal(action);
    },
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolVueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token === '') {
        const message = {
          text: '您尚未登入',
          bg: 'bg-danger',
        };
        this.showToast(message);
        window.location = 'index.html';
      }
      axios.defaults.headers.common.Authorization = token;
      this.getProducts();
    },
    showToast(msg) {
      this.message = msg;
      this.$refs.toastMessage.toast.show();
    },
    showModal(action) {
      if (action == 'del') {
        this.$refs.delProductModal.delProductModal.show();
      } else {
        this.$refs.editProductModal.editProductModal.show();
      }
    },
  },
  components: {
    Pagination,
    Toast,
    EditProductModal,
    DelProductModal,
  },
  mounted() {
    this.checkLogin();
  },
})

app.mount('#app');
