<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <OccasionBannerList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-4">
            <v-col cols="6" >
              <AddOccasionBannerModal @updateList="getOccasionBanners"/>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

                <PanelFilter
                    :statusHasOption="deviceTypes"
                    path="occasion-banner/index"
                    :filterField="filterField"
                    :statusItems="activeFilter"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :page="1"
              :perPage="25"
              :activePath="'page/top_banner/crud/update/activation/'">
            <template v-slot:switchSlot="item">
              <v-switch
                  :true-value="1"
                  :false-value="0"
                  v-model="item.data.switch"
                  inset
                  color="success"
                  @change="changeActive(item.data.id,item.data.switch)"/>
            </template>
            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-dots-vertical
                </v-icon>
              </div>
              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false">
                <v-list class="c-table__more-options">
                  <v-list-item>
                    <AddOccasionBannerModal type="edit" :banner="item.data.data"/>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon size="xsmall" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>
          <v-divider />
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
// import OccasionBannerList from '@/components/OccasionBanner/OccasionBannerList.vue'
import AddOccasionBannerModal from '@/components/OccasionBanner/Modal/AddOccasionBannerModal.vue'
import OccasionBanner from "@/composables/OccasionBanner";
import PanelFilter from '@/components/PanelFilter/PanelFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import {openConfirm,openToast} from "@/assets/js/functions";
import ShTable from "@/components/Components/Table/sh-table.vue";
import { AxiosCall } from "../../assets/js/axios_call";

export default {
  setup() {
    const activeFilter= [
      {
        label: 'وضعیت',
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
    ]
    const {
      filterField, OccasionBanners, getOccasionBanners  , header
    } = new OccasionBanner();
    return {
      filterField, OccasionBanners, getOccasionBanners  , header, activeFilter
    };
  },
  data(){
    return{
      deviceTypes:[
        {label:'دسکتاپ' , value:'desktop'},
        {label:'موبایل' , value:'mobile'},
        {label:'تبلت' , value:'tablet'},
      ],
      itemListTable: [],
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "page/top_banner/crud/delete/",
      },
    }
  },

  components: {
    PanelFilter,
    ModalColumnFilter,
    AddOccasionBannerModal,
    ShTable,
    DashboardLayout,
    Header
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

    async changeActive(id, active) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = "page/top_banner/crud/update/activation/"+id
      formdata.append('is_active', active)
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (!data) {
        active.switch = false
      }
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },

  mounted() {
    this.getOccasionBanners();
  },

  watch: {
    OccasionBanners(){
      this.itemListTable = []

      this.OccasionBanners.data.forEach((item) =>
          this.itemListTable.push(
              {
                data: item,
                id: item.id,
                image: item?.desktop_image?.image_url,
                link:  item.link,
                creator: item.creator?.first_name + ' ' + item.creator?.last_name,
                switch: item.is_active === 'true'? 1 : 0,
                switch_id: item.id,
              }
          ),
      )
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getOccasionBanners();
          openToast(
              this.$store,
              'بنر مورد نظر با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    $route(){
      this.getOccasionBanners();
    }
  }
}
</script>