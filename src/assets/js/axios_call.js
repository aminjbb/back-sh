import axios from "axios";
import { openToast } from "@/assets/js/functions";
import qs from "qs";
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";
import {useStore} from 'vuex'
// var FormData = require('form-data');

export class AxiosCall {
    constructor() {
        this.version = "v1";
        this.end_point = "";
        this.form = new FormData();
        this.using_auth = false;
        this.cookies = null;
        this.token = ''
        this.store = new useStore();
        this.toast_success = false;
        this.toast_success_message = null;
        this.toast_error = false;
        this.toast_error_message = null;
    }
    async axios_image_upload() {
        const router = useRouter()
        const route = useRoute()
        let url = "".concat(
            import.meta.env.VITE_API_BASEURL,
            "/",
            this.version,
            "/",
            this.end_point

        );
        let data = false;
        const cookies = useCookies();
        if (this.using_auth) {

            await axios
                .post(url, this.form, {
                    onUploadProgress: progressEvent => this.store.commit('set_progressUpload', (progressEvent.loaded * 100) / progressEvent.total),
                    headers: {
                        Authorization:
                            "Bearer " + this.token,
                    },
                    'Content-Type': 'multipart/form-data'
                })
                .then((response) => {
                    if (this.toast_success) {

                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    else if (err.response.status == 403){
                        openToast(
                            this.store,
                            'مجاز به عملیات نیستید',
                            "error"
                        );
                    }
                    else{
                        openToast(
                            this.store,
                            'تو فرایند آپلود به مشکلی خوردیم',
                            "error"
                        );
                    }
                });
        } else {
            await axios
                .post(url, this.form)
                .then((response) => {

                    if (this.toast_success) {
                        openToast(this.store, response.data.message, "success")
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }

                    else if (err.response.status == 403){
                        openToast(
                            this.store,
                            'مجاز به عملیات نیستید',
                            "error"
                        );
                    }
                    else{
                        openToast(
                            this.store,
                            'تو فرایند آپلود به مشکلی خوردیم',
                            "error"
                        );
                    }
                });
        }
        return data;
    }
    async axios_post() {
        const router = useRouter()
        const route = useRoute()
        let url = "".concat(
            import.meta.env.VITE_API_BASEURL,
            "/",
            this.version,
            "/",
            this.end_point

        );
        let data = false;
        const cookies = useCookies();
        if (this.using_auth) {
            await axios
                .post(url, this.form, {
                    headers: {
                        Authorization:
                            "Bearer " + this.token,
                    },
                })
                .then((response) => {
                    if (this.toast_success) {
                        openToast(
                            this.store,
                            response.data.message,
                            "success"
                        );
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.data.message){
                        openToast(
                            this.store,
                            err.response.data.message,
                            "error"
                        );
                    }
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    else if (err.response.status == 403){
                        openToast(
                            this.store,
                            'مجاز به عملیات نیستید',
                            "error"
                        );
                    }
                    if (err.response.status == 422) {

                        const details = err.response.data.details
                        const key = Object.keys(details)
                        if (key[0] == 'name') {
                            openToast(
                                this.store,
                                'فیلد نام باید یکتا باشد',
                                "error"
                            );
                        }
                        else if (key[0] == 'label') {
                            openToast(
                                this.store,
                                'فیلد لیبل باید یکتا باشد',
                                "error"
                            );
                        }

                        else if (key[0] == 'email') {
                            openToast(
                                this.store,
                                'فیلد ایمیل باید یکتا باشد',
                                "error"
                            );
                        } else if (key[0] == 'phone_number') {
                            openToast(
                                this.store,
                                'فیلد شماره موبایل باید یکتا باشد',
                                "error"
                            );
                        }else if (key[0] == 'identification_code') {
                            openToast(
                                this.store,
                                'کد ملی وارد شده قبلا استفاده شده است',
                                "error"
                            );
                        }else if (key[0] == 'email') {
                            openToast(
                                this.store,
                                'ایمیل وارد شده قبلا استفاده شده است',
                                "error"
                            );
                        }
                    }

                });
        } else {
            await axios
                .post(url, this.form)
                .then((response) => {

                    if (this.toast_success) {
                        openToast(this.store, response.data.message, "success")
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.data.message){
                        openToast(
                            this.store,
                            err.response.data.message,
                            "error"
                        );
                    }
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    else if (err.response.status == 403){
                        openToast(
                            this.store,
                            'مجاز به عملیات نیستید',
                            "error"
                        );
                    }
                    if (err.response.status == 442) {
                        const details = err.response.data.details
                        const key = Object.keys(details)
                        openToast(
                            this.store,
                            key,
                            "error"
                        );

                    }
                });
        }
        return data;
    }
    async axios_put() {
        const router = useRouter()
        const route = useRoute()
        let url = "".concat(
            import.meta.env.VITE_API_BASEURL,
            "/",
            this.version,
            "/",
            this.end_point,
            "/"
        );
        let data = false;
        const cookies = Cookie();
        if (this.using_auth) {
            await axios
                .put(url, this.form, {
                    headers: {
                        Authorization:
                            "Bearer " + cookies.get('token'),
                    },
                })
                .then((response) => {
                    if (this.toast_success) {
                        openToast(
                            this.store,
                            this.toast_success_message,
                            "success"
                        );
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    if (this.toast_error) {
                        openToast(
                            this.store,
                            this.toast_error_message,
                            "error"
                        );
                    }
                });
        } else {
            await axios
                .put(url, this.form)
                .then((response) => {
                    if (this.toast_success) {
                        openToast(
                            this.store,
                            this.toast_success_message,
                            "success"
                        );
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    if (this.toast_error) {

                        openToast(
                            this.store,
                            this.toast_error_message,
                            "error"
                        );
                    }
                });
        }
        return data;
    }
    async axios_get() {
        const router = useRouter()
        const route = useRoute()
        let url = "".concat(
            import.meta.env.VITE_API_BASEURL,
            "/",
            this.version,
            "/",
            this.end_point
        );
        let params = qs.stringify(this.form, { arrayFormat: "comma" });
        if (params) {
            url = url.concat("?", params);
        }
        let data = false;
        if (this.using_auth) {
            await axios
                .get(url, {
                    headers: {
                        Authorization:
                            "Bearer " + this.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {

                    if (this.toast_success) {
                        openToast(
                            this.store,
                            this.toast_success_message,
                            "success"
                        );
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }

                    else if (err.response.status == 403){
                        openToast(
                            this.store,
                            'مجاز به عملیات نیستید',
                            "error"
                        );
                    }
                    if (this.toast_error) {
                        openToast(
                            this.store,
                            err.response.data.message,
                            "error"
                        );
                    }
                });
        } else {
            await axios
                .get(url)
                .then((response) => {
                    if (this.toast_success) {
                        openToast(
                            this.store,
                            this.toast_success_message,
                            "success"
                        );
                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    else if (err.response.status == 403){
                        openToast(
                            this.store,
                            'مجاز به عملیات نیستید',
                            "error"
                        );
                    }
                    if (this.toast_error) {
                        openToast(
                            this.store,
                            err.response.data.message,
                            "error"
                        );
                    }
                });
        }
        return data;
    }
    async axios_delete() {
        const router = useRouter()
        const route = useRoute()
        let url = "".concat(
            import.meta.env.VITE_API_BASEURL,
            "/",
            this.version,
            "/",
            this.end_point,
        );
        let data = false;
        if (this.using_auth) {
            await axios
                .delete(url, {
                    headers: {
                        Authorization:
                            "Bearer " + this.token,
                    },
                })
                .then((response) => {
                    if (this.toast_success) {
                        openToast(
                            this.store,
                            this.toast_success_message,
                            "success"
                        );

                    }
                    data = response.data;
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    else if (err.response.status == 403){
                        openToast(
                            this.store,
                            'مجاز به عملیات نیستید',
                            "error"
                        );
                    }
                    if (this.toast_error) {
                        openToast(this.store, err.response.data.message, "error")
                    }
                });
        } else {
            await axios
                .delete(url)
                .then((response) => {
                    if (this.toast_success) {
                        openToast(
                            this.store,
                            this.toast_success_message,
                            "success"
                        );
                    }
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        router.push('/login')
                    }
                    else if (err.response.status == 403){
                        openToast(
                            this.store,
                            'مجاز به عملیات نیستید',
                            "error"
                        );
                    }
                    if (this.toast_error) {
                        openToast(
                            this.store,
                            this.toast_error_message,
                            "error"
                        );
                    }
                });
        }
        return data;
    }
}