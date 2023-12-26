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
                    <span class="t12500 text-black ml-1">شماره ردیف :</span>
                    <span class="t14300 text-gray500 number-font">{{placementMocket.row_number}}</span>
                </div>
            </v-col>
            
            <v-col col="4" class="d-flex justify-center align-center">
                <div class="mt-8">
                    <span class="t12500 text-black ml-1">شماره قفسه :</span>
                    <span class="t14300 text-gray500 number-font">{{placementMocket.shelf_number}}</span>
                </div>
            </v-col>

            <v-col col="4" class="d-flex justify-center align-center">
                <div class="mt-8">
                    <span class="t12500 text-black ml-1">شماره طبقه  :</span>
                    <span class="t14300 text-gray500 number-font">{{placementMocket.floor_number}}</span>
                </div>
            </v-col>

            <v-col col="4" class="d-flex justify-center align-center">
                <div class="mt-8">
                    <span class="t12500 text-black ml-1">شماره شلف :</span>
                    <span class="t14300 text-gray500 number-font">{{placementMocket.mian_shelf_number}}</span>
                </div>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column" style="height: calc(100% - 164px);">
        <Table
            class="flex-grow-1"
            :header="shpssHeader"
            :items="placementShpssListMocket"
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
            placementShpssListMocket: [{
                    "id": 12123456,
                    "barcode": "4-5-1703495242",
                    "shpss_label": "کرم پودر شون مدل Daily Defence کد D01 ظرفیت 30 میلی لیتر",
                    "barcode_image": "storage/shavaz/barcode/4-5-1703495242.png",
                    "shpss_count": 8
                },
                {
                    "id": 12123456,
                    "barcode": "4-6-1703495341",
                    "shpss_label": "کرم پودر شون مدل Daily Defence کد D01 ظرفیت 30 میلی لیتر",
                    "barcode_image": "storage/shavaz/barcode/4-6-1703495341.png",
                    "shpss_count": 10
                },
                {
                    "id": 12123456,
                    "barcode": "4-7-1703496448",
                    "shpss_label": "کرم پودر شون مدل Daily Defence کد D01 ظرفیت 30 میلی لیتر",
                    "barcode_image": "storage/shavaz/barcode/4-7-1703496448.png",
                    "shpss_count": 12
                }
            ],
            placementMocket:{
                'row_number':4,
                'floor_number':5,
                'shelf_number':8,
                'mian_shelf_number':7
            }
        }
    },

    components: {
        Table,
    },

    setup(props) {
        const {
            shpssHeader,
        } = Placement();
        return {
            shpssHeader
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
         * Get placement
         */
        async getPlacement() {
            const AxiosMethod = new AxiosCall()
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
            AxiosMethod.end_point = 'placement/crud/shpss/' + this.$route.params.placementId
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
