<template>
  <div class="home">
    
    <div class="container-fluid">
      <div class="row">
        <div id="add-query" class="col-4">
          <div class="sticky-top">
            <add-query @queryUpdated="addQuery" ></add-query>
            <div class="d-flex p-2 justify-content-start mt-2">
              <a href="#" class="btn btn-secondary" @click="generateResults" >Generate Results</a>
            </div>
          </div>

          <div id="result">

          </div>
        </div>

        <div id="all-queries" class="col-8">
          <div v-if="noQueries" class="alert-warning" >No Queries Added !</div>
          <ul class="list-group" v-for="query in queries" :key="query.serial">
            <li class="list-group-item mt-2">
              <query :serial="query.serial" :header="query.header" :query="query.query" ></query>
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
    }
  }
  , methods: {
    addQuery () {
      this.queries.push({...this.$store.getters.currentQuery})
    }
    , generateResults () {
      for (let i = 0; i < this.queries.length; i++) {
        
        this.fetchResult(this.queries[i].query)
        .then(raw => raw.json())
        .then(rs => {
          this.$store.commit('addResultSet', rs[0])
          this.$router.push({path: 'results'})
        })
        // eslint-disable-next-line
        .catch(err => console.log(err))
      }
  }
  , fetchResult (query) {
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