<template>
  <div class="px-2 py-2 h-100 create-sku-step2">
    <v-card
        class="ma-5 br--12"
        height="580"
    >
      <v-form
          class="create-product__specs-form scroller"
      >
        <v-row>
          <v-col cols="12" md="6">
            <div class="text-right my-2 w-100">
            <span class="t12 w500">
                {{ lables.name }}

            </span>
            </div>

            <v-text-field
                v-model="specsFromModal.name"
                class="t1330"
                variant="outlined"
                :items="heightList"
                :placeholder="lables.name"
                @update:modelValue="saveCreateFromModel();"
            />
          </v-col>

          <v-col cols="12" md="6">
            <div class="text-right my-2 w-100">
            <span class="t12 w500">
                {{ lables.label }}

            </span>
            </div>

            <v-text-field
                v-model="specsFromModal.label"
                class="t1330"
                variant="outlined"
                :placeholder="lables.label"
                @update:modelValue="saveCreateFromModel();"
            />
          </v-col>
        </v-row>
        <v-row class="volume-list">
          <v-col cols="12" md="4">
            <div class="text-right my-2 w-100">
            <span class="t12 w500">
                {{ lables.height }}

            </span>
            </div>

            <v-row>
              <v-col cols="7">
                <v-select
                    v-model="specsFromModal.height"
                    class="t1330"
                    variant="outlined"
                    :items="heightList"
                    :placeholder="lables.height"
                    @update:modelValue="saveCreateFromModel();"
                />
              </v-col>

              <v-col cols="5">
                <v-text-field
                    v-model="specsFromModal.heightValue"
                    clearable
                    variant="outlined"
                    type="number"
                    @update:modelValue="saveCreateFromModel()"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="4">
            <div class="text-right my-2">
            <span class="t12 w500">
                {{ lables.width }}
            </span>
            </div>

            <v-row>
              <v-col cols="7">
                <v-select
                    v-model="specsFromModal.width"
                    class="t1330"
                    variant="outlined"
                    :items="widthList"
                    :placeholder="lables.width"
                    @update:modelValue="saveCreateFromModel();"
                />
              </v-col>

              <v-col cols="5">
                <v-text-field
                    v-model="specsFromModal.widthValue"
                    clearable
                    variant="outlined"
                    type="number"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="4">
            <div class="text-right my-2">
            <span class="t12 w500">
                {{ lables.length }}
            </span>
            </div>

            <v-row>
              <v-col cols="7">
                <v-select
                    v-model="specsFromModal.length"
                    class="t1330"
                    variant="outlined"
                    :items="lengthLis"
                    :placeholder="lables.length"
                    @update:modelValue="saveCreateFromModel();"
                />
              </v-col>

              <v-col cols="5">
                <v-text-field
                    v-model="specsFromModal.lengthValue"
                    clearable
                    variant="outlined"
                    type="number"
                    @update:modelValue="saveCreateFromModel()"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="4">
            <div class="text-right my-2">
            <span class="t12 w500">
                {{ lables.weight }}
            </span>
            </div>

            <v-row>
              <v-col cols="7">
                <v-select
                    v-model="specsFromModal.weight"
                    class="t1330"
                    variant="outlined"
                    :items="weightList"
                    :placeholder="lables.weight"
                    @update:modelValue="saveCreateFromModel();"
                />
              </v-col>

              <v-col cols="5">
                <v-text-field
                    v-model="specsFromModal.weightValue"
                    clearable
                    variant="outlined"
                    type="number"
                    @update:modelValue="saveCreateFromModel()"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="4">
            <div class="text-right my-2">
            <span class="t12 w500">
                {{ lables.volume }}
            </span>
            </div>

            <v-row>
              <v-col cols="7">
                <v-select
                    v-model="specsFromModal.volume"
                    class="t1330"
                    variant="outlined"
                    :items="volumeUnitList"
                    :placeholder="lables.volume"
                    @update:modelValue="saveCreateFromModel(index);"
                />
              </v-col>

              <v-col cols="5">
                <v-text-field
                    v-model="specsFromModal.volumeValue"
                    clearable
                    variant="outlined"
                    type="number"
                    @update:modelValue="saveCreateFromModel(index)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <div>
          <div class="text-right my-2 w-100">
          <span class="t12 w500">
              {{ lables.specifications }}
          </span>
          </div>
          <keep-alive>
            <TinymceVue @input="fillDescription" v-if="load" :value="specsFromModal.specifications" id="d2" class="mb-8"
                        :other_options="options">
            </TinymceVue>
          </keep-alive>
        </div>

        <div>
          <div class="text-right my-2 w-100">
          <span class="t12 w500">
              {{ lables.advantages }}
          </span>
          </div>
          <keep-alive>
            <TinymceVue @input="fillAdvantages" v-if="load" :value="specsFromModal.advantages" id="tinyAdvantages" class="mb-8"
                        :other_options="options">
            </TinymceVue>
          </keep-alive>
        </div>

        <div>
          <div class="text-right my-2 w-100">
          <span class="t12 w500">
              {{ lables.disAdvantages }}
          </span>
          </div>
          <keep-alive>
            <TinymceVue @input="fillDisAdvantages" v-if="load" :value="specsFromModal.disAdvantages" id="tinyDisAdvantages" class="mb-8"
                        :other_options="options">
            </TinymceVue>
          </keep-alive>
        </div>

        <div>
          <div class="text-right my-2 w-100">
            <span class="t12 w500">
                {{ lables.instructions }}
            </span>
          </div>
          <keep-alive>
            <TinymceVue @input="fillDisAdvantages" v-if="load" :value="specsFromModal.disAdvantages" id="tinyInstructions" class="mb-8"
                        :other_options="options">
            </TinymceVue>
          </keep-alive>
        </div>

        <div>
          <div class="text-right my-2 w-100">
            <span class="t12 w500">
                {{ lables.usage }}
            </span>
          </div>
          <keep-alive>
            <TinymceVue @input="fillUsage" v-if="load" :value="specsFromModal.usage" id="tinyUsage" class="mb-8"
                        :other_options="options">
            </TinymceVue>
          </keep-alive>
        </div>


        <div>
          <UploadFileSection module="sku" @getImage="getSkuImage"/>
          <div class="d-flex align-center mt-5" v-if="specsFromModal.skuImage">
            <span>IMG-{{ specsFromModal.skuImage }}</span>
            <span class="mr-15"><v-icon color="error"
                                        @click="removeItem(specsFromModal.skuImage)">mdi-delete</v-icon></span>
          </div>
        </div>
      </v-form>
      <footer class="create-product__actions ">
        <v-row justify="space-between" class="px-8 pt-8">
          <div>
            <v-btn
                rounded
                variant="outlined"
                width="115"
                @click="$router.go(-1)"
            >
              <span class="t14 w300">
                انصراف
              </span>
            </v-btn>
          </div>

          <div>
            <v-btn
                :loading="loading"
                rounded
                color="primary400"
                variant="elevated"
                width="115"
                @click="editSku"
            >
                  <span
                      class="t14 w300"
                  >
                 ذخیره
              </span>
            </v-btn>
          </div>
        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script setup>
import {component as ckeditor} from '@mayasabha/ckeditor4-vue3'
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
</script>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import {openConfirm} from "@/assets/js/functions";
import TinymceVue from "@/components/Public/TinymceVue.vue";

export default {

  props: {
    heightList: [],
    widthList: [],
    lengthLis: [],
    weightList: [],
    volumeUnitList: [],
    sku: null
  },
  components: {
    TinymceVue
  },
  watch: {
    sku(val) {
      this.setForm()
    },

    confirmModal(val) {
      if (!val) {
        if (localStorage.getItem('deleteObject') === 'done') {
          this.specsFromModal.skuImage = null
          localStorage.removeItem('deleteObject')
        }
      }
    },

  },

  data: () => ({
    options: {
      height: 500,
    },
    load: false,
    lables: {
      height: 'ارتقاع',
      width: 'عرض',
      length: 'طول',
      weight: 'وزن',
      volume: 'حجم',
      specifications: 'مشخصات',
      advantages: 'مزایا',
      disAdvantages: 'معایب',
      instructions: 'روش استفاده',
      usage: 'موارد استفاده',
      name: 'نام انگلیسی محصول',
      label: 'نام فارسی محصول',
    },

    specsFromModal: {
      skuImage: null,
      name: null,
      label: null,
      specifications: '',
      advantages: '',
      disAdvantages: '',
      instructions: '',
      usage: '',
      height: null,
      heightValue: 1,
      width: null,
      widthValue: 1,
      length: null,
      lengthValue: 1,
      weight: null,
      weightValue: 1,
      volume: null,
      volumeValue: 1,
    },
    rule: [v => !!v || 'این فیلد الزامی است'],
    editorConfig: {
      language: 'en',
      contentsLangDirection: 'rtl',
    },
  }),

  methods: {
    fillDescription(e) {
      this.specsFromModal.specifications = e
    },
    fillAdvantages(e) {
      this.specsFromModal.advantages = e
    },
    fillDisAdvantages(e) {
      this.specsFromModal.disAdvantages = e
    },
    fillInstructions(e) {
      this.specsFromModal.instructions = e
    },
    fillUsage(e) {
      this.specsFromModal.usage = e
    },
    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
    },
    getSkuImage(image) {
      this.specsFromModal.skuImage = image.data.data.image_id
    },
    saveCreateFromModel() {
      const createFromModelJson = JSON.stringify(this.specsFromModal);
      this.$cookies.set('createFromModelStep2', createFromModelJson);
    },

    setFormModel() {
      if (this.$cookies.get('createFromModelStep2')) {
        const jsonForm = this.$cookies.get('createFromModelStep2')
        this.specsFromModal = jsonForm
      }
    },

    setForm() {
      this.specsFromModal.label = this.sku.label
      this.specsFromModal.name = this.sku.name
      this.specsFromModal.specifications = this.sku.story
      this.specsFromModal.advantages = this.sku.advantage
      this.specsFromModal.disAdvantages = this.sku.disadvantage
      this.specsFromModal.usage = this.sku.uses_case
      this.specsFromModal.instructions = this.sku.how_to_use
      this.specsFromModal.heightValue = this.height
      this.specsFromModal.widthValue = this.width
      this.specsFromModal.lengthValue = this.length
      this.specsFromModal.weightValue = this.weight
      this.specsFromModal.volumeValue = this.volumeUnit
      this.specsFromModal.skuImage = this.sku.image_id


    },
    async editSku() {
      let sizes = []
      const formData = new FormData()
      if (this.specsFromModal.widthValue && this.specsFromModal.width) sizes.push({
        label: this.specsFromModal.width,
        value: this.specsFromModal.widthValue
      })
      if (this.specsFromModal.weightValue && this.specsFromModal.weight) sizes.push({
        label: this.specsFromModal.weight,
        value: this.specsFromModal.weightValue
      })
      if (this.specsFromModal.volumeValue && this.specsFromModal.volume) sizes.push({
        label: this.specsFromModal.volume,
        value: this.specsFromModal.volumeValue
      })
      if (this.specsFromModal.lengthValue && this.specsFromModal.length) sizes.push({
        label: this.specsFromModal.length,
        value: this.specsFromModal.lengthValue
      })
      if (this.specsFromModal.heightValue && this.specsFromModal.height) sizes.push({
        label: this.specsFromModal.height,
        value: this.specsFromModal.heightValue
      })
      /**
       * set sizes formData from sizes array
       */
      sizes.forEach((size, i) => {
        formData.append('sizes[' + i + '][id]', size.label)
        formData.append('sizes[' + i + '][value]', size.value)
      });

      /**
       * set step 2 data formData
       */
      formData.append('story', this.specsFromModal.specifications)
      formData.append('advantage', this.specsFromModal.advantages)
      formData.append('disadvantage', this.specsFromModal.disAdvantages)
      formData.append('how_to_use', this.specsFromModal.instructions)
      formData.append('uses_case', this.specsFromModal.usage)
      formData.append('name', this.specsFromModal.name)
      formData.append('label', this.specsFromModal.label)

      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/sku/crud/update/' + this.$route.params.skuId
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.attachImage()
      } else {
        this.loading = false
      }
    },
    async attachImage() {
      const formData = new FormData()
      formData.append('image_id', this.specsFromModal.skuImage)

      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/sku/crud/attach/image/' + this.$route.params.skuId
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/product/get/skus/index')
      } else {
        this.loading = false
      }
    }

  },

  mounted() {
    setTimeout(() => {
      this.specsFromModal.height = this.heightList[0].value
      this.specsFromModal.width = this.widthList[0].value
      this.specsFromModal.length = this.lengthLis[0].value
      this.specsFromModal.weight = this.weightList[0].value
      this.specsFromModal.volume = this.volumeUnitList[0].value
      setTimeout(() => {
        this.load = true
      }, 1000);
    }, 2000)
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },
    /**
     * create height list for select
     */
    height() {
      try {
        const filterHeight = this.sku.sizes.find(el => el.name === 'height')
        return filterHeight.value
      } catch (error) {
        return []
      }
    },

    /**
     * create width list for select
     */
    width() {
      try {
        const filterWidth = this.sku.sizes.find(el => el.name === 'width')
        return filterWidth.value
      } catch (error) {
        return ''
      }
    },
    /**
     * create length list for select
     */

    length() {
      try {
        const filterLength = this.sku.sizes.find(el => el.name === 'length')
        return filterLength.value
      } catch (error) {
        return ''
      }
    },

    /**
     * create weight list for select
     */
    weight() {
      try {
        const filterWeight = this.sku.sizes.find(el => el.name === 'weight')
        return filterWeight.value
      } catch (error) {
        return ''
      }
    },

    volumeUnit() {
      try {
        const filterVolumeUnit = this.sku.sizes.find(el => el.name === 'volume')
        return filterVolumeUnit.value
      } catch (error) {
        return ''
      }
    },
  }
}
</script>
