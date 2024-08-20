import {ref} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
import {useRoute} from 'vue-router'
import {onBeforeRouteUpdate} from 'vue-router'

export default function setup() {
    const notifications = ref([]);
    const notification = ref({});
    const dataTableLength = ref(25)
    const page = ref(1)
    const cookies = useCookies()
    const route = useRoute()
    const pageLength = ref(1)

    const header =ref([
        {name: 'ردیف', title: 'ردیف', show: true , key:'row', sortable: false, align: 'center'},
        {name: 'شناسه', title: 'شناسه', show: true , key:'id', sortable: false, align: 'center'},
        {name: 'عنوان', title: 'عنوان', show: true , key:'title', sortable: false, align: 'center'},
        {name: ' مشاهده', title: 'مشاهده', show: true, key:'show' , sortable: false, align: 'center'},
        {name: ' تاریخ ایجاد', title: ' تاریخ ایجاد', show: true, key:'created_at', align: 'center'},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const filterField = [{
            name: 'عنوان',
            type: 'text',
            value: 'title'
        },
        {
            name: 'تاریخ ایجاد',
            type: 'date',
            value: 'created_at'
        },
    ];

    const item = []
    const loading = ref(false)
    const isFilter = ref(false)
    const isFilterPage = ref(false)

    async function getNotifications(store) {
        loading.value = true

        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                }
            }

        }
        else{
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value
                }
            }

        }
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `notification/admin/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            if (store) {
                store.commit('set_menuNotifications', data.data)
            }
            pageLength.value = data.data.data.last_page
            notifications.value = data.data.data
            loading.value = false
            setTimeout(() => {
                isFilter.value = false
                isFilterPage.value = false
            }, 2000)
        }

        else {
            loading.value = false
        }
    };

    async function getNotification() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `notification/admin/crud/get/${this.$route.params.id}`
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')

        let data = await AxiosMethod.axios_get()
        if (data) {
            notification.value = data.data;
        }
    }

    return {
        pageLength,
        notifications,
        notification,
        getNotifications,
        getNotification,
        dataTableLength,
        page,
        header,
        item,
        loading,
        filterField
    }
}