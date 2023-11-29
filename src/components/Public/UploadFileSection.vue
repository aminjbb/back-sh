<template>
<div class="upload-box">
    <v-row
        justify="center"
        align="center"
        class="pa-5 px-15">
        <div class="pr-5 d-flex align-center">
            <img src="@/assets/img/UploadImage.svg" alt="shavaz image">
            <div>
                <div class="pa-3" @drop.prevent="onDrop">
                    <span class="t14500 text-gray500">
                        فایل خود را بکشید یا از فایل‌های سیستم انتخاب کنید
                    </span>
                </div>

            </div>
        </div>
        <v-btn
            width="122"
            color="primary400"
            dark
            rounded
            :loading="uploadLoading"
            @click="selectFile()">
            <span>انتخاب فایل</span>
        </v-btn>
    </v-row>
</div>
<template v-if="files.length">
    <div
        v-for="(image, index) in files"
        :key="`image_${index}`"
        class="mt-10  ">
        <v-col cols="2">
            <div class="d-flex justify-space-between">
                <span>IMG-{{ image.name }}</span>
                <span class="mr-15">
                    <v-icon color="error">mdi-delete</v-icon>
                </span>
            </div>
            <v-progress-linear v-model="progressUpload" color="success"></v-progress-linear>
        </v-col>
    </div>
</template>
</template>

<script setup>
import { AxiosCall } from '@/assets/js/axios_call.js'
import {ref, onMounted, onUnmounted, computed, watch, toRefs} from 'vue'
import { useCookies } from "vue3-cookies";
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { openToast } from "@/assets/js/functions";

const emit = defineEmits(['files-dropped','getImage'])
const cookies = useCookies()
const positions = ref([])
const imageId = ref(null)
let file = ref(null)
const files = ref([])
const item = ref(null)
const uploadLoading = ref(false)
let images = ref([])
const store = useStore()
const route = useRoute()
let loading = ref(false)
const router = useRouter()

function onDrop(e) {
    files.value = e.dataTransfer.files
    file = files.value[0]
    console.log(files.value.length)
    submitImage(0)
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
async function submitImage(index) {

    uploadLoading.value = true

    //if (file.type && file.type.startsWith('image/')) {

        var formdata = new FormData();
        const AxiosMethod = new AxiosCall()
        formdata.append('file', file)
        formdata.append('module', 'page')
        AxiosMethod.using_auth = true
        AxiosMethod.store = store
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'file-manager/direct/store'
        AxiosMethod.form = formdata
        let data = await AxiosMethod.axios_image_upload()
        if (data) {
            uploadLoading.value = false
            if (index >= 0) {
                console.log(files.value.length - 1, index)
                if (files.value.length - 1 > index) {

                    file = files.value[++index]
                    const deletePosition = (index) => {
                        files.value.splice(index, 1)
                    }
                    files.value = deletePosition
                    submitImage(index)
                    emit('getImage', data);
                }
            } else {
                emit('getImage', data);
            }

            openToast(
                store,
                'آپلود با موفقیت انجام شد.',
                "success"
            );

        } else {
            uploadLoading.value = false
            openToast(
            store,
                'تو فرایند آپلود به مشکلی خوردیم',
                "error"
            );
        }
    /* } else {
        openToast(store, 'آپلود فایل مورد نظر مجاز نیست' , 'error')
        uploadLoading.value = false;
    } */
}

/**
 * Get Item
 */
function preventDefaults(e) {
    e.preventDefault()
}
const events = ['dragenter', 'dragover', 'dragleave', 'drop']
const confirmModal = computed(function () {
    return store.getters['get_confirmForm'].confirmModal
});
const progressUpload = computed(function () {
    return store.getters['get_progressUpload']
});

watch(confirmModal, (newVal, oldValue) => {
    if (!newVal) {
        if (localStorage.getItem('deleteObject') === 'done') {
            let findImageIndex = images.value.findIndex(image => image.imageId == imageId.value)
            images.value.splice(findImageIndex, 1)
            localStorage.removeItem('deleteObject')
        }
    }
});

onMounted(() => {
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
