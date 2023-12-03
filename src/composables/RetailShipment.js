import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_menu.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";
import {tr} from "vuetify/locale";

export default function setup(posts) {
    const retailShipments =ref([
        {
            id: 1,
            factor_id: 2,
            sent_warehouse_at: null,
            received_warehouse_at: null,
            rejection_reason: null,
            created_at: "2023-11-28T13:43:29.000000Z",
            updated_at: "2023-11-28T13:43:29.000000Z",
            created_at_fa: "1402/09/07",
            updated_at_fa: "1402/09/07",
            shps_count: 11,
            shps_variety: 2,
            creator: {
                id: 4,
                first_name: "حانیه",
                last_name: "عاصمی",
                role_id: 1,
                phone_number: "09905042769",
                email: "hanie.shavaz@gmail.com",
                birth_date: null,
                is_ban: 0,
                avatar: "http://localhost:8000/storage/shavaz/admin/admin-logo.jpg",
                deleted_at: null,
                created_at: "2023-11-01T12:00:37.000000Z",
                updated_at: "2023-11-26T08:46:35.000000Z",
                last_logged_in: "2023-11-26 12:16:35",
                type: "admin",
                last_logged_in_fa: "1402/09/05 ساعت 12:16:35"
            },
            factor: {
                id: 2,
                supplier_id: 1,
                factor_number: "3243",
                pre_factor_number: "123",
                status: "draft",
                created_at: "2023-11-28T10:31:21.000000Z",
                updated_at: "2023-11-28T10:31:21.000000Z",
                created_at_fa: "1402/09/07",
                updated_at_fa: "1402/09/07"
            }
        },
        {
            id: 2,
            factor_id: 2,
            sent_warehouse_at: null,
            received_warehouse_at: null,
            rejection_reason: null,
            created_at: "2023-11-28T13:46:01.000000Z",
            updated_at: "2023-11-28T13:46:01.000000Z",
            created_at_fa: "1402/09/07",
            updated_at_fa: "1402/09/07",
            shps_count: 0,
            shps_variety: 0,
            creator: {
                id: 4,
                first_name: "حانیه",
                last_name: "عاصمی",
                role_id: 1,
                phone_number: "09905042769",
                email: "hanie.shavaz@gmail.com",
                birth_date: null,
                is_ban: 0,
                avatar: "http://localhost:8000/storage/shavaz/admin/admin-logo.jpg",
                deleted_at: null,
                created_at: "2023-11-01T12:00:37.000000Z",
                updated_at: "2023-11-26T08:46:35.000000Z",
                last_logged_in: "2023-11-26 12:16:35",
                type: "admin",
                last_logged_in_fa: "1402/09/05 ساعت 12:16:35"
            },
            factor: {
                id: 2,
                supplier_id: 1,
                factor_number: "3243",
                pre_factor_number: "123",
                status: "draft",
                created_at: "2023-11-28T10:31:21.000000Z",
                updated_at: "2023-11-28T10:31:21.000000Z",
                created_at_fa: "1402/09/07",
                updated_at_fa: "1402/09/07"
            }
        }
    ],)
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه محموله', show: true , value:'id', order: false},
        { name: 'شناسه فاکتور', show: true , value:'factor_id', order: false},
        { name: 'تعداد آیتم', show: true, value:'number' , order: false},
        { name: 'تنوع آیتم', show: true , value:'variety', order: false},
        { name: 'نام سازنده', show: true, value:'creator', order: false },
        { name: 'تاریخ ساخت', show: true, value:'created_at', order: true },
        { name: 'تاریخ ویرایش', show: true, value:'updated_at', order: true },
        { name: 'وضعیت', show: true, value:'status', order: false },
    ]);
    const headerShps =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه shps', show: true , value:'shps', order: false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: 'تعداد کالا', show: true, value:'number' , order: false},
        { name: 'تلورانس پایین', show: true , value:'low_tolerance', order: false},
        { name: 'تلورانس بالا', show: true, value:'high_tolerance', order: false },
    ]);
    const filterField = [
        {name:'نام فارسی' , type:'text', value:'label'},
        { name:'نام انگلیسی' , type: 'text', value:'name'},
        { name: 'منو مادر', type:'select', value:'menu'},
        { name: 'آیکون', type:'select', value:'has_icon'},
        { name: 'تصویر', type:'select', value:'has_image'},
        { name: 'وضعیت', type:'select', value:'is_active'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/menu/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/menu/index'+ filter.params_generator(route.query))
    }

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return { retailShipments, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,headerShps}
}

