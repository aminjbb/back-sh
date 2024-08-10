<template>
    <v-data-table-server
        hover
        id="sh-table"
        class="table c-table rounded-t-lg number-font t14300 "
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
        <template v-for="header in headers.filter((item) => item.model)" v-slot:[`item.${header.key}`]="props">
            <v-icon
                v-if="header.model === 'icon'"
                :color="props.item[header.key].split('|')[1]">
              {{ props.item[header.key].split('|')[0] }}
            </v-icon>

          <v-select
              v-if="header.model === 'select'"
              v-model="props.item[header.key]"
              variant="outlined"
              :items="dataSelect" />

          <v-text-field
              v-if="header.model === 'number_input'"
              v-model="props.item[header.key]"
              hide-details
              variant="outlined"
              class="number-font"
              type="number" />
        </template>

        <template v-slot:loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.row="{index}">
            <span class="t14300  number-font">
                {{ rowIndexTable(index) }}
            </span>
        </template>

        <template v-slot:item.image="{item}">
            <v-img v-if="item.image" :src="item.image" cover height="50" width="50"></v-img>
            <img v-else src="@/assets/img/noFile.png" height="50" width="50" alt="noImage"/>
        </template>

        <template v-slot:item.score="{item}">
            <v-rating
                style="direction: ltr!important;"
                v-model="item.score"
                size="18"
                half-increments
                readonly>
                <template v-slot:item="props">
                    <v-icon
                        size="large"
                        :color="props.isFilled ? 'rgb(243, 193, 28)' : 'grey-lighten-1'">
                        mdi-star
                    </v-icon>
                </template>
            </v-rating>
        </template>

        <template v-slot:item.show="{item, index}">
          <slot name="showSlot" :data="item" :index="index"></slot>
        </template>

        <template v-slot:item.is_active="{item}">
            <div class=" d-flex justify-center align-center">
                <v-switch
                        :true-value="1"
                        :false-value="0"
                        v-model="item.is_active"
                        inset
                        color="success"
                        @change="changeActive(item,item.is_active_id)"/>
            </div>
        </template>
        <!--SLOTS-->
        <template v-slot:item.switch="{ item, index }">
            <div class=" d-flex justify-center align-center">
                <slot name="switchSlot" :data="item" :index="index"></slot>
            </div>
        </template>

        <template v-slot:item.save="{ item, index }">
            <div class=" d-flex justify-center align-center">
                <slot name="saveSlot" :data="item" :index="index"></slot>
            </div>
        </template>

        <template v-slot:item.color="{ item, index }">
            <slot name="colorSlot" :data="item" :index="index"></slot>
        </template>

        <template v-slot:item.custom="{ item, index }">
            <slot name="customSlot" :data="item" :index="index"></slot>
        </template>

        <template v-slot:item.custom2="{ item, index }">
            <slot name="customSlot2" :data="item" :index="index"></slot>
        </template>

        <template v-slot:item.action="{ item, index }">
            <slot name="actionSlot" :data="item" :index="index"></slot>
        </template>

        <template v-slot:no-data>
            <div class="d-flex justify-center align-center flex-column py-14 bg-white">
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
      dataSelect: Array,
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

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td, .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    border-bottom: none;
}

</style>