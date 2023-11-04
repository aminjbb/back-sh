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

export class SupplierPanelFilter {
    constructor() {
        this.full_name = null;
        this.shopping_name = null;
        this.email = null;
        this.id = null;
        this.kosar_id = null;
        this.per_page = 25;
        this.page = 1;
        this.order = 'created_at';
        this.order_type = 'desc';
        this.phone = null;
        this.phone_number = null;
        this.payment_period = null;
        this.payment_type = null;
        this.type = null;
        this.state_id = null;
        this.city_id = null;
        this.identification_code = null;
    }

    query_maker() {
        let query = "?";
        if (this.full_name !== null) {
            query += "full_name=" + this.full_name + "&";
        }

        if (this.shopping_name !== null) {
            query += "shopping_name=" + this.shopping_name + "&";
        }

        if (this.id !== null) {
            query += "id=" + this.id + "&";
        }

        if (this.email !== null) {
            query += "email=" + this.email + "&";
        }

        if (this.page !== null) {
            query += "page=" + this.page + "&";
        }

        if (this.per_page !== null) {
            query += "per_page=" + this.per_page + "&";
        }

        if (this.kosar_id !== null) {
            query += "kosar_id=" + this.kosar_id + "&";
        }

        if (this.phone !== null) {
            query += "phone=" + this.phone + "&";
        }

        if (this.phone_number !== null) {
            query += "phone_number=" + this.phone_number + "&";
        }

        if (this.payment_period !== null) {
            query += "payment_period=" + this.payment_period + "&";
        }

        if (this.payment_type !== null) {
            query += "payment_type=" + this.payment_type + "&";
        }

        if (this.type !== null) {
            query += "type=" + this.type + "&";
        }

        if (this.state_id !== null) {
            query += "state_id=" + this.state_id + "&";
        }

        if (this.city_id !== null) {
            query += "city_id=" + this.city_id + "&";
        }

        if (this.identification_code !== null) {
            query += "identification_code=" + this.identification_code + "&";
        }

        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery) {
        let query = "?";
        
        if (this.full_name) {
            query += "full_name=" + this.full_name + "&";
        } else if (routeQuery.full_name) {
            query += "full_name=" + routeQuery.full_name + "&";
        }

        if (this.shopping_name) {
            query += "shopping_name=" + this.shopping_name + "&";
        } else if (routeQuery.shopping_name) {
            query += "shopping_name=" + routeQuery.shopping_name + "&";
        }

        if (this.id) {
            query += "id=" + this.id + "&";
        } else if (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
        }

        if (routeQuery.email) {
            query += "email=" + routeQuery.email + "&";
        } else if (this.email) {
            query += "email=" + this.email + "&";
        }

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

        if (routeQuery.kosar_id) {
            query += "kosar_id=" + routeQuery.kosar_id + "&";
        } else if (this.kosar_id) {
            query += "kosar_id=" + this.kosar_id + "&";
        }

        if (routeQuery.phone) {
            query += "phone=" + routeQuery.phone + "&";
        } else if (this.phone) {
            query += "phone=" + this.phone + "&";
        }

        if (routeQuery.phone_number) {
            query += "phone_number=" + routeQuery.phone_number + "&";
        } else if (this.phone_number) {
            query += "phone_number=" + this.phone_number + "&";
        }

        if (routeQuery.payment_period) {
            query += "payment_period=" + routeQuery.payment_period + "&";
        } else if (this.payment_period) {
            query += "payment_period=" + this.payment_period + "&";
        }

        if (routeQuery.payment_type) {
            query += "payment_type=" + routeQuery.payment_type + "&";
        } else if (this.payment_type) {
            query += "payment_type=" + this.payment_type + "&";
        }

        if (routeQuery.type) {
            query += "type=" + routeQuery.type + "&";
        } else if (this.type) {
            query += "type=" + this.type + "&";
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

        if (routeQuery.identification_code) {
            query += "identification_code=" + routeQuery.identification_code + "&";
        } else if (this.identification_code) {
            query += "identification_code=" + this.identification_code + "&";
        }

        return query.substring(0, query.length - 1);
    }

    sort_query(routeQuery) {
        let query = "?";
        if (this.full_name) {
            query += "full_name=" + this.full_name + "&";
        } else if (routeQuery.full_name) {
            query += "full_name=" + routeQuery.full_name + "&";
        }
        if (this.shopping_name) {
            query += "shopping_name=" + this.shopping_name + "&";
        } else if (routeQuery.shopping_name) {
            query += "shopping_name=" + routeQuery.shopping_name + "&";
        }
        if (this.id) {
            query += "id=" + this.id + "&";
        } else if (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
        }

        if (routeQuery.email) {
            query += "email=" + routeQuery.email + "&";
        } else if (this.email) {
            query += "email=" + this.email + "&";
        }

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

        if (routeQuery.kosar_id) {
            query += "kosar_id=" + routeQuery.kosar_id + "&";
        } else if (this.kosar_id) {
            query += "kosar_id=" + this.kosar_id + "&";
        }

        if (routeQuery.phone) {
            query += "phone=" + routeQuery.phone + "&";
        } else if (this.phone) {
            query += "phone=" + this.phone + "&";
        }

        if (routeQuery.phone_number) {
            query += "phone_number=" + routeQuery.phone_number + "&";
        } else if (this.phone_number) {
            query += "phone_number=" + this.phone_number + "&";
        }

        if (routeQuery.payment_period) {
            query += "payment_period=" + routeQuery.payment_period + "&";
        } else if (this.payment_period) {
            query += "payment_period=" + this.payment_period + "&";
        }

        if (routeQuery.payment_type) {
            query += "payment_type=" + routeQuery.payment_type + "&";
        } else if (this.payment_type) {
            query += "payment_type=" + this.payment_type + "&";
        }

        if (routeQuery.type) {
            query += "type=" + routeQuery.type + "&";
        } else if (this.type) {
            query += "type=" + this.type + "&";
        }

        if (routeQuery.identification_code) {
            query += "identification_code=" + routeQuery.identification_code + "&";
        } else if (this.type) {
            query += "identification_code=" + this.identification_code + "&";
        }

        return query.substring(0, query.length - 1);
    }
}