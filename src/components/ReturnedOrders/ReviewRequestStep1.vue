<template>
  <div class="review-request-details scroller">
    <v-row>
      <v-col cols="3">
        <span class="title">شناسه سفارش : </span>

        <span class="desc text-grey t12 w400">
                <template v-if="content && content[0]">{{ content[0]?.order.id }}</template>
                <template v-else> - </template>
            </span>
      </v-col>

      <v-col cols="3">
        <span class="title">شناسه مرجوعی : </span>
        <span class="desc text-grey t12 w400">
                <template v-if="content && content.returned_order">{{ content?.returned_order?.id }}</template>
                <template v-else> - </template>
            </span>
      </v-col>

      <v-col cols="3">
        <span class="title">نام مشتری : </span>
        <span class="desc text-grey t12 w400">
                <template
                    v-if="content && content[0]">{{ content[0].user.first_name }} {{ content[0].user.last_name }}</template>
                <template v-else> - </template>
            </span>
      </v-col>

      <v-col cols="3">
        <span class="title">روش پرداخت : </span>
        <span class="desc text-grey t12 w400">
                <template v-if="content && content[0]">
                  <span v-if="content[0]?.order.payment_method === 'wallet'">
                      کیف پول
                  </span>
                   <span v-else-if="content[0]?.order.payment_method === 'snap_pay'">
                      اسنپ پی
                  </span>
                   <span v-else>
                     آنلاین
                  </span>
                </template>
                <template v-else> - </template>
            </span>
      </v-col>

      <v-col cols="3">
        <span class="title">مبلغ پرداختی : </span>
        <span class="desc text-grey t12 w400">
                <template v-if="content && content[0]" class="number-font">{{ splitChar(content[0]?.order?.paid_price) }}</template>
                <template v-else> - </template>
            </span>
      </v-col>

      <v-col cols="3">
        <span class="title">تاریخ ثبت سفارش : </span>
        <span class="desc text-grey t12 w400">
                <template v-if="content && content[0]">{{ content[0]?.order?.submit_date_fa }}</template>
                <template v-else> - </template>
            </span>
      </v-col>

      <v-col cols="3">
        <span class="title">تاریخ ارسال سفارش : </span>
        <span class="desc text-grey t12 w400">
                <template v-if="content && content[0]">{{ content[0]?.order?.receive_date_fa }}</template>
                <template v-else> - </template>
            </span>
      </v-col>

      <v-col cols="3">
        <span class="title">تاریخ ثبت مرجوعی : </span>
        <span class="desc text-grey t12 w400">
                <template v-if="content && content[0]">{{ content[0]?.returned_order?.created_at_fa }}</template>
                <template v-else> - </template>
            </span>
      </v-col>
    </v-row>
    <v-divider class="my-5"/>
    <div v-for="(returnOrder , index) in content">
      <div class="mt-8">
        <span class="title">نام محصول : </span>
        <span class="desc text-grey t12 w400">
            <template v-if="returnOrder && returnOrder.shps">{{ returnOrder.shps?.sku?.label }}</template>
            <template v-else> - </template>
        </span>
      </div>
      <div class="mt-8">
        <span class="title">علت مرجوعی : </span>
        <span class="desc text-grey t12 w400">
            <template v-if="returnOrder && returnOrder.return_reason">{{ returnOrder.return_reason }}</template>
            <template v-else> - </template>
        </span>
      </div>

      <div class="mt-8">
        <span class="title">توضیحات : </span>
        <span class="desc text-grey t12 w400">
            <template v-if="returnOrder && returnOrder.description">{{ returnOrder.description }}</template>
            <template v-else> - </template>
        </span>
      </div>

      <div class="mt-8">
        <div class="title mb-5">تصویر یا ویدیو :</div>
        <swiper
            @swiper="setThumbsSwiper"
            :loop="true"
            :spaceBetween="15"
            :slidesPerView="6"
            :navigation="true"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            v-if="returnOrder"
            class="slider-thumbnail">
          <swiper-slide v-for="image in returnOrder.files"><img :src="image.url"/></swiper-slide>

        </swiper>
        <swiper
            :navigation="false"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            :spaceBetween="0"
            :loop="true"
            v-if="returnOrder"
            class="main-slider mt-5">
          <swiper-slide v-for="image in returnOrder.files">
            <a class="d-block" :href="image.url" target="_blank">
              <img :src="image.url"/>
            </a>
          </swiper-slide>


        </swiper>
      </div>
      <div class="d-flex justify-end my-5">
        <v-btn
            @click="approvedReturn(returnOrder.id)"
            rounded
            color="light-green-lighten-4"
            variant="elevated"
            width="115"
            class="ml-2">
      <span class="t12 w400">
        تایید
      </span>
        </v-btn>
        <RejectionReturnOrderModal/>

      </div>
    </div>

  </div>
</template>

<script>
import {
  ref
} from 'vue';
// Import Swiper Vue.js components
import {
  Swiper,
  SwiperSlide
} from 'swiper/vue'
// Import Swiper styles
import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import {
  FreeMode,
  Navigation,
  Thumbs
} from 'swiper/modules';

import RejectionReturnOrderModal from '@/components/ReturnedOrders/Modal/RejectionReturnOrderModal.vue'
import {splitChar} from "../../assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

export default {

  props: {
    content: null
  },
  components: {
    Swiper,
    SwiperSlide,
    RejectionReturnOrderModal
  },
  setup() {
    const thumbsSwiper = ref(null);

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };

    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs],
    };
  },

  methods: {
    splitChar,

    async approvedReturn(id){
      const AxiosMethod = new AxiosCall()
      const formData = new FormData()
      formData.append('crm_status' , 'approved')
      AxiosMethod.using_auth = true
      AxiosMethod.form = formData
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/returned/order/detail/crud/update/${id}`
      let data = await AxiosMethod.axios_post()
      if (data) {

      } else {
      }
    }
  },

}
</script>

<style lang="scss">
.review-request-details {
  padding: 32px 10%;
  height: calc(100% - 131px);

  .title {
    font-size: 13px;
    font-variation-settings: "wght" 500;
    font-family: IRANSans !important;
    color: black !important;
  }

  .slider-thumbnail {
    .swiper-slide {
      height: 100px;
      border-radius: 8px;
      border: 1px solid var(--Gray-300, #E0E0E0);
      justify-content: center;

      img {
        width: 100px;
        height: auto;
        max-height: 100%;
        margin: 0 auto;
        display: block;
      }
    }
  }

  .main-slider {
    .swiper-slide {
      height: 300px;

      a {
        display: block;
        width: 100%;
        height: 100%;
      }

      img {
        height: 100%;
        width: auto;
        display: block;
        margin: 0 auto;
      }
    }

  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 20px !important;
    color: #424242 !important;
  }
}
</style>
