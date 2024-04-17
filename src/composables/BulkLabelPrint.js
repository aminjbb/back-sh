import { ref } from 'vue';
import { PanelFilter } from '@/assets/js/filter.js'
import {  useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const BulkLabelPrintList = ref([])
    const shpssDetailLost = ref([]);
    const shpsList = ref([])
    const cargoList = ref([]);
    const cookies = useCookies()
    const dataTableLength = ref(25)
    const route = useRoute()
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
    const loading = ref(false)
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
            this.$store.commit('setShipmentData', {
                shipment_id: data.data.shipment_id,
                shps: data.data.shps,
                package_id: data.data.package_id
            });
    

            const form = {
                dialog: true,
                object: data.data
            };
            this.$store.commit('set_modalLostShpss', form);
        }
    
        loading.value = false;
    }
    
    return { cargoList, getShpsList, BulkLabelPrintList, dataTableLength, getShpss , getShpssDetailLost,shpssDetailLost ,
        loading , packageHeader , cargoReceivingHeader , shpsList}
}

