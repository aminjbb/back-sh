import {
    th
} from "vuetify/locale";

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

export class SkuSellerPanelFilter {
    constructor() {
        this.sku = null;
        this.id = null;
        this.active = null;
        this.per_page = 25;
        this.page = 1;
        this.order = 'created_at';
        this.order_type = 'desc';
        this.base_discount_from = null;
        this.base_discount_to = null;
        this.marketing_discount_from = null;
        this.marketing_discount_to = null;
        this.site_price_from = null;
        this.site_price_to = null;
        this.warehouse_stock_from = null;
        this.warehouse_stock_to = null;
        this.site_stock_from = null;
        this.site_stock_to = null;
        this.customer_price_from = null;
        this.customer_price_top = null;
        this.marketing_discount_start_time = null;
        this.marketing_discount_end_time = null;
        this.base_discount_start_time = null;
        this.base_discount_end_time = null;
        this.created_at_from_date = null;
        this.created_at_to_date = null;
    }

    query_maker() {
        let query = "?order=created_at&order_type=desc&";

        if (this.sku !== null) {
            query += "sku=" + this.sku + "&";
        }

        if (this.active !== null) {
            query += "is_active=" + this.active + "&";
        }

        if (this.marketing_discount_start_time) {
            query += "marketing_discount_start_time=" + this.marketing_discount_start_time + "&";
        }

        if (this.marketing_discount_end_time) {
            query += "marketing_discount_end_time=" + this.marketing_discount_end_time + "&";
        }

        if (this.base_discount_start_time) {
            query += "base_discount_start_time=" + this.base_discount_start_time + "&";
        }

        if (this.base_discount_end_time) {
            query += "base_discount_end_time=" + this.base_discount_end_time + "&";
        }

        if (this.site_stock_from !== null) {
            query += "site_stock_from=" + this.site_stock_from + "&";
        }

        if (this.site_stock_to !== null) {
            query += "site_stock_to=" + this.site_stock_to + "&";
        }

        if (this.warehouse_stock_from !== null) {
            query += "warehouse_stock_from=" + this.warehouse_stock_from + "&";
        }

        if (this.warehouse_stock_to !== null) {
            query += "warehouse_stock_to=" + this.warehouse_stock_to + "&";
        }

        if (this.site_price_from !== null) {
            query += "site_price_from=" + this.site_price_from + "&";
        }

        if (this.site_price_to !== null) {
            query += "site_price_to=" + this.site_price_to + "&";
        }

        if (this.marketing_discount_from !== null) {
            query += "marketing_discount_from=" + this.marketing_discount_from + "&";
        }

        if (this.marketing_discount_to !== null) {
            query += "marketing_discount_to=" + this.marketing_discount_to + "&";
        }

        if (this.base_discount_from !== null) {
            query += "base_discount_from=" + this.base_discount_from + "&";
        }

        if (this.base_discount_to !== null) {
            query += "base_discount_to=" + this.base_discount_to + "&";
        }

        if (this.customer_price_from !== null) {
            query += "customer_price_from=" + this.customer_price_from + "&";
        }

        if (this.customer_price_to !== null) {
            query += "customer_price_to=" + this.customer_price_to + "&";
        }

        if (this.page) {
            query += "page=" + this.page + "&";
        }

        if (this.per_page) {
            query += "per_page=" + this.per_page + "&";
        }

        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery) {
        let query = "?";
        if (this.sku) {
            query += "sku=" + this.sku + "&";
        } else if (routeQuery.sku) {
            query += "sku=" + routeQuery.sku + "&";
        }

        if (routeQuery.is_active) {
            query += "is_active=" + routeQuery.is_active + "&";
        } else if (this.active) {
            query += "is_active=" + this.active + "&";
        }

        if (routeQuery.marketing_discount_start_time) {
            query += "marketing_discount_start_time=" + routeQuery.marketing_discount_start_time + "&";
        } else if (this.marketing_discount_start_time) {
            query += "marketing_discount_start_time=" + this.marketing_discount_start_time + "&";
        }

        if (routeQuery.marketing_discount_end_time) {
            query += "marketing_discount_end_time=" + routeQuery.marketing_discount_end_time + "&";
        } else if (this.marketing_discount_end_time) {
            query += "marketing_discount_end_time=" + this.marketing_discount_end_time + "&";
        }

        if (routeQuery.base_discount_start_time) {
            query += "base_discount_start_time=" + routeQuery.base_discount_start_time + "&";
        } else if (this.base_discount_start_time) {
            query += "base_discount_start_time=" + this.base_discount_start_time + "&";
        }

        if (routeQuery.base_discount_end_time) {
            query += "base_discount_end_time=" + routeQuery.base_discount_end_time + "&";
        } else if (this.base_discount_end_time) {
            query += "base_discount_end_time=" + this.base_discount_end_time + "&";
        }

        if (routeQuery.site_stock_from) {
            query += "site_stock_from=" + routeQuery.site_stock_from + "&";
        } else if (this.site_stock_from) {
            query += "site_stock_from=" + this.site_stock_from + "&";
        }

        if (routeQuery.site_stock_to) {
            query += "site_stock_to=" + routeQuery.site_stock_to + "&";
        } else if (this.site_stock_to) {
            query += "site_stock_to=" + this.site_stock_to + "&";
        }

        if (routeQuery.warehouse_stock_from) {
            query += "warehouse_stock_from=" + routeQuery.warehouse_stock_from + "&";
        } else if (this.warehouse_stock_from) {
            query += "warehouse_stock_from=" + this.warehouse_stock_from + "&";
        }

        if (routeQuery.warehouse_stock_to) {
            query += "warehouse_stock_to=" + routeQuery.warehouse_stock_to + "&";
        } else if (this.warehouse_stock_to) {
            query += "warehouse_stock_to=" + this.warehouse_stock_to + "&";
        }

        if (routeQuery.site_price_from) {
            query += "site_price_from=" + routeQuery.site_price_from + "&";
        } else if (this.product) {
            query += "product_id=" + this.product + "&";
        }

        if (routeQuery.site_price_to) {
            query += "site_price_to=" + routeQuery.site_price_to + "&";
        } else if (this.site_price_to) {
            query += "site_price_to=" + this.site_price_to + "&";
        }
        if (routeQuery.marketing_discount_from) {
            query += "marketing_discount_from=" + routeQuery.marketing_discount_from + "&";
        } else if (this.marketing_discount_from) {
            query += "marketing_discount_from=" + this.marketing_discount_from + "&";
        }

        if (routeQuery.marketing_discount_to) {
            query += "marketing_discount_to=" + routeQuery.marketing_discount_to + "&";
        } else if (this.marketing_discount_to) {
            query += "marketing_discount_to=" + this.marketing_discount_to + "&";
        }
        if (routeQuery.base_discount_from) {
            query += "base_discount_from=" + routeQuery.base_discount_from + "&";
        } else if (this.base_discount_from) {
            query += "base_discount_from=" + this.base_discount_from + "&";
        }

        if (routeQuery.base_discount_to) {
            query += "base_discount_to=" + routeQuery.base_discount_to + "&";
        } else if (this.base_discount_to) {
            query += "base_discount_to=" + this.base_discount_to + "&";
        }

        if (routeQuery.customer_price_from) {
            query += "customer_price_from=" + routeQuery.customer_price_from + "&";
        } else if (this.customer_price_from) {
            query += "customer_price_from=" + this.customer_price_from + "&";
        }

        if (routeQuery.customer_price_to) {
            query += "customer_price_to=" + routeQuery.customer_price_to + "&";
        } else if (this.customer_price_to) {
            query += "customer_price_to=" + this.customer_price_to + "&";
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

        return query.substring(0, query.length - 1);
    }

    sort_query(routeQuery) {
        let query = "?";
        if (this.name) {
            query += "name=" + this.name + "&";
        } else if (routeQuery.name) {
            query += "name=" + routeQuery.name + "&";
        }

        if (this.label) {
            query += "label=" + this.label + "&";
        } else if (routeQuery.label) {
            query += "label=" + routeQuery.label + "&";
        }

        if (this.id) {
            query += "id=" + this.id + "&";
        } else if (routeQuery.id) {
            query += "id=" + routeQuery.id + "&";
        }

        if (routeQuery.is_active) {
            query += "is_active=" + routeQuery.is_active + "&";
        } else if (this.active) {
            query += "is_active=" + this.active + "&";
        }

        if (routeQuery.group) {
            query += "group=" + routeQuery.group + "&";
        } else if (this.group) {
            query += "group=" + this.group + "&";
        }

        if (routeQuery.created_at_to_date) {
            query += "created_at_to_date=" + routeQuery.created_at_to_date + "&";
        } else if (this.created_at_to_date) {
            query += "created_at_to_date=" + this.created_at_to_date + "&";
        }

        if (routeQuery.created_at_from_date) {
            query += "created_at_from_date=" + routeQuery.created_at_from_date + "&";
        } else if (this.created_at_from_date) {
            query += "created_at_from_date=" + this.created_at_from_date + "&";
        }

        if (routeQuery.updated_at_to_date) {
            query += "updated_at_to_date=" + routeQuery.updated_at_to_date + "&";
        } else if (this.updated_at_to_date) {
            query += "updated_at_to_date=" + this.updated_at_to_date + "&";
        }

        if (routeQuery.updated_at_from_date) {
            query += "updated_at_from_date=" + routeQuery.updated_at_from_date + "&";
        } else if (this.updated_at_from_date) {
            query += "updated_at_from_date=" + this.updated_at_from_date + "&";
        }

        if (routeQuery.is_sellable) {
            query += "is_sellable=" + routeQuery.is_sellable + "&";
        } else if (this.sellable) {
            query += "is_sellable=" + this.sellable + "&";
        }

        if (routeQuery.color_id) {
            query += "color=" + routeQuery.color_id + "&";
        } else if (this.color) {
            query += "color=" + this.color + "&";
        }

        if (routeQuery.brand_id) {
            query += "brand=" + routeQuery.brand_id + "&";
        } else if (this.brand) {
            query += "brand=" + this.brand + "&";
        }

        if (routeQuery.category_id) {
            query += "category=" + routeQuery.category_id + "&";
        } else if (this.category) {
            query += "category=" + this.category + "&";
        }

        if (routeQuery.product_id) {
            query += "product=" + routeQuery.product_id + "&";
        } else if (this.product) {
            query += "product=" + this.product + "&";
        }

        if (routeQuery.sku_group_id) {
            query += "sku_group_id=" + routeQuery.sku_group_id + "&";
        } else if (this.sku_group) {
            query += "sku_group_id=" + this.sku_group_id + "&";
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

        return query.substring(0, query.length - 1);
    }
}