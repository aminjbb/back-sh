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
        this.order = 'created_at';
        this.order_type = 'desc';
        this.name = null;
        this.sending_method = null;
        this.start_time = null;
        this.end_time = null;
        this.active = null;
        this.start_time_to = null;
        this.start_time_from = null;
        this.end_time_to = null;
        this.end_time_from = null;

    }

    query_maker() {
        let query = "?";
        if (this.page !== null) {
            query += "page=" + this.page + "&";
        }

        if (this.per_page !== null) {
            query += "per_page=" + this.per_page + "&";
        }

        if (this.name !== null) {
            query += "name=" + this.name + "&";
        }

        if (this.sending_method !== null) {
            query += "sending_method=" + this.sending_method + "&";
        }

        if (this.end_time_from !== null) {
            query += "end_time_from=" + this.end_time_from + "&";
        }
        if (this.end_time_to !== null) {
            query += "end_time_to=" + this.end_time_to + "&";
        }
        if (this.start_time_to !== null) {
            query += "start_time_to=" + this.start_time_to + "&";
        }
        if (this.start_time_from !== null) {
            query += "start_time_from=" + this.start_time_from + "&";
        }

        if (this.active !== null) {
            query += "is_active=" + this.active + "&";
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

        if (routeQuery.order) {
            query += "order=" + routeQuery.order + "&";
        } else if (this.order) {
            query += "order=" + this.order + "&";
        }

        if (routeQuery.order_type) {
            query += "order_type=" + routeQuery.order_type + "&";
        } else if (this.order_type) {
            query += "order_type=" + this.order_type + "&";
        }

        if (this.name) {
            query += "name=" + this.name + "&";
        } else if (routeQuery.name) {
            query += "name=" + routeQuery.name + "&";
        }

        if (routeQuery.sending_method) {
            query += "sending_method=" + routeQuery.sending_method + "&";
        } else if (this.sending_method) {
            query += "sending_method=" + this.sending_method + "&";
        }
        if (routeQuery.start_time_to) {
            query += "start_time_to=" + routeQuery.start_time_to + "&";
        } else if (this.start_time_to) {
            query += "start_time_to=" + this.start_time_to + "&";
        }
        if (routeQuery.start_time_from) {
            query += "start_time_from=" + routeQuery.start_time_from + "&";
        } else if (this.start_time_from) {
            query += "start_time_from=" + this.start_time_from + "&";
        }

        if (routeQuery.end_time_to) {
            query += "end_time_to=" + routeQuery.end_time_to + "&";
        } else if (this.end_time_to) {
            query += "end_time_to=" + this.end_time_to + "&";
        }
        if (routeQuery.end_time_from) {
            query += "end_time_from=" + routeQuery.end_time_from + "&";
        } else if (this.end_time_from) {
            query += "end_time_from=" + this.end_time_from + "&";
        }

        if (routeQuery.is_active)  {
            query += "is_active=" + routeQuery.is_active + "&";
        }
        else if  (this.active){
            query += "is_active=" + this.active + "&";
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

        if (this.order) {
            query += "order=" + this.order + "&";
        } else if (routeQuery.order) {
            query += "order=" + routeQuery.order + "&";
        }

        if (this.order_type) {
            query += "order_type=" + this.order_type + "&";
        } else if (routeQuery.order_type) {
            query += "order_type=" + routeQuery.order_type + "&";
        }

        if (this.id) {
            query += "id=" + this.id + "&";
        } else if (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
        }

        if (this.status) {
            query += "status=" + this.status + "&";
        } else if (routeQuery.status) {
            query += "status=" + routeQuery.status + "&";
        }





        return query.substring(0, query.length - 1);
    }
}