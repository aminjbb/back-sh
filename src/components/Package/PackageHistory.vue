<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card
        height="164"
        class="ma-5 br--12"
        style="flex: 0 0 164px;">
        <header class="modal__header d-flex justify-center align-center">
            <span class="t16 w400 pa-6">
                اطلاعات بسته
            </span>
        </header>

        <v-divider color="grey" />

        <div class="d-flex justify-center align-center">
            <div class="mt-8">
                <span class="t12 w500 text-black ml-1">شناسه بسته :</span>
                <span v-if="packageContent && packageContent.id" class="t14 w300 text-gray500 number-font">{{packageContent.id}}</span>
            </div>
        </div>
    </v-card>

    <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column" style="height: calc(100% - 164px);">
        <Table
            class="flex-grow-1"
            :header="historyHeader"
            :items="packageHistory"
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
            packageContent: null,
            packageHistory: [],
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

        /**
         * Get package
         */
        async getPackage() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = 'package/crud/get/' + this.$route.params.packageId
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.packageContent = data.data;
                console.log(this.packageContent);
            }
        },

        /**
         * Get package history
         */
        async getPackageHistory() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = 'package/crud/history/' + this.$route.params.packageId
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.packageHistory = data.data.data
            }
        }
    },

    mounted() {
        this.getPackage();
        this.getPackageHistory();
    },
}
</script>
