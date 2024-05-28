import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import {  onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_menu.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const promotions =ref([])
    const promotion = ref(null)
    const promotionShpsList = ref([])
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const pageLengthShpsList = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const promotionPage = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام انگلیسی', show: true , value:'name', order: false},
        { name: 'نام فارسی', show: true , value:'label', order: false},
        { name: 'شناسه صفحه', show: true, value:'id' , order: false},
        { name: 'تاریخ ساخت', show: true , value:'created_at', order: true},
        { name: 'تاریخ ویرایش', show: true, value:'updated_at', order: true },
        { name: 'وضعیت', show: true, value:'is_active', order: false },
    ]);
    const skuGroupHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام کالا', show: true , value:'name', order: false},
        { name: 'شناسه کالا', show: true , value:'label', order: false},
        { name: 'ترتیب نمایش', show: true, value:'id' , order: true},
        { name: 'ذخیره ', show: true, value:'id' , order: false},
        

        
    ]);

    const filterFieldPromotionSku = [
        {name:'نام فارسی' , type:'text', value:'label'},
        { name: 'شناسه', type: 'text', value: 'id' },
    ];


    const filterField = [
        {name:'نام فارسی' , type:'text', value:'label'},
        {name: 'نام انگلیسی', type: 'text', value: 'name'},
        { name: 'شناسه', type: 'text', value: 'id' },
        { name:'تاریخ ساخت' , type: 'date', value:'created_at'},
        { name: 'وضعیت', type:'select', value:'is_active'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getPromotions() {
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
        AxiosMethod.end_point = `page/promotion/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            promotions.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }

        else {
        }
    };
    async function getPromotionShpsList(page , perPage) {
        loading.value = true
        const form ={
            page :page,
            per_page : perPage
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.form = form
        AxiosMethod.end_point = `page/promotion/crud/get/seller-sku/${route.params.promotionId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLengthShpsList.value = Math.ceil(data.data.total / data.data.per_page)
            promotionShpsList.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }

        else {
        }
    };
    async function getPromotion(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/promotion/crud/get/${route.params.promotionId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            promotion.value = data.data
        }

        else {
        }
    }

    return {getPromotionShpsList,promotionShpsList, pageLengthShpsList,promotion , promotions , getPromotion ,
        getPromotions, pageLength, filterField , dataTableLength, page, header,skuGroupHeader , loading , promotionPage, filterFieldPromotionSku }
}

