<template>
  <div class="text-right  ">

    <v-dialog v-model="dialog" width="1060">
      <v-card >
        <div >
            <v-row
                justify="space-between"
                align="center"
                >
              <v-col cols="2" >
                <v-btn @click="close()" variant="icon">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <div class="d-flex align-center justify-center  ">
                        <span class="t14500 ">
                           دلیل رد درخواست
                        </span>
            </div>


          <div class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl">دلیل رد درخواست *</div>
          <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl" min-height="82" >

            <v-divider class="mb-3"/>
            <div class="pa-5 text-right">
              {{ retailObject?.reason }}
            </div>
          </v-card>


        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import WithdrawRequests from "@/composables/DepositRequest.js";
import {
  convertDateToJalai
} from "@/assets/js/functions";

export default {
  setup() {
    const {

      dataTableLength,
      page,
      header,
      loading,


      detail
    } = WithdrawRequests();

    return {

      dataTableLength,
      page,
      header,
      loading,


      detail
    };
  },
  components: {



  },
  data() {
    return {}
  },

  methods: {

    convertDateToJalai,

    close() {
      const form = {
        dialog: false,
        object: ''
      }
      this.$store.commit('set_depositDetail', form)
    },



  },

  computed: {
    dialog() {
      return this.$store.getters['get_depositDetail']
    },
    retailObject() {
      return this.$store.getters['get_depositDetailObject']
    },

  }
}
</script>
