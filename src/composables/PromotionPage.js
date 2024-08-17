import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
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
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', title: 'ردیف', show: true , align:'center', sortable:false, key:'row',},
        { name: 'نام انگلیسی', title: 'نام انگلیسی', show: true , align:'center', sortable: false, key:'name',},
        { name: 'نام فارسی', title: 'نام فارسی', show: true , align:'center', sortable: false, key:'label',},
        { name: 'شناسه صفحه', title: 'شناسه صفحه', show: true, align:'center', key:'id'},
        { name: 'تاریخ ساخت', title: 'تاریخ ساخت', show: true , align:'center', key:'created_at_fa'},
        { name: 'تاریخ ویرایش', title: 'تاریخ ویرایش', show: true, align:'center', key:'updated_at_fa'},
        { name: 'وضعیت', title: 'وضعیت', show: true, align:'center', sortable: false, key:'is_active'},
        { name: 'عملیات',title: 'عملیات', show: true , align:'center', sortable: false, key:'action', fixed: true},

    ]);
    const skuGroupHeader =ref([
        { name: 'ردیف',title: 'ردیف', show: true , key:'row', sortable:false, align:'center'},
        { name: 'نام کالا',title: 'نام کالا', show: true , key:'sku_label', sortable: false, align:'center'},
        { name: 'شناسه کالا',title: 'شناسه کالا', show: true , key:'id', sortable: false, align:'center'},
        { name: 'ترتیب نمایش',title: 'ترتیب نمایش', show: true, key:'custom', align:'center'},
        { name: 'ذخیره ',title: 'ذخیره ', show: true, key:'custom2' , sortable: false, align:'center'},
        { name: 'عملیات',title: 'عملیات', show: true , align:'center', sortable: false, key:'action', fixed: true},

    ]);

    const filterFieldPromotionSku = [
        { name:'نام فارسی' , type:'text', value:'sku_name'},
        { name: 'شناسه', type: 'text', value: 'sku_id' },
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
    };
    async function getPromotionShpsList(page , perPage) {
        loading.value = true
        let query = route.query
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:promotionPage.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:promotionPage.value,
                    per_page : dataTableLength.value,
                }
            }

        }
        else{
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:promotionPage.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:promotionPage.value,
                    per_page : dataTableLength.value
                }
            }

        }
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
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
    }

    return {getPromotionShpsList,promotionShpsList, pageLengthShpsList,promotion , promotions , getPromotion ,
        getPromotions, pageLength, filterField , dataTableLength, page, header,skuGroupHeader , loading , promotionPage, filterFieldPromotionSku }
}

