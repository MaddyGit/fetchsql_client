<template>
    <div id="Results">
        asdf asdf
        <ul v-for="rs in $store.getters.resultSets[0]" :key="rs.MBM_BKMSNUMBER">
            <li>
                Number: {{rs.MBM_BKMSNUMBER}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Results'
}
</script>

<style>

</style>
