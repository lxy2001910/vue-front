// /src/stores/tabStore.js
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useTabStore = defineStore('tabStore', {
    state: () => ({
        activeTab: '/dashboard',
        tabList: [
            {
                title: '首页',
                path: "/dashboard"
            },
        ]
    }),
    actions: {
        initTabList() {
            const tabs = Cookies.get('tabList');
            if (tabs) {
                this.tabList = JSON.parse(tabs);
            }
            // 尝试从cookie中恢复activeTab，或使用默认值
            const active = Cookies.get('activeTab');
            if (active) {
                this.activeTab = active;
            }
        },
        addTab(tab) {
            const exists = this.tabList.some(t => t.path === tab.path);
            if (!exists) {
                this.tabList.push(tab);
                Cookies.set('tabList', JSON.stringify(this.tabList));
            }
        },
        changeTab(path) {
            this.activeTab = path;
            Cookies.set('activeTab', path); // 保存当前激活的tab
        },
        removeTab(path) {
            this.tabList = this.tabList.filter(tab => tab.path !== path);
            Cookies.set('tabList', JSON.stringify(this.tabList));

            if (this.activeTab === path) {
                const currentIndex = this.tabList.length - 1;
                const nextTab = this.tabList[currentIndex];
                this.activeTab = nextTab ? nextTab.path : '/';
                this.router.push(this.activeTab);
            }
        }
    },
});
