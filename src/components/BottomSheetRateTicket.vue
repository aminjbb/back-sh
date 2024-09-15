<template>
  <div class="text-center">
    <v-icon
        @click="sheet = !sheet"
        color="primary500"
        icon="mdi-eye-outline"
        size="18.33"
        class="mr-2"/>
    <v-bottom-sheet v-model="sheet">
      <v-card
          class="text-center rounded-t-lg"
          height="460">
        <v-card-text>
          <div class="d-flex justify-space-between align-center">
            <v-icon icon="mdi-close" @click="sheet = !sheet"/>
            <span class="t16 w500">{{title}}</span>
          </div>
          <br>
          <br>
          <div>
            <div class="flex-column">
              <div class="d-flex justify-space-between align-center">
                <div class="t12 w500">
                <span class="text-gray600 number-font">
                  {{userDetail.first_name}} {{userDetail.last_name}}
                </span>
                </div>
                <div class="">
                  <span class="t12 w500"> نام کاربر </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>

              <div class="d-flex justify-space-between align-center">
                <div class="t12 w500">
                <span class="text-gray600 number-font" v-if="item.threadable.full_name">
                  {{  item.threadable.full_name }}
                </span>
                  <span class="text-gray600" v-else> - </span>
                </div>
                <div class="">
                  <span class="t12 w500"> نام پشتیبان </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>

              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500">
                  <v-rating
                      v-model="item.rate"
                      half-increments
                      readonly
                      class="me-3"
                      style="direction: ltr!important;">
                    <template v-slot:item="props">
                      <v-icon
                          size="x-large"
                          :color="props.isFilled ? 'rgb(243, 193, 28)' : 'grey-lighten-1'">
                        mdi-star
                      </v-icon>
                    </template>
                  </v-rating>
                </div>
                <div class="">
                  <span class="t12 w500">امتیاز کاربر</span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>

              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500">
                <span class="number-font text-gray600" v-if="item.rate_note">{{item.rate_note}}</span>
                  <span class="text-gray600" v-else> - </span>
                </div>
                <div class="">
                  <span class="t12 w500"> توضیحات </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: "BottomSheetRateTicket",
  props: {
    title: String,
    item: Object,
    userDetail:Object
  },

  data() {
    return {
      sheet: false,
    }
  }
}
</script>
