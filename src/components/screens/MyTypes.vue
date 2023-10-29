<template>
    <my-sidebar @clickName="clickName" :elements="elements" :screen="'type_id'" @deleteElement="deleteType"/>
</template>

<script>
    export default {
        name: 'my-types',
        emits: ['deleteType'],
        props: {
            elements: {
                type: Array,
                default: () => [],
            }
        },
        methods: {
            clickName(type) {
                const answer = this.$store.state.type_id !== type.id ? type.id : -1;
                this.$store.dispatch('chooseType', answer);
            },
            deleteType(id) {
                this.$emit('deleteType', id);
            }
        }
    }
</script>

<style scoped>

</style>