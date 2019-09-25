<template>
  <div>{{ unit }}/{{ enough_unit }}</div>
</template>

<script>
export default {
  name: 'CreditCalculatorCell',
  props: ['unit', 'enough_unit']
};
</script>

<style scoped></style>
