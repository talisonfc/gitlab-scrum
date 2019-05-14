<template>
  <div>
    <v-layout row wrap text-xs-center>
      <v-flex xs12>
        <span class="time">{{time.h}}:{{time.m}}:{{time.s}}</span>
      </v-flex>
      <v-flex xs12>
        <v-btn flat block @click="change">{{action.name}}</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Stopwatch",
  data() {
    return {
      currentTime: {
        h: 0,
        m: 0,
        s: 0
      },
      time: {
        h: 0,
        m: 0,
        s: 0
      },
      action: {
        name: "Iniciar",
        stoped: true
      },
      counter: {}
    };
  },
  computed: mapState({
    currentIssue: state => state.issues.currentIssue
  }),
  methods: {
    change() {
      if (this.action.stoped) {
        this.action.name = "Parar";
        this.action.stoped = false;
        this.run();
      } else {
        this.action.name = "Iniciar";
        this.action.stoped = true;
        clearTimeout(this.counter);
        this.addSpentTime();
      }
    },
    run() {
      this.counter = setInterval(() => {
        this.time.s++;
        if (this.time.s == 60) {
          this.time.m++;
          this.time.s = 0;
          if (this.time.m == 60) {
            this.time.m++;
            this.time.h++;
            this.time.m = 0;
          }
        }
      }, 1000);
    },
    addSpentTime() {
      let diffTime = { h: 0, m: 0, s: 0 };
      diffTime.h = this.time.h - this.currentTime.h;
      diffTime.m = this.time.m - this.currentTime.m;
      diffTime.s = this.time.s - this.currentTime.s;

      let timeInSecond = 1;
      if (diffTime.h !== 0) timeInSecond = timeInSecond * diffTime.h * 3600;
      if (diffTime.m !== 0) timeInSecond = timeInSecond + diffTime.m * 60;
      if (diffTime.s !== 0) timeInSecond = timeInSecond + diffTime.s;

      let tts = { h: 0, m: 0, s: 0 };
      if (timeInSecond !== 1) {
        tts.m = Math.floor(timeInSecond / 60);
        tts.s = timeInSecond - tts.m * 60;
        tts.h = Math.floor(timeInSecond / 3600);
      }

      let spentTime = `${tts.h}h ${tts.m}m ${tts.s}s`;

      this.$store.dispatch("addSpentTime", spentTime);
      this.currentTime = { ...this.time };
    }
  },
  created() {
    const human_total_time_spent = this.currentIssue.time_stats
      .human_total_time_spent;

    let stime = human_total_time_spent.split(" ");
    let ftime = { h: 0, m: 0, s: 0 };
    stime.forEach(ut => {
      const unit = ut[ut.length - 1];
      ftime[unit] = Number.parseInt(ut.replace(unit, ""));
    });

    this.time = { ...ftime };
    this.currentTime = { ...ftime };
  },
  destroyed() {
    clearTimeout(this.counter);
  }
};
</script>


<style scoped>
.time {
  font-size: 4em;
}
</style>
