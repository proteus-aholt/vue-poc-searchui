<template lang="pug">
    span.entity-action
      slot(:action_name="name" :label="label" :full_name="full_name" :on_click="on_click")
        b-button(:id="full_name" :name="name" variant="outline-primary" @click="on_click") {{ label }}
</template>

<script>
export default {
  name: 'entity-action',
  props: {
      name: String,
      label: String,
      on_click: Function
  },
  computed: {
      full_name () {
          return `${this.$parent.$parent.search_name}-entity-action-${this.name}`
      }
  }
}
</script>

