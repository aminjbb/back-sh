import {ref,onMounted,watch} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
import {useRouter,useRoute} from 'vue-router'
import {onBeforeRouteLeave,onBeforeRouteUpdate} from 'vue-router'
import {PanelFilter} from '@/assets/js/filter_notification.js'

export default function setup(posts) {
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
            value: 'id'
        },
        {
            name: 'عنوان',
            show: true,
            value: 'title'
        },
        {
            name: 'مشاهده',
            show: true,
            value: 'url'
        },
        {
            name: 'تاریخ ایجاد',
            show: true,
            value: 'created_at'
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

    async function getNotifications(query, store) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `notification/admin/crud/index${paramsQuery}`
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
    };

    function addPerPage(number) {
        filter.page = 1
        filter.per_page = number
        router.push('/notifications/index' + filter.params_generator(route.query))
    }

    function addPagination(page) {
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/notifications/index' + filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value = true
            page.value = 1
            filter.page = 1
        }
        await getNotifications(to)
    })

    watch(page, function (val) {
        if (!isFilter.value) {
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {
        pageLength,
        notifications,
        notification,
        addPerPage,
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