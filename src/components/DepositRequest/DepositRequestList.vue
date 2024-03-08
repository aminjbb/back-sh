<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5">
        <v-col cols="6" />

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

            <ModalTableFilter path="shipment-requests/index" :filterField="filterField" />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          :getShipmentRequestsList="getShipmentRequestsList"
          class="flex-grow-1"
          :header="header"
          :items="ShipmentRequestsList.data"
          :page="page"
          :perPage="dataTableLength"
          activePath="page/crud/update/activation/"
          :loading="loading"
          updateUrl="page/csv/mass-update"

          model="page" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">
            <!--                        <ModalExcelDownload getEndPoint="cargo/csv/requested/cargo/export" />-->
          </v-col>

          <v-col cols="6" class="d-flex justify-center">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="4"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left" />
            </div>
          </v-col>

          <v-col cols="3" class="d-flex justify-end">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center">
                            <span class="ml-5">
                                تعداد سطر در هر صفحه
                            </span>
              <span class="mt-2" id="row-selector">
                                <v-select
                                    v-model="dataTableLength"
                                    class="t1330"
                                    variant="outlined"
                                    :items="[25,50,100]" />
                            </span>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Table from '@/components/DepositRequest/Table/Table.vue'
import ShipmentRequests from "@/composables/DepositRequest";
import ModalTableFilter from '@/components/ShipmentRequests/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast} from "@/assets/js/functions";
export default {
  setup(props) {
    const {
      pageLength,
      getShipmentRequestsList,
      ShipmentRequestsList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    } = ShipmentRequests();
    return {
      pageLength,
      getShipmentRequestsList,
      ShipmentRequestsList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    };
  },
  data() {
    return {
      "mockData" : [
        {
          "id": 1,
          "user_id": 1,
          "amount": "1000",
          "card_number": "5285698714523691",
          "created_at": "2024-02-05T09:03:31.000000Z",
          "updated_at": "2024-02-05T09:03:31.000000Z",
          "admin_id": 1,
          "reason": "problem",
          "status": "pending",
          "user": {
            "id": 1,
            "first_name": "شاواز",
            "last_name": "شاوازیان",
            "national_code": "0000000000",
            "phone_number": "09121499276",
            "email": "shavaz@shavaz.com",
            "role_id": 4,
            "birth_date": "1990-02-02",
            "is_ban": 0,
            "avatar": "https://api.shvz.ir/storage/shavaz/user/user-logo.jpg",
            "created_at": "2023-12-26T17:38:12.000000Z",
            "updated_at": "2024-02-28T16:05:11.000000Z",
            "basket_id": 31,
            "created_at_fa": "1402/10/05",
            "updated_at_fa": "1402/12/09",
            "birth_date_fa": "1368/11/13",
            "wallet": {
              "id": 1,
              "name": "wallet",
              "label": "کیف پول",
              "currency": "ریال",
              "user_id": 1,
              "value": "963776500",
              "is_active": 1,
              "deleted_at": null,
              "created_at": "2023-10-24T13:56:48.000000Z",
              "updated_at": "2024-02-18T08:15:35.000000Z",
              "inaccessible_value": "0"
            }
          },
          "admin": {
            "id": 1,
            "first_name": "حسین",
            "last_name": "تهرانی",
            "role_id": 1,
            "phone_number": "09121499276",
            "email": "tehrani@gmail.com",
            "birth_date": "2066-12-14",
            "is_ban": 0,
            "avatar": "https://api.shvz.ir/storage/shavaz/avatar/image/2023-11-01/EWXKHiklUMyEHamJB5nCTj8Q4BAn0QGrXwFf9Zya.png",
            "deleted_at": null,
            "created_at": "2023-10-23T13:56:44.000000Z",
            "updated_at": "2024-02-28T09:50:35.000000Z",
            "last_logged_in": "2024-02-28 13:20:35",
            "type": "admin",
            "last_logged_in_fa": "1402/12/09 ساعت 13:20:35"
          }
        },




      ],
    }


  },

  components: {
    Table,
    ModalGroupAdd,
    ModalTableFilter,
    ModalColumnFilter,
    ModalExcelDownload,
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    updateList(status){
      if(status === 'true'){
        this.getShipmentRequestsList();
      }
    },
  },

  mounted() {
    this.getShipmentRequestsList();
  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getPageList();
          openToast(
              this.$store,
              'صفحه مورد نظر با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
    $route(){
      this.getShipmentRequestsList();

    }
  }
}
</script>
