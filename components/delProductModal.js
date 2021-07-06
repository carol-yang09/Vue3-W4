export default {
  props: {
    tempProduct: {
      type: Object,
      default() {
        return {};
      },
    },
    api: {
      type: Object,
    },
  },
  template: `
    <div class="modal fade" id="delProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger text-light">
            <h5 class="modal-title fw-bold" id="delProductModalLabel">刪除產品</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            刪除後無法復原，確定要刪除 <span class="text-danger fw-bold">{{ tempProduct.title }}</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-outline-danger" @click.prevent="delProduct">刪除產品</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      delProductModal: null,
    }
  },
  methods: {
    delProduct() {
      axios.delete(`${this.api.url}api/${this.api.path}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          if (res.data.success) {
            const message = {
              text: '刪除產品成功',
              bg: 'bg-success',
            };
            this.$emit('showToast', message);
            this.$emit('getProducts');
            this.delProductModal.hide();
          } else {
            const message = {
              text: `${res.data.message}`,
              bg: 'bg-danger',
            };
            this.$emit('showToast', message);
          }
        })
        .catch(() => {
          const message = {
            text: '刪除產品失敗',
            bg: 'bg-danger',
          };
          this.$emit('showToast', message);
        })
    },
  },
  mounted() {
    this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
  },
};