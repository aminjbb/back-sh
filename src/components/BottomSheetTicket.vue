<template>
  <div class="text-center">
    <v-btn
        @click="sheet = !sheet"
        variant="outlined"
        color="primary500"
        width="142"
        height="24"
        rounded
        class="text-primary500 t12 w500">
      {{ title }}
    </v-btn>

    <v-bottom-sheet v-model="sheet">
      <v-card
          class="text-center rounded-t-lg"
          height="460">
        <v-card-text>
          <div class="d-flex justify-space-between align-center">
            <v-icon icon="mdi-close" @click="sheet = !sheet"/>
            <span class="t16500">{{title}}</span>
          </div>
          <br>
          <br>
          <div>
            <div class="flex-column">
              <div class="d-flex justify-space-between align-center">
                <div class="t12 w500">
                <span class="text-gray600 number-font" v-if="item.user.phone_number">
                  {{ item.user.phone_number }}
                </span>
                <span class="text-gray600" v-else> - </span>
                </div>
                <div class="">
                  <span class="t12 w500"> موبایل </span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>

              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500">
                <span class="text-gray600 number-font">
                  {{ item.created_at_fa }}  {{item.updated_at.split('T')[1].split('.')[0]}}
                </span>
                </div>
                <div class="">
                  <span class="t12 w500"> تاریخ ایجاد</span>
                  <v-icon icon="mdi-circle-small"/>
                </div>
              </div>
              <v-divider class="my-3"/>
              <div class="d-flex justify-space-between align-center mb-3">
                <div class="t12 w500">
                <span  class="number-font text-gray600">
                 {{ item.latest_date_fa.split(' ')[0] }} {{ item.latest_date_fa.split(' ')[1] }}
                </span>
                </div>
                <div class="">
                  <span class="t12 w500"> تاریخ آخرین پیام </span>
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
  name: "BottomSheetOrder",
  props: {
    title: String,
    item: Object
  },

  data() {
    return {
      sheet: false,
    }
  }
}
</script>
