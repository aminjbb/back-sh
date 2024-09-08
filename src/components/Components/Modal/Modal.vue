<template>
  <div class="text-right">
    <v-dialog
        v-model="dialog"
        :width="width"
    >
      <v-card>
        <v-row justify="space-between" align="center" class="pa-5">
          <v-col cols="2">
            <v-btn @click="close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
              <span class="t14500">
                {{title}}
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center px-5" >
          <slot name="modalBody"></slot>
        </div>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div class="d-flex justify-space-between pb-5 px-10" v-if="hasAction">
          <v-btn
              @click="successAction()"
              :color="successColor"
              :loading="loading"
              height="40"
              rounded
              class="px-8 mt-1">
            {{ successTitle }}
          </v-btn>
          <v-btn
              :color="cancelColor"
              :variant="cancelVariant"
              :loading="cancelLoading"
              height="40"
              rounded
              class="px-5 mt-1"
              @click="cancelAction()"
          >

            {{ cancelTitle }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

export  default {
  props:{
    title:{
      type:String,
      default:null
    },

    hasAction:{
      type:Boolean,
      default: true
    },

    width:{
      type:Number,
      default:908
    },

    successTitle:{
      type:String, default:'تایید'
    },
    successColor:{
      type:String, default:'primary500'
    },

    cancelTitle:{
      type:String, default:'انصراف'
    },
    cancelColor:{
      type:String, default:''
    },
    cancelVariant:{
      type:String, default:'text'
    },



  },

  data(){
    return{
      loading:false,
      cancelLoading:false,
      dialog:false
    }
  },

  methods:{
    successAction(){
      this.$emit('successAction')
    },

    cancelAction(){
      this.$emit('cancelAction')
    },

    close(){
      this.dialog = false
    }

  }
}
</script>