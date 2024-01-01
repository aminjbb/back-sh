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
        this.id = null;
        this.user_id = null;
        this.status = null;
        this.payment_status = null;
        this.payment_method = null;
        this.packed_status = null;
        this.identification_code = null;
        this.bank_id = null;
        this.submit_date = null;
        this.receive_date = null;
        this.state_id = null;
        this.city_id = null;
        this.lower_payment = null;
        this.highest_payment = null;
    }

    query_maker() {
        let query = "?";
        if (this.page !== null) {
            query += "page=" + this.page + "&";
        }

        if (this.per_page !== null) {
            query += "per_page=" + this.per_page + "&";
        }
        
        if (this.id !== null) {
            query += "id=" + this.id + "&";
        }

        if (this.user_id !== null) {
            query += "user_id=" + this.user_id + "&";
        }

        if (this.status !== null) {
            query += "status=" + this.status + "&";
        }

        if (this.payment_status !== null) {
            query += "payment_status=" + this.payment_status + "&";
        }

        if (this.payment_method !== null) {
            query += "payment_method=" + this.payment_method + "&";
        }

        if (this.packed_status !== null) {
            query += "packed_status=" + this.packed_status + "&";
        }

        if (this.identification_code !== null) {
            query += "identification_code=" + this.identification_code + "&";
        }

        if (this.bank_id !== null) {
            query += "bank_id=" + this.bank_id + "&";
        }

        if (this.submit_date !== null) {
            query += "submit_date=" + this.submit_date + "&";
        }

        if (this.receive_date !== null) {
            query += "receive_date=" + this.receive_date + "&";
        }

        if (this.state_id !== null) {
            query += "state_id=" + this.state_id + "&";
        }

        if (this.city_id !== null) {
            query += "city_id=" + this.city_id + "&";
        }

        if (this.lower_payment !== null) {
            query += "lower_payment=" + this.lower_payment + "&";
        }

        if (this.highest_payment !== null) {
            query += "highest_payment=" + this.highest_payment + "&";
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

        if (routeQuery.payment_status) {
            query += "payment_status=" + routeQuery.payment_status + "&";
        } else if (this.payment_status) {
            query += "payment_status=" + this.payment_status + "&";
        }

        if (routeQuery.payment_method) {
            query += "payment_method=" + routeQuery.payment_method + "&";
        } else if (this.payment_method) {
            query += "payment_method=" + this.payment_method + "&";
        }

        if (routeQuery.packed_status) {
            query += "packed_status=" + routeQuery.packed_status + "&";
        } else if (this.packed_status) {
            query += "packed_status=" + this.packed_status + "&";
        }

        if (routeQuery.identification_code) {
            query += "identification_code=" + routeQuery.identification_code + "&";
        } else if (this.identification_code) {
            query += "identification_code=" + this.identification_code + "&";
        }

        if (routeQuery.bank_id) {
            query += "bank_id=" + routeQuery.bank_id + "&";
        } else if (this.bank_id) {
            query += "bank_id=" + this.bank_id + "&";
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

        if (routeQuery.state_id) {
            query += "state_id=" + routeQuery.state_id + "&";
        } else if (this.state_id) {
            query += "state_id=" + this.state_id + "&";
        }

        if (routeQuery.city_id) {
            query += "city_id=" + routeQuery.city_id + "&";
        } else if (this.city_id) {
            query += "city_id=" + this.city_id + "&";
        }

        if (routeQuery.lower_payment) {
            query += "lower_payment=" + routeQuery.lower_payment + "&";
        } else if (this.lower_payment) {
            query += "lower_payment=" + this.lower_payment + "&";
        }

        if (routeQuery.highest_payment) {
            query += "highest_payment=" + routeQuery.highest_payment + "&";
        } else if (this.highest_payment) {
            query += "highest_payment=" + this.highest_payment + "&";
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

        if (routeQuery.payment_status) {
            query += "payment_status=" + routeQuery.payment_status + "&";
        } else if (this.payment_status) {
            query += "payment_status=" + this.payment_status + "&";
        }

        if (routeQuery.payment_method) {
            query += "payment_method=" + routeQuery.payment_method + "&";
        } else if (this.payment_method) {
            query += "payment_method=" + this.payment_method + "&";
        }

        if (routeQuery.packed_status) {
            query += "packed_status=" + routeQuery.packed_status + "&";
        } else if (this.packed_status) {
            query += "packed_status=" + this.packed_status + "&";
        }

        if (routeQuery.identification_code) {
            query += "identification_code=" + routeQuery.identification_code + "&";
        } else if (this.identification_code) {
            query += "identification_code=" + this.identification_code + "&";
        }

        if (routeQuery.bank_id) {
            query += "bank_id=" + routeQuery.bank_id + "&";
        } else if (this.bank_id) {
            query += "bank_id=" + this.bank_id + "&";
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

        if (routeQuery.state_id) {
            query += "state_id=" + routeQuery.state_id + "&";
        } else if (this.state_id) {
            query += "state_id=" + this.state_id + "&";
        }

        if (routeQuery.city_id) {
            query += "city_id=" + routeQuery.city_id + "&";
        } else if (this.city_id) {
            query += "city_id=" + this.city_id + "&";
        }

        if (routeQuery.lower_payment) {
            query += "lower_payment=" + routeQuery.lower_payment + "&";
        } else if (this.lower_payment) {
            query += "lower_payment=" + this.lower_payment + "&";
        }

        if (routeQuery.highest_payment) {
            query += "highest_payment=" + routeQuery.highest_payment + "&";
        } else if (this.highest_payment) {
            query += "highest_payment=" + this.highest_payment + "&";
        }

        return query.substring(0, query.length - 1);
    }
}