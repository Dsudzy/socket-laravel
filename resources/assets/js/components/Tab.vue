<template>
    <div v-show="isActive" class="is-active"><slot></slot></div>
</template>
<script>
export default {
    name: 'tab',
    props: {
        name: { required: true},
        selected: { default: false}
    },
    mounted: function() {
        this.isActive = this.selected;
        this.areaSelected = this.selected;
    },
    data: function() {
        return {
            isActive: false,
            areaSelected: false
        }
    }
}
</script>