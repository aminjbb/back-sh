<template lang="">
  <div class="text-center c-modal-table-filter">
      <v-btn
          @click="openModal()"
          variant="outlined"
          rounded
          class="px-3 mt-1 mr-4">
          <template v-slot:prepend>
              <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
</template>
فیلتر
</v-btn>

<v-dialog
    v-if="dialog"
    v-model="dialog"
    width="1000">
<v-card>
  <v-row
      justify="center"
      align="center"
      class="pa-5">
    <v-col cols="5">
      <v-btn @click="closeModal()" variant="icon">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-col>

    <v-col cols="7">
      <div class="text-left pl-10">
                        <span class="t14300">
                            فیلتر
                        </span>
      </div>
    </v-col>
  </v-row>

  <div class="mt-3 mb-8 px-5">
    <v-divider />
  </div>

  <div>
    <v-row
        justify="center"
        align="center"
        class="px-10 d--rtl">
      <template v-for="(filter, index) in filterField" :key="index">
        <v-col v-if="filter.type === 'text'" cols="4">
          <div class="t13300 text-right mb-2">{{filter.name}}</div>
          <v-text-field
              variant="outlined"
              :name="filter.value"
              v-model="values[index].value" />
        </v-col>

        <v-col v-else-if="filter.type === 'select'" cols="4">
          <div class="t13300 text-right mb-1">{{filter.name}}</div>

          <v-select
              v-if="filter.value === 'is_active'"
              density="compact"
              variant="outlined"
              single-line
              item-title="label"
              item-value="value"
              :items="activeFilter"
              v-model="activeModel" />


          <v-select
              v-if="filter.value === 'has_image'"
              clearable
              density="compact"
              variant="outlined"
              single-line
              item-title="label"
              item-value="value"
              :items="hasOption"
              v-model="imageModel" />
          <v-select
              v-if="filter.value === 'has_icon'"
              clearable
              density="compact"
              variant="outlined"
              single-line
              item-title="label"
              item-value="value"
              :items="hasOption"
              v-model="iconModel" />
          <v-autocomplete
              v-if="filter.value === 'menu'"
              clearable
              density="compact"
              variant="outlined"
              single-line
              item-title="title"
              item-value="value"
              :items="menuList"
              v-model="menuModel" />
        </v-col>

        <v-col
            cols="4"
            v-else-if=" filter.value === 'created_at'"
            class="mt-3">
          <div class="t13300 text-right mb-1">{{filter.name}}</div>
          <div align="center" class="d-flex pb-5 align-center">
            <date-picker
                range
                clearable
                class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                format="jYYYY-jMM-jDD"
                display-format="jYYYY-jMM-jDD"
                v-model="createdAtModel"
                variant="outlined" />

            <v-icon @click="createdAtModel= [] ;gregorianCreateDate =[]">mdi-close</v-icon>
          </div>
        </v-col>
      </template>
    </v-row>
  </div>

  <div class="mt-3 mb-5 px-5">
    <v-divider />
  </div>

  <v-row
      justify="center"
      align="center"
      class="px-5 py-5">
    <v-col cols="6">
      <v-btn
          @click="removeAllFilters()"
          variant="text"
          height="40"
          rounded
          class="px-5 mt-1 mr-5">
        حذف همه فیلترها
      </v-btn>
    </v-col>

    <v-col cols="6">
      <div class="text-right">
        <v-btn
            @click="setFilter()"
            color="primary500"
            height="40"
            rounded
            class="px-5 mt-1 mr-5">
          مشاهده
        </v-btn>
      </div>
    </v-col>
  </v-row>
</v-card>
</v-dialog>
</div>
</template>

<script>
import {
  PanelFilter
} from '@/assets/js/filter_menu.js'
import {
  AxiosCall
} from "@/assets/js/axios_call";
import Menu from '@/composables/Menu'
import {convertDateToGregorian} from "@/assets/js/functions";
export default {
  setup(){
    const {allMenu, getAllMenu } = new Menu()
    return {allMenu, getAllMenu}
  },
  props: {
    filterField: [],
    path: ''
  },

  data() {
    return {
      dialog: false,
      active: false,
      values: [],
      originalData: [],
      filteredData: [],
      createdAtModel: null,
      activeModel: '',
      imageModel: '',
      iconModel: '',
      menuModel: '',
      hasOption:[ {
        label: 'دارد',
        value: '1',
      },{
        label: 'ندارد',
        value: '0',
      },
      ],
      activeFilter: [{
        label: 'همه',
        value: '',
      },
        {
          label: 'فعال',
          value: '1',
        },
        {
          label: 'غیرفعال',
          value: '0',
        }
      ],
      indexFilter: [
          {
        label: 'همه',
        value: '',
      },
        {
          label: 'فعال',
          value: '1',
        },
        {
          label: 'غیرفعال',
          value: '0',
        }
      ],
    }
  },

  computed: {
    menuList(){
      try {
        let menus = []
        this.allMenu.forEach(menu =>{
          const form = {
            title:menu.label,
            value : menu.id
          }
          menus.push(form)
        })
        return menus
      }
      catch (e) {
        return  []
      }
    },
    label() {
      try {
        const labelObject = this.values.find(element => element.name === 'label');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    name() {
      try {
        const labelObject = this.values.find(element => element.name === 'name');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },

  },

  methods: {
    setFilter() {
      const filter = new PanelFilter()
      console.log(this.createdAtModel)
     if (this.createdAtModel){
       if (this.createdAtModel[0]) {
         const gDate = convertDateToGregorian(this.createdAtModel[0], '-' , false)
         filter.createdAtFrom = gDate
       } else if (this.$route.query.created_at_from) {
         filter.createdAtTo = null
       }
       if (this.createdAtModel[1]) {
         const gDate = convertDateToGregorian(this.createdAtModel[1], '-' , false)
         filter.createdAtTo = gDate
       } else if (this.$route.query.created_at_to) {
         filter.createdAtTo = null
       }
     }

      if (this.label) {
        filter.label = this.label
      } else if (this.$route.query.label) {
        filter.label = null
      }

      if (this.name) {
        filter.name = this.name
      } else if (this.$route.query.name) {
        filter.name = null
      }


      if (this.activeModel === '') {
        filter.active = null
      } else if (this.activeModel !== '') {
        filter.active = this.activeModel
      } else if (this.$route.query.is_active) {
        filter.active = this.$route.query.is_active
      }

      if (this.imageModel === '') {
        filter.image = null
      } else if (this.imageModel !== '') {
        filter.image = this.imageModel
      } else if (this.$route.query.image) {
        filter.image = this.$route.query.image
      }

      if (this.iconModel === '') {
        filter.icon = null
      } else if (this.iconModel !== '') {
        filter.icon = this.iconModel
      } else if (this.$route.query.icon) {
        filter.icon = this.$route.query.icon
      }

      if (this.menuModel === '') {
        filter.menu = null
      } else if (this.menuModel !== '') {
        filter.menu = this.menuModel
      } else if (this.$route.query.menu) {
        filter.menu = this.$route.query.menu
      }

      filter.page = 1;

      if (this.$route.query.per_page) {
        filter.per_page = this.$route.query.per_page;
      }

      this.$router.push('/' + this.path + '/' + filter.query_maker());
      this.dialog = false;
    },

    removeAllFilters() {
      this.$router.push('/' + this.path);
      this.values = [];

      this.filterField.forEach(el => {
        const form = {
          name: el.value,
          value: ''
        }

        this.values.push(form)
        this.dialog = false;
      })
    },

    openModal() {
      this.dialog = true;
    },

    closeModal() {
      this.dialog = false;
    },

    async getProvince() {
      const form = {
        per_page: 10000
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = form
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `system/state/crud/index`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.provinces = data.data.data
      }
    },

    async getCities() {
      this.cities = []
      this.cityModel = null
      const form = {
        per_page: 10000
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = form
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `system/state/crud/get/${this.provinceModel}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.cities = data.data.cities
      }
    },
  },

  mounted() {
    this.filterField.forEach(el => {
      const form = {
        name: el.value,
        value: ''
      }
      this.values.push(form)

    });
    this.getAllMenu()
  }
}
</script>
