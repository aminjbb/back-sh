import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const packageList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    const header =ref([
        {name: 'ردیف', title: 'ردیف', show: true , key:'row', sortable: false, align: 'center'},
        {name: 'شناسه بسته', title: 'شناسه بسته', show: true , key:'id', sortable: false, align: 'center'},
        {name: 'نوع بسته', title: 'نوع بسته', show: true, key:'type' , sortable: false, align: 'center'},
        {name: 'تعداد کالا', title: 'تعداد کالا', show: true , key:'shps_count', sortable: false, align: 'center'},
        {name: 'وضعیت', title: 'وضعیت', show: true, key:'custom', sortable: false, align: 'center', width:'200' },
    ]);

    const filterField = [
        {name:'شناسه بسته' , type:'text', value:'id', place:''},
        {name:'نوع بسته' , type:'select', value:'type_package', place:''},
        {name:'وضعیت' , type:'select', value:'status', place:''},
        {name:'تعداد کالا' , type:'text', value:'shps_count_from', place:'از'},
        {name:'تعداد کالا' , type: 'text', value:'shps_count_to', place:'تا'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getPackageList() {
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
        AxiosMethod.end_point = `package/crud/active`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            packageList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }

        else {
        }
    }

    return {pageLength,filterField, packageList , getPackageList, dataTableLength, page, header,loading}
}

