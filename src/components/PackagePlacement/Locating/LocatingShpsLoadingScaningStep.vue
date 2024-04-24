<template>
  <v-card class="h-100 position__relative d-flex align-center justify-center">
    <div>
      <v-row>
        <v-col>
          <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="type"></v-switch>
        </v-col>
      </v-row>
      <div class="d-flex justify-center">
        <v-icon color="black" size="30">
          mdi-barcode-scan
        </v-icon>
      </div>
      <div class=" mt-8 d-flex justify-center px-10 text-center">

        <span class="text-black t20400">
            {{ scanTitle }}
          <!--            <v-text-field v-model="objectId" :autofocus="true"  @keyup.enter="qrCodeScan()"></v-text-field>-->
            <v-text-field v-if="type === 'automate'" v-model="objectId" :autofocus="true"
                          @input="qrCodeScan()"></v-text-field>
            <v-text-field v-else v-model="objectId" :autofocus="true" @keyup.enter="qrCodeScan()"></v-text-field>
        </span>
      </div>
    </div>
  </v-card>
</template>
<script>
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  props: {
    scanTitle: '',
    state: '',
    object: null,
    packageId: null,
    successScan: {type: Function},
    errorScan: {type: Function},

  },
  data() {
    return {
      objectId: '',
      readyToScan: false,
      type: 'automate'
    }
  },

  methods: {
    qrCodeScan() {
      let self = this
      window.setTimeout(function(){
        const finalObject = self.objectId.split('-')
        self.qrCode = ''
        if (self.state === 'packageSphpsList') {
          self.packageScan(self.objectId, finalObject[1])
        } else if (self.state === 'scanShelf') self.$router.push(`/locating/${self.packageId}/shps-list/locating-shelf/${finalObject[1]}`)
      },50)
      // console.log('slam')

    },

    async packageScan(barcode, objectId) {
      try {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = `package/crud/handheld/scan?barcode=${barcode}`
        AxiosMethod.using_auth = true
        let data = await AxiosMethod.axios_get()
        if (data) {
          this.successScan(`/locating/package/shps-list`, data.data?.id)

        }
      } catch (e) {
        this.errorScan()
      }
    }
  },
}
</script>
<style>
.v--hidden {
  visibility: hidden;
}
</style>
