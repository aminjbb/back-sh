<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="">
        <v-card class="ma-5 br-12 py-10 position__relative" height="850">
          <div class="text-center t14500 pb-5">افزودن زیر موضوع</div>
          <v-divider/>

          <v-form ref="addForm" v-model="valid">
            <v-row class="mt-3 mr-16" justify="center" align="center">
              <v-col cols="12" md="12">
                <div class="text-right my-5">
                  <span class="t12400">عنوان موضوع :</span>
                  <span class="t12400 mr-2">پیگیری سفارش</span>
                </div>
              </v-col>

              <v-col cols="12" md="5">
                <div class="text-right my-5">
                  <span class="t12400">عنوان زیرموضوع</span>
                  <span class="text-error mr-1">*</span>
                </div>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    single-line
                />
              </v-col>

              <v-col cols="12" md="5">
                <div class="text-right my-5">
                  <span class="t12400">فیلدهای اجباری</span>
                </div>
                <v-autocomplete
                    density="compact"
                    variant="outlined"
                    single-line
                    :items="requiredFiledList"
                    item-title="name"
                    item-value="id"
                />
              </v-col>

              <v-col cols="12" md="2" class="mt-14">
                <v-btn
                    :loading="loading"
                    @click="validate()"
                    color="primary500"
                    rounded>
                  دخیره
                </v-btn>
              </v-col>
            </v-row>
          </v-form>

          <div class="d-flex justify-end position__absolute bottom left">
            <v-btn
                :loading="loading"
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1"
            >
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              ویرایش
            </v-btn>

            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                height="40"
                rounded
                class="px-8 mt-1 mr-5"
            >
              <template v-slot:prepend>
                <v-icon>mdi-cancel</v-icon>
              </template>
              انصراف
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import { defineAsyncComponent } from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import {openToast} from "@/assets/js/functions";

export default {
  name: "AddSubTopicToSubject",

  components: {
    DashboardLayout,
    Header
  },
}
</script>

<style scoped>

</style>