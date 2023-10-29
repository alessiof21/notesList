<template>
    <my-sidebar @clickName="clickName" :elements="elements" :screen="'note_id'" @deleteElement="deleteNote"/>
</template>

<script>
    export default {
        name: 'my-notes',
        emits: ['deleteNote'],
        props: {
            elements: {
                type: Array,
                default: () => [],
            }
        },
        methods: {
            clickName(note) {
                this.$store.commit('chooseNote', note.id);
            },
            deleteNote(id) {
                this.$emit('deleteNote', id);
            }
        }
    }
</script>

<style scoped>

</style>