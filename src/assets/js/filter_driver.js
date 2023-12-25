import {th} from "vuetify/locale";

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

export class PanelFilter {
    constructor() {
        this.sort = null;
        this.per_page = 25;
        this.page = 1;
        this.order = 'created_at';
        this.order_type = 'desc';
        this.id = null;
        this.full_name = null;
        this.identification_code = null;
        this.phone_number = null;
       
    }

    query_maker() {
        let query = "?";
        if (this.id !== null) {
            query += "id=" + this.id + "&";
        }

        if (this.full_name !== null) {
            query += "full_name=" + this.full_name + "&";
        }

        if (this.identification_code) {
            query += "identification_code=" + this.identification_code + "&";
        }

        if (this.phone_number) {
            query += "phone_number=" + this.phone_number + "&";
        }

        if (this.page!== null) {
            query += "page=" + this.page + "&";
        }

        if (this.sort!== null) {
            query += "sort=" + this.sort + "&";
        }

        if (this.per_page!== null) {
            query += "per_page=" + this.per_page + "&";
        }
        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery){
        let query = "?";

        if  (this.id) {
            query += "id=" + this.id + "&";
        }
        else if (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
        }

        if (routeQuery.full_name)  {
            query += "full_name=" + routeQuery.full_name + "&";
        }
        else if  (this.full_name){
            query += "full_name=" + this.full_name + "&";
        }
        if (routeQuery.identification_code)  {
            query += "identification_code=" + routeQuery.identification_code + "&";
        }
        else if  (this.identification_code){
            query += "identification_code=" + this.identification_code + "&";
        }
        if (routeQuery.phone_number)  {
            query += "phone_number=" + routeQuery.phone_number + "&";
        }
        else if  (this.phone_number){
            query += "phone_number=" + this.phone_number + "&";
        }

        


        if  (this.per_page){
            query += "per_page=" + this.per_page + "&";
        }
        else if  (routeQuery.per_page ) {
            query += "per_page=" + routeQuery.per_page + "&";
        }

        if  (this.page){
            query += "page=" + this.page + "&";
        }
        else if  (routeQuery.page){
            query += "page=" + routeQuery.page + "&";
        }

        if (routeQuery.order) {
            query += "order=" + routeQuery.order + "&";
        }
        else if (this.order)  {
            query += "order=" + this.order + "&";
        }

      
        return query.substring(0, query.length - 1);
    }

    sort_query(routeQuery){
        let query = "?";
        if  (this.id) {
            query += "id=" + this.id + "&";
        }
        else if (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
        }

        if (routeQuery.full_name)  {
            query += "full_name=" + routeQuery.full_name + "&";
        }
        else if  (this.full_name){
            query += "full_name=" + this.full_name + "&";
        }

        if (routeQuery.identification_code)  {
            query += "identification_code=" + routeQuery.identification_code + "&";
        }
        else if  (this.identification_code){
            query += "identification_code=" + this.identification_code + "&";
        }
        if (routeQuery.phone_number)  {
            query += "phone_number=" + routeQuery.phone_number + "&";
        }
        else if  (this.phone_number){
            query += "phone_number=" + this.phone_number + "&";
        }

      


        if  (this.per_page){
            query += "per_page=" + this.per_page + "&";
        }
        else if  (routeQuery.per_page ) {
            query += "per_page=" + routeQuery.per_page + "&";
        }

        if  (this.page){
            query += "page=" + this.page + "&";
        }
        else if  (routeQuery.page){
            query += "page=" + routeQuery.page + "&";
        }

        if (this.order) {
            query += "order=" + this.order + "&";
        }
        else if  (routeQuery.order) {
            query += "order=" + routeQuery.order + "&";
        }

       

        return query.substring(0, query.length - 1);
    }
}