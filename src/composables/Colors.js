import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const color = ref([]);
    const allColors = ref([]);
    const colorGroups = ref([]);
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength = ref(1)
    const cookies = useCookies()
    const route = useRoute()

    const header = ref([
        {name:'ردیف' ,title:'ردیف' , show:true , key:'row', align:'center', sortable: false},
        {name:'شناسه' ,title:'شناسه' , show:true , key:'id', align:'center', sortable: false},
        {name:'نام انگلیسی' ,title:'نام انگلیسی' , show:true , key:'name', align:'center', sortable: false},
        {name:'نام فارسی' ,title:'نام فارسی' , show:true ,  key:'color', align:'center', sortable: false},
        {name:'گروه' ,title:'گروه' , show:true, key:'group', align:'center', sortable: false},
        {name:'فعال سازی ',title:'فعال سازی ' , show:true, key:'is_active',align:'center', sortable: false},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true}
    ]);

    const filterField = [
        { name: 'نام انگلیسی', type: 'text', value: 'name' },
        { name: 'نام فارسی', type: 'text', value: 'label' },
        { name: 'شناسه رنگ', type: 'text', value: 'id' },
        { name: 'گروه', type: 'text', value: 'group' },
        { name: 'فعال سازی ', type: 'select', value: 'is_active' },
        { name:'تاریخ ایجاد' , type: 'date', value:'created_at'},
        { name:'تاریخ بروز‌رسانی' , type: 'date', value:'updated_at'},
    ];
    
    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getColor() {
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
        AxiosMethod.end_point = `product/color/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            color.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

    async function getAllColor(query) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/color/crud/index?per_page=1000000&order=created_at&order_type=desc`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            allColors.value = data.data
        }
    };

    async function getGroupColor(query) {
        loading.value = true
        var formdata = {}
        if (query) {
            formdata = query
        }
        else if (route.query) {
            formdata = route.query
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'product/color/get/groups?per_page=100000'
        AxiosMethod.form = formdata

        let data = await AxiosMethod.axios_get()
        if (data) {
            colorGroups.value = data.data
            loading.value = false
        }
    }
    return { pageLength, filterField, color, getColor, getGroupColor,getAllColor, allColors, colorGroups, dataTableLength, page, header, item , loading}
}

