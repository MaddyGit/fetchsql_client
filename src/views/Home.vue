<template>
  <div class="home">
    
    <div class="container-fluid">
      <div class="row">
        <div id="add-query" class="col-4">
          <div class="sticky-top">
            <add-query @queryUpdated="addQuery" ></add-query>
            <div class="d-flex p-2 justify-content-start mt-2">
              <a href="#" class="btn btn-secondary mr-2" @click="generateResults" >Generate Results</a>
              <a href="#" class="btn btn-secondary" @click="generateExcelWorkbook" >Generate Excel Workbook</a>
            </div>
            <div>
              <input id="files-input" type="file" @change="readQueriesFromFile" />
            </div>
          </div>

          <div id="result">

          </div>
        </div>

        <div id="all-queries" class="col-8">
          <div v-if="noQueries" class="alert-warning" >No Queries Added !</div>
          <ul class="list-group" v-for="query in queries" :key="query.serial">
            <li class="list-group-item mt-2">
              <query :serial="query.serial" :header="query.header" :query="query.query" 
                @erase="queriesManip.eraseQuery" @moveUp="queriesManip.moveQueryUp" @moveDown="queriesManip.moveQueryDown" ></query>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import Vue from 'vue'
import AddQuery from '@/components/addquery.vue'
import Query from '@/components/query.vue'

export default {
  name: 'home',
  components: {
    AddQuery
    , Query
  }
  , data () {
    return {
      queries: []
      , queriesManip: {
        eraseQuery: (sr) => {
          if (sr < 1 || sr > this.queries.length) 
            throw Error('Array index not in bounds!')

          for (let i = sr; i < this.queries.length; i++)
            this.queries[i].serial--

          this.$store.commit('decQuerySerial')

          this.queries.splice((sr - 1), 1)
        }
        , moveQueryUp: (sr) => {
          this.queries = ( (queries, sr) => {
            const temp = [...queries]
            const curIndex = sr - 1
            const lastIndex = temp.length - 1
            ;if (curIndex > 0 && curIndex < temp.length) 
              return this.queriesManip.swapQueries(temp, curIndex, (curIndex - 1))

            else if (curIndex === 0) 
              return this.queriesManip.swapQueries(temp, 0, lastIndex)

            else throw Error('Array index not in bounds!')
          })(this.queries, sr)
        }
        , moveQueryDown: (sr) => {
          this.queries = ( (queries, sr) => {
            const temp = [...queries]
            const curIndex = sr - 1
            const lastIndex = temp.length - 1
            ;if (curIndex >= 0 && curIndex < lastIndex) 
              return this.queriesManip.swapQueries(temp, curIndex, (curIndex + 1))

            else if (curIndex === lastIndex) 
              return this.queriesManip.swapQueries(temp, curIndex, 0)

            else throw Error('Array index not in bounds!')
          })(this.queries, sr)
        }
        , swapQueries (queries, indexQueryX, indexQueryY) {
          let temp = [...queries]
          const elemX = {...queries[indexQueryX], serial: queries[indexQueryY].serial}
          temp[indexQueryX] = {...queries[indexQueryY], serial: queries[indexQueryX].serial}
          temp[indexQueryY] = elemX
          return temp
        }
      }//queriesManip
    }
  }
  , methods: {
    addQuery () {
      this.queries.push({...this.$store.getters.currentQuery})
    }
    , generateResults () {
      for (let i = 0; i < this.queries.length; i++) {
        
        const resPromise = this.fetchQueryResult(this.queries[i].query)
        ;((resPromise, header) => {
          resPromise
          .then(raw => raw.json())
          .then(rs => {
            this.$store.commit('addResultSet', {header, rs: rs[0]})
            this.$router.push({path: 'results'})
          })
          // eslint-disable-next-line
          .catch(err => console.log(err))
        })(resPromise, this.queries[i].header)
      }
    }
    , fetchQueryResult (query) {
      return fetch(`http://${this.$store.getters.queryUrl}:${this.$store.getters.queryPort+this.$store.getters.queryPath}`, {
        method: 'POST'
        , mode: 'cors'
        , headers: {
          'Accept': 'application/json'
          , 'Content-Type': 'application/json'
        }
        , body: JSON.stringify({
            "query" : query
        })
      })
    }
    , generateExcelWorkbook () {
      fetch(`http://${this.$store.getters.queryUrl}:${this.$store.getters.queryPort+this.$store.getters.excelPath}`, {
        method: 'POST'
        , mode: 'cors'
        , headers: {
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          , 'Content-Type': 'application/json'
        }
        , body: JSON.stringify({
            "queries" : this.queries.map(query => query.query)
          })
      })
      .then(res => res.blob())
      .then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = "Queries Results.xlsx";
            document.body.appendChild(a);
            a.click();    
            a.remove();
      })
    }
    , readQueriesFromFile (e) {
      const fReader = new FileReader
      fReader.onload = () => {
        let newQueries = [...this.queries, ...(fReader.result.match(/\b(.|(\n|\r\n))*?;/g)
        .map(match => match.replace(/[\n\r]/g, ' '))
        .map(elem => elem.replace(/ {2,}/g, ' '))
        .map(query => ({header: 'File-Query', query: query, serial: (() => {const currentSerial = this.$store.getters.nextQuerySerial;this.$store.commit('incQuerySerial');return currentSerial})()})))]

        this.queries = newQueries

        // eslint-disable-next-line
        console.log(this.queries.map(q => q.query))
      }
      fReader.readAsText(e.target.files[0])
    }
  }
  , computed: {
    noQueries () {
      return this.queries.length > 0 ? false : true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../node_modules/bootstrap/scss/bootstrap.scss';

div.home {
  margin-top: 10px;
}
</style>