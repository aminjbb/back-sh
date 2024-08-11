<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card
        height="164"
        class="ma-5 br-12"
        style="flex: 0 0 164px;">
        <header class="modal__header d-flex justify-center align-center">
            <span class="t16400 pa-6">
                اطلاعات جایگذاری
            </span>
        </header>

        <v-divider color="grey" />
        <v-row>
            <v-col col="4" class="d-flex justify-center align-center">
                <div class="mt-8">
                    <span class="t12 w500 text-black ml-1">شماره ردیف :</span>
                    <span v-if="placement && placement.row_number" class="t14300 text-gray500 number-font">{{placement.row_number}}</span>
                </div>
            </v-col>
            
            <v-col col="4" class="d-flex justify-center align-center">
                <div class="mt-8">
                    <span class="t12 w500 text-black ml-1">شماره قفسه :</span>
                    <span v-if="placement && placement.placement_number" class="t14300 text-gray500 number-font">{{placement.placement_number}}</span>
                </div>
            </v-col>

            <v-col col="4" class="d-flex justify-center align-center">
                <div class="mt-8">
                    <span class="t12 w500 text-black ml-1">شماره طبقه  :</span>
                    <span v-if="placement && placement.step_number" class="t14300 text-gray500 number-font">{{placement.step_number}}</span>
                </div>
            </v-col>

            <v-col col="4" class="d-flex justify-center align-center">
                <div class="mt-8">
                    <span class="t12 w500 text-black ml-1">شماره شلف :</span>
                    <span v-if="placement && placement.shelf_number" class="t14300 text-gray500 number-font">{{placement.shelf_number}}</span>
                </div>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column" style="height: calc(100% - 164px);">
        <Table
            class="flex-grow-1"
            :header="shpssHeader"
            :items="placementShpssList"
            @updateList="updateList"
            model="package" />
    </v-card>
</div>
</template>

<script>
import Table from '@/components/Placement/Table/ShpssTable.vue'
import Placement from "@/composables/Placement";
import {
    AxiosCall
} from '@/assets/js/axios_call.js'

export default {
    data() {
        return {
            placement: null,
            placementShpssList: [],
        }
    },

    components: {
        Table,
    },

    setup() {
        const {
            shpssHeader,
        } = Placement();
        return {
            shpssHeader
        };
    },

    computed: {

    },

    methods: {
        changeHeaderShow(index, value) {
            this.header[index].show = value
        },

        /**
         * Get placement
         */
        async getPlacement() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = 'placement/crud/get/' + this.$route.params.placementId
            AxiosMethod.toast_error = true
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.placement = data.data
            }
        },

        /**
         * Get placement history
         */
        async getPlacementShpssList() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = 'placement/shps/list/' + this.$route.params.placementId
            AxiosMethod.toast_error = true
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.placementShpssList = data.data
            }
        }
    },

    mounted() {
        this.getPlacement();
        this.getPlacementShpssList();
    },
}
</script>
