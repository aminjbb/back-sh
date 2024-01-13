<template>
<div class="review-request-details scroller">
    <v-row>
        <v-col cols="3">
            <span class="title">شناسه سفارش : </span>
            <span class="desc text-grey t12400">
                <template v-if="item && item.id">{{item.id}}</template>
                <template v-else> - </template>
            </span>
        </v-col>

        <v-col cols="3">
            <span class="title">شناسه مرجوعی : </span>
            <span class="desc text-grey t12400">
                <template v-if="item && item.returned_id">{{item.returned_id}}</template>
                <template v-else> - </template>
            </span>
        </v-col>

        <v-col cols="3">
            <span class="title">نام مشتری : </span>
            <span class="desc text-grey t12400">
                <template v-if="item && item.user">{{item.user.first_name}} {{item.user.last_name}}</template>
                <template v-else> - </template>
            </span>
        </v-col>

        <v-col cols="3">
            <span class="title">روش پرداخت : </span>
            <span class="desc text-grey t12400">
                <template v-if="item && item.payment_method">{{item.payment_method}}</template>
                <template v-else> - </template>
            </span>
        </v-col>

        <v-col cols="3">
            <span class="title">مبلغ پرداختی : </span>
            <span class="desc text-grey t12400">
                <template v-if="item && item.paid_price">{{item.paid_price}}</template>
                <template v-else> - </template>
            </span>
        </v-col>

        <v-col cols="3">
            <span class="title">تاریخ ثبت سفارش : </span>
            <span class="desc text-grey t12400">
                <template v-if="item && item.submit_date_fa">{{item.submit_date_fa}}</template>
                <template v-else> - </template>
            </span>
        </v-col>

        <v-col cols="3">
            <span class="title">تاریخ ارسال سفارش : </span>
            <span class="desc text-grey t12400">
                <template v-if="item && item.receive_date_fa">{{item.receive_date_fa}}</template>
                <template v-else> - </template>
            </span>
        </v-col>

        <v-col cols="3">
            <span class="title">تاریخ ثبت مرجوعی : </span>
            <span class="desc text-grey t12400">
                <template v-if="item && item.created_at_fa">{{item.created_at_fa}}</template>
                <template v-else> - </template>
            </span>
        </v-col>
    </v-row>
    <v-divider class="my-5"/>
    <div class="mt-8">
        <span class="title">نام محصول : </span>
        <span class="desc text-grey t12400">
            <template v-if="item && item.request_title">{{item.request_title}}</template>
            <template v-else> - </template>
        </span>
    </div>  <div class="mt-8">
        <span class="title">علت مرجوعی : </span>
        <span class="desc text-grey t12400">
            <template v-if="item && item.request_title">{{item.request_title}}</template>
            <template v-else> - </template>
        </span>
    </div>

    <div class="mt-8">
        <span class="title">توضیحات : </span>
        <span class="desc text-grey t12400">
            <template v-if="item && item.request_description">{{item.request_description}}</template>
            <template v-else> - </template>
        </span>
    </div>

    <div class="mt-8">
        <div class="title mb-5">تصویر یا ویدیو : </div>
        <swiper
            @swiper="setThumbsSwiper"
            :loop="true"
            :spaceBetween="15"
            :slidesPerView="6"
            :navigation="true"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="slider-thumbnail">
            <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide>
            <swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide>
            <swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide>
            <swiper-slide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide>
            <swiper-slide><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide>
            <swiper-slide><img src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide>
            <swiper-slide><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide>
            <swiper-slide><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide>
            <swiper-slide><img src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide>
            <swiper-slide><img src="https://swiperjs.com/demos/images/nature-10.jpg" /></swiper-slide>
        </swiper>
        <swiper
            :navigation="false"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            :spaceBetween="0"
            :loop="true"
            class="main-slider mt-5">
            <swiper-slide>
                <a class="d-block" href="https://swiperjs.com/demos/images/nature-1.jpg" target="_blank">
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </a>
            </swiper-slide>
            <swiper-slide>
                <a class="d-block" href="https://swiperjs.com/demos/images/nature-2.jpg" target="_blank">
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </a>
            </swiper-slide>
            <swiper-slide>
                <a class="d-block" href="https://swiperjs.com/demos/images/nature-3.jpg" target="_blank">
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </a>
            </swiper-slide>
            <swiper-slide>
                <a class="d-block" href="https://swiperjs.com/demos/images/nature-4.jpg" target="_blank">
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </a>
            </swiper-slide>
            <swiper-slide>
                <a class="d-block" href="https://swiperjs.com/demos/images/nature-5.jpg" target="_blank">
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </a>
            </swiper-slide>
            <swiper-slide>
                <a class="d-block" href="https://swiperjs.com/demos/images/nature-6.jpg" target="_blank">
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </a>
            </swiper-slide>
            <swiper-slide>
                <a class="d-block" href="https://swiperjs.com/demos/images/nature-7.jpg" target="_blank">
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </a>
            </swiper-slide>
            <swiper-slide>
                <a class="d-block" href="https://swiperjs.com/demos/images/nature-8.jpg" target="_blank">
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </a>
            </swiper-slide>
            <swiper-slide>
                <a class="d-block" href="https://swiperjs.com/demos/images/nature-9.jpg" target="_blank">
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </a>
            </swiper-slide>
            <swiper-slide>
                <a class="d-block" href="https://swiperjs.com/demos/images/nature-10.jpg" target="_blank">
                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                </a>
            </swiper-slide>

        </swiper>
    </div>
  <div class="d-flex justify-end my-5">
    <v-btn
        rounded
        color="light-green-lighten-4"
        variant="elevated"
        width="115"
        class="ml-2">
      <span class="t12400">
        تایید
      </span>
    </v-btn>
      <RejectionReturnOrderModal/>

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
export default {
    props: {
        content: Object
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
}
</script>

<style lang="scss">
.review-request-details {
    padding: 32px 10%;
  height: calc(100% - 131px);
    .title {
        font-size: 13px;
        font-variation-settings: "wght"500;
        font-family: IRANSans !important;
        color:black !important;
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
