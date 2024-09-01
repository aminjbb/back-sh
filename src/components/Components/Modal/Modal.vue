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
              width="80"
              @click="successAction()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>
          <v-btn
              variant="text"
              height="40"
              rounded
              class="px-5 mt-1"
              @click="cancelAction()"
          >

            انصراف
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

    dialog:{
      type:Boolean,
      default:false
    },

    width:{
      type:Number,
      default:908
    }

  },

  data(){
    return{
      loading:false,
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
      this.$emit('closeModal')
    }

  }
}
</script>