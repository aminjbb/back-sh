<template>
  <div class="text-right">
    <div class=" pointer" @click="dialog= true">
      <v-icon class="text-grey-darken-1">mdi-currency-usd</v-icon>
      <span class="mr-2 text-grey-darken-1 t14300">
                                            اطلاعات مالی
                                        </span>
    </div>
    <v-dialog
        v-model="dialog"
        width="468"
    >
      <v-card>
        <v-row justify="space-between" align="center" class="pa-5">
          <v-col cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
              <span class="t14500">
                           اطلاعات مالی
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>



        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div class="d-flex justify-space-between pb-5 px-10">
          <v-btn
              width="80"
              @click="validate()"
              color="primary500"
              :loading="loading"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>
          <btn
              class="mt-3 mr-2"
              @click="dialog = false"
              style="cursor: pointer;">
            انصراف
          </btn>

        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {AxiosCall} from "@/assets/js/axios_call";

export  default {
  props:{

  },

  components:{


  },
  data(){
    return{

      loading:false,
      retailObject: null,
      dialog: false

    }
  },

  methods:{





    validate(){


    },


  },

  computed:{


  },
  mounted() {

  },
  watch:{

  }
}
</script>
