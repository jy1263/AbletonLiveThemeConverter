<template>
  <div class="Main">
      <label>Input old (Ableton Live 10) theme to be converted: </label><input type="file" @change="loadTextFromFile" name="oldfile"><br>
      <label>Input new (Ableton Live 11) theme to be polyfilled with: </label><input type="file" @change="loadTextFromFile" name="newfile"><br>
      <input type="button" value="Convert" @click="run">
  </div>
</template>

<script>
import INDEX from '@/modules/index';
const index = new INDEX;
import { saveAs } from 'file-saver';

export default {
  name: 'Main',
  props: {
    msg: String
  },
  data() {
    return {
      oldfile: '',
      newfile: ''
    }
  },
  methods: {
    loadTextFromFile(ev) {     
      let file = ev.target.files[0];
      let text = ''
      // Credit: https://stackoverflow.com/a/754398/52160
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload =  evt => {
        this.$data[ev.target.name] = evt.target.result;
      }
      reader.onerror = evt => {
        console.error(evt);
      }
    },
    run() {
      var blob = new Blob([`${index.run(this.$data.oldfile, this.$data.newfile)}`], {type: "text/plain;charset=utf-8"});

      saveAs(blob, 'convertedTheme.ask')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
