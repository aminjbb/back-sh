<template>
  <div v-if="dialog">
    <div class="text-right">
      <v-dialog v-model="dialog" width="468">
        <v-card class="">
          <v-row
              justify="space-between"
              align="center"
              class="pa-1 my-2">
            <v-col class="mx-10" cols="2">
              <v-btn @click="close()" variant="icon">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="7" class="t16 w400 ">
              ذخیره اطلاعات
            </v-col>
          </v-row>
          <v-divider/>
          <div class="text-center pa-8" >
            <div class="flex-column">
              <div>
                با ذخیره اطلاعات کیف پول کاربر به مبلغ 340,000 ریال شارژ خواهد شد.
              </div>
              <div>  آیا از انجام این کار اطمینان دارید؟</div>
            </div>
            <div class="d-flex justify-space-between mt-5">
              <v-btn
                  color="primary500"
                  height="40"
                  rounded
                  variant="elevated"
                  class="px-8 mt-1">
                تایید
              </v-btn>
              <v-btn
                  flat=""
                  height="40"
                  rounded
                  class="px-8 mt-1 mr-5">
                انصراف
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaveModal",
  data() {
    return {
      dialog: false
    }
  },

  methods: {
    close() {
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>