<template>
    <div id="query">
        <div style="display: flex">
            <h3 style="display: inline-block; margin-right: auto"> #{{serial}} : {{header}} </h3>
            <div style="display: inline-block">
                <a href="" @click.prevent="$emit('moveUp', serial)" style="text-decoration: none; margin-right: 5px">&uArr;</a>
                <a href="" @click.prevent="$emit('moveDown', serial)" style="text-decoration: none; margin-right: 5px">&dArr;</a>
                <a href="" @click.prevent="$emit('erase', serial)" style="text-decoration: none; margin-right: 5px">&#10539;</a>
            </div>
        </div>

        <p style="display: block"> {{query}} </p>
    </div>
</template>

<script>
export default {
    name: "query"
    , props: {
        serial: {
            type: Number
            , required: true
        }
        , header: {
            type: String
            , required: true
        }
        , query: {
            type: String
            , required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../node_modules/bootstrap/scss/bootstrap.scss';

</style>