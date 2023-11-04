<template >
    <div class="stretch-table">
        <v-card  class="ma-5 br-12 pa-5" >
            <div class="upload-box">
                <v-row
                    justify="space-between"
                    align="center"
                    class="pa-2"
                >
                    <v-col cols="5" @drop.prevent="onDrop"> 
                       <v-row class="pr-5">
                        <img 
                            src="@/assets/img/UploadImage.svg"
                            alt="shavaz image"
                        >
                        <div>
                            <div class="pa-3">
                                <span class="t14500">
                                    لطفا فایل خود را بکشید و رها کنید.
                                </span>
                            </div>

                            <div class="pr-3">
                                <span class="t14300">
                                    فرمت های : JPEG , PNG , jpg (حداکثر سایز 12 MG ) 
                                </span>
                            </div>
                        </div>
                       </v-row>
                    </v-col>

                    <v-col
                        cols="2"
                        class="pt-6 pr-15"
                    >
                        <v-btn
                            width="122"
                            color="Slate"
                            dark
                            rounded
                            :loading="uploadLoading"
                            @click="selectFile()"
                        >
                            <span>انتخاب عکس</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-card>   
        <v-card class="ma-5 br-12 scroller"  >
            <div class="example pa-15 mb-10">
              <v-row>
                <v-col cols="6" v-for="(item, index) in images">
                  <div class="d-flex justify-center align-center">
                    <div class="position__relative">
                     <v-btn @click="removeItem(item.imageId)" variant="icon" class="position__absolute position__top-left">
                       <v-icon color="red">
                         mdi-trash-can
                       </v-icon>
                     </v-btn>
                      <img :src="item.imageUrl"  width="500" height="350" alt="shavaz image">
                    </div>

                  </div>
                  <v-row justify="center" align="center">
                    <v-col cols="6">
                      <div class="text-right my-5">
                            <span class="t14500">
                                اولویت
                            </span>
                      </div>
                      <v-text-field
                          type="number"
                          density="compact"
                          variant="outlined"
                          single-line
                          label="اولویت"
                          v-model="images[index].priority"
                          :rules="rule"
                      />
                    </v-col>
                    <v-col cols="6">
                      <div class="text-right my-5">
                            <span class="t14500">
                                جایگاه
                            </span>
                      </div>
                      <v-select
                          :items="positions"
                          density="compact"
                          variant="outlined"
                          v-model="images[index].position"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>

            <v-row
                class="position__absolute bottom left pl-5"
                justify="end"
            >
                <v-btn
                    :loading="loading"
                    @click="validate()"
                    variant="outlined"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1"
                >    
                    تایید
               </v-btn>

               <v-btn 
                    @click="$router.go(-1)"
                    variant="outlined"
                    height="40"
                    rounded
                    class="px-8 mt-1 mr-5"
                >
                    <template v-slot:prepend>
                        <v-icon>mdi-cancel</v-icon>
                    </template>
                     بازگشت
               </v-btn>
            </v-row>
        </v-card>
    </div>
</template>

<script setup>
import { AxiosCall } from '@/assets/js/axios_call.js'
import {ref, onMounted, onUnmounted, computed, watch, toRefs} from 'vue'
import { useCookies } from "vue3-cookies";
import { openConfirm } from '@/assets/js/functions'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { openToast } from "@/assets/js/functions";

const emit = defineEmits(['files-dropped'])
const cookies = useCookies()
const positions = ref([])
const imageId = ref(null)
let file = ref(null)
const item = ref(null)
const uploadLoading = ref(false)
let images = ref([])
const store = useStore()
// const router = useRouter()
const route = useRoute()
let loading = ref(false)
const router = useRouter()

const props = defineProps({
  attachUrl: String,
  getUrl: String,
  imageLength: Number,
  module:String,
  routePath:String
});
const { attachUrl } = toRefs(props);
const { getUrl } = toRefs(props);
const { imageLength } = toRefs(props);
const { module } = toRefs(props);
const { routePath } = toRefs(props);

function onDrop(e) {
    file = e.dataTransfer.files[0]
    submitImage()
}
/**
 * Select file
 */
function selectFile() {
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = e => {
     file = e.target.files[0];
    submitImage()
  }
  input.click();
}
function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}
/**
 * Submit Image
 */
async function submitImage() {
  uploadLoading.value = true
    var formdata = new FormData();
    const AxiosMethod = new AxiosCall()
    formdata.append('file', file)
    formdata.append('module', module)
    AxiosMethod.using_auth = true
    AxiosMethod.token = cookies.cookies.get('adminToken')
    AxiosMethod.end_point = 'file-manager/direct/store'
    AxiosMethod.form = formdata
    let data = await AxiosMethod.axios_image_upload()
    if (data) {
        const form = {
          imageUrl:data.data.data.url,
          imageId:data.data.data.image_id,
          priority:'1',
          position:positions.value[0].value
      }
        images.value.push(form)
      uploadLoading.value = false
    }
    else {
      uploadLoading.value = false
    }
}

/**
 * Get Item
 */
async function getItem() {
    const AxiosMethod = new AxiosCall()
    AxiosMethod.using_auth = true
    AxiosMethod.token = cookies.cookies.get('adminToken')
    AxiosMethod.end_point = getUrl.value + route.params.objectId
    let data = await AxiosMethod.axios_get()
    if (data) {
        data.data.images.forEach(element => {
            const form = {
              imageUrl:element.image_url,
              imageId:element.id,
              priority:element.priority,
              position:element.position.id

            }
        images.value.push(form)
        });
        item.value = data.data
    }
    else {
    }
};

async function getPositions() {
    const AxiosMethod = new AxiosCall()
    AxiosMethod.using_auth = true
    AxiosMethod.token = cookies.cookies.get('adminToken')
    AxiosMethod.end_point = 'file-manager/image/position/crud/index'
    let data = await AxiosMethod.axios_get()
    if (data) {
      data.data.data.forEach(position =>{
        const form = {
          title : position.label,
          value : position.id
        }
        positions.value.push(form)
      })
      
    }
    else {
    }
};

function preventDefaults(e) {
    e.preventDefault()
}

function removeItem(id) {
    imageId.value = id
    openConfirm(store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
}

function validate(){
  if(imageLength.value <= images.value.length) assignImage()
  else openToast(store , `حداقل باید ${imageLength.value}  عکس وارد کنید ` , 'error')
}
async function assignImage() {
    loading.value = true
    var formdata = new FormData();
    const AxiosMethod = new AxiosCall()
    images.value.forEach((image, index) => {
        formdata.append(`image_ids[${index}][image_id]`, image.imageId)
        formdata.append(`image_ids[${index}][image_position_id]`, image.position)
        formdata.append(`image_ids[${index}][priority]`, image.priority)
    });
    AxiosMethod.using_auth = true
    AxiosMethod.toast_success = true
    AxiosMethod.store = store
    AxiosMethod.token = cookies.cookies.get('adminToken')
    AxiosMethod.end_point = attachUrl.value + route.params.objectId
    AxiosMethod.form = formdata

    let data = await AxiosMethod.axios_post()
    if (data) {
        loading.value = false
        if(routePath && routePath.value){
          router.push(routePath.value)
        }
    }
    else {
        loading.value = false
    }
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']
const confirmModal = computed(function () {
    return store.getters['get_confirmForm'].confirmModal
});

watch(confirmModal, (newVal, oldValue) => {
   if (!newVal){
     if (localStorage.getItem('deleteObject') === 'done'){
       let findImageIndex = images.value.findIndex(image => image.imageId == imageId.value)
       images.value.splice(findImageIndex,1)
       localStorage.removeItem('deleteObject')
     }
   }
});

onMounted(() => {
    getItem()
    getPositions()
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
})

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})
</script>
