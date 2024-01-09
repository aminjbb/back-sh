<template>
    <div class="text-right ">
        <v-dialog v-model="dialog" width="600"  >
            <v-card class="">
                <v-row
                    justify="space-between"
                    align="center"
                    class="pa-1 my-2">
                    <v-col class="mx-10" cols="2">
                        <v-btn @click="close()" variant="icon">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
    
                    <v-col cols="7" class="t16400 ">
                        ثبت مفقودی
                    </v-col>
                </v-row>
                <v-divider class="center-divider"/>
                <div class=" px-5">
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <div justify="start" class="text-center mb-3">
                            <span class="t12400 color-grey ">
                                    سریال کالا 
                                    <span class="text-red">*</span>
                                </span>
                        </div>
                    
                            <v-autocomplete
                                :items="sphssList"
                                density="compact"
                                variant="outlined"
                                item-title="name"
                                item-value="id"
                                single-line
                               
                              
                                class="mx-auto" />
                  
                        </v-col>
                    </v-row>
                    <v-row class="justify-between my-2 mx-2">
    
                        <v-col cols="3" class="d-flex mx-10 ">
                            <v-btn
                                @click="sendData()"
                                height="40"
                                rounded
                                variant="flat"
                                color="primary500"
                                class="px-5 mt-1">
                                تایید
                            </v-btn>
                        </v-col>
                        <v-col cols="3" class="d-flex justify-end mx-10">
                            <btn
                                class="mt-3 mr-2"
                                @click="close()"
                                style="cursor: pointer;">
                                انصراف
                            </btn>
                        </v-col>
                    </v-row>
                </div>
            </v-card>
        </v-dialog>
    </div>
    </template>
    
    <script>
     import {
        openToast
    } from "@/assets/js/functions";
    import BulkLabelPrint from "@/composables/BulkLabelPrint";
    import {
        AxiosCall
    } from '@/assets/js/axios_call.js'
    import Table from "@/components/BulkLabelPrint/Table/Table.vue";
    
    export default {

   

        data() {
        return {

            form: {
              
                id: '',
                name: '',
                
            },
           
           
        }},


        setup() {

           
            const {
                
             
                dataTableLength,
                page,
                header,
                loading,
                headerShps,
                getShpssDetailLost,
                shpssDetailLost
            } = BulkLabelPrint();
    
            return {
                getShpssDetailLost,
                shpssDetailLost,
                dataTableLength,
                page,
                header,
                loading,
                headerShps
            };
        },
        components: {
            
          
    
        },
    
        methods: {

            async sendData() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'report/crud/create'
            AxiosMethod.form = formdata

            formdata.append('package_id', this.packageId);
            formdata.append('report_type', this.reportType);
            formdata.append('shps_s', this.shpsS);
            
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
      
            if (data) {
                this.loading = false;
                openToast(
                        this.$store,
                        '',
                        "success"
                    );
    

            } else {
                this.loading = false
            }
        },

    
            close() {
                const form = {
                    dialog: false,
                    object: ''
                }
                this.$store.commit('set_modalLostShpss', form)
            },
            validate() {
                this.$refs.BlogForm.$refs.addForm.validate()
                setTimeout(() => {
                    if (this.$refs.BlogForm.valid) this.createBlog()
                }, 200)
            },
           
           
    

    
    
        },
        watch: {
            'form.selectedItems': function(newVal, oldVal) {
        console.log('Selected Items Changed:', newVal)
    }
    },

    
        computed: {

            sphssList() {
            try {
                let shpss = []
                this.shpssDetailLostObject.forEach(item => {
                    const form = {
                        name: item?.shps?.sku?.sku?.label,
                        id: item?.id
                        
                    }
                    shpss.push(form)
                })
                return shpss
            } catch (e) {
                return  []
            }
        },
            packageId() {
      
                return this.$store.getters['get_packageId']
            },
            reportType() {
                return this.$store.getters['get_reportType'];
            },
            shpsS(){
                return this.$store.getters['get_shps_s']
            },
        
            dialog() {
                return this.$store.getters['get_modalLostShpss']
            },
            shpssDetailLostObject() {
                const data = this.$store.getters['get_modalLostShpssObject'];
        return data;                
            },
        }
    }
    </script>
    