<template>
  <div class="text-center image-uploader">

    <v-avatar  @click="dialog = true" :color="!avatar ? 'info' :''" size="x-large">
      <img width="64" height="64" v-if="avatar" :src="avatar" alt="">
      <v-icon size="62" v-else>
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <v-dialog v-model="dialog" width="1024">
      <v-card>
        <header class="pa-5 d-flex align-center justify-space-between mt-2">
          <v-btn @click="dialog = false" variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <span class="t14 w500">
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
                                            <span class="t14 w500">
                                                لطفا فایل خود را بکشید و رها کنید.
                                            </span>
                    </div>

                    <div class="pr-3">
                                            <span class="t14 w300">
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
                <input type="file" ref="fileInput" style="display: none" @change="onFileChange" />
              </v-col>
            </v-row>
          </div>

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
import { ref, computed, toRefs } from 'vue'
import { useCookies } from "vue3-cookies";
import { openToast } from '@/assets/js/functions'
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
const props = defineProps({
  getAvatar: Function,

});
const { getAvatar } = toRefs(props);
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

  var formData = new FormData();
  const AxiosMethod = new AxiosCall()
  formData.append('file', image)
  formData.append('module', 'avatar')
  AxiosMethod.using_auth = true
  AxiosMethod.token = cookies.cookies.get('adminToken')
  AxiosMethod.end_point = 'file-manager/direct/store'
  AxiosMethod.form = formData
  let data = await AxiosMethod.axios_image_upload()
  if (data) {
        loading.value = false;
        store.commit('set_avatar', data.data.data.url)
        dialog.value = false;
        openToast(
            store,
            'آپلود با موفقیت انجام شد.',
            "success"
        );

    } else {
        loading.value = false;
        openToast(
          store,
            'تو فرایند آئلود به مشکلی خوردیم',
            "error"
        );
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
const avatar = computed(function () {
  return store.getters['get_avatar']
});

const events = ['dragenter', 'dragover', 'dragleave', 'drop']


</script>