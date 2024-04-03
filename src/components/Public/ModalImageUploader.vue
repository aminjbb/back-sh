<template>
    <div class="text-center image-uploader">
        <v-btn @click="dialog = true" variant="outlined" height="40" class="px-5 mt-1 w-100 image-uploader__button">
            <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
            </template>
            مدیریت تصاویر
        </v-btn>

        <v-dialog v-model="dialog" width="1024">
            <v-card>
                <!-- {{ imageList }} -->
                <header class="pa-5 d-flex align-center justify-space-between mt-2">
                    <v-btn @click="dialog = false" variant="icon">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <span class="t14500">
                       آپلود تصاویر
                    </span>
                </header>

                <div class="pa-2 br-12 pa-5 d--rtl">
                    <div class="upload-box">
                        <v-row justify="space-between" align="center" class="pa-2">
                            <v-col cols="6" @drop.prevent="onDrop">
                                <v-row class="pr-5">
                                    <img src="@/assets/img/UploadImage.svg" alt="shavaz image">
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

                            <v-col cols="6" class="pt-6 pr-15 d-flex justify-end">
                                <v-btn width="122" color="primary500" dark rounded @click="selectFile()" :loading="loading">
                                    <span>انتخاب عکس</span>
                                </v-btn>

                                <!-- Hidden file input -->
                                <input type="file" ref="fileInput" style="display: none" />
                            </v-col>
                        </v-row>
                    </div>

                    <y-row>
                        <div class="example pa-15 ">
                            <v-row>
                                <v-col cols="6" v-for="(item, index) in images" :key="`image${index}`" class="image-uploader__item">
                                    <div class="d-flex justify-center align-center w-100 image-uploader__item__image">
                                        <span class="image-uploader__delete-icon d-flex justify-center align-center">
                                            <v-icon @click="removeItem(item.id)" size="large" color="red-accent-4">mdi-delete</v-icon>
                                        </span>
                                        <img class="w-100" :src="item.image_url" width="500" height="350" alt="shavaz image">
                                    </div>
                                    <v-row justify="center" align="center">
                                        <v-col cols="6">
                                            <div class="text-right my-5">
                                                <span class="t14500">
                                                    موقعیت
                                                </span>
                                            </div>
                                            <v-select
                                                v-model="images[index].position"
                                                :items="positionList.data"
                                                class="t1330"
                                                variant="outlined"
                                                item-title="label"
                                                return-object
                                            />
                                        </v-col>
                                        <v-col cols="6">
                                            <div class="text-right my-5">
                                                <span class="t14500">
                                                    اولویت
                                                </span>
                                            </div>
                                            <v-text-field type="number" density="compact" variant="outlined" single-line
                                                label="اولویت" v-model="images[index].priority" :rules="rule" />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </div>
                    </y-row>
                </div>

                <footer class="text-center pb-5">
                    <v-btn @click="submitModal(); dialog = false" variant="outlined" height="40" rounded class="px-5 mt-1">
                        <template v-slot:prepend>
                            <v-icon :icon= " edit ? 'mdi-pen' : 'mdi-plus'"/>
                        </template>
                        <template v-if="edit">
                            ویرایش
                        </template>
                        <template v-else>
                            افزودن
                        </template>
                    </v-btn>

                    <div v-show="progressUpload > 0" class="text-center mt-5">
                        <v-progress-circular :model-value="progressUpload" color="blue-grey" />
                    </div>
                </footer>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { AxiosCall } from '@/assets/js/axios_call.js'
import { ref, onMounted, onUnmounted, computed, watch, toRefs } from 'vue'
import { useCookies } from "vue3-cookies";
import { openConfirm } from '@/assets/js/functions'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['modalSubmitted'])
const cookies = useCookies()
const imageId = ref(null)
let file = ref(null)
let images = ref([])
const store = useStore()
const router = useRouter()
const route = useRoute()
let loading = ref(false)
let dialog = ref(false)
const positionList = ref([]);

const props = defineProps({
  imageList: Object,
  module: String,
  edit:Boolean
});

const { imageList } = toRefs(props);
const { module } = toRefs(props);
const { edit } = toRefs(props);

/**
 * Get positions
 */
 async function getPositions() {
    const AxiosMethod = new AxiosCall()
    AxiosMethod.using_auth = true
    AxiosMethod.token = cookies.cookies.get('adminToken')
    AxiosMethod.end_point = `file-manager/image/position/crud/index`
    let data = await AxiosMethod.axios_get()
    if (data) {
        positionList.value = data.data;
    }
};


function onDrop(e) {
    file = e.dataTransfer.files[0]
    submitImage(file)
}

/**
 * Select file
 */
function selectFile() {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        file = e.target.files[0];
        submitImage(file)
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
 * Upload Image
 */
async function submitImage(image) {
    loading.value = true

    var formdata = new FormData();
    const AxiosMethod = new AxiosCall()
    formdata.append('file', image)
    formdata.append('module', module.value)
    AxiosMethod.using_auth = true
    AxiosMethod.token = cookies.cookies.get('adminToken')
    AxiosMethod.end_point = 'file-manager/direct/store'
    AxiosMethod.form = formdata
    let data = await AxiosMethod.axios_image_upload()
    if (data) {
        loading.value = false;
        const form = {
            image_url: data.data.data.url,
            id: data.data.data.image_id,
            file_id: data.data.data.file_id,
            priority: '1',
            position: positionList.value.data[0]
        }
        images.value.push(form)
    }
    else {
        loading.value = false
    }
}

/**
 * Submit images modal
 */
function submitModal() {
    emit('modalSubmitted', images.value);
}

function preventDefaults(e) {
    e.preventDefault()
}

/**
 * Remove image
 */
function removeItem(id) {
    imageId.value = id;
    openConfirm(store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

const confirmModal = computed(function () {
    return store.getters['get_confirmForm'].confirmModal
});

watch(
    confirmModal, (newVal, oldValue) => {
        if (!newVal) {
            if (localStorage.getItem('deleteObject') === 'done') {
                let findImageIndex = images.value.findIndex(image => image.id == imageId.value)
                if (findImageIndex >= 0) { // Check if the image is found (index is >= 0)
                    images.value.splice(findImageIndex, 1)
                }
                localStorage.removeItem('deleteObject')
            }
        }
    },
);

watch(imageList, (newVal, oldValue) => {
        if(newVal && newVal.length){
            images.value.push(...newVal);
        }
    }, 
);

onMounted(() => {
    getPositions();
    
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