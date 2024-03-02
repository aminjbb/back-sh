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
        this.package_id = null;
        this.package_type = null;
        this.shipment_type = null;
        this.shopping_name = null;
        this.supplier_id = null;
        this.shps_s = null;
        this.sku_label = null;
        this.report_type = 'wastage';
        this.creator_id = null;
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

        if (this.created_at_to_date) {
            query += "created_at_to_date=" + this.created_at_to_date + "&";
        }

        if (this.created_at_from_date) {
            query += "created_at_from_date=" + this.created_at_from_date + "&";
        }

        if (this.package_id!== null) {
            query += "package_id=" + this.package_id + "&";
        }

        if (this.package_type!== null) {
            query += "package_type=" + this.package_type + "&";
        }

        if (this.shipment_type!== null) {
            query += "shipment_type=" + this.shipment_type + "&";
        }

        if (this.shopping_name!== null) {
            query += "shopping_name=" + this.shopping_name + "&";
        }

        if (this.supplier_id!== null) {
            query += "supplier_id=" + this.supplier_id + "&";
        }

        if (this.shps_s!== null) {
            query += "shps_s=" + this.shps_s + "&";
        }

        if (this.sku_label!== null) {
            query += "sku_label=" + this.sku_label + "&";
        }

        if (this.report_type!== null) {
            query += "report_type=" + this.report_type + "&";
        }

        if (this.creator_id!== null) {
            query += "creator_id=" + this.creator_id + "&";
        }

        if (this.created_at!== null) {
            query += "created_at=" + this.created_at + "&";
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



        else if  (this.page){
            query += "page=" + this.page + "&";
        }
        if  (routeQuery.page){
            query += "page=" + routeQuery.page + "&";
        }

        if (routeQuery.order) {
            query += "order=" + routeQuery.order + "&";
        }
        else if (this.order)  {
            query += "order=" + this.order + "&";
        }

        if (routeQuery.order_type) {
            query += "order_type=" + routeQuery.order_type + "&";
        }
        else if  (this.order_type){
            query += "order_type=" + this.order_type + "&";
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

        if (routeQuery.package_id) {
            query += "package_id=" + routeQuery.package_id + "&";
        }
        else if (this.package_id) {
            query += "package_id=" + this.package_id + "&";
        }

        if (routeQuery.package_type) {
            query += "package_type=" + routeQuery.package_type + "&";
        }
        else if (this.package_type) {
            query += "package_type=" + this.package_type + "&";
        }

        if (routeQuery.shipment_type) {
            query += "shipment_type=" + routeQuery.shipment_type + "&";
        }
        else if (this.shipment_type) {
            query += "shipment_type=" + this.shipment_type + "&";
        }

        if (routeQuery.shopping_name) {
            query += "shopping_name=" + routeQuery.shopping_name + "&";
        }
        else if (this.shopping_name) {
            query += "shopping_name=" + this.shopping_name + "&";
        }

        if (routeQuery.supplier_id) {
            query += "supplier_id=" + routeQuery.supplier_id + "&";
        }
        else if (this.supplier_id) {
            query += "supplier_id=" + this.supplier_id + "&";
        }

        if (routeQuery.shps_s) {
            query += "shps_s=" + routeQuery.shps_s + "&";
        }
        else if (this.shps_s) {
            query += "shps_s=" + this.shps_s + "&";
        }

        if (routeQuery.sku_label) {
            query += "sku_label=" + routeQuery.sku_label + "&";
        }
        else if (this.sku_label) {
            query += "sku_label=" + this.sku_label + "&";
        }

        if (routeQuery.report_type) {
            query += "report_type=" + routeQuery.report_type + "&";
        }
        else if (this.report_type) {
            query += "report_type=" + this.report_type + "&";
        }

        if (routeQuery.creator_id) {
            query += "creator_id=" + routeQuery.creator_id + "&";
        }
        else if (this.creator_id) {
            query += "creator_id=" + this.creator_id + "&";
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

        if (this.order_type) {
            query += "order_type=" + this.order_type + "&";
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

        if (routeQuery.package_id) {
            query += "package_id=" + routeQuery.package_id + "&";
        }
        else if (this.package_id) {
            query += "package_id=" + this.package_id + "&";
        }

        if (routeQuery.row_number_to) {
            query += "row_number_to=" + routeQuery.row_number_to + "&";
        }
        else if (this.row_number_to) {
            query += "row_number_to=" + this.row_number_to + "&";
        }

        if (routeQuery.shipment_type) {
            query += "shipment_type=" + routeQuery.shipment_type + "&";
        }
        else if (this.shipment_type) {
            query += "shipment_type=" + this.shipment_type + "&";
        }

        if (routeQuery.shopping_name) {
            query += "shopping_name=" + routeQuery.shopping_name + "&";
        }
        else if (this.shopping_name) {
            query += "shopping_name=" + this.shopping_name + "&";
        }

        if (routeQuery.supplier_id) {
            query += "supplier_id=" + routeQuery.supplier_id + "&";
        }
        else if (this.supplier_id) {
            query += "supplier_id=" + this.supplier_id + "&";
        }

        if (routeQuery.shps_s) {
            query += "shps_s=" + routeQuery.shps_s + "&";
        }
        else if (this.shps_s) {
            query += "shps_s=" + this.shps_s + "&";
        }

        if (routeQuery.sku_label) {
            query += "sku_label=" + routeQuery.sku_label + "&";
        }
        else if (this.sku_label) {
            query += "sku_label=" + this.sku_label + "&";
        }

        if (routeQuery.report_type) {
            query += "report_type=" + routeQuery.report_type + "&";
        }
        else if (this.report_type) {
            query += "report_type=" + this.report_type + "&";
        }

        if (routeQuery.creator_id) {
            query += "creator_id=" + routeQuery.creator_id + "&";
        }
        else if (this.creator_id) {
            query += "creator_id=" + this.creator_id + "&";
        }

        return query.substring(0, query.length - 1);
    }
}