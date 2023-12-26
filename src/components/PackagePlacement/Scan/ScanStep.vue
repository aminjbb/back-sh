<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3">
        <span class="t20400">
          جایگذاری بسته
        </span>
      </div>
      <div class="pa-3">
        <v-icon size="30">
          mdi-chevron-left
        </v-icon>
      </div>
    </div>

    <v-card class="ma-5 br-15" min-height="196">
      <div class="d-flex justify-center my-3">
          <span class="t20400">
            جایگذاری بسته
          </span>
      </div>
      <v-divider/>
      <div class="text-right my-5 px-5">
          <span class="t16400">
           شناسه بسته :
            <span class="text-gray600">
              ۲۳۴۳۲۱۲۳۴
            </span>
          </span>
      </div>
      <div class="text-right my-5 px-5">
          <span class="t16400">
           شماره جایگاه :
            <span class="text-gray600">
              ۴
            </span>
          </span>
      </div>

    </v-card>
    <div class="bottom-box">
      <v-btn
          color="primary500"
          height="40"
          width="348"
          rounded
          class="px-8 mt-2">
        <template v-slot:prepend>
          <v-icon>mdi-barcode-scan</v-icon>
        </template>
        اسکن شناسه بسته
      </v-btn>
    </div>
  </v-card>
</template>
<script setup>
</script>
<style>
.width-100{
  background: #F7F8FA;
}

</style>