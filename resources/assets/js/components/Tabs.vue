<template>
    <div class="tabs-container">
        <div class="row">
            <div class="columns small-12">
                <ul class="tabs" data-tabs>
                    <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive, 'tabs-title': true }">
                        <a @click.stop="selectTab(tab)" :aria-selected="tab.areaSelected">{{tab.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.tabs {
    a {
        font-size: 1.5rem;
    }
}
</style>
<script>
export default {
    name: 'tabs',
    data: function() {
        return {
            tabs: []
        }
    },
    created: function() {
        this.tabs = this.$children;
    },
    methods: {
        selectTab: function(selectedTab) {
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].name == selectedTab.name) {
                    this.tabs[i].isActive = true;
                    this.tabs[i].areaSelected = true;
                } else {
                    this.tabs[i].isActive = false;
                    this.tabs[i].areaSelected = false;
                }
            }
        }
    },
}
</script>