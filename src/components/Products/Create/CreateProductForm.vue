<template>
  <section class="create-product flex-column d-flex h-100">
    <Stepper :steps="steps" :changeStep="changeStep" :step="step"/>
    <v-card class="ma-5 br--12 pb-15 flex-grow-1">
      <h3 class="t14 w500 create-product__header">ساخت محصول یکتا</h3>

      <template v-if="step === 1">
        <CreateProductFromStep1 
          :volumeList="volumeList"
          :brandList="brandList"
          :colorList="colorList"
          :operatorList="operatorList"
          ref="skuForm1"
          :state="createSkuState"
          :getAllAttributes="getAllAttributes"

        />
      </template>

      <template v-else-if="step === 2">
        <CreateProductFromStep2
            ref="skuForm2"
            :heightList="heightList"
            :widthList="widthList"
            :lengthLis="lengthList"
            :weightList="weightList"
            :volumeUnitList="volumeUnitList"
        />
      </template>

      <template v-else-if="step === 3">
        <CreateProductFromStep3 ref="skuForm3"/>
      </template>

      <footer class="create-product__actions ">
        <v-row justify="space-between" class="px-8 pt-8">
          <div>
            <v-btn
                rounded
                variant="outlined"
                width="115"
                @click="decreaseStep()"
            >
              <span class="t14 w300">
                  مرحله قبلی
              </span>
            </v-btn>
          </div>

          <div>
            <v-btn
                rounded
                color="primary400"
                variant="text"
                width="115"
                v-if="step == 1"
                @click="deleteForms()"
            >
              <span class="t14 w300 text-gray500">پاک کردن</span>
            </v-btn>

            <v-btn
                :loading="loading"
                rounded
                color="primary400"
                variant="elevated"
                width="115"
                @click="increaseStep()"
            >
              <span 
                v-if="step < 3"
                class="t14 w300"
              >
                مرحله بعدی
              </span>
              
              <span
                v-else
                class="t14 w300"
              >
                 ذخیره نهایی
              </span>
            </v-btn>
          </div>
        </v-row>
      </footer>
    </v-card>
  </section>
</template>

<script>
import CreateProductFromStep1 from './Steps/Steps1.vue'
import CreateProductFromStep2 from './Steps/Steps2.vue'
import CreateProductFromStep3 from './Steps/Steps3.vue'
import Stepper from '@/components/Public/Stepper.vue'
import Brands from '@/composables/Brands';
import Colors from '@/composables/Colors';
import Attributes from '@/composables/Attributes';
import Operators from '@/composables/Operators';
import Volume from '@/composables/Volume';
import Size from '@/composables/Size';
import Product from '@/composables/Product';
import Sku from '@/composables/Sku';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {openToast} from "@/assets/js/functions";
import { onUnmounted } from 'vue'
export default {
  components: {
    CreateProductFromStep1,
    CreateProductFromStep2,
    CreateProductFromStep3,
    Stepper
  },
  setup() {
    onUnmounted(() =>  localStorage.removeItem('skuGroupDetail'))
    const {allBrands, getAllBrands} = Brands()
    const {allColors, getAllColor} = Colors()
    const {attributes, getAllAttributes} = Attributes()
    const {operator, getOperator} = Operators()
    const {volume, getVolume} = Volume()
    const {size, getSize} = Size()
    const {oneProduct, getOneProduct} = Product()
    const {skuGroup, getSkuGroup} = Sku()
    return {
      allBrands, getAllBrands,
      allColors, getAllColor,
      attributes, getAllAttributes,
      operator, getOperator,
      volume, getVolume,
      size, getSize,
      oneProduct, getOneProduct,
      skuGroup, getSkuGroup
    }
  },


  data: () => ({
    step: 1,
    loading: false,
    steps:[
      'مرحله اول',
      ' مرحله دوم',
      'مرحله سوم'
    ]
  }),

  methods: {

    /**
     * delete cookies form and form step 1
     */
    deleteForms() {
      // const nullForm = {
      //   productSelected:null,
      //   brands: null,
      //   colors: [],
      //   numbers: null,
      //   attributes: [],
      //   attributesValue: [],
      //   variety: [false],
      //   unit: [],
      //   height: {},
      //   width: {},
      //   length: {},
      //   weight: {},
      //   volume: {},
      //   operators: {
      //     label: 'هیچکدام',
      //     name: 'none',
      //   },
      //   newOperator: '',
      // }
      // const badgeList = [
      //   {
      //     name: 'product_name',
      //     label: 'نام محصول',
      //     id: 'id11',
      //   }
      // ]
      // const maketItem = {
      //   title: '',
      //   attr_id: '',
      //   values: '',
      // }
      // this.$refs.skuForm1.createFromModel = nullForm
      // this.$refs.skuForm1.badgeList = badgeList
      // this.$refs.skuForm1.unitNumbersList = []
      // this.$refs.skuForm1.number = "1"
      // this.$refs.skuForm1.attrNumbers = ["attr1"]
      // this.$refs.skuForm1.items = []
      // this.$refs.skuForm1.items.push(maketItem)
      // this.$refs.skuForm1.skuGroupDetail = []
      localStorage.removeItem('createFromModelStep1')
      this.$cookies.remove('createFromModelStep2')
      this.$cookies.remove('createProductStep')
      this.$cookies.remove('attributesNumber')
      localStorage.removeItem('skuObject')
      localStorage.removeItem('skuGroupDetail')
      location.reload();
    },

    /**
     * increase step
     */
    increaseStep() {
      if (this.step == 2) {
        this.validateSkuForm()
      } else if (this.step < 2) ++this.step
      else if (this.step == 3) this.skuGroupsLabels()
    },

    /**
     * decrease step
     */
    decreaseStep() {
      if (this.step > 1) --this.step

    },

    /**
     *  change step from stepper button
     * @param{*} step
     */
    changeStep(step) {
      this.step = step
    },

    validateSkuForm(){
      let skuGroupDetail
      const step1Form = JSON.parse(localStorage.getItem('createFromModelStep1'))
      const step2Form = this.$refs.skuForm2.specsFromModal
      if (localStorage.getItem('skuGroupDetail')){
        const skuObject = localStorage.getItem('skuGroupDetail')
        skuGroupDetail = JSON.parse([skuObject])
      }
      if (!skuGroupDetail){

        if (!step1Form){
          openToast(this.$store,'هیچ کدام از اطلاعات وارد نشده', 'error')
        }
        else {

          if (!step1Form.brands){
            openToast(this.$store,'برند اضافه نشده است', 'error')
          }
          else if (!step1Form.colors.length){
            openToast(this.$store,'رنگ ها اضافه نشده است', 'error')
          }
          else if (!step1Form.attributes.length){
            openToast(this.$store,'حداقل یک ویژگی باید وارد کنید', 'error')
          }
          else if (!step1Form.unit.length){
            console.log(step1Form.unit)
            openToast(this.$store,'حداقل یک تعداد باید وارد کنید', 'error')
          }
          else if (!step1Form.operators){
            openToast(this.$store,'اپراتور وارد نشده است', 'error')
          }

          else if (step1Form.operators.name === 'none' && !step1Form.newOperator){
            openToast(this.$store,'اپراتور وارد نشده است', 'error')
          }
          else if (!step2Form.widthValue || !step2Form.width) openToast(this.$store,'عرض وارد نشده است', 'error')
          else if (!step2Form.weightValue || !step2Form.weight) openToast(this.$store,' وزن وارد نشده است', 'error')
          else if (!step2Form.volumeValue || !step2Form.volume) openToast(this.$store,'حجم وارد نشده است', 'error')
          else if (!step2Form.lengthValue || !step2Form.length) openToast(this.$store,'طول وارد نشده است', 'error')
          else if (!step2Form.heightValue || !step2Form.height) openToast(this.$store,'ارتقاع وارد نشده است', 'error')
          else {
           this.skuFormGenerator()
          }
        }
      }
      else {
          if (!step2Form.widthValue || !step2Form.width) openToast(this.$store,'عرض وارد نشده است', 'error')
          else if (!step2Form.weightValue || !step2Form.weight) openToast(this.$store,' وزن وارد نشده است', 'error')
          else if (!step2Form.volumeValue || !step2Form.volume) openToast(this.$store,'حجم وارد نشده است', 'error')
          else if (!step2Form.lengthValue || !step2Form.length) openToast(this.$store,'طول وارد نشده است', 'error')
          else if (!step2Form.heightValue || !step2Form.height) openToast(this.$store,'ارتقاع وارد نشده است', 'error')
          else {
            this.skuFormGenerator()
          }
      }
    },

    /**
     * create sku formData for create skus
     */
    skuFormGenerator() {
      this.attrNumbers = JSON.parse(this.$cookies.get('attributesNumber'))
      const step1Form = JSON.parse(localStorage.getItem('createFromModelStep1'))

      // const jsonForm = this.$cookies.get('createFromModelStep2')
      let skuGroupDetail
      if (localStorage.getItem('skuGroupDetail')){
        const skuObject = localStorage.getItem('skuGroupDetail')
        skuGroupDetail = JSON.parse([skuObject])
      }
      const step2Form = this.$refs.skuForm2.specsFromModal
      const formdata = new FormData()
      const sizes = []
      let skuGroupDetailAttributeSize = 0
      let skGroupVolumeIndex = 0
      let skGroupColorIndex = 0
      let productId = null
      if (step1Form.productSelected){
        productId =  step1Form.productSelected.value
      }
      else {
        productId =   this.$route.params.id
      }
      /**
       * check skuGroupDetail and append formData
       */
      formdata.append('product_id',productId)
      if (skuGroupDetail) {
        if (skuGroupDetail.attributes.length) skuGroupDetailAttributeSize = skuGroupDetail.attributes.length
        if (skuGroupDetail.volumes.length) skGroupVolumeIndex = skuGroupDetail.volumes.length
        if (skuGroupDetail.colors.length) skGroupColorIndex = skuGroupDetail.colors.length

        /**
         * set attribute formData from skuGroupDetail
         */
        skuGroupDetail.attributes.forEach((element, i) => {
          formdata.append('attributes[' + i + '][id]', element.id)
          formdata.append('attributes[' + i + '][is_variant]', element.is_variant)
          element.values.forEach((attributeValue , attributeValueIndex) =>{
            formdata.append('attributes[' + i + '][value_ids][' + attributeValueIndex + ']', attributeValue.id)
          })
        });

        /**
         * set colors formData from skuGroupDetail
         */
        skuGroupDetail.colors.forEach((color, i) => {
          formdata.append('color_ids[' + i + ']', color.id)
        });

        skuGroupDetail.volumes.forEach((volume, index) => {

          formdata.append('volumes[' + index + '][id]', volume.id)
          formdata.append('volumes[' + index + '][value]', volume.value)
        });
      }

      /**
       * set attribute formData attribute selected
       */
      step1Form.attributes.forEach((element, i) => {
        const index = parseInt(skuGroupDetailAttributeSize) + parseInt(i)
        formdata.append('attributes[' + index + '][id]', element.id)
        let variety = 0
        if (step1Form.variety[index]) variety = 1
        formdata.append('attributes[' + index + '][is_variant]', variety)
      });

      /**
       * set attribute formData attribute values selected
       */
      step1Form.attributesValue.forEach((element, i) => {
        const attributeIndex = skuGroupDetailAttributeSize + i
        element.forEach((attributevalue, attrValueIndex) => {
          formdata.append('attributes[' + attributeIndex + '][value_ids][' + attrValueIndex + ']', attributevalue.id)
        });
      });

      /**
       * set volume formData volume selected
       */
      step1Form.unit.forEach((unitObject, i) => {
        const volumeIndex = skGroupVolumeIndex + i
        formdata.append('volumes[' + volumeIndex + '][id]', unitObject.label.value)
        formdata.append('volumes[' + volumeIndex + '][value]', unitObject.numbers)
      });


      /**
       * set colors formData colors selected
       */
      if ( step1Form.colors){
        step1Form.colors.forEach((color, i) => {
          const colorIndex = skGroupColorIndex + i
          formdata.append('color_ids[' + colorIndex + ']', color.name)
        });
      }

      /**
       * create sizes array
       */
      if (step2Form.widthValue && step2Form.width) sizes.push({label: step2Form.width, value: step2Form.widthValue})
      if (step2Form.weightValue && step2Form.weight) sizes.push({label: step2Form.weight, value: step2Form.weightValue})
      if (step2Form.volumeValue && step2Form.volume) sizes.push({label: step2Form.volume, value: step2Form.volumeValue})
      if (step2Form.lengthValue && step2Form.length) sizes.push({label: step2Form.length, value: step2Form.lengthValue})
      if (step2Form.heightValue && step2Form.height) sizes.push({label: step2Form.height, value: step2Form.heightValue})

      /**
       * set sizes formData from sizes array
       */
      sizes.forEach((size, i) => {
        formdata.append('sizes[' + i + '][id]', size.label)
        formdata.append('sizes[' + i + '][value]', size.value)
      });

      /**
       * set step 2 data formData
       */
      formdata.append('story', step2Form.specifications)
      formdata.append('advantage', step2Form.advantages)
      formdata.append('disadvantage', step2Form.disAdvantages)
      formdata.append('how_to_use', step2Form.instructions)
      formdata.append('uses_case', step2Form.usage)

      formdata.append('is_active', 0)
      formdata.append('is_sellable', 0)





      /**
       * set operator formData
       */
      if (skuGroupDetail) {
        formdata.append('brand_id', skuGroupDetail.brand.id)
      } else {
        formdata.append('brand_id', step1Form.brands.value)
      }

      if (skuGroupDetail) {
        formdata.append('operator', skuGroupDetail.sku_group.operator)
      } else {
        if (step1Form.operators.name === 'none') formdata.append('operator', step1Form.newOperator)
        else formdata.append('operator', step1Form.operators.label)
      }

      this.createSku(formdata , productId)

    },

    /**
     * create sku
     */
    async createSku(form ,productId) {
      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/sku/crud/create'
      AxiosMethod.form = form
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.getSkuProduct(productId)
      } else {
        this.loading = false
      }
    },

    /**
     * get product`s skus
     * @param productId
     */
    async getSkuProduct(productId) {

      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `product/sku/group/crud/index?product_id=${productId}&per_page=10000`
      let data = await AxiosMethod.axios_get()
      if (data) {
        const skuObject = JSON.stringify(data.data.data)
        localStorage.setItem('skuObject', skuObject)
        this.step = 3
        this.$cookies.set('createProductStep', 3)
      } else {
      }
    },
    /**
     * create formData for sku group labels
     */
    skuGroupsLabels(){
      var formData = new FormData()
      this.$refs.skuForm3.skuGroupsLabels.forEach((skuGroup , index)=>{
        formData.append(`sku_groups[${index}][id]` ,skuGroup.id )
        formData.append(`sku_groups[${index}][label]` ,skuGroup.value )
      })
    this.updateSkuGroupLabels(formData)
    },

    /**
     * update sku group labels
     */
    async updateSkuGroupLabels(formData) {
      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.toast_success = false
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'product/sku/group/crud/update/multi'
      AxiosMethod.form = formData

      let data = await AxiosMethod.axios_post()
      if (data) {
        await  this.approvedSku()
        this.step = 1
      } else {
        this.loading = false
      }
    },

    /**
     * approve skus list
     */

    async approvedSku() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      this.$refs.skuForm3.skuesSelected.forEach((sku, index) => {
        formdata.append(`sku_ids[]`, sku)
      });
      formdata.append('status', 'approved')
      AxiosMethod.using_auth = true
      AxiosMethod.toast_success = false
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'product/sku/crud/switch/multi/status'
      AxiosMethod.form = formdata

      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.step = 1
        localStorage.removeItem('skuObject')
      } else {
        this.loading = false
      }
    }
  },

  mounted() {
    // if (this.$cookies.get('createProductStep')) this.step = parseInt(this.$cookies.get('createProductStep'))
    // else this.step = 1
    const filterPerPag = {
      per_page: 10000
    }
    this.getAllBrands()
    this.getAllColor()
    this.getAllAttributes()
    this.getOperator(filterPerPag)
    this.getVolume(filterPerPag)
    this.getSize(filterPerPag)
    // if (this.$route.name === "createProduct"){
    //   this.getOneProduct(this.$route.params.productId)
    // }
    if ( this.$route.name === "createProductSkuGroup"){
      this.getOneProduct(this.$route.params.productId)
      this.getSkuGroup(this.$route.params.skuGroupId)
    }
  },



  computed: {
    createSkuState(){
      try {
        return this.$route.name
      }
      catch (e)
      {
        return ''
      }
    },
    /**
     * create brand list for select
     */
    brandList() {
      try {
        const brands = []
        this.allBrands.data.forEach(element => {
          const form = {
            title: element.label,
            value: element.id
          }
          brands.push(form)
        });
        return brands
      } catch (error) {
        return []
      }
    },

    /**
     * create color list for select
     */
    colorList() {
      try {
        const colors = []
        this.allColors.data.forEach(element => {
          const form = {
            id:element.id,
            label: element.label,
            name: element.id,
            value: element.value,
            group: element.group
          }
          colors.push(form)
        });

        return colors
      } catch (error) {
        return []
      }
    },



    /**
     * create operator list for select
     */
    operatorList() {
      try {
        const operator = []
        const nullForm = {
          label: 'هیچکدام',
          name: 'none',
        }
        operator.push(nullForm)
        this.operator.data.forEach(element => {
          const form = {
            label: element.phrase,
            name: element.id,
          }
          operator.push(form)
        });
        return operator
      } catch (error) {
        return []
      }
    },

    /**
     * create volume list for select
     */
    volumeList() {
      try {
        const volume = []
        this.volume.data.forEach(element => {
          const form = {
            label: element.label,
            value: element.id
          }
          volume.push(form)
        });
        return volume
      } catch (error) {
        return []
      }
    },

    /**
     * create height list for select
     */
    heightList() {
      try {
        const filterHeight = this.size.data.filter(el => el.name === 'height')
        const height = []
        filterHeight.forEach(element => {
          const form = {
            title: element.unit,
            value: element.id
          }

          height.push(form)
        });
        return height
      } catch (error) {
        return []
      }
    },

    /**
     * create width list for select
     */
    widthList() {
      try {
        const filterHeight = this.size.data.filter(el => el.name === 'width')
        const width = []
        filterHeight.forEach(element => {
          const form = {
            title: element.unit,
            value: element.id
          }

          width.push(form)
        });
        return width
      } catch (error) {
        return []
      }
    },
    /**
     * create length list for select
     */

    lengthList() {
      try {
        const filterHeight = this.size.data.filter(el => el.name === 'length')
        const height = []
        filterHeight.forEach(element => {
          const form = {
            title: element.unit,
            value: element.id
          }

          height.push(form)
        });
        return height
      } catch (error) {
        return []
      }
    },

    /**
     * create weight list for select
     */
    weightList() {
      try {
        const filterHeight = this.size.data.filter(el => el.name === 'weight')
        const height = []
        filterHeight.forEach(element => {
          const form = {
            title: element.unit,
            value: element.id
          }

          height.push(form)
        });
        return height
      } catch (error) {
        return []
      }
    },

    /**
     * create volume list for select
     */
    volumeUnitList() {
      try {
        const filterHeight = this.size.data.filter(el => el.name === 'volume')
        const height = []
        filterHeight.forEach(element => {
          const form = {
            title: element.unit,
            value: element.id
          }

          height.push(form)
        });
        return height
      } catch (error) {
        return []
      }
    },
  },

  watch: {
    /**
     * cookie step
     */
    step(val) {
      this.$cookies.set('createProductStep', val)
    }
  }
}
</script>
