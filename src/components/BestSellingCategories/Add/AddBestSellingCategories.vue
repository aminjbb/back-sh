<template>
  <div class="vh-100">
    <v-card
        class="ma-5 br-12 pa-10 position__relative "
        min-height="600"
    >
      <BestSellingCategoriesForm/>

      <v-row
          justify="end"
          class="position__absolute bottom left"
      >
        <v-btn

            color="primary500"
            height="40"
            rounded
            class="px-8 mt-1"
        >
          <template v-slot:prepend>
            <v-icon>mdi-plus</v-icon>
          </template>
          افزودن
        </v-btn>

        <v-btn
            @click="$router.go(-1)"
            variant="outlined"
            height="40"
            rounded
            class="px-8 mt-1 mr-5"
        >
          <template v-slot:prepend>
            <v-icon>mdi-cancel</v-icon>
          </template>
          انصراف
        </v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
const BestSellingCategoriesForm = defineAsyncComponent(()=> import('@/components/BestSellingCategories/Form/BestSellingCategoriesForm.vue'))
export default {

  props: {
    device: '',
    banner: ''
  },
  components: {
    BestSellingCategoriesForm,
  },

  data() {
    return {
      form: {
        device: '',
        link: '',
        imageAlt: '',
        image: '',
        imageUrl: ''
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
      deviceTypes: [
        {title: 'دسکتاپ', value: 'desktop'},
        {title: 'موبایل', value: 'mobile'},
        {title: 'تبلت', value: 'tablet'},
      ]
    }
  },
  methods: {
    removeItem(id) {
      this.form.image = ''
    },
    /**
     * Get image id
     * @param {*} image
     */
    getImage(image) {
      this.form.image = image.data.data.image_id
      this.form.imageUrl = image.data.data.url
    },

  },
  mounted() {
    this.form.device = this.device
    if (this.banner) {

      this.form.link = this.banner.link
      this.form.imageAlt = this.banner.image_alt
      this.form.image = this.banner.image_id
      this.form.imageUrl = this.banner.image?.image_url
    }

  },
  watch: {}
}
</script>
