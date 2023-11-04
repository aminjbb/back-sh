import {ref, onMounted, watch} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
import {useRouter, useRoute} from 'vue-router'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'
import {PanelFilter} from '@/assets/js/filter.js'

export default function setup(posts) {
    const notifications = ref([]);
    const notification = ref({});
    const dataTableLength = ref(25)
    const page = ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()
    const pageLength = ref(1)

    const header = ref([
        {name: 'ردیف', show: true},
        {name: 'شناسه', show: true},
        {name: 'عنوان', show: true},
        {name: 'مشاهده', show: true},


    ]);
    const item = []
    const loading = ref(false)

    async function getNotifications(query, store) {
        loading.value = true
        var formdata = {}
        if (query) {
            var formdata = query
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'notification/admin/crud/index'
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.form = formdata
        let data = await AxiosMethod.axios_get()
        if (data) {
            if (store) {
                store.commit('set_menuNotifications', data.data)
            }
            pageLength.value = data.data.data.last_page
            notifications.value = data.data.data
            loading.value = false
        } else {
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
        const filter = new PanelFilter()
        if (route.query.name) {
            filter.name = route.query.name
        }
        if (route.query.label) {
            filter.label = route.query.label
        }

        if (route.query.id) {
            filter.id = route.query.id
        }
        filter.page = 1;
        page.value = 1;
        filter.per_page = number
        router.push('/notifications/index/' + filter.query_maker())
    }

    function addPagination(page) {
        const filter = new PanelFilter()
        if (route.query.name) {
            filter.name = route.query.name
        }
        if (route.query.label) {
            filter.label = route.query.label
        }

        if (route.query.id) {
            filter.id = route.query.id
        }
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/notifications/index/' + filter.query_maker())

    }

    watch(page, function (val) {
        addPagination(val)
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
        loading
    }
}

