<template>
  <div class="create-product flex-column d-flex h-100vh">
    <v-card class="ma-5 br--12 pb-15 flex-grow-1" height="500">
      <div class="d-flex justify-center my-5">
            <span class="t14 w500">
                پردازش محموله
            </span>
      </div>
      <v-divider></v-divider>
      <div
          class="pa-15">
        <v-col cols="6">
          <div class="text-right ">
                    <span class="text-gray600 t14 w500">
                        شناسه محموله
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
                v-model="shipmentId"/>
          </div>
        </v-col>
      </div>
      <footer class="create-warehouse__actions">
        <v-row justify="end" class="pl-10 pt-5">
          <ModalShpsBarCode v-show="false" :shipmentId="splitShipmentId" class="ml-2"/>
          <ModalDetaiShipment :shipmentId="splitShipmentId" class="ml-2"/>
          <v-btn
              :loading="loading"
              :disabled="!splitShipmentId"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            پردازش
          </v-btn>
        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script>
import ModalDetaiShipment from '@/components/ProcessingShipment/Modal/ModalDetaiShipment.vue'
import ModalShpsBarCode from '@/components/ProcessingShipment/Modal/ModalShpsBarCode.vue'

export default {
  data() {
    return {
      loading: false,
      shipmentId: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: true
    }
  },

  components: {
    ModalDetaiShipment,
    ModalShpsBarCode
  },


  methods: {
    validate() {
      this.$router.push(`/processing-shipment/${this.splitShipmentId}/shps-list`)
    },
  },

  computed: {
    splitShipmentId() {
      try {
        const splitData = this.shipmentId.split('-')
        if (splitData[1]) return splitData[1]
        else {
          return this.shipmentId
        }
      }
      catch (e) {
        return ''
      }
    }
  }
}
</script>
