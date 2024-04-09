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

export class PeerToPeerVoucherFilter {
    constructor() {
        this.sort = null;
        this.per_page = 25;
        this.page = 1;
        this.order = 'created_at';
        this.order_type = 'desc';
        this.user_id = null;
        this.code = null;



    }

    query_maker() {
        let query = "?";

        if (this.user_id !== null) {
            query += "user_id=" + this.user_id + "&";
        }
        if (this.code !== null) {
            query += "code=" + this.code + "&";
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

        if  (this.user_id) {
            query += "user_id=" + this.user_id + "&";
        }
        else if (routeQuery.user_id) {
            query += "user_id=" + routeQuery.user_id + "&";
        }
        if  (this.code) {
            query += "code=" + this.code + "&";
        }
        else if (routeQuery.code) {
            query += "code=" + routeQuery.code + "&";
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