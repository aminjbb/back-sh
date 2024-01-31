<template>
  <div class="text-right">
    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="468">
      <v-card>
        <header class="modal__header d-flex justify-center align-center">
                <span class="t16400 pa-6">
                   تایید مرجوعی کالا
                </span>

          <v-btn
              class="modal__header__btn"
              @click="closeModal()"
              variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>

        <div class="mt-2 mb-2 px-5">
          <v-divider/>
        </div>

        <div>
          <v-form ref="openOrder" v-model="valid">
            <v-row
                justify="center"
                align="center"
                class="px-5">
              <v-col cols="12">
                <div class="d-flex justify-space-evenly mt-4 mb-2">
                    <span class="t20300">
                     {{object.barcode }}
                    </span>
                    <span class="t20300">
                     بارکد محصول
                    </span>

                </div>
              </v-col>
              <v-col cols="12">
                <div class="text-right mt-4 mb-2">
                            <span class="t12300">
                                دلیل
                            </span>
                  <span class="text-error">
                              *
                            </span>
                </div>
                <v-textarea
                    density="compact"
                    variant="outlined"
                    single-line
                    placeholder="دلیل"
                    :rules="rule"
                    v-model="form.subTitle">
                </v-textarea>
              </v-col>

            </v-row>
          </v-form>

        </div>

        <div class="mt-3 mb-3 px-5">
          <v-divider/>
        </div>

        <v-row
            justify="space-between"
            align="center"
            class="pb-4 ma-0">
          <v-col cols="6" class="">
            <div class="text-left">
              <v-btn
                  :loading="loading"
                  @click="validate()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-5 mt-1 mr-5">
                تایید
              </v-btn>
            </div>
          </v-col>

          <v-col cols="6" class="text-right">
            <v-btn
                @click="closeModal()"
                variant="text"
                height="40"
                rounded
                class="px-5 mt-1 mr-5">
              انصراف
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  openToast
} from "@/assets/js/functions";
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import Vehicle from '@/composables/Vehicle'
import DriverManagement from '@/composables/DriverManagement'

export default {

  props: {
    checkDone: {type: Function}
  },
  data() {
    return {
      form: {

        subTitle: '',
      },
      loading: false,
      valid: false,
      rule: [v => !!v || 'این فیلد الزامی است']
    }
  },
  mounted() {

  },
  methods: {

    closeModal() {
      const form = {
        dialog: false,
        barCode: ''
      }
      this.$store.commit('set_openOrderModal', form)
    },
    /**
     * validate form
     */
    validate() {
      this.$refs.openOrder.validate()
      setTimeout(() => {
        if (this.valid) this.createOpenOrder()
      })
    },

    /**
     * Submit form
     */
    async createOpenOrder() {
      const form = {
        object: this.object,
        subTitle: this.form.subTitle,
      }
      this.$store.dispatch('set_returnedOrderItems' , form)
      this.checkDone(this.object.shps)
      this.closeModal()
    },

  },
  computed: {
    dialog() {
      return this.$store.getters['get_openOrderModal']
    },
    object() {
      return this.$store.getters['get_openOrderModalObject']
    }
  }
}
</script>
