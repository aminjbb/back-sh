<template >
    <div class="px-2 py-2 h-100">
        <v-form
            ref="createProductStep3"
            class="create-product__tables-form scroller"
        >
            <template
                v-for="(table, index) in tables"
                :key="table.id"
                class="my-5"
            >
                <div class="example">
                    <v-table
                        fixed-header
                        :height="height"
                        class="table-outlined my-10"
                    >
                        <thead>
                            <tr>
                                <th class="text-rigth" style="width: 100px;">
                                    ردیف
                                </th>
                                <th class="text-rigth">
                                    <div class="w-100 d-flex justify-space-between align-center">
                                        <span class="ml-2">{{table.title}}</span>
                                        <v-text-field
                                            variant="outlined"
                                            v-model="skuGroupsLabels[index].value"
                                            label="نام گروه بندی"
                                            single-line
                                            hide-details
                                            style="max-width: calc(100% - 250px);width: calc(100% - 250px)"
                                        />
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="(item , tableIndex) in table.values"
                                :key="item.name"
                            >
                                <td style="width: 100px;">
                                    <v-row align="center">
                                        <span>
                                            <v-checkbox v-model="skuStatus[tableIndex]"  @change="selectSku(item.id)" />
                                        </span>
                                        <span class="t14300">{{ item.id }}</span>
                                    </v-row>
                                </td>
                                <td style="width: 800px;">
                                    {{ item.name }}
                                </td>
                            </tr>
                        </tbody>
                      </v-table>
                </div>
            </template>
        </v-form>
    </div>
</template>
<script>
import { ref } from 'vue'

/** components */
import Table from '@/components/Public/Table.vue'

export default {
    data: () => ({
      loaded: false,
      loading: false,
        skuesSelected:[],
        skuGroupsLabels : [],
        tables: [
        ],
      skuStatus:[

      ]
    }),

    components: {
        Table,
    },

    computed: {
        /**
         * Get table header
         */
        tableHeader() {
            let tableHeaderRows = [];
            this.tables.forEach((table, index) => {
                const headerRow = [
                    { name: 'ردیف', show: true },
                    { name: table.title, show: true },
                ]

                tableHeaderRows.push(headerRow);
            });

            return tableHeaderRows;
        },
    },

    methods:{
        selectSku(id){
            this.skuesSelected.push(id)
        },

    },
    
    mounted(){
        if ( localStorage.getItem('skuObject')) {
            const skuObject = localStorage.getItem('skuObject')
            const skuGroups =JSON.parse([skuObject])
            skuGroups.forEach(skuGroup =>{
              let label = null
              if (skuGroup.label) label = skuGroup.label
              else  label = skuGroup.name
                const table ={
                  title: 'نام محصولات یکتا',
                  values:skuGroup.s_k_us
                }

                const skuGroupLabels = {
                  id: skuGroup.id,
                  value :label
                }
                this.skuGroupsLabels.push(skuGroupLabels)
                this.tables.push(table)
                skuGroup.s_k_us.forEach(sku=>{
                  if (sku.status === 'draft') this.skuStatus.push(false)
                  else if (sku.status === 'approved') this.skuStatus.push(true)
                })
              })
        }
    }

}
</script>