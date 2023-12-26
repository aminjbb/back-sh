<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card
        height="164"
        class="ma-5 br-12"
        style="flex: 0 0 164px;">
        <header class="modal__header d-flex justify-center align-center">
            <span class="t16400 pa-6">
                اطلاعات بسته
            </span>
        </header>

        <v-divider color="grey" />

        <div class="d-flex justify-center align-center">
            <div class="mt-8">
                <span class="t12500 text-black ml-1">شناسه بسته :</span>
                <span class="t14300 text-gray500 number-font">123456789</span>
            </div>
        </div>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column" style="height: calc(100% - 164px);">
        <Table
            class="flex-grow-1"
            :header="historyHeader"
            :items="mocketData"
            @updateList="updateList"
            model="package" />
    </v-card>
</div>
</template>

<script>
import Table from '@/components/Package/Table/HistoryTable.vue'
import Package from "@/composables/Package";
import {
    AxiosCall
} from '@/assets/js/axios_call.js'

export default {
    data() {
        return {
            package: null,
            packageHistory: [],
            
            mocketData: [{
                    "id": 5,
                    "barcode": "4-5-1703495242",
                    "barcode_image": "storage/shavaz/barcode/4-5-1703495242.png",
                    "type": null,
                    "status": "received_by_warehouse",
                    "created_at": "2023-12-25T09:07:22.000000Z",
                    "updated_at": "2023-12-25T09:07:22.000000Z",
                    "created_at_fa": "1402/10/04",
                    "updated_at_fa": "1402/10/04",
                    "shps_count": 0
                },
                {
                    "id": 6,
                    "barcode": "4-6-1703495341",
                    "barcode_image": "storage/shavaz/barcode/4-6-1703495341.png",
                    "type": null,
                    "status": "empty",
                    "created_at": "2023-12-25T09:09:01.000000Z",
                    "updated_at": "2023-12-25T09:09:01.000000Z",
                    "created_at_fa": "1402/10/04",
                    "updated_at_fa": "1402/10/04",
                    "shps_count": 0
                },
                {
                    "id": 7,
                    "barcode": "4-7-1703496448",
                    "barcode_image": "storage/shavaz/barcode/4-7-1703496448.png",
                    "type": null,
                    "status": "luggage",
                    "created_at": "2023-12-25T09:27:28.000000Z",
                    "updated_at": "2023-12-25T09:27:28.000000Z",
                    "created_at_fa": "1402/10/04",
                    "updated_at_fa": "1402/10/04",
                    "shps_count": 0
                }
            ],
        }
    },

    components: {
        Table,
    },
    
    setup(props) {
        const {
            historyHeader,
        } = Package();
        return {
            historyHeader
        };
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

        /**
         * Get package
         */
        async getPackage() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'package/crud/get/' + this.$route.params.packageId
            AxiosMethod.toast_error = true
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.package = data.data
            }
        },

        /**
         * Get package history
         */
        async getPackageHistory() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'package/crud/history/' + this.$route.params.packageId
            AxiosMethod.toast_error = true
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.packageHistory = data.data
            }
        }
    },

    mounted() {
        this.getPackage();
        this.getPackageHistory();
    },
}
</script>
