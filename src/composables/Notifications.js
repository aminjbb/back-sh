import {ref,watch} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
import {useRouter,useRoute} from 'vue-router'
import {onBeforeRouteUpdate} from 'vue-router'
import {PanelFilter} from '@/assets/js/filter_notification.js'

export default function setup() {
    const notifications = ref([]);
    const notification = ref({});
    const dataTableLength = ref(25)
    const page = ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()
    const pageLength = ref(1)

    const header = ref([{
            name: 'ردیف',
            show: true
        },
        {
            name: 'شناسه',
            show: true,
            value: 'id',
            order: false
        },
        {
            name: 'عنوان',
            show: true,
            value: 'title',
            order: false
        },
        {
            name: 'مشاهده',
            show: true,
            value: 'url',
            order: false
        },
        {
            name: 'تاریخ ایجاد',
            show: true,
            value: 'created_at',
            order: true
        },
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
    const filter = new PanelFilter()

    async function getNotifications(store) {
        loading.value = true

        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        else{
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
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

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value = true
            page.value = 1
            filter.page = 1
        }
        await getNotifications(to)
    })

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