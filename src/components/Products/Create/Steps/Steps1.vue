<template>
    <div class="px-2 py-2 h-100">
        <v-form
            ref="createProductStep1"
            class="create-product__info-form scroller"
        >
            <v-row
                justify="center"
                align="center"
            >
                <v-col 
                    cols="6"
                    class="brands-list"
                >
                    <div class="text-right my-2">
                        <span class="t12500">

                            {{ labels.product }}
                        </span>
                    </div>

                    <v-autocomplete
                        :items="productList"
                        v-model="createFromModel.productSelected"
                        :disabled="productDisabled"
                        return-object
                        clearable
                        variant="outlined"
                        :loading="loading"
                        no-data-text="محصولی برای نمایش وجود ندارد"
                        v-debounce:1s.unlock="searchProduct"
                        @update:modelValue="searchSkuGroups()"

                    />
                </v-col>

                <v-col
                    cols="6"
                    class="colors-list"
                >
                  <div class="text-right my-2">
                      <span class="t12500">
                          {{ labels.skuGroup }}
                      </span>
                  </div>
                  <v-select
                      :items="skuGroupList"
                      v-model='skuGroupSelected'
                      return-object
                      :disabled="skuGroupDisabled"
                      clearable
                      no-data-text="گروه بندی برای نمایش وجود ندارد"
                      variant="outlined"
                      :loading="skuGroupLoading"
                      @update:modelValue="setSkuDetailGroup()"
                  />
                </v-col>
            </v-row>

            <v-row
                justify="center"
                align="center"
            >
              <v-col
                  cols="4"
                  class="brands-list"
              >
                <v-row v-if="skuGroupDetailBrand">
                    <v-col cols="12">
                        <v-chip class="d-block mb-3 create-product__chip">
                            <span class="flex-grow-1 text-center">
                                  {{ skuGroupDetailBrand.label }}
                            </span>
                        </v-chip>
                    </v-col>
                </v-row>

                <div class="text-right my-2">
                    <span class="t12500">
                        {{ labels.brand }}
                    </span>
                </div>

                <v-autocomplete
                    :items="brandList"
                    v-model='createFromModel.brands'
                    return-object
                    clearable
                    :disabled="skuGroupDetailBrand"
                    variant="outlined"
                    @update:modelValue="saveCreateFromModel(index);addBadge(labels.brand,'brand')"
                />
              </v-col>

              <v-col cols="8" class="colors-list">
                <v-row v-if="skuGroupDetailColors" class="mb-5">
                    <v-col
                        v-for="(skuColor , index) in skuGroupDetailColors"
                        :key="`skuColor${skuColor.id}`"
                        cols="1"
                    >
                      <v-icon icon="mdi-square" size="large" :style="{ color: skuColor.value }"></v-icon>
                      <v-tooltip
                          activator="parent"
                          location="top"
                          class="d--rtl"
                      >
                        {{ skuColor.label }}
                      </v-tooltip>
                    </v-col>
                </v-row>
                <div class="text-right my-2">
                    <span class="t12500">
                        {{ labels.color }}
                    </span>
                </div>
                <v-autocomplete
                    v-model='createFromModel.colors'
                    :items="groupedColors"
                    item-title="label"
                    chips
                    closable-chips
                    color="blue-grey-lighten-2"
                    multiple
                    variant="outlined"
                    return-object
                    class="selected-attribute__values__input"

                    @update:modelValue="saveCreateFromModel(index);addBadge(labels.color,'color')"
                >
                  <template v-slot:chip="{ props, item }">
                      <v-chip v-bind="props">
                        <v-icon
                              icon="mdi-square"
                              size="x-large"
                              :style="{color: item.value.value}"
                          />
                      </v-chip>
                  </template>

                  <template v-slot:item="{ props, item }">
                      <template v-if="item.value.header">
                          <v-list-item-title
                              v-html="item.value.header"
                              class="font-weight-bold d-flex align-center mb-4 justify-end pr-3"
                          />
                      </template>

                      <template v-else>
                        <v-list-item-content
                            v-bind="props"
                            class="d-flex align-center mb-3 justify-end pr-3"
                            style="cursor:pointer"
                        >
                            <v-list-item-title v-html="item.value.label"/>

                            <v-icon
                                icon="mdi-square"
                                size="x-large"
                                :style="{ color: item.value.value }"
                            />
                        </v-list-item-content>
                      </template>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>

            <v-row
                v-for="(skuAttribute , index) in skuGroupDetailAttributeList"
                :key="`attributeSkuGroup${skuAttribute.id}`"
            >
                <v-col cols="2">
                      <v-chip class="d-block mb-3 create-product__chip">
                          <span class="flex-grow-1 text-center">
                              {{ skuAttribute.label }} :
                          </span>
                      </v-chip>
                </v-col>
                
                <v-col cols="2" v-for="(attributeValue , index) in skuAttribute.values">
                    <v-chip class="d-block mb-3 create-product__chip">
                        <span class="flex-grow-1 text-center">
                            {{ attributeValue.value }}
                        </span>
                    </v-chip>
                </v-col>
            </v-row>
            <v-row
                v-for="(atts, i) in attrNumbers"
                :key="i"
                align="center"
                class="py-2 attrs-list"
            >

                <v-col cols="4">
                    <div class="text-right my-2">
                        <span class="t12500">
                            {{ labels.attributes }}
                        </span>
                    </div>
                    
                    <v-autocomplete
                        :items="attributeList"
                        v-model='createFromModel.attributes[i]'
                        return-object
                        item-value="title"
                        item-title="title"
                        variant="outlined"
                        @update:modelValue="(event) => {addAttrBadge(`${createFromModel.attributes[i].title}`, `*${createFromModel.attributes[i].id}*attribute`, i,'attribute');getAttributeValues(event, i , true)}"
                    />
                </v-col>
                <v-col cols="1"  v-if="createFromModel.attributes[i]">
                  <AddAttributeValueModal
                    :values="createFromModel.attributes[i].values" skuType="updateFromSku"
                    :attributeId="createFromModel.attributes[i].id"
                    :getAllAttributes="getAllAttributes"
                    :getAttributeValues="getAttributeValues"
                    :index="i"
                    :attribute="createFromModel.attributes[i]"
                    class="mt-5"
                  />
                </v-col>
                
                <v-col
                    cols="6"
                    class="d-flex justify-content-between align-items-center w-100 selected-attribute__values"
                >
                    <div class="flex-grow-1 pl-5">
                        <div class="text-right my-2">
                            <span class="t12500">
                                {{ labels.attributes_value }}
                            </span>
                        </div>

                        <template 
                            v-for="(item, index) in items"
                            :key="index"
                        >
                            <v-autocomplete
                                v-if="index == i"
                                v-model='createFromModel.attributesValue[index]'
                                :items="item.values"
                                item-text="title"
                                chips
                                closable-chips
                                color="blue-grey-lighten-2"
                                multiple
                                variant="outlined"
                                return-object
                                class="selected-attribute__values__input"
                                @update:modelValue="checkActiveAddButton(index , items)"
                            >
                                <template v-slot:chip="{ props, item }">
                                    <v-chip
                                        v-bind="props"
                                        :text="item.raw.title"
                                    />
                                </template>

                                <template v-slot:item="{ props, item }">
                                      <v-list-item
                                          v-bind="props"
                                          :title="item?.raw?.title"
                                      />
                                </template>
                            </v-autocomplete>
                        </template>
                    </div>

                    <div>
                        <div class="text-right my-2">
                            <span class="t12500">
                                {{ labels.variety }}
                            </span>
                        </div>

                        <v-switch
                            v-model="createFromModel.variety[i]"
                            inset
                            :value='true'
                            class="mt-5"
                            @update:modelValue="saveCreateFromModel()"
                        />
                    </div>
                </v-col>
              <v-col cols="1" v-if="attrNumbers.length > 1"  @click="deleteAttributeRow(i)">
                <v-btn variant="icon" class="mt-8">
                  <v-icon color="error"> mdi-close </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-btn

                variant="text"
                icon="mdi-plus"
                @click="addNewRow"
            />

            <v-row v-if="skuGroupVolumes">
            <v-col v-for="(skuGroupVolume, index) in skuGroupVolumes" :key="`skuGroupVolume${index}`" cols="4">
              <v-chip class="d-block mb-3 create-product__chip">
                <span class="flex-grow-1 text-center">{{ skuGroupVolume.value }} {{ skuGroupVolume.label }} </span>
              </v-chip>
            </v-col>
          </v-row>
            <v-row class="align-end units-list">
                <v-col cols="4">
                    <div class="text-right my-2">
                        <span class="t12500">
                            {{ labels.unit }}
                        </span>
                    </div>
                    
                    <v-select
                        v-model="unitTypeModel"
                        class="t1330"
                        variant="outlined"
                        :items="volumeList"
                        return-object
                        item-title="label"
                        @update:modelValue="(label) => { addBadge('تعداد', 'volume'); getNumberOfProducts(label); }"

                    />
                </v-col>

              <v-col v-if="showNumberOfProductsSection" cols="8">
                  <v-row>
                      <v-col cols="6">
                        <v-text-field
                            v-model="unitNumbersModel"
                            clearable
                            variant="outlined"
                            type="number"
                        />
                      </v-col>

                      <v-col cols="6">
                          <v-btn
                              :loading="loading"
                              block
                              rounded
                              color="indigo-darken-4"
                              size="large"
                              variant="elevated"
                              @click="addUnitNumber()"
                          >
                              <v-icon class="ml-2" icon="mdi-plus"/>
                              افزودن
                          </v-btn>
                      </v-col>
                  </v-row>
              </v-col>
            </v-row>


            
            <v-row class="numbers-list">
                <v-col 
                    v-for="(unitNumber, index) in unitNumbersList"
                    :key="index"
                    cols="4"
                >
                    <v-chip
                        @click="removeUnitNumbres(unitNumber)"
                        class="d-block mb-3 create-product__chip"
                    >
                        <span class="flex-grow-1 text-center">
                            {{ unitNumber }}
                        </span>

                        <v-icon
                          size="xsmall"
                          icon="mdi-close"
                        />
                    </v-chip>
                </v-col>
            </v-row>

            <v-row class="operator">
                <v-col cols="12">

                    <v-chip
                        v-if="skuGroupOperator"
                        class="d-block mb-3 create-product__chip"
                    >
                        <span class="flex-grow-1 text-center">
                            {{ skuGroupOperator }}
                        </span>
                    </v-chip>
                    <div class="text-right my-2">
                        <span class="t12500">
                            {{ labels.operator }}
                        </span>
                    </div>
                    <v-autocomplete
                        :items="operatorList"
                        v-model='createFromModel.operators'
                        :disabled="skuGroupOperatorDisabled"
                        item-title="label"
                        return-object
                        variant="outlined"
                        @update:modelValue="saveCreateFromModel(index)"
                    >
                        <template v-slot:item="{ props, item }">
                            <v-list-item
                                v-bind="props"
                                :title="item?.raw?.label"
                                @click=selectOperator(item.props.value)
                            />
                        </template>
                    </v-autocomplete>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                        v-model="createFromModel.newOperator"
                        clearable

                        multiple
                        variant="outlined"
                        :disabled="activeNewOperator"
                        @update:modelValue="saveCreateFromModel(index)"
                    />
                </v-col>

                <v-col v-if="!skuGroupOperatorDisabled"
                       cols="12" >
                    <template
                        v-for="(badge, index) in badgeList"
                        :key="index"
                    >
                        <v-chip
                            color="indigo-lighten-1"
                            :text="badge.label"
                            variant="elevated"
                            size="large"
                            class="ml-3"
                            @click=addOtamaticOperator(badge.name)
                        />
                    </template>
                </v-col >
            </v-row>
        </v-form>
    </div>
</template>

<script>
import {ref} from 'vue'
import Product from '@/composables/Product'
import Sku from '@/composables/Sku'
import Attributes from '@/composables/Attributes'
import AddAttributeValueModal from '@/components/Attributes/Add/AddAttributeValueModal.vue'
export default {
  components:{
    AddAttributeValueModal
  },
  setup() {
    const {product, loading, searchProduct ,oneProduct, getOneProduct} = Product()
    const {getProductAttributes, attributes} = Attributes()
    const {skuGroups, skuGroupLoading, getSkuGroups, getSkuGroupDetail, skuGroupDetail , skuGroup, getSkuGroup} = Sku()
    return {
      product, loading, searchProduct,oneProduct, getOneProduct,
      skuGroups, skuGroupLoading, getSkuGroups, getSkuGroupDetail, skuGroupDetail,skuGroup, getSkuGroup,
      getProductAttributes, attributes
    }
  },

  data: () => ({
    labels: {
        operator: 'اپراتور',
        brand: 'برند',
        color: 'رنگ',
        attributes: 'ویژگی',
        number: 'تعداد',
        variety: 'تنوع',
        attributes_value: 'مقادیر ویژگی',
        unit: 'تعداد',
        height: 'ارتقاع',
        width: 'عرض',
        length: 'طول',
        weight: 'وزن',
        volume: 'حجم',
        product: 'محصول',
        skuGroup: 'گروه بندی'
    },

    createFromModel: {
        productSelected:null,
        brands: null,
        colors: [],
        numbers: null,
        attributes: [],
        attributesValue: [],
        variety: [false],
        unit: [],
        height: {},
        width: {},
        length: {},
        weight: {},
        volume: {},
        operators: {
          label: 'هیچکدام',
          name: 'none',
        },
        newOperator: '',
    },

    rule: [v => !!v || 'این فیلد الزامی است'],

    items: [
      {
        title: '',
        attr_id: '',
        values: '',
      }
    ],
    attrNumbers: ["attr1"],
    number: "1",
    showNumberOfProductsSection: false,
    activeAddButton: false,
    unitName: '',
    unitNumbersModel: '',
    unitTypeModel: '',
    unitNumbersList: [],
    units: [
      {
        label: 'تایی'
      },
      {
        label: 'دونه‌ای',
      }
    ],
    badgeList: [
      {
        name: 'product_name',
        label: 'نام محصول',
        id: 'id11',
      }
    ],
    measurementValues: ["CM", "M", "MM"],
    volumeValues: ["ML", "L",],
    massValues: ["GR", "KG"],
    productList: [],
    productSelected: null,
    skuGroupSelected: {
      title :'هیچ کدام',
      value : 'none'
    }
  }),

  computed: {
    /**
     * create attribute list for select
     */
    attributeList() {
      try {
        const attributes = []
        this.attributes.data.forEach(element => {
          const values = []
          element.values.forEach(value => {
            const form = {
              title: value.value,
              id: value.id
            }
            values.push(form)
          });
          const form = {
            title: element.label,
            id: element.id,
            values: values
          }
          attributes.push(form)
        });
        return attributes
      } catch (error) {
        return []
      }
    },
    productDisabled(){
      try {
        if (this.state === 'createProduct' || this.state === 'createProductSkuGroup') return true
        else return  false
      }catch (e) {
        return  false
      }
    },

    skuGroupDisabled(){
      try {
        if (this.state === 'createProductSkuGroup') return true
        else return  false
      }catch (e) {
        return  false
      }
    },
    
    groupedColors() {
        const groupedColors = [];
        const uniqueValues = new Set();

        const srcs = [{}];
        const groups = Array.from(new Set(this.colorList.map(color => color.group)));

        for (const group of groups) {
            groupedColors.push({
                header: group
            });

            const colorsInGroup = this.colorList.filter(color => color.group === group);

            for (const color of colorsInGroup) {
              groupedColors.push({
                id:color.id,
                name: color.name,
                group: color.group,
                label: color.label,
                value: color.value
              });
              uniqueValues.add(color.value);
            }
        }
        return groupedColors;
    },

    productList() {
      try {
        const products = []
        this.product.data.forEach(element => {
          const form = {
            title: element.label,
            value: element.id
          }

          products.push(form)
        });
        return products
      } catch (error) {
        return []
      }
    },

    skuGroupList() {
      try {
        const skuGroups = [{
          title :'هیچ کدام',
          value : 'none'
        }]
        this.skuGroups.data.forEach(element => {
          let label = null
          if (element.label) label = element.label
          else  label =element.name
          const form = {
            title:label,
            value: element.id
          }

          skuGroups.push(form)
        });
        return skuGroups
      } catch (error) {
        return []
      }
    },

    skuGroupDetailAttributeList() {
      try {
        return this.skuGroupDetail.attributes
      } catch (e) {
        return []
      }
    },

    skuGroupDetailBrand() {
      try {
        return this.skuGroupDetail.brand
      } catch (e) {
        return []
      }
    },

    skuGroupDetailColors() {
      try {
        return this.skuGroupDetail.colors
      } catch (e) {
        return []
      }
    },

    skuGroupOperator() {
      try {
        return this.skuGroupDetail.sku_group.operator
      } catch (e) {
        return ''
      }
    },
    skuGroupOperatorDisabled() {
      try {
        if (this.skuGroupDetail.sku_group) return true
        else return false
      } catch (e) {
        return ''
      }
    },
    skuGroupVolumes() {
      try {
        return this.skuGroupDetail.volumes
      } catch (e) {
        return ''
      }
    },

    activeNewOperator(){
      if (this.createFromModel.operators.name !== 'none') {
        return  true;
      } else {
        return false;
      }
    }
  },

  methods: {
    setSkuDetailGroup(){
      this.deleteForms()
      if (this.skuGroupSelected !== null) {

        this.getSkuGroupDetail(this.skuGroupSelected.value)
      }
      else {
        this.skuGroupDetail = ''
      }
    },
    searchSkuGroups(){
      this.getProductAttributes(this.createFromModel.productSelected.value)
      this.skuGroupSelected = {
        title :'هیچ کدام',
        value : 'none'
      }
      if (this.createFromModel.productSelected !== null){
        localStorage.setItem('skuProductId' , this.createFromModel.productSelected.value)
        this.getSkuGroups(this.createFromModel.productSelected.value)
      }
      else {
        localStorage.removeItem('skuProductId')
        this.skuGroups = []
        this.skuGroupDetail = ''
      }
      this.saveCreateFromModel()
    },
    deleteForms() {
      const nullForm = {
        brands: null,
        colors: [],
        numbers: null,
        attributes: [],
        attributesValue: [],
        variety: [],
        unit: [],
        height: {},
        width: {},
        length: {},
        weight: {},
        volume: {},
        operators: {
          label: 'هیچکدام',
          name: 'none',
        },
        newOperator: '',
      }
      const badgeList = [
        {
          name: 'product name',
          label: 'نام محصول',
          id: 'id11',
        }
      ]
      const maketItem = {
        title: '',
        attr_id: '',
        values: '',
      }
      this.createFromModel = nullForm
      this.badgeList = badgeList
      this.unitNumbersList = []
      this.number = 1
      this.attrNumbers = ["attr1"]
      this.items = []
      this.items.push(maketItem)
      this.skuGroupDetail = []
      this.$cookies.remove('createFromModelStep1')
      this.$cookies.remove('attributesNumber')

    },
    /**
     * Add attributes to 'items' list
     * @param {*} event
     * @param {string | number } index
     */
    getAttributeValues(event, index, isnul) {
      // console.log(event , index)
      // TODO: Add find value request
      if (isnul) this.createFromModel.attributesValue[index] = null;

      // this.activeAddButton = false;
      const newItem = {
        title: event.title,
        attr_id: event.id,
        values: event.values,
      }



      this.items.splice(index, 1);
      this.items.splice(index, 0, newItem);
      this.saveCreateFromModel()
    },

    /**
     * Check add new attr button is active
     * @param {string | number } index
     */
    checkActiveAddButton(index) {
      if (this.items && this.items[index] && this.items[index].title !== '' && this.createFromModel.attributesValue[index] !== null && this.createFromModel.attributesValue[index].length) {
        this.activeAddButton = true;
      } else {
        this.activeAddButton = false;

      }
      this.saveCreateFromModel()
    },

    /**
     * Add new row
     */
    addNewRow() {
      this.number++;
      this.attrNumbers.push(`attr${this.number}`);

      const maketItem = {
        title: '',
        attr_id: '',
        values: '',
      }

      this.items.push(maketItem);
      this.createFromModel.variety.push(false)
      this.activeAddButton = false;
    },
    /**
     * delete attribute row
     */
    deleteAttributeRow( index , items) {
      this.number--;

      this.attrNumbers.splice(index , 1)
      this.createFromModel.attributes.splice(index , 1)
      this.createFromModel.attributesValue.splice(index , 1)
      console.log(this.createFromModel.attributesValue ,  this.createFromModel.attributes)
      // this.attrNumbers.push(`attr${this.number}`);

      // const maketItem = {
      //   title: '',
      //   attr_id: '',
      //   values: '',
      // }
      //
      // this.items.push(maketItem);
      // this.createFromModel.variety.push(false)
      // this.activeAddButton = false;
    },

    /**
     * Get number of products by unit
     * @param {*} label
     */
    getNumberOfProducts(label) {
      this.showNumberOfProductsSection = true;
      this.unitName = label.label;
      this.saveCreateFromModel()
    },

    /**
     * Add unit number
     */
    addUnitNumber() {
      const item = this.unitNumbersModel + ' ' + this.unitName;
      this.unitNumbersList.push(item);
      if (!this.createFromModel.unit.includes(this.unitTypeModel)) {

        const unitModelNewItem = {
          label: this.unitTypeModel,
          numbers: this.unitNumbersModel,
        }

        this.createFromModel.unit.push(unitModelNewItem);
      }
      this.unitNumbersModel = '';
      this.saveCreateFromModel();

    },

    /**
     * remove from unitNumbersList
     * @param {*} value
     */
    removeUnitNumbres(value) {
      if (this.unitNumbersList.includes(value)) {
        let indexToDelete = this.unitNumbersList.indexOf(value);
        this.unitNumbersList.splice(indexToDelete, 1);
        this.createFromModel.unit.splice(indexToDelete, 1)
        this.saveCreateFromModel();
      }
    },

    /**
     * Add bagde to 'badgeList'
     * @param {*} label
     * @param {*} name
     * @param {*} id
     */
    addBadge(label, name, id) {
      if (!this.badgeList.some(obj => obj.name === name)) {
        const newItem = {
          name: name,
          label: label,
          id: Math.random(),
        }
        this.badgeList.push(newItem);
      } else {
        this.createFromModel.newOperator = '';
      }

      if (name === 'color') {
        if (this.createFromModel.colors.length == 0) {
          const indexToRemove = this.badgeList.findIndex(item => item.name === 'color');

          if (indexToRemove !== -1) {
            this.badgeList.splice(indexToRemove, 1);
          }
        }
      }
    },

    /**
     * Add Attr bagde to 'badgeList'
     * @param {*} id
     * @param {*} name
     * @param {*} label
     * @param {*} parrentName
     */
    addAttrBadge(label, name, id, parrentName) {
      const existingAttrBadge = this.badgeList.find(obj => obj.name.includes(parrentName));

      if (existingAttrBadge) {
        if (existingAttrBadge.id === id) {
          existingAttrBadge.label = label;
          this.createFromModel.newOperator = '';
        } else {
          const newItem = {
            name: name,
            label: label,
            id: id,
          };
          this.badgeList.push(newItem);
        }
      } else {
        const newItem = {
          name: name,
          label: label,
          id: id,
        };
        this.badgeList.push(newItem);
      }
    },

    /**
     * Generate new operator
     * @param {*} text
     */
    addOtamaticOperator(text) {
      if (this.createFromModel.newOperator === null) this.createFromModel.newOperator= ''
      this.createFromModel.newOperator = this.createFromModel.newOperator + ' ' + `{{${text}}}`;
      this.saveCreateFromModel()
    },

    /**
     * add createFromModel to cookie
     */
    saveCreateFromModel() {

      const attributesNumber = JSON.stringify(this.attrNumbers)
      const createFromModelJson = JSON.stringify(this.createFromModel);
      localStorage.setItem('createFromModelStep1', createFromModelJson);
      this.$cookies.set('attributesNumber', attributesNumber);
    },
    /**
     * Set form data after get data from cookie
     */
    setFormModel() {
      setTimeout(() => {
        if ( localStorage.getItem('createFromModelStep1')) {
          let jsonAttributesNumber
          if (this.$cookies.get('attributesNumber')) {
            jsonAttributesNumber = this.$cookies.get('attributesNumber')
            this.attrNumbers = JSON.parse(jsonAttributesNumber)
          }
          const jsonForm = JSON.parse(localStorage.getItem('createFromModelStep1'))
          this.createFromModel = jsonForm
          this.searchSkuGroups()
          // setTimeout(()=>{
          //   jsonForm.attributes.forEach((element, i) => {
          //     const attrobj = this.attributeList.find(el => el.id == element.id)
          //     console.log(element)
          //     this.attrNumbers.forEach((element, i) => {
          //       this.getAttributeValues(attrobj, i);
          //     });
          //   });
          //   this.checkActiveAddButton()
          // } , 5000)


          jsonForm.unit.forEach(element => {
            const item = element.numbers + ' ' + element.label.label;
            this.unitNumbersList.push(item);
          });
          // const item = this.unitNumbersModel + ' ' + this.unitName;
          // this.unitNumbersList.push(item);
          this.setBadge()

        }

      }, 2000);
    },

    setSkuGroupDetail(){
      if (localStorage.getItem('skuGroupDetail')){
        const skuGroupDetailObject = localStorage.getItem('skuGroupDetail')
        this.skuGroupDetail =  JSON.parse([skuGroupDetailObject])

      }
    },
    /**
     * Add badge after get data form cookie
     */
    setBadge() {
      if (this.createFromModel.brands) this.addBadge(this.labels.brand, 'brand')
      if (this.createFromModel.colors.length) this.addBadge(this.labels.color, 'color')
      if (this.createFromModel.unit.length) this.addBadge('تعداد', 'volume')

    }
  },

  mounted() {
    this.setFormModel()
    this.setSkuGroupDetail()
    this.searchProduct('')


  },

  props: {
    // array of brand
    brandList: [],

    // array of color
    colorList: [],


    // array of operator
    operatorList: [],
    // array of volume
    volumeList: [],

  // get state create sku
    state: {
      type :String,
      default :''
    },

    getAllAttributes:{
      type:Function,
    }
  },

  watch: {

    attributes(val){
      if (localStorage.getItem('createFromModelStep1')){
        const jsonForm = JSON.parse(localStorage.getItem('createFromModelStep1'))
        this.createFromModel = jsonForm
        console.log(jsonForm.attributes ,'asdad')
        jsonForm.attributes.forEach((element, i) => {
          // const attrobj = this.attributeList.find(el => el.id == element.id)
          // this.attrNumbers.forEach((element, i) => {
          //
          // });
          this.getAttributeValues(element, i);
          this.addAttrBadge(`${element.title}`, `*${element.id}*attribute`, i,'attribute')
        });
        this.checkActiveAddButton(this.attrNumbers.length-1)
      }

    },
    /**
     * after get product set sku groups
     * @param {*} skuGroup
     */
    skuGroup(skuGroup){
      const skuGroupSelected = {
        title  : skuGroup.label,
        value  : skuGroup.id
      }
      this.skuGroupSelected = skuGroupSelected
      this.setSkuDetailGroup()
    },
    /**
     * after get product set sku groups
     * @param {*} product
     */
    oneProduct(product){
      const productSelected = {
        title  : product.label,
        value  : product.id
      }
      this.productSelected = productSelected
      this.searchSkuGroups()
    },



    /**
     * set skuGroup detail in cookie
     * @param {*} Detail
     */
    skuGroupDetail(Detail) {
      if (Detail.brand){
        localStorage.setItem('skuGroupDetail',  JSON.stringify(Detail))
      }


    }
  },

  beforeMount() {
    if (this.$route.name === "createProduct"){
      this.getOneProduct(this.$route.params.productId)
    }
    if ( this.$route.name === "createProductSkuGroup"){
      this.getOneProduct(this.$route.params.productId)
      this.getSkuGroup(this.$route.params.skuGroupId)
    }
  },
}
</script>