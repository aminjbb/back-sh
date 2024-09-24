<template>
  <div class="px-2 py-2 h-100 create-sku-step2">
    <v-form
        ref="createProductStep1"
        class="create-product__specs-form scroller"
    >
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
                  @update:modelValue="saveCreateFromModel();"
              />
            </v-col>

            <v-col cols="5">
              <v-text-field
                  v-model="specsFromModal.volumeValue"
                  clearable
                  variant="outlined"
                  type="number"
                  @update:modelValue="saveCreateFromModel()"
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
          <TinymceVue @input="fillDescription" v-if="load" :value="specsFromModal.specifications" id="TinymceVue3"
                      class="mb-8"
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
          <TinymceVue @input="fillAdvantages" v-if="load" :value="specsFromModal.advantages" id="TinymceVueAdvantages"
                      class="mb-8"
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
          <TinymceVue @input="fillDisAdvantages" v-if="load" :value="specsFromModal.disAdvantages" id="TinymceVueDisAdvantages"
                      class="mb-8"
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
          <TinymceVue @input="fillInstructions" v-if="load" :value="specsFromModal.instructions" id="TinymceVueInstructions"
                      class="mb-8"
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
          <TinymceVue @input="fillUsage" v-if="load" :value="specsFromModal.usage" id="TinymceVueUsage"
                      class="mb-8"
                      :other_options="options">
          </TinymceVue>
        </keep-alive>
      </div>
    </v-form>
  </div>
</template>


<script>
import TinymceVue from "@/components/Public/TinymceVue.vue";

export default {

  props: {
    heightList: [],
    widthList: [],
    lengthLis: [],
    weightList: [],
    volumeUnitList: [],
  },

  watch: {

    heightList(val) {
      this.specsFromModal.height = val[0].value
    },
    widthList(val) {
      this.specsFromModal.width = val[0].value
    },
    lengthLis(val) {
      this.specsFromModal.length = val[0].value
    },
    weightList(val) {
      this.specsFromModal.weight = val[0].value
    },
    volumeUnitList(val) {
      this.specsFromModal.volume = val[0].value

    },
  },
  components: {
    TinymceVue
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
    },

    specsFromModal: {
      specifications: 'مشخصات',
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
      this.saveCreateFromModel()
    },
    fillAdvantages(e) {
      this.specsFromModal.advantages = e
      this.saveCreateFromModel()
    },
    fillDisAdvantages(e) {
      this.specsFromModal.disAdvantages = e
      this.saveCreateFromModel()
    },
    fillInstructions(e) {
      this.specsFromModal.instructions = e
      this.saveCreateFromModel()
    },
    fillUsage(e) {
      this.specsFromModal.usage = e
      this.saveCreateFromModel()
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
    }
  },

  mounted() {
    this.setFormModel()
    this.specsFromModal.height = this.heightList[0].value
    this.specsFromModal.width = this.widthList[0].value
    this.specsFromModal.length = this.lengthLis[0].value
    this.specsFromModal.weight = this.weightList[0].value
    this.specsFromModal.volume = this.volumeUnitList[0].value
    setTimeout(() => {
      this.load = true
    }, 500)
  },
}
</script>
