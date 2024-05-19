<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-4">
        <v-col cols="6" >
          <AddOccasionBannerModal/>
        </v-col>

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

            <ModalTableFilter path="menu/index" :filterField="filterField" />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="header"
          :items="[]"
          :page="1"
          :perPage="25"
          activePath="system/menu/crud/update/activation/"
          deletePath="system/menu/crud/delete/"
          :loading="loading"
          updateUrl="page/csv/mass-update"
          model="menu" />
      <v-divider />
    </v-card>
  </div>
</template>

<script>
import Table from '@/components/OccasionBanner/Table/Table.vue'
import AddOccasionBannerModal from '@/components/OccasionBanner/Modal/AddOccasionBannerModal.vue'
import OccasionBanner from "@/composables/OccasionBanner";
import ModalTableFilter from '@/components/OccasionBanner/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import { openToast} from "@/assets/js/functions";
export default {
  setup() {
    const {
      filterField, OccasionBanners, getOccasionBanners  , header
    } = new OccasionBanner();
    return {
      filterField, OccasionBanners, getOccasionBanners  , header
    };
  },

  components: {
    Table,
    ModalTableFilter,
    ModalColumnFilter,
    AddOccasionBannerModal
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

  },

  mounted() {
    this.getOccasionBanners();
  },

  watch: {
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getOccasionBanners();
          openToast(
              this.$store,
              'منو مورد نظر با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
  }
}
</script>
