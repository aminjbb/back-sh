<template>
  <div class="dir-rtl">
    <v-row justify="center" align="center" v-if="formType === 'notAddress'">
      <v-col :cols="item.col" v-for="(item , index) in items" :key="`formInput${index}`">
        <div class="text-right">
          <div class="t12 w400 text-gray600 mb-3">
            {{ item.label }}
          </div>
          <div>
            <v-card variant="flat" height="42" color="gray700" :class="item.class" class="d-flex align-center px-3 "
                    v-if="item.type=== 'text'">
              {{ item.value }}
            </v-card>
            <img :src="item.value" height="132" v-if="item.type=== 'image'">
          </div>

        </div>
      </v-col>
    </v-row>
    <div v-else>
      <v-row justify="center" align="center"  class="dir-ltr">
        <v-col cols="4" v-if="addressFields.postal_code.old_value">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              کد پستی قدیم
            </div>
            <div>
              <v-card variant="flat" height="42" color="gray700" class="d-flex align-center px-3 text-right">
                {{ addressFields.postal_code.old_value }}
              </v-card>
            </div>

          </div>
        </v-col>
        <v-col cols="4" v-if="addressFields.city_id.old_value">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              شهر قدیم
            </div>
            <div>
              <v-card variant="flat" height="42" color="gray700" class="d-flex align-center px-3 text-right">
                {{ addressFields.city_id.old_value }}
              </v-card>
            </div>

          </div>
        </v-col>
        <v-col cols="4" v-if="addressFields.state_id.old_value">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              استان قدیم
            </div>
            <div>
              <v-card variant="flat" height="42" color="gray700" class="d-flex align-center px-3 text-right">
                {{ addressFields.state_id.old_value }}
              </v-card>
            </div>

          </div>
        </v-col>
        <v-col cols="8" v-if="addressFields.address.old_value">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              آدرس قدیم
            </div>
            <div>
              <v-card variant="flat" height="42" color="gray700" class="d-flex align-center px-3 text-right">
                {{ addressFields.address.old_value }}
              </v-card>
            </div>

          </div>
        </v-col>
        <v-col cols="4" v-if="addressFields.phone.old_value">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              تلفن ثابت قدیم
            </div>
            <div>
              <v-card variant="flat" height="42" color="gray700" class="d-flex align-center px-3 text-right">
                {{ addressFields.phone.old_value }}
              </v-card>
            </div>

          </div>
        </v-col>


      </v-row>
      <v-row justify="center" align="center"  class="dir-ltr">
        <v-col cols="4" v-if="addressFields.postal_code.value">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              کد پستی جدید
            </div>
            <div>
              <v-card variant="flat" height="42" color="gray700" class="d-flex align-center px-3 text-right">
                {{ addressFields.postal_code.value }}
              </v-card>
            </div>

          </div>
        </v-col>
        <v-col cols="4" v-if="addressFields.city_id.value">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              شهر جدید
            </div>
            <div>
              <v-card variant="flat" height="42" color="gray700" class="d-flex align-center px-3 text-right">
                {{ addressFields.city_id.value }}
              </v-card>
            </div>

          </div>
        </v-col>
        <v-col cols="4" v-if="addressFields.state_id.value">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              استان جدید
            </div>
            <div>
              <v-card variant="flat" height="42" color="gray700" class="d-flex align-center px-3 text-right">
                {{ addressFields.state_id.value }}
              </v-card>
            </div>

          </div>
        </v-col>
        <v-col cols="8" v-if="addressFields.address.value">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              آدرس جدید
            </div>
            <div>
              <v-card variant="flat" height="42" color="gray700" class="d-flex align-center px-3 text-right">
                {{ addressFields.address.value }}
              </v-card>
            </div>

          </div>
        </v-col>
        <v-col cols="4" v-if="addressFields.phone.value">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              تلفن ثابت جدید
            </div>
            <div>
              <v-card variant="flat" height="42" color="gray700" class="d-flex align-center px-3 text-right">
                {{ addressFields.phone.value }}
              </v-card>
            </div>

          </div>
        </v-col>
      </v-row>
    </div>

    <v-row justify="center" align="center">
      <v-col cols="12">
        <div class="text-right">
          <div class="t12 w400 text-gray600">
            توضیحات
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <v-textarea variant="outlined" :rows="4" v-model="description"></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    items: [],
    type: {type: String, default: 'text'},
    formType: {type: String, default: ''},
    addressFields: {type: Object, default: null}
  },

  data() {
    return {
      formData: [],
      description: ''
    }
  },

  mounted() {
    this.items.forEach(element => {
      this.formData.push('')
    })
  },

  watch: {
    items(val) {
      if (val.length) {
        val.forEach(element => {
          const form = {
            label: element.label,
            value: ''
          }
          this.formData.push(form)
        })

      }
    }
  }
}
</script>