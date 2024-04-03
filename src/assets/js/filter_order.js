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
        this.order_id = null;
        this.orderNumber = null;
        this.creator_id = null;
        this.user_id = null;

        this.status = null;
        this.payment_status = null;
        this.payment_method = null;
        this.packed_status = null;
        this.packed_status = null;
        //this.identification_code = null;
        // this.bank_id = null;
        this.created_at_to_date = null;
        this.created_at_from_date = null;
        this.logistic_at_to_date = null;
        this.logistic_at_from_date = null;
        this.submit_date = null;
        this.logistic_date = null;

        this.receive_state_id = null;
        this.receive_city_id = null;
        this.paid_price_from = null;
        this.paid_price_to = null;
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

        if (this.order_id !== null) {
            query += "order_id=" + this.order_id + "&";
        }

        if (this.orderNumber !== null) {
            query += "order_number=" + this.orderNumber + "&";
        }

        if (this.creator_id !== null) {
            query += "creator_id=" + this.creator_id + "&";
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

        /*  if (this.identification_code !== null) {
             query += "identification_code=" + this.identification_code + "&";
         } */

        // if (this.bank_id !== null) {
        //     query += "bank_id=" + this.bank_id + "&";
        // }

        if (this.created_at_to_date) {
            query += "created_at_to_date=" + this.created_at_to_date + "&";
        }

        if (this.created_at_from_date) {
            query += "created_at_from_date=" + this.created_at_from_date + "&";
        }

        if (this.logistic_at_to_date) {
            query += "logistic_at_to_date=" + this.logistic_at_to_date + "&";
        }

        if (this.logistic_at_from_date) {
            query += "logistic_at_from_date=" + this.logistic_at_from_date + "&";
        }


        if (this.receive_state_id !== null) {
            query += "receive_state_id=" + this.receive_state_id + "&";
        }

        if (this.receive_city_id !== null) {
            query += "receive_city_id=" + this.receive_city_id + "&";
        }

        if (this.paid_price_from !== null) {
            query += "paid_price_from=" + this.paid_price_from + "&";
        }

        if (this.paid_price_to !== null) {
            query += "paid_price_to=" + this.paid_price_to + "&";
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

        if (this.order_id) {
            query += "order_id=" + this.order_id + "&";
        } else if (routeQuery.order_id) {
            query += "order_id=" + routeQuery.order_id + "&";
        }

        if (this.orderNumber) {
            query += "order_number=" + this.orderNumber + "&";
        } else if (routeQuery.order_number) {
            query += "order_number=" + routeQuery.order_number + "&";
        }

        if (this.creator_id) {
            query += "creator_id=" + this.creator_id + "&";
        } else if (routeQuery.creator_id) {
            query += "creator_id=" + routeQuery.creator_id + "&";
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

        /*  if (routeQuery.identification_code) {
             query += "identification_code=" + routeQuery.identification_code + "&";
         } else if (this.identification_code) {
             query += "identification_code=" + this.identification_code + "&";
         }

         if (routeQuery.bank_id) {
             query += "bank_id=" + routeQuery.bank_id + "&";
         } else if (this.bank_id) {
             query += "bank_id=" + this.bank_id + "&";
         } */

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

        if (routeQuery.logistic_at_to_date) {
            query += "logistic_at_to_date=" + routeQuery.logistic_at_to_date + "&";
        }
        else if (this.created_at_to_date) {
            query += "logistic_at_to_date=" + this.logistic_at_to_date + "&";
        }

        if (routeQuery.logistic_at_from_date) {
            query += "logistic_at_from_date=" + routeQuery.logistic_at_from_date + "&";
        }
        else if (this.logistic_at_from_date) {
            query += "logistic_at_from_date=" + this.logistic_at_from_date + "&";
        }

        if (routeQuery.receive_state_id) {
            query += "receive_state_id=" + routeQuery.receive_state_id + "&";
        } else if (this.receive_state_id) {
            query += "receive_state_id=" + this.receive_state_id + "&";
        }

        if (routeQuery.receive_city_id) {
            query += "receive_city_id=" + routeQuery.receive_city_id + "&";
        } else if (this.receive_city_id) {
            query += "receive_city_id=" + this.receive_city_id + "&";
        }

        if (routeQuery.paid_price_from) {
            query += "paid_price_from=" + routeQuery.paid_price_from + "&";
        } else if (this.paid_price_from) {
            query += "paid_price_from=" + this.paid_price_from + "&";
        }

        if (routeQuery.paid_price_to) {
            query += "paid_price_to=" + routeQuery.paid_price_to + "&";
        } else if (this.paid_price_to) {
            query += "paid_price_to=" + this.paid_price_to + "&";
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

        if (this.order_id) {
            query += "order_id=" + this.order_id + "&";
        } else if (routeQuery.order_id) {
            query += "order_id=" + routeQuery.order_id + "&";
        }

        if (this.creator_id) {
            query += "creator_id=" + this.creator_id + "&";
        } else if (routeQuery.creator_id) {
            query += "creator_id=" + routeQuery.creator_id + "&";
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

        /* if (routeQuery.identification_code) {
            query += "identification_code=" + routeQuery.identification_code + "&";
        } else if (this.identification_code) {
            query += "identification_code=" + this.identification_code + "&";
        }

        if (routeQuery.bank_id) {
            query += "bank_id=" + routeQuery.bank_id + "&";
        } else if (this.bank_id) {
            query += "bank_id=" + this.bank_id + "&";
        } */

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

        if (routeQuery.logistic_at_to_date) {
            query += "logistic_at_to_date=" + routeQuery.logistic_at_to_date + "&";
        }
        else if (this.logistic_at_to_date) {
            query += "logistic_at_to_date=" + this.logistic_at_to_date + "&";
        }

        if (routeQuery.logistic_at_from_date) {
            query += "logistic_at_from_date=" + routeQuery.logistic_at_from_date + "&";
        }
        else if (this.logistic_at_from_date) {
            query += "logistic_at_from_date=" + this.logistic_at_from_date + "&";
        }

        if (routeQuery.receive_state_id) {
            query += "receive_state_id=" + routeQuery.receive_state_id + "&";
        } else if (this.receive_state_id) {
            query += "receive_state_id=" + this.receive_state_id + "&";
        }

        if (routeQuery.receive_city_id) {
            query += "receive_city_id=" + routeQuery.receive_city_id + "&";
        } else if (this.receive_city_id) {
            query += "receive_city_id=" + this.receive_city_id + "&";
        }

        if (routeQuery.paid_price_from) {
            query += "paid_price_from=" + routeQuery.paid_price_from + "&";
        } else if (this.paid_price_from) {
            query += "paid_price_from=" + this.paid_price_from + "&";
        }

        if (routeQuery.paid_price_to) {
            query += "paid_price_to=" + routeQuery.paid_price_to + "&";
        } else if (this.paid_price_to) {
            query += "paid_price_to=" + this.paid_price_to + "&";
        }

        if (routeQuery.logistic_date) {
            query += "logistic_date=" + routeQuery.logistic_date + "&";
        } else if (this.logistic_date) {
            query += "logistic_date=" + this.logistic_date + "&";
        }

        if (routeQuery.submit_date) {
            query += "submit_date=" + routeQuery.submit_date + "&";
        } else if (this.submit_date) {
            query += "submit_date=" + this.submit_date + "&";
        }

        return query.substring(0, query.length - 1);
    }
}