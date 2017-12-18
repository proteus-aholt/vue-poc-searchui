<template lang="pug">
  span.constraints
    template(v-for="constraint in constraints")
        slot(:name="constraint.key")
            app-search-constraint(:name="constraint.key" :label="constraint.label" :placeholder="constraint.placeholder" v-model="constraint.val")
</template>

<script>
export default {
  name: 'constraints',
  tag: 'viwt-searchui-constraints',
  props: {
      constraints: Array
  },
  methods: {
      reset () {
          this.constraints.forEach(constraint => {
              constraint.val = ''
          })
      }
  },
  mounted () {
      this.$parent.$refs.constraints = this
      console.log(this.$parent)
  }
}
</script>
