import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.2/vue.esm-browser.min.js';

import Toast from '../components/toast.js';

createApp({
  data() {
    return {
      api: {
        url: 'https://vue3-course-api.hexschool.io/',
        path: 'carolyang-vue3',
      },
      user: {
        username: '',
        password: '',
      },
      message: {
        text: '',
        bg: '',
      },
    };
  },
  methods: {
    login() {
      axios.post(`${this.api.url}admin/signin`, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexschoolVueToken=${token};expires=${new Date(expired)}; path=/`;
            window.location = 'products.html';
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
            text: '登入錯誤',
            bg: 'bg-danger',
          };
          this.showToast(message);
        })
    },
    showToast(msg) {
      this.message = msg;
      this.$refs.toastMessage.toast.show();
    },
  },
  components: {
    Toast,
  }
}).mount('#app');
