import { defineStore } from 'pinia';


export const useSettingStore = defineStore('setting', {

    state: () => ({
        // your state properties here
        setting: {
            theme: 'light',
            language: 'en',
            showSidebar: false,

        }
    }),

    getters: {
        getSetting: (state) => {
            return state.setting
        }
    },

    actions: {
        // your actions here
        setSetting(setting) {
            this.setting = setting
        },
        setSeidebar() {
            this.setting.showSidebar = !this.setting.showSidebar
        }
    },
    persist: {
        paths: ['setting'],
        serializer: {
            deserialize: (value) => {
                return JSON.parse(value)
            },
            serialize: (value) => {
                return JSON.stringify(value)
            },
        },
        debug: true,
    }

});