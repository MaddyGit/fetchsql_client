<template>
    <div id="Results">
        
        <ul v-for="table in dataWithUID" :key="table.tid">
            <li>
                <table>
                    <tr>
                        <td v-for="col in rowHeader(table.rows[0])" :key="col" class="table-header">{{col}}</td>
                    </tr>

                    <tr v-for="row in table.rows" :key="row.rid">
                        <td v-for="colData in rowVals(row)" :key="colData" class="table-row">{{colData}}</td>
                    </tr>
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
            dummyDataOld: [
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
            , dummyData: this.$store.getters.resultSets
        }
    }
    , computed: {
        dataWithUID () {
            let oid = 1
            let iid = 1
            return this.dummyData.map(elem => ({tid: oid++, rows: elem.map(obj => ({rid: iid++, ...obj}))}))
        }
    }
    , methods: {
        rowHeader (row) {
            return Object.keys(row).filter(elem => elem != 'rid')
        }
        , rowVals (row) {
            return this.rowHeader(row).map(key => row[key])
        }
    }
}
</script>

<style lang="scss" scoped>
table {
    margin-top: 25px;

    tr {
        margin-top: 5px;

        td {
            margin-right: 15px;
            border-bottom: 1px solid black;
            border-right: 1px solid gray;
        }
    }
}

.table-header {
    font-size: 2rem;
    border-bottom: 4px solid red;
}
</style>
