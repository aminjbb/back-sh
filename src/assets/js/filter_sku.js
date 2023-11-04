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

export class SkuPanelFilter {
    constructor() {
        this.name = null;
        this.sort = null;
        this.label = null;
        this.id = null;
        this.active = null;
        this.per_page = 25;
        this.page = 1;
        this.order = 'created_at';
        this.order_type = 'desc';
        this.created_at_to_date = null;
        this.created_at_from_date = null;
        this.updated_at_to_date = null;
        this.updated_at_from_date = null;
        this.sellable = null;
        this.color = null;
        this.brand = null;
        this.category = null;
        this.sku_group = null;
        this.product = null;
    }

    query_maker() {
        let query = "?order=created_at&order_type=desc&";

        if (this.id !== null) {
            query += "id=" + this.id + "&";
        }
        if (this.name !== null) {
            query += "name=" + this.name + "&";
        }

        if (this.label !== null) {
            query += "label=" + this.label + "&";
        }

        if (this.active !== null) {
            query += "is_active=" + this.active + "&";
        }

        if (this.created_at_to_date) {
            query += "created_at_to_date=" + this.created_at_to_date + "&";
        }

        if (this.created_at_from_date) {
            query += "created_at_from_date=" + this.created_at_from_date + "&";
        }

        if (this.updated_at_to_date) {
            query += "updated_at_to_date=" + this.updated_at_to_date + "&";
        }

        if (this.updated_at_from_date) {
            query += "updated_at_from_date=" + this.updated_at_from_date + "&";
        }

        if (this.sellable !== null) {
            query += "is_sellable=" + this.sellable + "&";
        }

        if (this.color) {
            query += "color_id=" + this.color + "&";
        }

        if (this.brand) {
            query += "brand_id=" + this.brand + "&";
        }

        if (this.category) {
            query += "category_id=" + this.category + "&";
        }

        if (this.product) {
            query += "product_id=" + this.product + "&";
        }

        if (this.sku_group) {
            query += "sku_group_id=" + this.sku_group + "&";
        }

        if (this.page) {
            query += "page=" + this.page + "&";
        }

        if (this.sort) {
            query += "sort=" + this.sort + "&";
        }

        if (this.per_page) {
            query += "per_page=" + this.per_page + "&";
        }

        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery){
        let query = "?";
        if (this.name ) {
            query += "name=" + this.name + "&";
        }
        else if (routeQuery.name ){
            query += "name=" + routeQuery.name + "&";
        }

        if  (this.label) {
            query += "label=" + this.label + "&";
        }
        else if (routeQuery.label) {
            query += "label=" + routeQuery.label + "&";
        }

        if (routeQuery.is_active) {
            query += "is_active=" + routeQuery.is_active + "&";
        }
        else if (this.active){
            query += "is_active=" + this.active + "&";
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

        if (routeQuery.updated_at_to_date) {
            query += "updated_at_to_date=" + routeQuery.updated_at_to_date + "&";
        }
        else if (this.updated_at_to_date) {
            query += "updated_at_to_date=" + this.updated_at_to_date + "&";
        }

        if (routeQuery.updated_at_from_date) {
            query += "updated_at_from_date=" + routeQuery.updated_at_from_date + "&";
        }
        else if (this.updated_at_from_date) {
            query += "updated_at_from_date=" + this.updated_at_from_date + "&";
        }

        if (routeQuery.is_sellable) {
            query += "is_sellable=" + routeQuery.is_sellable + "&";
        }
        else if (this.sellable) {
            query += "is_sellable=" + this.sellable + "&";
        }

        if (routeQuery.color_id) {
            query += "color_id=" + routeQuery.color_id + "&";
        }
        else if (this.color) {
            query += "color_id=" + this.color + "&";
        }

        if (routeQuery.brand_id) {
            query += "brand_id=" + routeQuery.brand_id + "&";
        }
        else if (this.brand) {
            query += "brand_id=" + this.brand + "&";
        }

        if (routeQuery.category_id) {
            query += "category_id=" + routeQuery.category_id + "&";
        }
        else if (this.category) {
            query += "category_id=" + this.category + "&";
        }

        if (routeQuery.product_id) {
            query += "product_id=" + routeQuery.product_id + "&";
        }
        else if (this.product) {
            query += "product_id=" + this.product + "&";
        }

        if (routeQuery.sku_group_id) {
            query += "sku_group_id=" + routeQuery.sku_group_id + "&";
        }
        else if (this.sku_group) {
            query += "sku_group_id=" + this.sku_group_id + "&";
        }

        if (this.per_page){
            query += "per_page=" + this.per_page + "&";
        }
        else if (routeQuery.per_page ) {
            query += "per_page=" + routeQuery.per_page + "&";
        }

        if  (this.page){
            query += "page=" + this.page + "&";
        }
        else if (routeQuery.page){
            query += "page=" + routeQuery.page + "&";
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

    sort_query(routeQuery){
        let query = "?";
        if  (this.name ) {
            query += "name=" + this.name + "&";
        }
        else if  (routeQuery.name ){
            query += "name=" + routeQuery.name + "&";
        }

        if  (this.label) {
            query += "label=" + this.label + "&";
        }
        else if (routeQuery.label) {
            query += "label=" + routeQuery.label + "&";
        }

        if  (this.id){
            query += "id=" + this.id + "&";
        }
        else if (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
        }

        if (routeQuery.is_active)  {
            query += "is_active=" + routeQuery.is_active + "&";
        }
        else if  (this.active){
            query += "is_active=" + this.active + "&";
        }

        if (routeQuery.group) {
            query += "group=" + routeQuery.group + "&";
        }
        else if  (this.group){
            query += "group=" + this.group + "&";
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

        if (routeQuery.updated_at_to_date) {
            query += "updated_at_to_date=" + routeQuery.updated_at_to_date + "&";
        }
        else if (this.updated_at_to_date) {
            query += "updated_at_to_date=" + this.updated_at_to_date + "&";
        }

        if (routeQuery.updated_at_from_date) {
            query += "updated_at_from_date=" + routeQuery.updated_at_from_date + "&";
        }
        else if (this.updated_at_from_date) {
            query += "updated_at_from_date=" + this.updated_at_from_date + "&";
        }

        if (routeQuery.is_sellable) {
            query += "is_sellable=" + routeQuery.is_sellable + "&";
        }
        else if (this.sellable) {
            query += "is_sellable=" + this.sellable + "&";
        }

        if (routeQuery.color_id) {
            query += "color=" + routeQuery.color_id + "&";
        }
        else if (this.color) {
            query += "color=" + this.color + "&";
        }

        if (routeQuery.brand_id) {
            query += "brand=" + routeQuery.brand_id + "&";
        }
        else if (this.brand) {
            query += "brand=" + this.brand + "&";
        }

        if (routeQuery.category_id) {
            query += "category=" + routeQuery.category_id + "&";
        }
        else if (this.category) {
            query += "category=" + this.category + "&";
        }

        if (routeQuery.product_id) {
            query += "product=" + routeQuery.product_id + "&";
        }
        else if (this.product) {
            query += "product=" + this.product + "&";
        }

        if (routeQuery.sku_group_id) {
            query += "sku_group_id=" + routeQuery.sku_group_id + "&";
        }
        else if (this.sku_group) {
            query += "sku_group_id=" + this.sku_group_id + "&";
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

        if (this.order_type) {
            query += "order_type=" + this.order_type + "&";
        }
        else if   (routeQuery.order_type){
            query += "order_type=" + routeQuery.order_type + "&";
        }

        return query.substring(0, query.length - 1);
    }
}