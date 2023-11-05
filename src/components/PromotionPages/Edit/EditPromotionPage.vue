<template>
  <div class="create-product flex-column d-flex vh-100">
    <v-card
        class="ma-5 br-12 pb-15 flex-grow-1"
        min-height="500"
    >
      <div class="text-center py-5">
          <span class="t14500">
            افزودن صفحه پروموشن
          </span>
      </div>
      <v-divider></v-divider>
      <PromotionPageForm
          :promotion="promotion"
          ref="PromotionPageForm"
      />
      <footer class="create-warehouse__actions">
        <v-row
            justify="end"
            class="pl-10 pt-5"
        >
          <v-btn
              :loading="loading"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1"
          >

            تایید
          </v-btn>


        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script>
import PromotionPageForm from "@/components/PromotionPages/PromotionPageForm.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import PromotionPage from "@/composables/PromotionPage"

export default {
  setup(){
    const {promotion , getPromotion} = new PromotionPage()
    return {promotion , getPromotion}
  },
  data() {
    return {
      loading: false,
    }
  },
  components: {PromotionPageForm},
  methods:{
    validate(){
      this.$refs.PromotionPageForm.$refs.createPromotionPage.validate()
      setTimeout(()=>{
        if (this.$refs.PromotionPageForm.valid) this.createMenu()
      } , 200)
    },

    async createMenu(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `page/promotion/crud/update/${this.$route.params.promotionId}`
      formData.append('name' , this.$refs.PromotionPageForm.form.name)
      formData.append('label' , this.$refs.PromotionPageForm.form.lable)
      formData.append('is_active' , this.promotion.is_active)

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.$router.push('/promotion-page/index')

      }
      else{
        this.loading=false
      }
    }
  },
  mounted() {
    this.getPromotion()
  }
}
</script>