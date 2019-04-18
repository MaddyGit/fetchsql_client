<template>
    <div id="Results">
        
        <ul v-for="table in dataWithUID" :key="table.tid" class="tables-list">
            <li>
                <table class="table table-stripped">
                    <thead>
                        <tr>
                            <th scope="col" :colspan="table.nosCols"> {{table.header}} </th>
                        </tr>
                        <tr>
                            <th v-for="col in rowHeader(table.rows[0])" :key="col" scope="col">{{col}}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="row in table.rows" :key="row.rid" :class="rowClass(row)" >
                            <td v-for="colData in rowVals(row)" :key="colData">{{colData}}</td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </ul>
        
    </div>
</template>

<script>
export default {
    name: 'Results'
    , data () {
        return {
            dummyData: [
                [
                    {keyOne: 'val one', keyTwo: 'val two'}
                    , {keyOne: 'val one again', keyTwo: 'val two again'}
                ]
                , [
                    {rstkone: 'rs 2 val one', rstktwo: 'rs 2 val two', rstkthree: 'rs 2 val three'}
                    , {rstkone: 'rs 2 val one', rstktwo: 'rs 2 val two', rstkthree: 'rs 2 val three'}
                    , {rsthreekone: 'rs 3 val one', rsthreektwo: 'rs 3 val two', rsthreekthree: 'rs 3 val three'}
                ]
            ]
        }
    }
    , computed: {
        dataWithUID () {
            let oid = 1
            let iid = 1
            let resultSets = this.$store.getters.resultSets
            
            return resultSets.map(elem => ({tid: oid++, header: elem.header, nosCols: Object.keys(elem.rs[0]).length, rows: elem.rs.map(obj => ({rid: iid++, ...obj}))}))
        }
    }
    , methods: {
        rowHeader (row) {
            return Object.keys(row).filter(elem => elem != 'rid')
        }
        , rowVals (row) {
            return this.rowHeader(row).map(key => row[key])
        }
        , rowClass (row) {
            return row.rid % 2 != 0 ? "table-primary" : "table-secondary"
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../node_modules/bootstrap/scss/bootstrap.scss';

ul.tables-list {
    list-style-type: none;
}
</style>