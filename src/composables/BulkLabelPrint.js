import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const BulkLabelPrintList = ref([])
    const shpssDetailLost = ref([]);
    const shpsList = ref([])
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
        {name:' شناسه محموله ' , show:true, value:'is_active', order: false},
        {name:'ذخیره ' , show:true, value:'is_active', order: false},
      
    ]);



   

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getShpsList(packageId = null) {
        loading.value = true;
        const AxiosMethod = new AxiosCall();
        AxiosMethod.using_auth = true;
        AxiosMethod.token = cookies.cookies.get('adminToken');
        
        AxiosMethod.end_point = packageId ? `package/shps/list/${packageId}` : `package/shps/list/`;
        
        try {
            let response = await AxiosMethod.axios_get();
    
            if (response && response.data && response.data.shps_list) {
                response.data.shps_list.forEach(item => {
                    this.$store.commit('set_shipmentId',  item.shipment_id);

                    this.$store.commit('set_shpsId',  item.shps);
                });

                shpsList.value = response.data; 
            } else {
                shpsList.value = [];
            }
        } catch (error) {
            console.error("Error in API call:", error);
            return [];
        } finally {
            loading.value = false;
        }
    }
    async function getShpssDetailLost(item) {
        
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = `package/shps/items/${item.package_id}?shps=${item.shps}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            console.log(data);
          const form = {
            dialog :true,
            object : data.data
          }
          shpssDetailLost.value = data
          this.$store.commit('set_modalLostShpss' , form)
        }
      }

      async function getShpss(query) {
        loading.value = true;
        let paramsQuery = null;
        if (query) {
            paramsQuery = filter.params_generator(query.query);
        } else {
            paramsQuery = filter.params_generator(route.query);
        }
    
        const AxiosMethod = new AxiosCall();
        AxiosMethod.using_auth = true;
        AxiosMethod.token = this.$cookies.get('adminToken');
        AxiosMethod.end_point = `package/shps/items/${paramsQuery.package_id}/${paramsQuery.shps}`;
    
        let data = await AxiosMethod.axios_get();
        console.log("API Response:", data);
        if (data && data.data) {
            // Log the values
            console.log("API Response:", data.data);
            console.log("shipment_id:", data.data.shipment_id);
            console.log("shps:", data.data.shps);
            console.log("package_id:", data.data.package_id);
    
            // Commit the values to Vuex
            this.$store.commit('setShipmentData', {
                shipment_id: data.data.shipment_id,
                shps: data.data.shps,
                package_id: data.data.package_id
            });
    
            // Continue with setting up your form
            const form = {
                dialog: true,
                object: data.data
            };
            this.$store.commit('set_modalLostShpss', form);
        }
    
        loading.value = false;
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

    return { pageLength, cargoList, addPerPage, getShpsList, BulkLabelPrintList, dataTableLength , page, getShpss , getShpssDetailLost,shpssDetailLost, item , 
        loading , packageHeader , cargoReceivingHeader , shpsList}
}

