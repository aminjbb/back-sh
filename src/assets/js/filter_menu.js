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
        this.label = null;
        this.name = null;
        this.active = null;
        this.per_page = 25;
        this.page = 1;
        this.order = 'created_at';
        this.order_type = 'desc';
        this.image = null;
        this.icon = null;
        this.menu = null;
        this.createdAtFrom = null;
        this.createdAtTo = null;
    }

    query_maker() {
        let query = "?";
        if (this.label !== null) {
            query += "label=" + this.label + "&";
        }
        if (this.name !== null) {
            query += "name=" + this.name + "&";
        }

        if (this.active !== null) {
            query += "is_active=" + this.active + "&";
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

        if (this.active!== null) {
            query += "active=" + this.active + "&";
        }
        if (this.image!== null) {
            query += "image_id=" + this.image + "&";
        }
        if (this.icon!== null) {
            query += "icon=" + this.icon + "&";
        }
        if (this.menu!== null) {
            query += "menu_id=" + this.menu + "&";
        }
        if (this.createdAtFrom!== null) {
            query += "created_at_from_date=" + this.createdAtFrom + "&";
        }
        if (this.createdAtTo!== null) {
            query += "created_at_to_date=" + this.createdAtTo + "&";
        }

        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery){
        let query = "?";

        if  (this.label) {
            query += "label=" + this.label + "&";
        }
        else if (routeQuery.label) {
            query += "label=" + routeQuery.label + "&";
        }
        if  (this.name) {
            query += "name=" + this.name + "&";
        }
        else if (routeQuery.name) {
            query += "name=" + routeQuery.name + "&";
        }

        if (routeQuery.is_active)  {
            query += "is_active=" + routeQuery.is_active + "&";
        }
        else if  (this.active){
            query += "is_active=" + this.active + "&";
        }


        if (routeQuery.image_id)  {
            query += "image_id=" + routeQuery.image_id + "&";
        }
        else if  (this.image){
            query += "image_id=" + this.image + "&";
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

        if (routeQuery.order_type) {
            query += "order_type=" + routeQuery.order_type + "&";
        }
        else if  (this.order_type){
            query += "order_type=" + this.order_type + "&";
        }

        if (routeQuery.icon) {
            query += "icon=" + routeQuery.icon + "&";
        }
        else if (this.icon) {
            query += "icon=" + this.icon + "&";
        }

        if (routeQuery.menu_id) {
            query += "menu_id=" + routeQuery.menu_id + "&";
        }
        else if (this.menu) {
            query += "menu_id=" + this.menu + "&";
        }
        if (routeQuery.created_at_from_date) {
            query += "created_at_from_date=" + routeQuery.created_at_from_date + "&";
        }
        else if (this.createdAtFrom) {
            query += "created_at_from=" + this.createdAtFrom + "&";
        }
        if (routeQuery.created_at_to_date) {
            query += "created_at_to_date=" + routeQuery.created_at_to_date + "&";
        }
        else if (this.createdAtTo) {
            query += "created_at_to_date=" + this.createdAtTo + "&";
        }
        return query.substring(0, query.length - 1);
    }
}