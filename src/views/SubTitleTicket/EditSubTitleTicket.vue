<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <v-card class="ma-5 br-12 pa-10 position__relative" height="850">
        <div class="text-center t14500 pb-5">ویرایش موضوع</div>
        <v-divider/>
        <v-form ref="addForm" v-model="valid">
          <v-row class="mt-3" justify="space-between" align="center">
            <v-col cols="12" md="6">
              <div class="text-right my-5">
                <span class="t12400">عنوان موضوع</span>
                <span class="text-error mr-1">*</span>
              </div>
              <v-text-field
                  v-model="form.subject"
                  density="compact"
                  variant="outlined"
                  single-line
              />
            </v-col>

            <v-col cols="12" md="6">
              <div class="text-right my-5">
                <span class="t12400">فیلدهای اجباری</span>
              </div>

              <v-autocomplete
                  variant="outlined"
                  prepend-inner-icon-cb="mdi-map-marker"
                  rounded="lg"
                  :items="[1,2,3]"
                  item-title="name"
                  item-value="value">
                <template v-slot:item="item">
                  <v-list-item>
                    <v-row justify="center">
                      <v-col cols="4">
                        <div
                            @click="assignRequiredFiled(item.props.value.id,item.props.value.sku_id)"
                            class="d-flex justify-start align-center">
                          <v-checkbox class="mr-1" v-model=item.value />
                        </div>

                      </v-col>
                      <v-col cols="8">
                        <text-clamp
                            :text='item?.props?.title'
                            :max-lines='1'
                            autoResize
                            location="start"
                            class="text-gray500 t14 w300 text-right" />
                      </v-col>
                    </v-row>
                  </v-list-item>
                </template>
              </v-autocomplete>
<!--              <v-autocomplete-->
<!--                  v-model="form.requiredFiled"-->
<!--                  density="compact"-->
<!--                  variant="outlined"-->
<!--                  single-line-->
<!--                  :items="requiredFiledList"-->
<!--                  item-title="name"-->
<!--                  item-value="id"-->
<!--              />-->
            </v-col>

            <v-col cols="12" md="6">
              <div class="text-right my-5">
                <span class="t12400">زیرموضوع ها</span>
              </div>
              <v-autocomplete
                  variant="outlined"
                  prepend-inner-icon-cb="mdi-map-marker"
                  rounded="lg"
                  :items="[1,2,3]"
                  item-title="name"
                  item-value="value">
                <template v-slot:item="item">
                  <v-list-item>
                    <v-row justify="center">
                      <v-col cols="4">
                        <div
                            @click="deleteSubTopic()"
                            class="seller__add-sku-btn d-flex justify-center align-center">
                          <v-icon color="error">mdi-trash-can-outline</v-icon>
                        </div>

                      </v-col>
                      <v-col cols="8">
                        <text-clamp
                            :text='item?.props?.title'
                            :max-lines='1'
                            autoResize
                            location="start"
                            class="text-gray500 t14 w300 text-right" />
                      </v-col>
                    </v-row>
                  </v-list-item>
                </template>
              </v-autocomplete>
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
              class="px-8 mt-1">
            <template v-slot:prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            تایید
          </v-btn>

          <v-btn
              @click="$router.go(-1)"
              variant="outlined"
              height="40"
              rounded
              class="px-8 mt-1 mr-5">
            <template v-slot:prepend>
              <v-icon>mdi-cancel</v-icon>
            </template>
            انصراف
          </v-btn>
        </div>
      </v-card>
      <Modal/>
    </v-main>
  </v-layout>
</template>

<script>
import { defineAsyncComponent } from "vue";

const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

export default {
  name: "EditSubTitleTicket",

  components: {
    DashboardLayout,
    Header
  },

  methods: {
    assignRequiredFiled() {
      console.log('assign')
    },

    deleteSubTopic() {
      console.log('open modal')
    }
  }
}
</script>

<style scoped>

</style>