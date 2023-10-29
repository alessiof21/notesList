<template>
        <div 
        v-for="element in elements" 
        :key="element.id" 
        @click="this.$emit('clickName', element)"
        class="type"
        >
            <div class="type__flex-container">
                <p class="type__title"         
                    :class="{
                        active: element.id === $store.state[screen],
                         nonactive: element.id !== $store.state[screen]
                    }">     
                    {{  element.name.length > 20 ? element.name.slice(0, 20) + '...' : element.name}} 
                </p>
                <my-button-delete v-if="element.id === $store.state[screen]" @click="this.$emit('deleteElement', element.id)">&times;</my-button-delete>
            </div>
        </div>

   

</template>

<script>
    export default {
        name: 'my-sidebar',
        emits: ['clickName', 'deleteElement'],
        props: {
            elements: {
                type: Array,
                default: () => [],
            },
            screen: {
                type: [Number, String],
                required: true,
            }
        },
    }
</script>

<style scoped>
    
    .type__flex-container {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
    .type {
        width: 100%;
    }
    .type__title {
        font-size: 16px;   
        width: 80%;
        word-wrap: break-word;
    }
    .active {
        font-weight: bold;
        text-decoration: underline;
    }

    .nonactive {
        font-weight: normal;
        text-decoration: none;
    }
</style>