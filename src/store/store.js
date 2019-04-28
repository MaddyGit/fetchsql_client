import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state : {
        queryUrl : 'localhost'
        , queryPort : 5353
        , queryPath : '/getrs'
        , excelPath : '/getexcel'
        , currentQuery: {
            serial: 1
            , header: ""
            , query: ""
        }
        , querySerial: 1
        , resultSets: []
    }
    , mutations : {
        updateQuery (state, query) {
            state.currentQuery.serial = state.querySerial++
            state.currentQuery.header = query.header
            state.currentQuery.query = query.query
        }
        , addResultSet(state, queryResult) {
            state.resultSets.push({header: queryResult.header, rs: queryResult.rs})
        }
        , incQuerySerial (state) {
            state.querySerial++
        }
        , decQuerySerial (state) {
            state.querySerial--
        }
    }
    , getters : {
        currentQuery: state => state.currentQuery
        , resultSets: state => state.resultSets
        , queryUrl: state => state.queryUrl
        , queryPort: state => state.queryPort
        , queryPath: state => state.queryPath
        , excelPath: state => state.excelPath
        , nextQuerySerial: state => state.querySerial
    }
})