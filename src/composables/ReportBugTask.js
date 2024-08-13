import {ref} from 'vue';
import {useCookies} from "vue3-cookies";
import {AxiosCall} from "@/assets/js/axios_call";
import { useRoute } from 'vue-router'
import {openToast} from "@/assets/js/functions";

export default function setup() {

    const header = ref([
        {name: 'ردیف',title: 'ردیف', show: true, key: 'row', sortable: false, align:'center'},
        {name: 'شناسه  shps' ,title: 'شناسه  shps' , show:true, key:'shps', sortable: false, align:'center'},
        {name: 'نام کالا ',title: 'نام کالا ', show: true, key: 'sku_label', sortable: false, align:'center'},
        {name: 'تعداد درخواستی' ,title: 'تعداد درخواستی' , show:true, key:'count', sortable: false, align:'center'},
        {name: 'تعداد پیک شده' ,title: 'تعداد پیک شده' , show:true, key:'picked_count', sortable: false, align:'center'},
        {name: 'نام پیک آپر ',title: 'نام پیک آپر ', show: true, key: 'pick_upper', sortable: false, align:'center'},
        {name: ' تاریخ بررسی ',title: ' تاریخ بررسی ', show: true, key: 'updated_at_fa', align:'center'},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const filterField = ref([
        {name: 'شناسه SKU', type: 'text', value: 'seller_sku_id'},
        {name: 'نام کالا', type: 'text', value: 'sku_name'},
        {name: 'نام پیک آپر', type: 'auto-complete', value: 'admin_id'},
        {name: 'تاریخ بروزرسانی', type: 'date', value: 'updated_at_fa'},
    ]);

    const page = ref(1)
    const pageLength = ref(1)
    const dataTableLength = ref(25)
    const loading = ref(false)

    const cookies = useCookies()
    const route = useRoute()

    /*report bugs*/

    const ReportBugs = ref([]);
    async function getReports() {

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
        AxiosMethod.end_point = `warehouse/order/pickup/index-assigned-tasks`
        let res = await AxiosMethod.axios_get()
        if (res) {
            pageLength.value = Math.ceil(res.data.total / res.data.per_page)
            ReportBugs.value = res.data.data
            loading.value = false
        }
        else {
        }
    }

    /*report bug*/
    async function sendReportBug(id, des) {

        const AxiosMethod = new AxiosCall()
        loading.value = true
        let formData = new FormData();
        AxiosMethod.form = formData
        formData.append('description', des)

        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = `warehouse/order/pickup/report-bug/`  + id

        let res = await AxiosMethod.axios_post()
        if (res) {
            loading.value = false
            openToast(
                this.$store,
                ' باگ گزارش شد ',
                "success")
        }
        else{
            loading.value = true
            openToast(
                this.store,
                'انجام عملیات با مشکل مواجه شذ ',
                "error"
            );
        }
    }

    return {header, filterField, page, pageLength, dataTableLength, loading, ReportBugs, getReports, sendReportBug }
}
