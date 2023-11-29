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
        this.name = null;
        this.sort = null;
        this.label = null;
        this.id = null;
        this.active = null;
        this.per_page = 25;
        this.page = 1;
        this.order = 'created_at';
        this.order_type = 'desc';
        this.group = null ;
        this.created_at_to_date = null;
        this.created_at_from_date = null;
        this.updated_at_to_date = null;
        this.updated_at_from_date = null;
        this.type = null;
        this.priority = null;
        this.status = null;
        this.code = null;
        this.title = null;
        this.model =null
    }

    query_maker() {
        let query = "?";
        if (this.name !== null) {
            query += "name=" + this.name + "&";
        }
        if (this.label !== null) {
            query += "label=" + this.label + "&";
        }
        if (this.id !== null) {
            query += "id=" + this.id + "&";
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
        if (this.group!== null) {
            query += "group=" + this.group + "&";
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
        if (this.type!== null) {
            query += "type=" + this.type + "&";
        }

        if (this.status!== null) {
            query += "status=" + this.status + "&";
        }
        if (this.priority!== null) {
            query += "priority=" + this.priority + "&";
        }
        if (this.code!== null) {
            query += "code=" + this.code + "&";
        }
        if (this.title!== null) {
            query += "title=" + this.title + "&";
        }
        if (this.model !== null) {
            query += "model=" +  this.model  + "&";
        }

        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery){
        let query = "?";
        if  (this.name) {
            query += "name=" + this.name + "&";
        }
        else if (routeQuery.name ){
            query += "name=" + routeQuery.name + "&";
        }
        
        if (this.model ) {
            query += "model=" + this.model + "&";
        }
        else if (routeQuery.model ){
            query += "model=" + routeQuery.model + "&";
        }

        if (this.label) {
            query += "label=" + this.label + "&";
        }
        else if (routeQuery.label) {
            query += "label=" + routeQuery.label + "&";
        }

        if (this.id){
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

        if (routeQuery.type) {
            query += "type=" + routeQuery.type + "&";
        }
        else if (this.type) {
            query += "type=" + this.type + "&";
        }

        if (routeQuery.status) {
            query += "status=" + routeQuery.status + "&";
        }
        else if (this.status) {
            query += "status=" + this.status + "&";
        }

        if (routeQuery.priority) {
            query += "priority=" + routeQuery.priority + "&";
        }
        else if (this.priority) {
            query += "priority=" + this.priority + "&";
        }

        if (routeQuery.code) {
            query += "code=" + routeQuery.code + "&";
        }
        else if (this.code) {
            query += "code=" + this.code + "&";
        }

        if (routeQuery.title) {
            query += "title=" + routeQuery.title + "&";
        }
        else if (this.title) {
            query += "title=" + this.title + "&";
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
        if (routeQuery.type) {
            query += "type=" + routeQuery.type + "&";
        }
        else if (this.type) {
            query += "type=" + this.type + "&";
        }
        return query.substring(0, query.length - 1);
    }
}