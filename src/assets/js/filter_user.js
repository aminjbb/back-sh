import {th} from "vuetify/locale";
import {useRoute} from "vue-router";
import {log10} from "chart.js/helpers";
const route = useRoute()

function _query_items(items = [], name = "") {
    let query = "";
    if (items && items.length > 0) {
        query += name.concat("=");
        for (let i = 0; i < items.length; i++) {
            if (i === items.length - 1) {
                query += items[i] + "&";
            } else {
                query += items[i] + ",";
            }
        }
    }
    return query;
}

export class UserPanelFilter {
    constructor() {
        this.firstName = null;
        this.lastName = null;
        this.brithDate = null;
        this.email = null;
        this.phoneNumber = null;
        this.per_page = 25;
        this.page = 1;
        this.order = 'created_at';
        this.order_type = 'desc';

    }

    query_maker(routeQuery) {
        let query = "?order=created_at&order_type=desc&";

        if (this.firstName !== null) {
            query += "first_name=" + this.firstName + "&";
        }
        else if (routeQuery?.first_name) {
            query += "first_name=" + routeQuery.first_name + "&";
        }

        if (this.lastName !== null) {
            query += "last_name=" + this.lastName + "&";
        }
        else if (routeQuery?.last_name){
            query += "last_name=" + routeQuery.last_name + "&";
        }

        if (this.brithDate !== null) {
            query += "birth_date=" + this.brithDate + "&";
        }

        else if (routeQuery?.birth_date){
            query += "birth_date=" + routeQuery.birth_date + "&";
        }


        if (this.email) {
            query += "email=" + this.email + "&";
        }
        else if (routeQuery?.email){
            query += "email=" + routeQuery.email + "&";
        }
        if (this.phoneNumber) {
            query += "phone_number=" + this.phoneNumber + "&";
        }
        else if (routeQuery?.phone_number){
            query += "phone_number=" + routeQuery.phone_number + "&";
        }

        if (this.page) {
            query += "page=" + this.page + "&";
        }
        else if (routeQuery?.page){
            query += "page=" + routeQuery.page + "&";
        }

        if (this.per_page) {
            query += "per_page=" + this.per_page + "&";
        }
        else if (routeQuery?.per_page){
            query += "per_page=" + routeQuery.per_page + "&";
        }

        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery){
        let query = "?";
        if (this.firstName ) {
            query += "first_name=" + this.firstName + "&";
        }
        else if (routeQuery.first_name ){
            query += "first_name=" + routeQuery.first_name + "&";
        }

        if  (this.lastName) {
            query += "last_name=" + this.lastName + "&";
        }
        else if (routeQuery.last_name) {
            query += "last_name=" + routeQuery.last_name + "&";
        }
        if  (this.brithDate) {
            query += "birth_date=" + this.brithDate + "&";
        }
        else if (routeQuery.birth_date) {
            query += "birth_date=" + routeQuery.birth_date + "&";
        }

        if (routeQuery.email) {
            query += "email=" + routeQuery.email + "&";
        }
        else if (this.email) {
            query += "email=" + this.email + "&";
        }

        if (routeQuery.phone_number) {
            query += "phone_number=" + routeQuery.phone_number + "&";
        }
        else if (this.phoneNumber) {
            query += "phone_number=" + this.phoneNumber + "&";
        }


        if (this.per_page){
            query += "per_page=" + this.per_page + "&";
        }
        else if (routeQuery.per_page ) {
            query += "per_page=" + routeQuery.per_page + "&";
        }
        if (routeQuery.page){
            query += "page=" + routeQuery.page + "&";
        }
        else if  (this.page){

            query += "page=" + this.page + "&";
        }


        if (routeQuery.order) {
            query += "order=" + routeQuery.order + "&";
        }
        else if (this.order) {
            query += "order=" + this.order + "&";
        }

        if (routeQuery.order_type) {
            query += "order_type=" + routeQuery.order_type + "&";
        }
        else if (this.order_type){
            query += "order_type=" + this.order_type + "&";
        }

        return query.substring(0, query.length - 1);
    }

}