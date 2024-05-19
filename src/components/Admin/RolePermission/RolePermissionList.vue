<template>
<div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-5">
            <v-col cols="6">
                <v-row justify="start">
                    <v-btn
                        @click="$router.push('/role-permission/create')"
                        color="primary500"
                        height="40"
                        rounded
                        class="px-8 mt-1">
                        <template v-slot:prepend>
                            <v-icon>mdi-plus</v-icon>
                        </template>
                        ساخت نقش
                    </v-btn>
                </v-row>
            </v-col>

            <v-col cols="6">
                <v-row justify="end">
                    <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="header"
            :items="rolePermissions"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
            editUrl="/role-permission/edit/"
            deletePath="role/crud/delete/"
            model="rolePermission" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="pr-5">
                <v-col cols="3">

                </v-col>

                <v-col cols="6">
                    <div class="text-center">
                        <v-pagination
                            v-model="page"
                            :length="pageLength"
                            rounded="circle"
                            size="40"
                            :total-visible="7"
                            prev-icon="mdi-chevron-right"
                            next-icon="mdi-chevron-left" />
                    </div>
                </v-col>

                <v-col cols="3">
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
import Table from '@/components/Public/Table.vue'
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import ModalTableFilter from "@/components/Public/ModalTableFilter.vue";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import RolePermission from "@/composables/RolePermission";
export default {
    setup() {
        const {
            pageLength,
            rolePermissions,
            addPerPage,
            getRolePermissions,
            addPerPageRole,
            dataTableLength,
            page,
            header,
            loading
        } = RolePermission();
        return {
            pageLength,
            rolePermissions,
            addPerPage,
            getRolePermissions,
            dataTableLength,
            addPerPageRole,
            page,
            header,
            loading
        };
    },
    components: {
        ModalTableFilter,
        ModalExcelDownload,
        ModalGroupAdd,
        ModalColumnFilter,
        Table
    },
    mounted() {
        this.getRolePermissions()
    },
    methods: {
        changeHeaderShow(index, value) {
            this.header[index].show = value
        },

    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        }
    },

    watch: {
        dataTableLength(val) {
            this.addPerPage(val)
        },
      confirmModal(val) {
        if (localStorage.getItem('deleteObject') === 'done') {
          if (!val) {
            this.getRolePermissions()
            localStorage.removeItem('deleteObject')
          }
        }
      },
      $route(){
        this.getRolePermissions()
      }
    }
}
</script>
