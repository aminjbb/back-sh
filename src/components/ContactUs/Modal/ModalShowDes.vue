<template>
  <div class="text-right  ">
    <v-btn
        @click="dialog = true"
        height="40"
        rounded
        class="px-8 mt-1"
        variant="icon"
    >
      <v-icon>mdi-eye</v-icon>
    </v-btn>
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
                        <span class="t14 w500 ">
                            پیام کاربر
                        </span>
          </div>
          <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch d--rtl" min-height="82" >

            <v-divider class="mb-3"/>
            <div class="pa-5 text-right">
              {{ this.description }}
            </div>
          </v-card>


        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  props:{
    description:String
  },
  data() {
    return {
      dialog: false
    }
  },

  methods: {
    close() {
     this.dialog = false
    },
  },


}
</script>
