// for close toast with vuex 
import {da} from "vuetify/locale";
export const mixin = {
    methods: {
        closeToast: function (store) {
            setTimeout(() => {
                let form = {
                    toast: false,
                    toastText: "",
                    toastStatus: "",
                };
                store.commit("set_toast", form);
            }, 4000);        },
        openToast: function (store,text,color) {
            let form = {
                toast: true,
                toastText: text,
                toastStatus: color,
            };
            store.commit("set_toast", form);
            setTimeout(() => {
                this.closeToast(store);
            }, 5000);        },
        isOdd: function () {
            return index % 2
        },
        closeConfirm: function (store) {
            let form = {
                confirmModal: false,
                confirmModalTitle: 'حذف آیتم',
                confirmModalText: 'آیا از حذف آیتم مطمئن هستید؟',
                confirmModalType: 'delete',
                confirmModalIcon: 'delete',
                confirmModalEndpoint: '',
                confirmModalClose: true,
            };
            store.commit("set_confirmModal", form);
        },
        openConfirm: function (store, text, title, type, endPoint, close) {
            let form = {
                confirmModal: true,
                confirmModalTitle: title,
                confirmModalText: text,
                confirmModalType: type,
                confirmModalEndpoint: endPoint,
                confirmModalClose: close,
            };
            store.commit("set_confirmModal", form);
        },
        jalaliToGregorian: function (j_y, j_m, j_d) {
            var JalaliDate = {
                g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
            };
            j_y = parseInt(j_y);
            j_m = parseInt(j_m);
            j_d = parseInt(j_d);
            var jy = j_y - 979;
            var jm = j_m - 1;
            var jd = j_d - 1;

            var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
            for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

            j_day_no += jd;

            var g_day_no = j_day_no + 79;

            var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
            g_day_no = g_day_no % 146097;

            var leap = true;
            if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
                g_day_no--;
                gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
                g_day_no = g_day_no % 36524;

                if (g_day_no >= 365) g_day_no++;
                else leap = false;
            }

            gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
            g_day_no %= 1461;

            if (g_day_no >= 366) {
                leap = false;

                g_day_no--;
                gy += parseInt(g_day_no / 365);
                g_day_no = g_day_no % 365;
            }

            for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
                g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
            var gm = i + 1;
            var gd = g_day_no + 1;

            gm = gm < 10 ? "0" + gm : gm;
            gd = gd < 10 ? "0" + gd : gd;
            return gy + '-' + gm + '-' + gd
            // return [gy, gm, gd];
        },
        convertDateToGregorian: function (date, split, server) {
            if (!server) {
                const splitDate = date.split(split)
                return jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
            } else {
                const firstLevelSplitDate = date.split('T')
                const splitDate = firstLevelSplitDate[0].split(split)
                return jalaliToGregorian(parseInt(splitDate[0]), parseInt(splitDate[1]), parseInt(splitDate[2]))
            }
        },
        convertDateToJalai: function (date, split, server) {
            try {
                if (!server) {
                    const splitDate = date.split(split)
                    return this.gregorian_to_jalali(parseInt(splitDate[0]), parseInt(splitDate[1]), parseInt(splitDate[2]))
                } else {
                    const firstLevelSplitDate = date.split('T')
                    const splitDate = firstLevelSplitDate[0].split(split)
                    return this.gregorian_to_jalali(parseInt(splitDate[0]), parseInt(splitDate[1]), parseInt(splitDate[2]))
                }
            } catch (e) {
                return ' ---- '
            }
        },
        gregorian_to_jalali: function (gy, gm, gd) {
            var g_d_m, jy, jm, jd, gy2, days;
            g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            gy2 = (gm > 2) ? (gy + 1) : gy;
            days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
            jy = -1595 + (33 * ~~(days / 12053));
            days %= 12053;
            jy += 4 * ~~(days / 1461);
            days %= 1461;
            if (days > 365) {
                jy += ~~((days - 1) / 365);
                days = (days - 1) % 365;
            }
            if (days < 186) {
                jm = 1 + ~~(days / 31);
                jd = 1 + (days % 31);
            } else {
                jm = 7 + ~~((days - 186) / 30);
                jd = 1 + ((days - 186) % 30);
            }
            return jy + '-' + jm + '-' + jd
        },
        splitChar: function (text) {
            if (text) {
                return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
                return 0;
            }
        },
        getLastObjectFromArray: function (array) {
            const arrayLength = array.length
            return array[arrayLength - 1]
        },
        getFirstObjectFromArray: function (array) {
            return array[0]
        },
        getCustomIndexObjectFromArray: function (array, index) {
            return array[index]
        },
        findNeedleFromArray: function (needle, array) {
            const findObjectFromArray = array.find(element => element === needle)
            if (findObjectFromArray) return findObjectFromArray
            return ''        },
        filterNeedleFromArray: function (needle, array) {
            const findObjectFromArray = array.filter(element => element === needle)
            if (findObjectFromArray.length) return findObjectFromArray
            return []
        },
        getAfterOrBeforeNeedleSting: function (string, needle, after) {
            const findObjectFromArray = string.split(needle)
            if (after) return findObjectFromArray[1]
            else return findObjectFromArray[0]
        },
    }
}

