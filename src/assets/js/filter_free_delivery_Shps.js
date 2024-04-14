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
        this.per_page = 25;
        this.page = 1;
        this.id = null;
        this.label = null;
        this.customer_price = null;
        this.site_price =null;

    }

    query_maker() {
        let query = "?";
        if (this.page !== null) {
            query += "page=" + this.page + "&";
        }

        if (this.per_page !== null) {
            query += "per_page=" + this.per_page + "&";
        }

        if (this.first_name !== null) {
            query += "first_name=" + this.first_name + "&";
        }
        if (this.last_name !== null) {
            query += "last_name=" + this.last_name + "&";
        }

        if (this.id !== null) {
            query += "id=" + this.id + "&";
        }
        if (this.phone_number !== null) {
            query += "phone_number=" + this.phone_number + "&";
        }



        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery) {
        let query = "?";

        if (this.per_page) {
            query += "per_page=" + this.per_page + "&";
        } else if (routeQuery.per_page) {
            query += "per_page=" + routeQuery.per_page + "&";
        }

        if (this.page) {
            query += "page=" + this.page + "&";
        } else if (routeQuery.page) {
            query += "page=" + routeQuery.page + "&";
        }

        if (routeQuery.phone_number) {
            query += "phone_number=" + routeQuery.phone_number + "&";
        } else if (this.phone_number) {
            query += "phone_number=" + this.phone_number + "&";
        }

        if (this.first_name) {
            query += "first_name=" + this.first_name + "&";
        } else if (routeQuery.first_name) {
            query += "first_name=" + routeQuery.first_name + "&";
        }
        if (this.last_name) {
            query += "last_name=" + this.last_name + "&";
        } else if (routeQuery.last_name) {
            query += "last_name=" + routeQuery.last_name + "&";
        }
        if (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
        } else if (this.id) {
            query += "id=" + this.id + "&";
        }

        return query.substring(0, query.length - 1);
    }

    sort_query(routeQuery) {
        let query = "?";
        if (this.per_page) {
            query += "per_page=" + this.per_page + "&";
        } else if (routeQuery.per_page) {
            query += "per_page=" + routeQuery.per_page + "&";
        }
        if (this.page) {
            query += "page=" + this.page + "&";
        } else if (routeQuery.page) {
            query += "page=" + routeQuery.page + "&";
        }


        return query.substring(0, query.length - 1);
    }
}