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
        this.user_id = null;
        this.state_id = null;

        this.sku_id = null;
        this.name = null;
        this.code = null;
        this.voucher_type = null;
        this.discount_type = null;
        this.sending_method = null;
        this.start_time_to = null;
        this.start_time_from = null;
        this.end_time_to = null;
        this.end_time_from = null;
        this.active = null;
        this.discount_from = null;
        this.discount_to = null;
        this.order_count_from = null;
        this.order_count_to = null;
        this.order_limit_from = null;
        this.order_limit_to = null;
        this.user_limit_from = null;
        this.user_limit_to = null;
        this.min_order_price_from = null;
        this.min_order_price_to = null;

    }

    query_maker() {
        let query = "?";
        if (this.page !== null) {
            query += "page=" + this.page + "&";
        }

        if (this.per_page !== null) {
            query += "per_page=" + this.per_page + "&";
        }

        if (this.user_id !== null) {
            query += "user_id=" + this.user_id + "&";
        }

        if (this.state_id !== null) {
            query += "state_id=" + this.state_id + "&";
        }

        if (this.sku_id !== null) {
            query += "sku_id=" + this.sku_id + "&";
        }

        if (this.name !== null) {
            query += "name=" + this.name + "&";
        }

        if (this.code !== null) {
            query += "code=" + this.code + "&";
        }

        if (this.voucher_type !== null) {
            query += "voucher_type=" + this.voucher_type + "&";
        }

        if (this.discount_type !== null) {
            query += "discount_type=" + this.discount_type + "&";
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


        if (this.discount_from !== null) {
            query += "discount_from=" + this.discount_from + "&";
        }

        if (this.discount_to !== null) {
            query += "discount_to=" + this.discount_to + "&";
        }

        if (this.order_count_from !== null) {
            query += "order_count_from=" + this.order_count_from + "&";
        }

        if (this.order_count_to !== null) {
            query += "order_count_to=" + this.order_count_to + "&";
        }
        if (this.order_limit_from !== null) {
            query += "order_limit_from=" + this.order_limit_from + "&";
        }
        if (this.order_limit_to !== null) {
            query += "order_limit_to=" + this.order_limit_to + "&";
        }
        if (this.user_limit_from !== null) {
            query += "user_limit_from=" + this.user_limit_from + "&";
        }
        if (this.user_limit_to !== null) {
            query += "user_limit_to=" + this.user_limit_to + "&";
        }
        if (this.min_order_price_from !== null) {
            query += "min_order_price_from=" + this.min_order_price_from + "&";
        }
        if (this.min_order_price_to !== null) {
            query += "min_order_price_to=" + this.min_order_price_to + "&";
        }

        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery) {
        let query = "?";
        if (routeQuery.per_page) {
            query += "per_page=" + routeQuery.per_page + "&";
        }
        else if (this.per_page) {
            query += "per_page=" + this.per_page + "&";
        }
        if (routeQuery.page) {
            query += "page=" + routeQuery.page + "&";
        }
       else   if (this.page) {
            query += "page=" + this.page + "&";
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

        if (this.code) {
            query += "code=" + this.code + "&";
        } else if (routeQuery.code) {
            query += "code=" + routeQuery.code + "&";
        }

        if (this.user_id) {
            query += "user_id=" + this.user_id + "&";
        } else if (routeQuery.user_id) {
            query += "user_id=" + routeQuery.user_id + "&";
        }

        if (this.voucher_type) {
            query += "voucher_type=" + this.voucher_type + "&";
        } else if (routeQuery.voucher_type) {
            query += "voucher_type=" + routeQuery.voucher_type + "&";
        }

        if (routeQuery.discount_type) {
            query += "discount_type=" + routeQuery.discount_type + "&";
        } else if (this.discount_type) {
            query += "discount_type=" + this.discount_type + "&";
        }

        if (routeQuery.sending_method) {
            query += "sending_method=" + routeQuery.sending_method + "&";
        } else if (this.sending_method) {
            query += "sending_method=" + this.sending_method + "&";
        }

        if (routeQuery.is_active)  {
            query += "is_active=" + routeQuery.is_active + "&";
        }
        else if  (this.active){
            query += "is_active=" + this.active + "&";
        }

        if (routeQuery.discount_from) {
            query += "discount_from=" + routeQuery.discount_from + "&";
        } else if (this.discount_from) {
            query += "discount_from=" + this.discount_from + "&";
        }

        if (routeQuery.discount_to) {
            query += "discount_to=" + routeQuery.discount_to + "&";
        } else if (this.discount_to) {
            query += "discount_to=" + this.discount_to + "&";
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

        if (routeQuery.state_id) {
            query += "state_id=" + routeQuery.state_id + "&";
        } else if (this.state_id) {
            query += "state_id=" + this.state_id + "&";
        }

        if (routeQuery.order_count_from) {
            query += "order_count_from=" + routeQuery.order_count_from + "&";
        } else if (this.order_count_from) {
            query += "order_count_from=" + this.order_count_from + "&";
        }

        if (routeQuery.order_count_to) {
            query += "order_count_to=" + routeQuery.order_count_to + "&";
        } else if (this.order_count_to) {
            query += "order_count_to=" + this.order_count_to + "&";
        }

        if (routeQuery.order_limit_from) {
            query += "order_limit_from=" + routeQuery.order_limit_from + "&";
        } else if (this.order_limit_from) {
            query += "order_limit_from=" + this.order_limit_from + "&";
        }
        if (routeQuery.order_limit_to) {
            query += "order_limit_to=" + routeQuery.order_limit_to + "&";
        } else if (this.order_limit_to) {
            query += "order_limit_to=" + this.order_limit_to + "&";
        }

        if (routeQuery.user_limit_from) {
            query += "user_limit_from=" + routeQuery.user_limit_from + "&";
        } else if (this.user_limit_from) {
            query += "user_limit_from=" + this.user_limit_from + "&";
        }

        if (routeQuery.user_limit_to) {
            query += "user_limit_to=" + routeQuery.user_limit_to + "&";
        } else if (this.user_limit_to) {
            query += "user_limit_to=" + this.user_limit_to + "&";
        }

        if (routeQuery.min_order_price_from) {
            query += "min_order_price_from=" + routeQuery.min_order_price_from + "&";
        } else if (this.min_order_price_from) {
            query += "min_order_price_from=" + this.min_order_price_from + "&";
        }

        if (routeQuery.min_order_price_to) {
            query += "min_order_price_to=" + routeQuery.min_order_price_to + "&";
        } else if (this.min_order_price_to) {
            query += "min_order_price_to=" + this.min_order_price_to + "&";
        }

        if (routeQuery.sku_id) {
            query += "sku_id=" + routeQuery.sku_id + "&";
        } else if (this.sku_id) {
            query += "sku_id=" + this.sku_id + "&";
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