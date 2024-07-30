<template>
    <v-data-table-server
        hover
        id="sh-table"
        class="table c-table rounded-t-lg"
        :headers="headers.filter((header) => header.show)"
        :items="items"
        :items-per-page="perPage"
        :fixed-header="true"
        :show-select="isSelect"
        hide-default-footer
        item-value="index"
        :loading="loading"
        @update:sort-by="getItemsWithSort"
    >
        <template v-slot:loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.row="{  index }">
            <span class="t14300  number-font">
                {{ rowIndexTable(index) }}
            </span>
        </template>

        <template v-slot:item.image="{item}">
            <v-img v-if="item.image" :src="item.image" cover height="50" width="50"></v-img>
            <img v-else src="@/assets/img/noFile.png" height="50" width="50" alt="noImage"/>
        </template>

        <template v-slot:item.is_active="{item}">
            <span class="t14300 ">
                <v-switch
                    :true-value="1"
                    :false-value="0"
                    v-model="item.is_active"
                    inset
                    color="success"
                    @change="changeActive(item,item.is_active_id)"/>
            </span>
        </template>

        <template v-slot:item.action="{ item, index }">
            <slot name="actionSlot" :data="item" :index="index"></slot>
        </template>

        <template v-slot:item.switch="{ item, index }">
            <slot name="switchSlot" :data="item" :index="index"></slot>
        </template>


        <template v-slot:no-data>
            <div class="d-flex justify-center align-center flex-column py-14">
                <img src="@/assets/img/NullTable.png" alt="shavaz image">
                <div class="d-flex justify-center align-center flex-column">
                    <span class="text-gray500 text-center text-body-1">اطلاعاتی برای نمایش وجود ندارد.</span>
                </div>
            </div>
        </template>
    </v-data-table-server>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";

export default {
    name: "shTable",
    props: {
        headers: {
            type: Array,
            default: () => [],
        },
        items: Array,
        loading: Boolean,
        isSelect: Boolean,
        page: {
            type: Number,
            default: 1,
        },
        perPage: {
            type: Number,
            default: 25,
        },
        activePath: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            computedHeaders: [],
        }
    },
    methods: {
        getItemsWithSort(sort) {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    order_type: sort[0].order,
                    order: sort[0].key,
                },
            })
            console.log(sort)

        },
        rowIndexTable(index) {
            let rowIndex = 0
            if (this.page === 1) {
                rowIndex = (1 + index)
                return rowIndex
            } else {
                rowIndex = ((this.page - 1) * this.perPage) + index + 1
                return rowIndex
            }
        },
        async changeActive(item, id) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = this.activePath + id
            formdata.append('is_active', item.is_active)
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (!data) {
                item.is_active = false
            }
        },
    },
}
</script>

<style>
#sh-table ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

#sh-table ::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: #F8BBD0;
}

#sh-table ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #F06292;
}

#sh-table ::-webkit-scrollbar-thumb:hover {
    background-color: #ef588b;
}

tbody tr:nth-of-type(odd) {
    background-color: rgba(251, 251, 252);
}
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td, .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th{
    border-bottom: none;
}

</style>