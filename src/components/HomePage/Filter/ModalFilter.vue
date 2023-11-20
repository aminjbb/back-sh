<template >
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
              v-if="filter.value === 'device_type'"
              density="compact"
              variant="outlined"
              single-line
              item-title="label"
              item-value="value"
              :items="deviceTypes"
              v-model="deviceType" />


          <v-select
              v-if="filter.value === 'active'"
              clearable
              density="compact"
              variant="outlined"
              single-line
              item-title="label"
              item-value="value"
              :items="activeFilters"
              v-model="activeModel" />

        </v-col>
        <template v-else-if="filter.type === 'date'">
          <v-col cols="4" class="mt-3">
            <div class="t13300 text-right mb-1">{{ filter.name }}</div>

            <div align="center" class="d-flex pb-5 align-center">
              <v-icon @click="DateFilter(filter.value)">mdi-close</v-icon>

              <date-picker
                  v-if="filter.value === 'start_date'"
                  range
                  clearable
                  class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                  format="jYYYY-jMM-jDD HH:mm"
                  display-format="jYYYY-jMM-jDD HH:mm"
                  v-model="startDate"
                  variant="outlined"
                  :placeholder="filter.name"
              />

              <date-picker
                  v-if="filter.value === 'end_date'"
                  range
                  clearable
                  class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                  format="jYYYY-jMM-jDD"
                  display-format="jYYYY-jMM-jDD"
                  v-model="endDate"
                  variant="outlined"
                  :placeholder="filter.name"
              />
            </div>
          </v-col>
        </template>

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
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {
  HomePageFilter
} from '@/assets/js/homePage_filter.js'
import {
  AxiosCall
} from "@/assets/js/axios_call";
import Menu from '@/composables/Menu'
export default {
  components: { datePicker: VuePersianDatetimePicker,},
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
      activeFilters: [
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
      deviceTypes: [
        {
          label: 'دسکتاپ',
          value: 'desktop',
        },
        {
          label: 'تبلت',
          value: 'tablet',
        },
        {
          label: 'موبایل',
          value: 'mobile',
        }
      ],
      deviceType:null,
      activeModel:'',
      startDate:[],
      endDate:[],
    }
  },

  computed: {
    admin() {
      try {
        const labelObject = this.values.find(element => element.name === 'admin');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },
    priority() {
      try {
        const labelObject = this.values.find(element => element.name === 'priority');
        return labelObject.value
      } catch (error) {
        return ''
      }
    },

  },

  methods: {
    setFilter() {
      const filter = new HomePageFilter()

      if (this.admin) {
        filter.creator = this.admin
      } else if (this.$route.query.creator) {
        filter.admin = null
      }

      if (this.priority) {
        filter.priority = this.priority
      } else if (this.$route.query.priority) {
        filter.priority = null
      }

      if (this.deviceType) {
        filter.device = this.deviceType
      } else if (this.$route.query.device) {
        filter.device = null
      }

      if (this.startDate[0]) {
        filter.start_time_form = this.startDate[0]
      } else if (this.$route.query.start_time_form) {
        filter.start_time_form = null
      }
      if (this.startDate[1]) {
        filter.start_time_to = this.startDate[1]
      } else if (this.$route.query.start_time_to) {
        filter.start_time_to = null
      }
      if (this.endDate[0]) {
        filter.end_time_form = this.endDate[0]
      } else if (this.$route.query.end_time_form) {
        filter.end_time_form = null
      }
      if (this.endDate[1]) {
        filter.end_time_to = this.endDate[1]
      } else if (this.$route.query.end_time_to) {
        filter.end_time_to = null
      }

      if (this.activeModel === '') {
        filter.active = null
      } else if (this.activeModel !== '') {
        filter.active = this.activeModel
      } else if (this.$route.query.is_active) {
        filter.active = this.$route.query.is_active
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

  },

  mounted() {
    this.filterField.forEach(el => {
      const form = {
        name: el.value,
        value: ''
      }
      this.values.push(form)

    });
  }
}
</script>
