<template>
    <div id="addquery">
        <div class="card">
            <div class="card-body">
                <div class="display-4">Add Query</div>
                <h5 class="text-left ml-2">Header</h5>
                <input id="header-input" type="text" class="form-control" v-model="query.header" />
                <h5 class="text-left ml-2">Query</h5>
                <textarea id="query-input" type="text" class="form-control" v-model="query.query" ></textarea>
                <a href="#" class="btn btn-primary mt-2" @click.prevent="addQuery" >Add Query</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addquery'
    , data () {
        return {
            query: {
                header: "Header One"
                , query: "SELECT * FROM bn_ms_bm_bankmaster LIMIT 0, 10"
            }
        }
    }
    , methods: {
        addQuery () {
            this.$store.commit('updateQuery', this.query)
            this.$emit('queryUpdated')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../node_modules/bootstrap/scss/bootstrap.scss';

</style>