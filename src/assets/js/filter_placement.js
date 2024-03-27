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
        this.created_at_to_date = null;
        this.created_at_from_date = null;
        this.id = null;
        this.row_number_from = null;
        this.row_number_to = null;
        this.placement_number_from = null;
        this.placement_number_to = null;
        this.step_number_from = null;
        this.step_number_to = null;
    }

    query_maker() {
        let query = "?";

        if (this.page!== null) {
            query += "page=" + this.page + "&";
        }

        if (this.sort!== null) {
            query += "sort=" + this.sort + "&";
        }

        if (this.per_page!== null) {
            query += "per_page=" + this.per_page + "&";
        }

        if (this.id) {
            query += "id=" + this.id + "&";
        }

        if (this.created_at_to_date) {
            query += "created_at_to_date=" + this.created_at_to_date + "&";
        }

        if (this.created_at_from_date) {
            query += "created_at_from_date=" + this.created_at_from_date + "&";
        }

        if (this.row_number_from!== null) {
            query += "row_number_from=" + this.row_number_from + "&";
        }

        if (this.row_number_to!== null) {
            query += "row_number_to=" + this.row_number_to + "&";
        }

        if (this.placement_number_from!== null) {
            query += "placement_number_from=" + this.placement_number_from + "&";
        }

        if (this.placement_number_to!== null) {
            query += "placement_number_to=" + this.placement_number_to + "&";
        }

        if (this.step_number_from!== null) {
            query += "step_number_from=" + this.step_number_from + "&";
        }

        if (this.step_number_to!== null) {
            query += "step_number_to=" + this.step_number_to + "&";
        }

        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery){
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

        if (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
        }
        else if  (this.id){
            query += "id=" + this.id + "&";
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

        if (routeQuery.row_number_from) {
            query += "row_number_from=" + routeQuery.row_number_from + "&";
        }
        else if (this.row_number_from) {
            query += "row_number_from=" + this.row_number_from + "&";
        }

        if (routeQuery.row_number_to) {
            query += "row_number_to=" + routeQuery.row_number_to + "&";
        }
        else if (this.row_number_to) {
            query += "row_number_to=" + this.row_number_to + "&";
        }

        if (routeQuery.placement_number_from) {
            query += "placement_number_from=" + routeQuery.placement_number_from + "&";
        }
        else if (this.placement_number_from) {
            query += "placement_number_from=" + this.placement_number_from + "&";
        }

        if (routeQuery.placement_number_to) {
            query += "placement_number_to=" + routeQuery.placement_number_to + "&";
        }
        else if (this.placement_number_to) {
            query += "placement_number_to=" + this.placement_number_to + "&";
        }

        if (routeQuery.step_number_from) {
            query += "step_number_from=" + routeQuery.step_number_from + "&";
        }
        else if (this.step_number_from) {
            query += "step_number_from=" + this.step_number_from + "&";
        }

        if (routeQuery.step_number_to) {
            query += "step_number_to=" + routeQuery.step_number_to + "&";
        }
        else if (this.step_number_to) {
            query += "step_number_to=" + this.step_number_to + "&";
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

        if (this.id) {
            query += "id=" + this.id + "&";
        }
        else if  (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
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

        if (routeQuery.row_number_from) {
            query += "row_number_from=" + routeQuery.row_number_from + "&";
        }
        else if (this.row_number_from) {
            query += "row_number_from=" + this.row_number_from + "&";
        }

        if (routeQuery.row_number_to) {
            query += "row_number_to=" + routeQuery.row_number_to + "&";
        }
        else if (this.row_number_to) {
            query += "row_number_to=" + this.row_number_to + "&";
        }

        if (routeQuery.placement_number_from) {
            query += "placement_number_from=" + routeQuery.placement_number_from + "&";
        }
        else if (this.placement_number_from) {
            query += "placement_number_from=" + this.placement_number_from + "&";
        }

        if (routeQuery.placement_number_to) {
            query += "placement_number_to=" + routeQuery.placement_number_to + "&";
        }
        else if (this.placement_number_to) {
            query += "placement_number_to=" + this.placement_number_to + "&";
        }

        if (routeQuery.step_number_from) {
            query += "step_number_from=" + routeQuery.step_number_from + "&";
        }
        else if (this.step_number_from) {
            query += "step_number_from=" + this.step_number_from + "&";
        }

        if (routeQuery.step_number_to) {
            query += "step_number_to=" + routeQuery.step_number_to + "&";
        }
        else if (this.step_number_to) {
            query += "step_number_to=" + this.step_number_to + "&";
        }

        return query.substring(0, query.length - 1);
    }
}