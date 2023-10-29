<template>
    <div class="mb-3">
      <label for="typeName" class="form-label">Введите название</label>
      <input type="text" class="form-control" maxlength="20"
        :class="{
           mistake: mistake === true,
         }" name="newType" id="typeName" aria-describedby="helpId" placeholder="" @input="updateInput">
      <small id="helpId" class="form-text text-muted"> {{ helpText }}</small>
    </div>
</template>

<script>
    export default {
        name: 'my-input',
        props: {
            title: [String, Number],
            helpText: String,
            mistake: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            updateInput(event) {
                this.$emit('update:title', event.target.value);
            }
        }
    }
</script>

<style scoped>
    .mistake {
        box-shadow: 0 0 0 0.25rem rgba(255, 0, 0, 0.25);
        border: 2px solid red;
    }

</style>