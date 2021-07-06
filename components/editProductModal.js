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
    <div class="modal fade" id="editProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="editProductModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark text-light">
            <h5 class="modal-title fw-bold" id="editProductLabel">{{ tempProduct.id ? '編輯產品' : '新增產品' }}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 col-lg-4">
                <div class="form-group border-bottom pb-3 mb-3">
                  <label for="index">主要圖片網址：</label>
                  <input type="text" class="form-control" placeholder="請輸入主要圖片網址" v-model="tempProduct.imageUrl">
                </div>
                <div v-if="tempProduct.id">
                  <div class="form-group mb-3" v-for="(image, index) in tempProduct.imagesUrl" :key="index">
                    <label for="index">圖片網址：</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片網址" v-model="tempProduct.imagesUrl[index]">
                  </div>
                </div>
                <div v-else>
                  <div class="form-group mb-3" v-for="(image, index) in 5" :key="index">
                    <label for="index">圖片網址：</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片網址" v-model="tempProduct.imagesUrl[index]">
                  </div>
                </div>
                <hr class="d-lg-none my-4">
              </div>
              <div class="col-12 col-lg-8">
                <div class="form-group mb-3">
                  <label for="title"><span class="text-danger">*</span>標題：</label>
                  <input type="text" id="title" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
                </div>
                <div class="row mb-3">
                  <div class="form-group col-6">
                    <label for="category"><span class="text-danger">*</span>分類：</label>
                    <input type="text" id="category" class="form-control" placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-6">
                    <label for="unit"><span class="text-danger">*</span>單位：</label>
                    <input type="text" id="unit" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="form-group col">
                    <label for="origin_price"><span class="text-danger">*</span>原價：</label>
                    <input type="number" id="origin_price" class="form-control" placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                  </div>
                  <div class="form-group col">
                    <label for="price"><span class="text-danger">*</span>售價：</label>
                    <input type="number" id="price" class="form-control" placeholder="請輸入售價" v-model.number="tempProduct.price">
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="content">產品內容：</label>
                  <textarea class="form-control" id="content" rows="3" placeholder="請輸入產品內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group mb-3">
                  <label for="description">產品描述：</label>
                  <textarea class="form-control" id="description" rows="3" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-outline-secondary me-3" data-bs-dismiss="modal">取消</button>
            <button type="submit" class="btn btn-primary" @click="updateProduct">確定儲存</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      editProductModal: null,
    };
  },
  methods: {
    updateProduct() {
      let url = `${this.api.url}api/${this.api.path}/admin/product`;
      let httpMethod = 'post';

      if (this.tempProduct.id) {
        url = `${this.api.url}api/${this.api.path}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
      }

      axios[httpMethod](url, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            const message = {
              text: `${this.tempProduct.id ? '更新產品成功' : '新增產品成功'}`,
              bg: 'bg-success',
            };
            this.$emit('showToast', message);
            this.$emit('getProducts');
            this.editProductModal.hide();
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
            text: `${this.tempProduct.id ? '更新產品失敗' : '新增產品失敗'}`,
            bg: 'bg-danger',
          };
          this.$emit('showToast', message);
        })
    },
    
  },
  mounted() {
    this.editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
  }
}

