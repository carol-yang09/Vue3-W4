export default {
  props: {
    pagination: {
      type: Object,
      default() {
        return {
        };
      },
    },
  },
  template: `
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled' : !pagination.has_pre }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="$emit('change-page', pagination.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="n in pagination.total_pages" :key="n" :class="{ 'active' : n == pagination.current_page }">
          <a class="page-link"  href="#" @click.prevent="$emit('change-page', n)">{{ n }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled' : !pagination.has_next }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="$emit('change-page', pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
}