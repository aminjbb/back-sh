// for close toast with vuex 
import {da} from "vuetify/locale";

// Order Limit modal with vuex 
// Open
export function openModal(store, storeName , itemId, status) {
    let form = {
        dialog: status,
        id: itemId,
    };

    store.commit(storeName, form);
}

// Close 
export function closeModal(store, storeName) {
    let form = {
        dialog: false,
        id: '',
    };

    store.commit(storeName, form);
}
