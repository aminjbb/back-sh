<template>
<div class="">
  <v-row justify="center" class="my-5">
    <v-col cols="10">
      <v-card class="br-12 pb-15 flex-grow-1" color="primary500">
      </v-card>
    </v-col>
  </v-row>

  <v-row justify="center">
    <v-col cols="10">
      <v-col cols="6" class="brands-list">
        <div class="d-flex align-center text-right my-5">
          <span class="t14500 text-gray600"> توضیحات</span>
          <span class="t14500 text-red-accent-3 mr-1">*</span>
        </div>
        <v-text-field
            variant="outlined"
            placeholder="" />
      </v-col>
      <v-col class="my-6" cols="8">
        <div class="text-right">
          <span class="t12500">روش ارسال</span>
        </div>

        <v-col class="d-flex" cols="12">
          <v-radio-group inline >
            <v-radio
                label="پست"
                value="post"
                class=" t12500"></v-radio>
            <v-radio
                label="نفیس اکپرس"
                value="nafis"
                class=" t12500"></v-radio>
            <v-radio
                label="تیپاکس"
                value="tipax"
                class=" t12500"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-col>
    </v-col>
  </v-row>
</div>

</template>

<script>

</script>

<style scoped>

</style>