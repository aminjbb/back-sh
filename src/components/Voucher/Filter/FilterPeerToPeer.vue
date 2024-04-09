<template>
  <div class="text-center c-modal-table-filter">
    <v-btn
        @click="openModal()"
        variant="outlined"
        rounded
        class="px-3 mt-1 mr-4"
    >
      <template v-slot:prepend>
        <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
      </template>
      فیلتر
    </v-btn>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="1000"
    >
      <v-card>
        <v-row
            justify="center"
            align="center"
            class="pa-5"
        >
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

        <div>
          <v-row
              justify="start"
              align="center"
              class="px-10 d--rtl">
            <template v-for="(filter, index) in filterFieldPeerToPeer" :key="index">
              <v-col v-if="filter.type === 'text'" cols="4">
                <div class="t13300 text-right mb-2">{{filter.name}}</div>
                <v-text-field
                    variant="outlined"
                    :name="filter.value"
                    v-model="values[index].value" />
              </v-col>
              <!-- Auto complete fields -->
              <template v-else-if="filter.type === 'auto-complete'">
                <v-col cols="4">
                  <div class="t13300 text-right mb-1">{{ filter.name }}</div>
                  <v-autocomplete v-if="filter.value === 'user_id'" placeholder="شماره تلفن کاربر را وارد کنید" variant="outlined" prepend-inner-icon-cb="mdi-map-marker" rounded="lg" v-model="user" :items="userList" item-title="name" item-value="value" v-debounce="searchUser">

                  </v-autocomplete>
                </v-col>

              </template>
            </template>
          </v-row>
        </div>

        <div class="d--rtl">
          <v-row
              justify="end"
              align="center"
              class="px-10"
          >
          </v-row>
        </div>

        <div class="mt-3 mb-5 px-5">
          <v-divider />
        </div>

        <v-row
            justify="center"
            align="center"
            class="px-5 pb-2"
        >
          <v-col cols="6">
            <v-btn
                @click="removeAllFilters()"
                variant="text" height="40"
                rounded
                class="px-5 mt-1 mr-5"
            >
              حذف همه فیلترها
            </v-btn>
          </v-col>

          <v-col cols="6">
            <div class="text-right" >
              <v-btn
                  @click="setFilter()"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-5 mt-1 mr-5"
              >
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



import {PeerToPeerVoucherFilter} from "@/assets/js/filter_voucher_peer_to_peer.js";
import {
  AxiosCall
} from "@/assets/js/axios_call";
import Voucher from "@/composables/Voucher.js";
export default {

  setup() {
    const {
      header,
      loading,
      filterFieldPeerToPeer

    } = Voucher()
    return {
      header,
      loading,
      filterFieldPeerToPeer

    }
  },
  props: {
    filterFieldPeerToPeer: [],
    path: '',
    model:''
  },

  data() {
    return {
      dialog: false,
      active: false,
      values: [],
      filteredData: [],
      user: null,
      userSearchList: [],
    }
  },

  computed: {
    userList() {
      try {
        let users = []
        this.userSearchList.forEach(user => {
          const form = {
            name: user ?.first_name + ' ' + user ?.last_name + '(' + user.phone_number + ')',
            value: user
          }
          users.push(form)
        })
        return users
      } catch (e) {
        return e
      }
    },


    code() {
      try {
        const idObject = this.values.find(element => element.name === 'code');
        return idObject.value
      } catch (error) {
        return ''
      }
    },


  },

  methods: {
    async searchUser(search) {
      this.skuSearchList = []
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `user/crud/index?phone_number=${search}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.userSearchList = data.data.data
      }
    },

    setFilter() {
      const Filter = new PeerToPeerVoucherFilter()
      if (this.user ?.id) {
        Filter.user_id = this.user ?.id
      } else {
        Filter.user_id = null
      }
      if (this.code) {
        Filter.code = this.code
      } else if (this.$route.query.code) {
        Filter.code = null
      }

      Filter.page = 1;
      if (this.$route.query.per_page)   Filter.per_page = this.$route.query.per_page;

      this.$router.push('/' + this.path + '/' + Filter.query_maker());
      this.dialog = false;
    },

    removeAllFilters() {
      this.$router.push('/' + this.path);
      this.values = [];

      this.filterFieldPeerToPeer.forEach(el => {
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
    this.filterFieldPeerToPeer.forEach(el => {
      const form = {
        name: el.value,
        value: null
      }
      this.values.push(form)
    })
  }
}
</script>