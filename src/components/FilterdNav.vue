<template>
  <nav class="filtered-nav">
    <button :class="{active: current === 'all'}" @click="updateFilter('all')">View all</button>
    <button :class="{active: current === 'completed'}" @click="updateFilter('completed')">Completed</button>
    <button :class="{active: current === 'ongoing'}" @click="updateFilter('ongoing')">Ongoing</button>
  </nav>
</template>

<script>
export default {
  props:['current'],
  methods: {
    updateFilter(by) {
      this.$emit('filterChange', by)
    },
  },
};
</script>

<style>
.filtered-nav button{
  margin: 10px 20px;
  border: 0;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  color: #bbb;
  cursor: pointer;
  padding: 10px;
}
.filtered-nav button.active{
  color: #555;
}
</style>