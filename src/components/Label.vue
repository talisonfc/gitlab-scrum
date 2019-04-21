<template>
    <v-btn small round :color="value.color" dark @click="getIssues">{{value.name}}</v-btn>
</template>

<script>
export default {
    name: 'label',
    props: ['value'],
    methods: {
        getIssues(){
            this.$store.dispatch("getIssues", {labels: [this.value.name]})
        }
    }
}
</script>

<style scoped>
    
</style>
