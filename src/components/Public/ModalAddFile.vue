<template>
    <div class="text-center">
        <v-btn
            @click="dialog = true"
            variant="outlined"
            height="40"
            rounded
            class="px-5 mt-1 mr-5"
        >
            <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
            </template>
            {{title}}
        </v-btn>
       
        <v-dialog
            v-model="dialog"
            width="468"
        >
            <v-card>
                <v-row justify="center" align="center" class="pa-5">
                    <v-col cols="3">
                        <v-btn @click="dialog = false" variant="icon">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>

                    <v-col cols="9">
                        <div class="text-left pl-15">
                            <span class="t14 w500">
                            {{title}}
                            </span>
                        </div>
                    </v-col>
                </v-row>
                <div class="mt-3 mb-8  px-5">
                    <v-divider/>
                </div>

                <div class="text-center px-5" >
                    <v-file-input
                        :accept="accept"
                        v-model="file"
                        label="File input"
                        variant="outlined"
                    />
                </div>
                <div class="px-5" >
                    <v-row 
                        v-if="type === 'image'"
                        justify="end"
                    >
                        <v-col cols="6" >
                            <v-checkbox
                                v-model="widthAndHeight"
                                class="mr-8"
                            >
                                <template v-slot:label>
                                    <div>
                                        <span class="t14 w500">تایین عرض و ارتفاع</span>
                                    </div>
                                </template>
                            </v-checkbox>

                            <v-checkbox
                                v-model="converImage"
                                class="mr-8"
                            >
                                <template v-slot:label>
                                    <div>
                                        <span class="t14 w500">تغییر فرمت عکس</span>
                                    </div>
                                </template>
                            </v-checkbox>
                        </v-col>

                        <v-col 
                            v-if="widthAndHeight"
                            cols="12"
                        >
                            <v-row justify="center">
                                <v-col cols="5">
                                    <v-text-field
                                        density="compact"
                                        variant="outlined"
                                        single-line
                                        label="عرض"
                                        type="number"
                                        v-model="width"
                                    />
                                </v-col>
                                
                                <v-col cols="5">
                                    <v-text-field
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                        single-line
                                        label="ارتفاع"
                                        v-model="height"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>

                <div class="mt-3 mb-8 px-5">
                    <v-divider />
                </div>
            
                <div class="text-center pb-5"> 
                    <v-btn
                        @click="submitImage()"
                        variant="outlined"
                        height="40"
                        rounded
                        class="px-5 mt-1"
                    >
                        <template v-slot:prepend>
                            <v-icon>mdi-plus</v-icon>
                        </template>
                        آپلود 
                    </v-btn>

                    <div
                        v-show="progressUpload > 0"
                        class="text-center mt-5"
                    >
                        <v-progress-circular
                            :model-value="progressUpload"
                            color="blue-grey"
                        />
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { AxiosCall } from '@/assets/js/axios_call.js'
export default {
    props: {
        getImageId: { type: Function },
        title: 'اضافه کردن عکس"',
        type: 'image',
        module: '',
        accept:"image/*"
    },

    data() {
        return {
            dialog: false,
            srcImage: '',
            file: '',
            loading: false,
            widthAndHeight: false,
            width:'',
            height:'',
            converImage:false

        }
    },

    methods: {
        /**
         * Reset data
         */
        resetData(){
            this.file = ''
             this.widthAndHeight=  false,
             this.width= '',
             this.height= '',
             this.converImage= false
             this.$store.commit('set_progressUpload' , 0)
        },

        /**
         * Submit image
         */
        async submitImage() {
            this.loading = true
            var formdata = new FormData();
            
            formdata.append('file', this.file[0])
            formdata.append('module', this.module)
            if(this.widthAndHeight) {
                formdata.append('width', this.width)
                formdata.append('height', this.height)
            }
            if (this.converImage)  formdata.append('should_convert', 1)
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth =true
            AxiosMethod.token =this.$cookies.get('adminToken')
            AxiosMethod.end_point = 'file-manager/direct/store'
            AxiosMethod.form = formdata
            AxiosMethod.store = this.$store
            let data = await AxiosMethod.axios_image_upload()
            if (data) {
                this.loading = false
                this.resetData()
                this.getImageId(data.data)
                this.dialog = false
            }
            else {
                this.loading = false
            }
        }
    },

    computed: {
        progressUpload() {
            return this.$store.getters['get_progressUpload']
        }
    }
}
</script>