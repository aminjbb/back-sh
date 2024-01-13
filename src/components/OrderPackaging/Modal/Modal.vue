<template>
    <div class="text-right ">
        <v-dialog v-model="dialog" width="700"  >
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
                        پرینت برچسب سفارش
                    </v-col>
                </v-row>
                <v-divider class="center-divider"/>
                <div class=" px-5">
                <div >
                    <div class=" mt-10 d-flex justify-center " >
                        
                    
                        <div class="border-nested-modal">    
                    <div>
                        <div class="d-flex justify-between">
                            <span>image</span>
                            <span>وزن بسته</span>
                            <span>فرستنده</span>
                        </div>
                    </div>
                    <div> 
                        <span>کد پستی</span>    
                    </div>
                    <div class="d-flex justify-between"> 
                        <span>گیرنده</span>
                        <span>شماره تماس</span>
                    </div>
                    <div class="d-flex justify-end">
                        <span>:ادرس</span>
                    </div>
                                        
                    <div class="main-body-modal">
                        <div class="d-flex justify-end">
                            <span>:ادرس</span>
                        </div>
                        <div class="d-flex justify-between">
                            <span>:کد پستی</span>
                            <span>:شماره فاکتور</span>
                        </div>
                        
                    </div>    
                    <div class="d-flex justify-center">
                            image
                        </div>                       
                </div>
                  
                     </div>
                    </div>
                    <v-row class="justify-between my-2 mx-2">
    
                        <v-col cols="3" class="d-flex mx-10 ">
                            <v-btn
                               
                                height="40"                             
                                rounded
                                variant="flat"
                                class="px-5 mt-1 border ">
                                <template v-slot:prepend>
                                <v-icon>mdi-printer-outline</v-icon>
                                </template>
                                پرینت برچسب
                                 </v-btn>
                            <span>
                                
                            </span>
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
    import OrderPackaging from "@/composables/OrderPackaging";
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
            } = OrderPackaging();
    
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
           
        
            dialog() {
                return this.$store.getters['get_modalPrintOrder']
            },
            shpssDetailLostObject() {
                const data = this.$store.getters['get_modalLostShpssObject'];
        return data;                
            },
        }
    }
    </script>

<style>














</style>
    