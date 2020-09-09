<template>
  <div class="hello">
    <h1>Vue Select:</h1>
    <vueSelect :options="options" />
  </div>
</template>

<script lang="ts">
import vueSelect from 'vue-select' // - is not works
// import vueSelect from 'vue-select/src/components/Select.vue' // - is works
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    vueSelect
  }
})
export default class HelloWorld extends Vue {
  @Prop() private item!: string

  private options: string[] = [
    'First',
    'Second',
    this.item
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
