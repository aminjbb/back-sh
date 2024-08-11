<template>
  <div class="receipt-image text-center">
    <v-btn
        @click="dialog = true"
        rounded
        color="primary400"
        variant="elevated"
        width="180"
        class="ml-2">
      <span class="t12 w400"> رد درخواست محصول</span>
    </v-btn>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="808">
      <v-card class=" px-2 pt-4 pb-2">
        <div class="d-flex justify-space-between px-3">
          <v-btn
              @click="dialog = false"
              variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <span class="t12 w500 ma-2">
            دلیل رد مرجوعی
          </span>

        </div>
          <v-divider class="my-5"/>
        <div class="text-right" style="padding:20px 10% 80px">
          <h2 class="t12 w300 text-grey mb-3">دلیل رد مرجوعی <span class="text-red">*</span></h2>
          <v-textarea variant="outlined" v-model="rejectModel"/>
        </div>

        <div class="pa-5">
          <v-btn
              @click="dialog = false"
              rounded
              color="light-green-lighten-4"
              variant="elevated"
              width="180"
              class="ml-2">
            <span class="t12 w400"> تایید</span>
          </v-btn>
          <v-btn
              @click="dialog = false"
              rounded
              color="primary400"
              variant="elevated"
              width="180"
              class="ml-2">
            <span class="t12 w400"> اتصراف</span>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    imageAddress: String
  },

  data() {
    return {
      dialog: false,
      rejectModel:null
    }
  },
}
</script>

<style lang="scss">
.receipt-image {
  a {
    border-radius: 8px;
    border: 1px solid var(--Gray-300, #E0E0E0);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    padding: 5px;
  }

  img {
    width: 100%;
    max-height: 100%;
    height: auto;
  }

  &__icon {
    position: absolute !important;
    top: 0;
    left: 0;

    .v-btn__content {
      background: #E0E0E0 !important;
      border-radius: 50%;
      padding: 3px;
    }
  }
}
</style>
