<template lang="pug">
  span.constraint
    slot(:constraint_name="name" :label="label" :placeholder="placeholder" :type="type" :full_name="full_name" :value="value" :options="options")
        span.simple-constraint(v-if="type == 'simple' || !type")
            label(:for="full_name") {{ label }}
            input(:id="full_name" :value="value" @input="evt => $emit('input', evt.target.value)" type="text" :placeholder="placeholder")
</template>

<script>
export default {
  name: 'search-constraint',
  props: {
      name: String,
      label: String,
      placeholder: String,
      type: {
          type: String,
          default: 'simple'
      },
      value: String,
      options: {
          type: Array,
          required: false,
          default: () => []
      }
  },
  computed: {
      full_name () {
          return `${this.$parent.$parent.search_name}-constraint-${this.name}`
      }
  }
}
</script>

