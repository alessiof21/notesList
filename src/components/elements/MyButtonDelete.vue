<template>
    <button class="btn btn-outline-danger">   
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'my-button-delete'
    }
</script>

<style scoped>
    .btn {
        margin: 4px;
    }

</style>