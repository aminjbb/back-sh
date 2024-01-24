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
        this.is_active = null;

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

        if (this.start_time !== null) {
            query += "end_time=" + this.end_time + "&";
        }

        if (this.is_active !== null) {
            query += "is_active=" + this.is_active + "&";
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

        if (routeQuery.is_active) {
            query += "is_active=" + routeQuery.is_active + "&";
        } else if (this.is_active) {
            query += "is_active=" + this.is_active + "&";
        }

        if (routeQuery.discount_from) {
            query += "discount_from=" + routeQuery.discount_from + "&";
        } else if (this.discount_from) {
            query += "discount_from=" + this.discount_from + "&";
        }

        if (routeQuery.start_time) {
            query += "start_time=" + routeQuery.start_time + "&";
        } else if (this.start_time) {
            query += "start_time=" + this.start_time + "&";
        }

        if (routeQuery.end_time) {
            query += "receive_date=" + routeQuery.end_time + "&";
        } else if (this.end_time) {
            query += "receive_date=" + this.end_time + "&";
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
        if (this.user_id) {
            query += "user_id=" + this.user_id + "&";
        } else if (routeQuery.user_id) {
            query += "user_id=" + routeQuery.user_id + "&";
        }
        if (this.status) {
            query += "status=" + this.status + "&";
        } else if (routeQuery.status) {
            query += "status=" + routeQuery.status + "&";
        }



        if (routeQuery.packed_status) {
            query += "packed_status=" + routeQuery.packed_status + "&";
        } else if (this.packed_status) {
            query += "packed_status=" + this.packed_status + "&";
        }



        if (routeQuery.submit_date) {
            query += "submit_date=" + routeQuery.submit_date + "&";
        } else if (this.submit_date) {
            query += "submit_date=" + this.submit_date + "&";
        }

        if (routeQuery.receive_date) {
            query += "receive_date=" + routeQuery.receive_date + "&";
        } else if (this.receive_date) {
            query += "receive_date=" + this.receive_date + "&";
        }



        return query.substring(0, query.length - 1);
    }
}