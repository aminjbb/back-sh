<template>
  <div class="text-right">
    <v-btn @click="dialog = true" variant="text">
      <v-icon color="success">
        mdi-eye
      </v-icon>
    </v-btn>
    <v-dialog
        v-model="dialog"
        width="468">
      <v-card>
        <header class="modal__header d-flex justify-center align-center">
                <span class="t16 w400 pa-6">
                    سفارشات
                </span>

          <v-btn
              class="modal__header__btn"
              @click="dialog= false"
              variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>

        <div class="mt-2 mb-2 px-5">
          <v-divider/>
        </div>
        <div>
          <v-row justify="center" class="pa-5">
            <v-chip v-for="(order, index) in orders" :key="`order${index}`">
              شناسه سفارش :{{order.id}}
            </v-chip>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dialog:false
    }
  },

  props:{
    orders:[]
  }
}
</script>
