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

export class OrderListPanelFilter {
    constructor() {
        this.per_page = 25;
        this.page = 1;
        this.id = null;
        this.user_id= null;
        this.paid_price_from= null;
        this.paid_price_to= null;
        this.submit_date_from_date= null;
        this.submit_date_to_date= null;
        this.details_count_from= null;
        this.details_count_to= null;


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
        if (this.paid_price_from !== null) {
            query += "paid_price_from=" + this.paid_price_from + "&";
        }
        if (this.paid_price_to !== null) {
            query += "paid_price_to=" + this.paid_price_to + "&";
        }
        if (this.submit_date_from_date !== null) {
            query += "submit_date_from_date=" + this.submit_date_from_date + "&";
        }
        if (this.submit_date_to_date !== null) {
            query += "submit_date_to_date=" + this.submit_date_to_date + "&";
        }
        if (this.details_count_from !== null) {
            query += "details_count_from=" + this.details_count_from + "&";
        }
        if (this.details_count_to !== null) {
            query += "details_count_to=" + this.details_count_to + "&";
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

        if (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
        } else if (this.id) {
            query += "id=" + this.id + "&";
        }
        if (routeQuery.user_id) {
            query += "user_id=" + routeQuery.user_id + "&";
        } else if (this.user_id) {
            query += "user_id=" + this.user_id + "&";
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
        if (routeQuery.submit_date_from_date) {
            query += "submit_date_from_date=" + routeQuery.submit_date_from_date + "&";
        } else if (this.submit_date_from_date) {
            query += "submit_date_from_date=" + this.submit_date_from_date + "&";
        }
        if (routeQuery.submit_date_to_date) {
            query += "submit_date_to_date=" + routeQuery.submit_date_to_date + "&";
        } else if (this.submit_date_to_date) {
            query += "submit_date_to_date=" + this.submit_date_to_date + "&";
        }
        if (routeQuery.details_count_from) {
            query += "details_count_from=" + routeQuery.details_count_from + "&";
        } else if (this.details_count_from) {
            query += "details_count_from=" + this.details_count_from + "&";
        }
        if (routeQuery.details_count_to) {
            query += "details_count_to=" + routeQuery.details_count_to + "&";
        } else if (this.details_count_to) {
            query += "details_count_to=" + this.details_count_to + "&";
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