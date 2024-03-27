<template>
    <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card 
            height="70"
            class="ma-5 br-12 stretch-card-header-70"
        >
            <v-row 
                justify="center"
                align="center"
                class="px-10 py-5"
            >
                <v-col cols="6">
                    <v-row justify="start">
                        <v-btn 
                            @click="$router.push('/ticket/create')"
                            color="primary500"
                            height="40"
                            rounded
                            class="px-8 mt-1"
                        >
                            <template v-slot:prepend>
                               <v-icon>mdi-plus</v-icon>
                              </template>
                              ایجاد تیکت
                        </v-btn>
                    </v-row>
                </v-col>

                <v-col cols="6">
                    <v-row justify="end">
                        <ModalColumnFilter
                            :changeHeaderShow="changeHeaderShow"
                            :header="header"
                        />

                        <ModalTableFilter
                            path="ticket/index"
                            :filterField="filterField"
                        />
                    </v-row>
                </v-col>
            </v-row>
        </v-card>   

        <v-card 
            class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch"
            height="580"
        >
            <Table 
                class="flex-grow-1"
                model="ticet"
                :header="header" 
                :items="allTickets"
                :page="page"
                :perPage="dataTableLength"
                :loading="loading"
            />
            
            <v-divider/>

            <v-card-actions class="pb-3">
                <v-row class="pr-5">
                    <v-col cols="3" /> 

                    <v-col cols="6"> 
                        <div class="text-center" >
                            <v-pagination
                                v-model="page"
                                :length="pageLength"
                                rounded="circle"
                                size="40"
                                :total-visible="4"
                                prev-icon="mdi-chevron-right"
                                next-icon="mdi-chevron-left"
                            />
                        </div>
                    </v-col>

                    <v-col cols="3"> 
                        <div 
                            align="center" 
                            id="rowSection" 
                            class="d-flex align-center"
                        >
                            <span class="ml-5">
                                تعداد سطر در هر صفحه
                            </span>
                            <span class="mt-2"  id="row-selector">
                                <v-select
                                    v-model="dataTableLength"
                                    class="t1330"
                                    variant="outlined"
                                    :items="[25,50,100]"
                                />
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import { ref } from 'vue'
//components
import Table from '@/components/Ticket/TicketTable/TicketTable.vue'
import ModalTableFilter from '@/components/Ticket/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import Ticket from '@/composables/Ticket';
import Echo from "laravel-echo";

export default {
    components: {
        Table,
        ModalTableFilter,
        ModalColumnFilter,
    },

    data() {
        return {
            
        }
    },

    setup(props) {
        const { pageLength, filterField, addPerPage, dataTableLength, page, header, item ,loading, getTicketList, allTickets } = Ticket();
        return { pageLength, filterField, addPerPage, dataTableLength, page, header, item ,loading, getTicketList, allTickets };
    },

    mounted() {
        this.getTicketList();
        this.setEcho();
        
    },

    methods: {
        changeHeaderShow(index, value) {
            this.header[index].show = value
        },

        setEcho(){
            if (this.$cookies.get('adminToken')){
                setTimeout(()=>{
                    window.Echo.channel(`admin.ticket`).listen('TicketCreated', (event) => {
                        this.getTicketList()
                })}, 300)
            }
        }
    },

    watch: {
      dataTableLength(val) {
            this.addPerPage(val)
        },
    }
}
</script>
