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
        this.user_id = null;
        this.phone_number = null;
        this.card_number = null;
        this.admin_id = null;
        this.amount_to = null;
        this.amount_from = null;
        this.wallet_value_to = null;
        this.wallet_value_from = null;
        this.status = null;
        this.created_at_to_date = null;
        this.created_at_from_date = null;
        this.created_at = null
    }

    query_maker() {
        let query = "?";

        if (this.id !== null) {
            query += "id=" + this.id + "&";
        }
        if (this.user_id !== null) {
            query += "user_id=" + this.user_id + "&";
        }
        if (this.phone_number !== null) {
            query += "phone_number=" + this.phone_number + "&";
        }
        if (this.card_number !== null) {
            query += "card_number=" + this.card_number + "&";
        }
        if (this.admin_id !== null) {
            query += "admin_id=" + this.admin_id + "&";
        }
        if (this.amount_to !== null) {
            query += "amount_to=" + this.amount_to + "&";
        }
        if (this.amount_from !== null) {
            query += "amount_from=" + this.amount_from + "&";
        }
        if (this.wallet_value_to !== null) {
            query += "wallet_value_to=" + this.wallet_value_to + "&";
        }
        if (this.wallet_value_from !== null) {
            query += "wallet_value_from=" + this.wallet_value_from + "&";
        }
        if (this.status !== null) {
            query += "status=" + this.status + "&";
        }
        if (this.created_at_to_date) {
            query += "created_at_to_date=" + this.created_at_to_date + "&";
        }
        if (this.created_at_from_date) {
            query += "created_at_from_date=" + this.created_at_from_date + "&";
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

        if  (this.user_id) {
            query += "user_id=" + this.user_id + "&";
        }
        else if (routeQuery.user_id) {
            query += "user_id=" + routeQuery.user_id + "&";
        }
        if (routeQuery.admin_id)  {
            query += "admin_id=" + routeQuery.admin_id + "&";
        }
        else if  (this.admin_id){
            query += "admin_id=" + this.admin_id + "&";
        }
        if  (this.phone_number) {
            query += "phone_number=" + this.phone_number + "&";
        }
        else if (routeQuery.phone_number) {
            query += "phone_number=" + routeQuery.phone_number + "&";
        }
        if  (this.card_number) {
            query += "card_number=" + this.card_number + "&";
        }
        else if (routeQuery.card_number) {
            query += "card_number=" + routeQuery.card_number + "&";
        }
        if  (this.admin) {
            query += "admin=" + this.admin + "&";
        }
        else if (routeQuery.admin) {
            query += "admin=" + routeQuery.admin + "&";
        }
        if (routeQuery.created_at_to_date) {
            query += "created_at_to_date=" + routeQuery.created_at_to_date + "&";
        }
        else if (this.created_at_to_date) {
            query += "created_at_to_date=" + this.created_at_to_date + "&";
        }
        if (routeQuery.created_at_from_date) {
            query += "created_at_from_date=" + routeQuery.created_at_from_date + "&";
        }
        else if (this.created_at_from_date) {
            query += "created_at_from_date=" + this.created_at_from_date + "&";
        }
        if (routeQuery.created_at) {
            query += "created_at=" + routeQuery.created_at + "&";
        }
        else if (this.created_at) {
            query += "created_at=" + this.created_at + "&";
        }
        if  (this.amount_to) {
            query += "amount_to=" + this.amount_to + "&";
        }
        else if (routeQuery.amount_to) {
            query += "amount_to=" + routeQuery.amount_to + "&";
        }
        if  (this.amount_from) {
            query += "amount_from=" + this.amount_from + "&";
        }
        else if (routeQuery.amount_from) {
            query += "amount_from=" + routeQuery.amount_from + "&";
        }
        if  (this.wallet_value_to) {
            query += "wallet_value_to=" + this.wallet_value_to + "&";
        }
        else if (routeQuery.wallet_value_to) {
            query += "wallet_value_to=" + routeQuery.wallet_value_to + "&";
        }
        if  (this.wallet_value_from) {
            query += "wallet_value_from=" + this.wallet_value_from + "&";
        }
        else if (routeQuery.wallet_value_from) {
            query += "wallet_value_from=" + routeQuery.wallet_value_from + "&";
        }
        if  (this.status) {
            query += "status=" + this.status + "&";
        }
        else if (routeQuery.status) {
            query += "status=" + routeQuery.status + "&";
        }

        if (this.per_page){
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


        return query.substring(0, query.length - 1);
    }

    sort_query(routeQuery){
        let query = "?";
        if  (this.user_id) {
            query += "user_id=" + this.user_id + "&";
        }
        else if (routeQuery.user_id) {
            query += "user_id=" + routeQuery.user_id + "&";
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



        return query.substring(0, query.length - 1);
    }
}