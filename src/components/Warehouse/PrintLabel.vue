<template>
  <div class="create-product flex-column d-flex vh-100">
    <v-card class="ma-5 br-12 pb-15 flex-grow-1" height="500">
      <div class="d-flex justify-center my-5">
            <span class="t14 w500">
               پرینت برچسب
            </span>
      </div>
      <v-divider></v-divider>
      <div
          class="pa-15">
        <v-col cols="6">
          <div class="text-right ">
                    <span class="text-gray600 t14 w500">
                       شناسه برچسب
                    </span>
            <span class="text-error">
                        *
                    </span>
          </div>
          <div>
            <v-text-field
                variant="outlined"
                :rules="rule"
                :autofocus="true"
                v-model="barcode"/>
          </div>
        </v-col>
      </div>
      <footer class="create-warehouse__actions">
        <v-row justify="end" class="pl-10 pt-5">
          <PrintLabelModal :barcode="barcode" />
        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script>
import PrintLabelModal from '@/components/Warehouse/Modal/PrintLabelModal.vue'

export default {
  data() {
    return {
      barcode: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
    }
  },

  components: {
    PrintLabelModal
  },
}
</script>
