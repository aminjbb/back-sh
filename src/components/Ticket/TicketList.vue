<template>
<div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
        <v-row justify="center" align="center" class="px-10 py-5">
            <v-col cols="6">
                <v-row justify="start">
                    <v-btn @click="$router.push('/ticket/create')" color="primary500" height="40" rounded class="px-8 mt-1">
                        <template v-slot:prepend>
                            <v-icon>mdi-plus</v-icon>
                        </template>
                        ایجاد تیکت
                    </v-btn>
                </v-row>
            </v-col>

            <v-col cols="6">
                <v-row justify="end">
                    <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

                    <PanelFilter
                        @resetPage="resetPage"
                        path="ticket/index"
                        :filterField="filterField"
                        :statusItems="statusTicket"
                        :priorityItems="priorityList"
                        :scoreItems="scoreItems" />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch">
      <ShTable
          class="flex-grow-1"
          :headers="header"
          :items="itemListTable"
          :loading="loading"
          :page="page"
          :perPage="dataTableLength"
          activePath="product/crud/update/activation/">
        <template v-slot:showSlot="item">
          <v-btn :href="`/ticket/get/${item.data.id}`" variant="icon">
            <v-icon color="error">mdi-eye</v-icon>
          </v-btn>
        </template>

        <template v-slot:customSlot2="item">
          <div v-if="item.data.custom2 === null" />
          <v-rating
              v-else
              v-model="item.data.custom2"
              half-increments
              readonly
              class="me-3"
              style="direction: ltr!important;">
            <template v-slot:item="props">
              <v-icon
                  size="large"
                  :color="props.isFilled ? 'rgb(243, 193, 28)' : 'grey-lighten-1'">
                mdi-star
              </v-icon>
            </template>
          </v-rating>
        </template>

        <template v-slot:customSlot="item">
          <v-chip
              class="ma-2 rounded-lg t10 w400"
              :color="getStatusColor(item.data.custom)">
            {{getStatusText(item.data.custom)}}
          </v-chip>
        </template>

        <template v-slot:actionSlot="item">
          <div class="text-center">
            <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto">
              mdi-dots-vertical
            </v-icon>
          </div>
          <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false">
            <v-list class="c-table__more-options">
              <v-list-item>
                <v-list-item-title>
                  <div class="ma-5 pointer" @click="$router.push(`/product/get/skugroups/update/${item.data.id}`)">
                    <v-icon size="small" class="text-grey-darken-1">
                      mdi-pen
                    </v-icon>
                    <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </ShTable>

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="pr-5">
                <v-col cols="3" />

                <v-col cols="6">
                    <div class="text-center">
                        <v-pagination v-model="page" :length="pageLength" rounded="circle" size="40" :total-visible="7" prev-icon="mdi-chevron-right" next-icon="mdi-chevron-left" />
                    </div>
                </v-col>

                <v-col cols="3">
                    <div align="center" id="rowSection" class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>
                        <span class="mt-2" id="row-selector">
                            <v-select v-model="dataTableLength" class="t1330" variant="outlined" :items="[25,50,100]" />
                        </span>
                    </div>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import Ticket from '@/composables/Ticket';
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";


export default {
  components: {
    PanelFilter,
    ModalColumnFilter,
    ShTable
  },

    data() {
      return {
        perPageFilter: false,
        itemListTable: [],
        scoreItems: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      }
    },

    setup() {
        const statusTicket = [
            {
                label: 'همه وضعیت‌ها',
                value: ''
            },
            {
                label: 'باز',
                value: 'open'
            },
            {
                label: 'پاسخ داده شده',
                value: 'answered'
            },
            {
                label: 'بسته شده',
                value: 'resolved'
            },
            {
                label: 'در حال بررسی',
                value: 'pending'
            }
        ]
        const priorityList = [
            {
                label: 'همه اولویت‌ها',
                value: ''
            },
            {
                label: 'ضروری',
                value: 'urgent'
            },
            {
                label: 'پایین',
                value: 'low'
            },
            {
                label: 'بالا',
                value: 'high'
            },
            {
                label: 'متوسط',
                value: 'medium'
            }
        ]

        const {
            pageLength,
            filterField,
            dataTableLength,
            page,
            header,
            item,
            loading,
            getTicketList,
            allTickets
        } = Ticket()

        return {
            pageLength,
            filterField,
            dataTableLength,
            page,
            header,
            item,
            loading,
            getTicketList,
            allTickets,
            statusTicket,
            priorityList
        }
    },

    mounted() {
      this.getTicketList();
      this.setEcho();
    },

    methods: {
      getStatusColor(status) {
        const color = '';

        if (status == 'open') {
          return 'Orange400';
        }
        if (status == 'answered') {
          return 'success';
        }
        if (status == 'resolved') {
          return 'gray600';
        }
        if (status == 'pending') {
          return 'primary700';
        }

        return '';
      },

      getPriorityText(priority) {
        const text = '';

        if (priority == 'urgent') {
          return 'ضروری';
        }
        if (priority == 'low') {
          return 'پایین';
        }
        if (priority == 'high') {
          return 'بالا';
        }
        if (priority == 'medium') {
          return 'متوسط';
        }

        return 'معمولی';
      },

      getStatusText(status) {
        const text = '';

        if (status == 'open') {
          return 'باز نشده';
        }
        if (status == 'answered') {
          return 'پاسخ داده شده';
        }
        if (status == 'resolved') {
          return 'بسته شده';
        }
        if (status == 'pending') {
          return 'در حال بررسی';
        }

        return 'نامعلوم';
      },

      changeHeaderShow(index, value) {
        this.header[index].show = value
      },

      setEcho() {
            if (this.$cookies.get('adminToken')) {
                setTimeout(() => {
                    window.Echo.channel(`admin.ticket`).listen('TicketCreated', (event) => {
                        this.getTicketList()
                    })
                }, 300)
            }
        },

      resetPage() {
            this.perPageFilter = true
            this.page = 1
            setTimeout(() => {
                this.perPageFilter = false
            }, 1000)
        }
    },

    watch: {
      allTickets() {
        this.itemListTable = []

        this.allTickets.forEach((item) =>
            this.itemListTable.push(
                {
                  ticket_number: '#' + item.code,
                  id: item.id,
                  title: item.parent_topic ?  item.parent_topic : '-',
                  sub_title:  item.topic_title ?  item.topic_title : '-',
                  priority: this.getPriorityText(item.priority),
                  custom: item.status,
                  admin: item.admin ? item?.admin?.first_name + ' ' + item?.admin?.last_name : '-',
                  custom2: item.rate ,
                  user_name: item.user.first_name+ ' ' + item.user.last_name,
                  mobile: item.user.phone_number,
                  created_at: item.created_at_fa + ' ' + item.created_at.split(' ')[1],
                  latest_date: item.latest_date_fa ,
                },
            )
        )
      },

      dataTableLength() {
            this.perPageFilter = true
            this.page = 1
            let query = this.$route.query
            if (query) {
                this.$router.replace({
                    query: {
                        ...query,
                        per_page: this.dataTableLength,
                    }
                })
            } else {
                this.$router.push({
                    query: {
                        per_page: this.dataTableLength,
                    }
                })
            }
            this.perPageFilter = false
        },

      page() {
            if (!this.perPageFilter) {
                this.getTicketList()
            }
        },

      $route() {
            this.getTicketList()
        }
    }
}
</script>
