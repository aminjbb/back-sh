import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const BulkLabelPrintList = ref([]);

    const cargoList = ref([]);
    const cookies = useCookies()
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const router = useRouter()
    const route = useRoute()
    const page = ref(1)

    const packageHeader = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه بسته' , show:true , value:'created_at', order: false},
        {name:'نوع بسته' , show:true , value:'name', order: false},
        {name:'تعداد کالا' , show:true ,  value:'label', order: false},
        {name:'وضعیت ' , show:true, value:'is_active', order: false},
    ]);

    const cargoReceivingHeader = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه کالا' , show:true , value:'id', order: false},
        {name:'نام کالا' , show:true , value:'name', order: false},
        {name:'تعداد کالا ' , show:true, value:'is_active', order: false},
        {name:'ذخیره ' , show:true, value:'is_active', order: false},
    ]);



   

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getShpsList(packageId= null) {
        loading.value = true;
        let params = packageId ? { id: packageId } : {};
        let paramsQuery = filter.params_generator(params);
        
    
        const AxiosMethod = new AxiosCall();
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken');
        AxiosMethod.end_point = `package/crud/index${paramsQuery}`;
        try {
            let response = await AxiosMethod.axios_get();
            console.log("API Response:", response); 
    
            loading.value = false;
    
            if (response && response.data && response.data.data) {
                pageLength.value = response.data.last_page;
                return response.data.data; 
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error in API call:", error);
            loading.value = false;
            return [];
        }
    }


    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/categories/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/categories/index'+ filter.params_generator(route.query))
    }


    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getCategories(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return { pageLength, cargoList, addPerPage, getShpsList, BulkLabelPrintList, dataTableLength , page   , item , 
        loading , packageHeader , cargoReceivingHeader}
}

