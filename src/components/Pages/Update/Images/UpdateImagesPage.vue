<template>
<div class="create-product flex-column d-flex v-field">
    <v-card class="ma-5 br-12 pb-15 flex-grow-1 pt-10 v-field" min-height="500">
        <div class="px-15 mb-5">
            <UploadFileSection @getImage="assignImage" />
        </div>
        <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch v-field pb-16">
            <Table
                class="flex-grow-1"
                :header="imageHeader"
                :items="images"
                :loading="loading"
                updateUrl="page/csv/mass-update"
                deletePath="page/crud/delete/image/"
                @updateList="updateList"
                model="pageImage" />
        </v-card>
    </v-card>
</div>
</template>

<script>
import ContentForm from "@/components/Pages/Update/Content/ContentForm.vue";
import {
    AxiosCall
} from "@/assets/js/axios_call";
import {
    openToast
} from "@/assets/js/functions";
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import Table from '@/components/Pages/Update/Images/Table/PagesImagesTable.vue'
import Page from '@/composables/Page'
export default {
    setup() {
        const {
            imageHeader,
            pageSingle,
            getPage
        } = new Page()
        return {
            imageHeader,
            pageSingle,
            getPage
        }
    },
    data() {
        return {
            loading: false,
        }
    },
    components: {
        UploadFileSection,
        ContentForm,
        Table
    },

    computed: {
        avatar() {
            return this.$store.getters['get_avatar']
        },
        images() {
            try {
                return this.pageSingle.images
            } catch (e) {
                return []
            }
        },
        confirmModal() {
          return this.$store.getters['get_confirmForm'].confirmModal
        }
    },

    methods: {
        async assignImage(image) {
            this.loading = true
            const formData = new FormData()
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `page/crud/attach/image/${this.$route.params.pageId}`
            formData.append('image_id', image.data.data.image_id)
            AxiosMethod.form = formData
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false
                this.getPage()
            } else {
                this.loading = false
            }
        },

        validate() {
            this.$refs.SupplierForm.$refs.addForm.validate()
            setTimeout(() => {
                if (this.$refs.SupplierForm.valid) this.createSupplier()
            }, 200)
        },

        updateList(status) {
            if (status === 'true') {
                this.getPage();
            }
        },
    },
    
    mounted() {
        this.getPage()
    },
    watch:{
      confirmModal(val) {
        if (localStorage.getItem('deleteObject')) {
          if (!val) {
            this.getPage()
            openToast(
                this.$store,
                'عکس مورد نظر با موفقیت حذف شد',
                "success"
            );
            localStorage.removeItem('deleteObject')
          }
        }
      },
    }
}
</script>
