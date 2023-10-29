<template>
    <button class="btn btn-outline-success">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'my-button'
    }
</script>

<style scoped>
    .btn {
        margin: 2px;
    }

</style>