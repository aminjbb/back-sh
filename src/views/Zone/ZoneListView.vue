<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <ZoneList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              class="flex-grow-1"
              :header="header"
              :items="zoneList"
              :page="1"
              :perPage="25"
              :loading="loading"
              :rowList="rowList"/>
          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start" />
              <v-col cols="6" class="d-flex justify-center">
                <div class="text-center">
                </div>
              </v-col>
              <v-col cols="3" class="d-flex justify-end">
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const ZoneList = defineAsyncComponent(()=> import ('@/components/Zone/ZoneList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/Zone/Table/Table.vue'
import Zone from "@/composables/Zone";
import Placement from "@/composables/Placement";

export default {
  setup() {
    const {
      zoneList, getZoneList, header,loading
    } = Zone();
    const {
      getRowList,
      rowList
    } = Placement();

    return {
      zoneList, getZoneList, header,loading, getRowList, rowList
    };
  },

  components: {
    Table,
    DashboardLayout,
    Header
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },
  },

  mounted() {
    this.getZoneList();
    this.getRowList();
  },

}
</script>
