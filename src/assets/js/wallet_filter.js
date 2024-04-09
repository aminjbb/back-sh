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

export class UserWalletFilter {
    constructor() {
        this.user_id = null;
        this.status = null;
        this.withdraw_amount_to = null;
        this.withdraw_amount_from = null;
        this.deposit_amount_from = null;
        this.deposit_amount_to = null;
        this.shvz_tracking_code = null;
        this.refid = null;
        this.created_at_from = null;
        this.created_at_to = null;
        this.charge_type = null;
        this.per_page = 25;
        this.page = 1;
        this.order = 'created_at';
        this.order_type = 'desc';
        this.user_id =null

    }

    query_maker() {
        let query = "?order=created_at&order_type=desc&";

        if (this.user_id !== null) {
            query += "user_id=" + this.user_id + "&";
        }
        if (this.status !== null) {
            query += "status=" + this.status + "&";
        }
        if (this.withdraw_amount_to !== null) {
            query += "withdraw_amount_to=" + this.withdraw_amount_to + "&";
        }
        if (this.withdraw_amount_from !== null) {
            query += "withdraw_amount_from=" + this.withdraw_amount_from + "&";
        }
        if (this.deposit_amount_from !== null) {
            query += "deposit_amount_from=" + this.deposit_amount_from + "&";
        }
        if (this.deposit_amount_to !== null) {
            query += "deposit_amount_to=" + this.deposit_amount_to + "&";
        }
        if (this.refid !== null) {
            query += "refid=" + this.refid + "&";
        }
        if (this.shvz_tracking_code !== null) {
            query += "shvz_tracking_code=" + this.shvz_tracking_code + "&";
        }
        if (this.created_at_from !== null) {
            query += "created_at_from=" + this.created_at_from + "&";
        }
        if (this.created_at_to !== null) {
            query += "created_at_to=" + this.created_at_to + "&";
        }
        if (this.charge_type !== null) {
            query += "charge_type=" + this.charge_type + "&";
        }

        if (this.page) {
            query += "page=" + this.page + "&";
        }

        if (this.per_page) {
            query += "per_page=" + this.per_page + "&";
        }

        return query.substring(0, query.length - 1);
    }

    params_generator(routeQuery){
        let query = "?";
        if (routeQuery.user_id ){
            query += "user_id=" + routeQuery.user_id + "&";
        }

        else if (this.user_id ) {
            query += "user_id=" + this.user_id + "&";
        }
        if (routeQuery.shvz_tracking_code ){
            query += "shvz_tracking_code=" + routeQuery.shvz_tracking_code + "&";
        }

        else if (this.shvz_tracking_code ) {
            query += "shvz_tracking_code=" + this.shvz_tracking_code + "&";
        }
        if (routeQuery.refid ){
            query += "refid=" + routeQuery.refid + "&";
        }

        else if (this.refid ) {
            query += "refid=" + this.refid + "&";
        }
        if (routeQuery.deposit_amount_from ){
            query += "deposit_amount_from=" + routeQuery.deposit_amount_from + "&";
        }

        else if (this.deposit_amount_from ) {
            query += "deposit_amount_from=" + this.deposit_amount_from + "&";
        }
        if (routeQuery.deposit_amount_to ){
            query += "deposit_amount_to=" + routeQuery.deposit_amount_to + "&";
        }

        else if (this.deposit_amount_to ) {
            query += "deposit_amount_to=" + this.deposit_amount_to + "&";
        }
        if (routeQuery.withdraw_amount_from ){
            query += "withdraw_amount_from=" + routeQuery.withdraw_amount_from + "&";
        }

        else if (this.withdraw_amount_from ) {
            query += "withdraw_amount_from=" + this.withdraw_amount_from + "&";
        }
        if (routeQuery.withdraw_amount_to ){
            query += "withdraw_amount_to=" + routeQuery.withdraw_amount_to + "&";
        }

        else if (this.withdraw_amount_to ) {
            query += "withdraw_amount_to=" + this.withdraw_amount_to + "&";
        }
        if (routeQuery.created_at_from ){
            query += "created_at_from=" + routeQuery.created_at_from + "&";
        }

        else if (this.created_at_from ) {
            query += "created_at_from=" + this.created_at_from + "&";
        }
        if (routeQuery.created_at_to ){
            query += "created_at_to=" + routeQuery.created_at_to + "&";
        }

        else if (this.created_at_to ) {
            query += "created_at_to=" + this.created_at_to + "&";
        }
        if (routeQuery.charge_type ){
            query += "charge_type=" + routeQuery.charge_type + "&";
        }

        else if (this.charge_type ) {
            query += "charge_type=" + this.charge_type + "&";
        }
        if (routeQuery.status ){
            query += "status=" + routeQuery.status + "&";
        }

        else if (this.status ) {
            query += "status=" + this.status + "&";
        }


        if (this.per_page){
            query += "per_page=" + this.per_page + "&";
        }
        else if (routeQuery.per_page ) {
            query += "per_page=" + routeQuery.per_page + "&";
        }

        if  (this.page){
            query += "page=" + this.page + "&";
        }
        else if (routeQuery.page){
            query += "page=" + routeQuery.page + "&";
        }

        if (routeQuery.order) {
            query += "order=" + routeQuery.order + "&";
        }
        else if (this.order) {
            query += "order=" + this.order + "&";
        }

        if (routeQuery.order_type) {
            query += "order_type=" + routeQuery.order_type + "&";
        }
        else if (this.order_type){
            query += "order_type=" + this.order_type + "&";
        }

        return query.substring(0, query.length - 1);
    }

}