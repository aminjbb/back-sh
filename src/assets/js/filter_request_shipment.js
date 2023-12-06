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
        this.shps_count_from = null;
        this.shps_count_to = null;
        this.creator_id = null;
        this.hps_variety_from = null;
        this.shps_variety_to = null;
        this.sent_to_warehouse_at = null;
        this.status = null;
    }

    query_maker() {
        let query = "?";
        if (this.id !== null) {
            query += "id=" + this.id + "&";
        }

        if (this.creator_id !== null) {
            query += "creator_id=" + this.creator_id + "&";
        }

        if (this.created_at_to_date) {
            query += "created_at_to_date=" + this.created_at_to_date + "&";
        }

        if (this.created_at_from_date) {
            query += "created_at_from_date=" + this.created_at_from_date + "&";
        }

        if (this.sent_to_warehouse_at_to!== null) {
            query += "sent_to_warehouse_at_to=" + this.sent_to_warehouse_at_to + "&";
        }

        if (this.sent_to_warehouse_at_from!== null) {
            query += "sent_to_warehouse_at_from=" + this.sent_to_warehouse_at_from + "&";
        }

        if (this.shps_variety_from!== null) {
            query += "shps_variety_from=" + this.shps_variety_from + "&";
        }

        if (this.shps_variety_to!== null) {
            query += "shps_variety_to=" + this.shps_variety_to + "&";
        }

        if (this.status!== null) {
            query += "status=" + this.status + "&";
        }
        if (this.shps_count_from!== null) {
            query += "shps_count_from=" + this.shps_count_from + "&";
        }

        if (this.type!== null) {
            query += "type=" + this.type + "&";
        }

        if (this.shps_count_to!== null) {
            query += "shps_count_to=" + this.shps_count_to + "&";
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

        if (routeQuery.status)  {
            query += "status=" + routeQuery.status + "&";
        }
        else if  (this.creator_id){
            query += "status=" + this.status + "&";
        }

        if (routeQuery.creator_id)  {
            query += "creator_id=" + routeQuery.creator_id + "&";
        }
        else if  (this.creator_id){
            query += "creator_id=" + this.creator_id + "&";
        }

        if (routeQuery.created_at_from_date)  {
            query += "created_at_from_date=" + routeQuery.created_at_from_date + "&";
        }
        else if  (this.created_at_from_date){
            query += "created_at_from_date=" + this.created_at_from_date + "&";
        }

        if (routeQuery.created_at_to_date) {
            query += "created_at_to_date=" + routeQuery.created_at_to_date + "&";
        }
        else if (this.created_at_to_date) {
            query += "created_at_to_date=" + this.created_at_to_date + "&";
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

        if (routeQuery.type) {
            query += "type=" + routeQuery.type + "&";
        }
        else if  (this.type){
            query += "type=" + this.type + "&";
        }

        if (routeQuery.sent_to_warehouse_at_from) {
            query += "sent_to_warehouse_at_from=" + routeQuery.sent_to_warehouse_at_from + "&";
        }
        else if (this.sent_to_warehouse_at_from) {
            query += "sent_to_warehouse_at_from=" + this.sent_to_warehouse_at_from + "&";
        }

        if (routeQuery.sent_to_warehouse_at_to) {
            query += "sent_to_warehouse_at_to=" + routeQuery.sent_to_warehouse_at_to + "&";
        }
        else if (this.sent_to_warehouse_at_to) {
            query += "sent_to_warehouse_at_to=" + this.sent_to_warehouse_at_to + "&";
        }

        if (routeQuery.shps_variety_from) {
            query += "shps_variety_from=" + routeQuery.shps_variety_from + "&";
        }
        else if (this.shps_variety_from) {
            query += "shps_variety_from=" + this.shps_variety_from + "&";
        }

        if (routeQuery.shps_variety_to) {
            query += "shps_variety_to=" + routeQuery.shps_variety_to + "&";
        }
        else if (this.shps_variety_to) {
            query += "shps_variety_to=" + this.shps_variety_to + "&";
        }

        if (routeQuery.shps_count_from) {
            query += "shps_count_from=" + routeQuery.shps_count_from + "&";
        }
        else if (this.shps_count_from) {
            query += "shps_count_from=" + this.shps_count_from + "&";
        }

        if (routeQuery.shps_count_to) {
            query += "shps_count_to=" + routeQuery.shps_count_to + "&";
        }
        else if (this.shps_count_to) {
            query += "shps_count_to=" + this.shps_count_to + "&";
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

        if (routeQuery.creator_id)  {
            query += "creator_id=" + routeQuery.creator_id + "&";
        }
        else if  (this.creator_id){
            query += "creator_id=" + this.creator_id + "&";
        }

        if (routeQuery.sent_to_warehouse_at_from)  {
            query += "sent_to_warehouse_at_from=" + routeQuery.sent_to_warehouse_at_from + "&";
        }
        else if  (this.sent_to_warehouse_at_from){
            query += "sent_to_warehouse_at_from=" + this.sent_to_warehouse_at_from + "&";
        }

        if (routeQuery.sent_to_warehouse_at_to)  {
            query += "sent_to_warehouse_at_to=" + routeQuery.sent_to_warehouse_at_to + "&";
        }
        else if  (this.sent_to_warehouse_at_to){
            query += "sent_to_warehouse_at_to=" + this.sent_to_warehouse_at_to + "&";
        }

        if (routeQuery.status)  {
            query += "status=" + routeQuery.status + "&";
        }
        else if  (this.status){
            query += "status=" + this.status + "&";
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

        if (this.type) {
            query += "type=" + this.type + "&";
        }
        else if   (routeQuery.order_type){
            query += "order_type=" + routeQuery.order_type + "&";
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

        if (routeQuery.shps_variety_from) {
            query += "shps_variety_from=" + routeQuery.shps_variety_from + "&";
        }
        else if (this.shps_variety_from) {
            query += "shps_variety_from=" + this.shps_variety_from + "&";
        }

        if (routeQuery.shps_variety_to) {
            query += "shps_variety_to=" + routeQuery.shps_variety_to + "&";
        }
        else if (this.shps_variety_to) {
            query += "shps_variety_to=" + this.shps_variety_to + "&";
        }

        if (routeQuery.shps_count_from) {
            query += "shps_count_from=" + routeQuery.shps_count_from + "&";
        }
        else if (this.shps_count_from) {
            query += "shps_count_from=" + this.shps_count_from + "&";
        }

        if (routeQuery.shps_count_to) {
            query += "shps_count_to=" + routeQuery.shps_count_to + "&";
        }
        else if (this.shps_count_to) {
            query += "shps_count_to=" + this.shps_count_to + "&";
        }

        

        return query.substring(0, query.length - 1);
    }
}