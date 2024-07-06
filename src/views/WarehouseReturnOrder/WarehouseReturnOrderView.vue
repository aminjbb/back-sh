<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
      <div>
        <v-row justify="center" align="center">
          <v-col cols="12">
            <div class="text-center">
              <span class="t14500">بازگردانی سفارش</span>
            </div>
            <v-divider class="my-5"/>
          </v-col>
          <v-col cols="6">
            <div class="text-right mb-3">
                      <span class="t14500 text-gray600">
                          شناسه سفارش
                      </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="شناسه سفارش"
                :rules="rule"
                v-model="orderId"
            />
          </v-col>
          <v-col cols="2">
            <div class=" mt-8 d--ltr">
              <v-btn
                  @click="getPackageList()"
                  color="primary500"
                  height="40"
                  :loading="loading"
                  rounded
                  class="px-8 ma-1 "
              >
                تایید
              </v-btn>

            </div>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import {ref} from 'vue';
import {useCookies} from "vue3-cookies";
import {defineAsyncComponent} from "vue";
import {AxiosCall} from "@/assets/js/axios_call";
const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))
const rule = [v => !!v || 'این فیلد الزامی است']
const cookies = useCookies()
const orderId = ref(null)
const loading = ref(false)
import {useStore} from 'vuex'
import {openToast} from "@/assets/js/functions";
const store = useStore()
async function getPackageList() {
  try {
    loading.value = true
    const AxiosMethod = new AxiosCall()
    AxiosMethod.using_auth = true
    AxiosMethod.toast_error = true
    AxiosMethod.store = store
    AxiosMethod.token = cookies.cookies.get('adminToken')
    AxiosMethod.end_point = `admin/order/${orderId.value}/processing-back-to-pre-progress`
    let data = await AxiosMethod.axios_post()
    if (data) {
      loading.value = false
      openToast(
          store,
          ' سفارش با موفقیت بازگردانی شد',
          "success")
      orderId.value = null
    } else {
      loading.value = false
      orderId.value = null
    }
  } catch (e) {
    loading.value = false
    orderId.value = null
  }
}

</script>
