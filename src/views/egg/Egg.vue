<template>
  <div class="thewrap">
		<div class="main">
			<p>Welcome to Egg Boiler: Let's cook Perfect egg!</p>
			<div class="theright">
				<v-btn small @click="onSelect">Select Egg Style</v-btn>
			</div>
			<v-dialog v-model="eggStyleDialog" width="350">
				<v-card>
					<v-card-title class="headline grey lighten-2">
						Select Egg Style
					</v-card-title>
					<div class="theinside">
						<div class="egg-style" @click="onSelectStyle(1)">SOFT BOILED</div>
						<div class="egg-style" @click="onSelectStyle(2)">HARD BOILED</div>
					</div>
				</v-card>
			</v-dialog>

			<div class="egg-part">
				<h5>
					{{ eggStyle==='soft' ? "SOFT" : null }}
					{{ eggStyle==='hard' ? "HARD" : null }}
					STYLE
				</h5>
				<p>Add egg into the boiling water and tab the START button</p>
				<v-btn v-if="!playing" @click="onStart">START</v-btn>
				<v-btn v-else @click="onStop">STOP</v-btn>
				<v-progress-linear color="teal" buffer-value="0" :value="getValue()" height="15" stream>
					{{getTime()}} /
					{{ eggStyle==='soft' ? "7:00" : null }}
					{{ eggStyle==='hard' ? "10:00" : null }}					
				</v-progress-linear>
			</div>

		</div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali&display=swap');

.main {
	width:400px;
	background:lightblue;
	margin-left: calc((100% - 400px) / 2);
	min-height:100vh;
	padding:10px;
	text-align:center;
}

.theinside {
	margin:20px 0;
	background:white;
	.egg-style {
		border-radius:5px;
		border:1px solid lightgray;
		padding:10px 0px;
		text-align:center;
		margin-bottom:10px;
		cursor:pointer;
		&:hover{
			background: gray;
			color:white;
		}
	}
}

</style>

<script>
import Vue from 'vue'
import moment from 'moment';
import 'moment-duration-format';
import vueInsomnia from "vue-insomnia";
Vue.use(vueInsomnia);

export default {
	name: 'Egg',
	data: function() {
		return {
			eggStyle: "soft",
			eggStyleDialog: false,
			loaded: true,
			totalTime: 420,
			time: 418,
			playing: false,
			running: null,
			audio: null
		}
	},
  components: {
    // HelloWorld
  },
  computed: {
		// ques: function() {
		// 	return questions
		// }
	},
	methods: {
		onSelect: function() {
			this.eggStyleDialog = true
		},
		onSelectStyle: function(i) {
			if(i === 1) {
				if(this.eggStyle !== "soft"){
					this.eggStyle = "soft"
					this.totalTime = 420
					this.onStop()
				}
			} else if(i === 2) {
				if(this.eggStyle !== "hard"){
					this.eggStyle = "hard"
					this.totalTime = 600
					this.onStop()
				}
			}
			console.log(this.totalTime, this.time)
			this.eggStyleDialog = false

			this.loaded = false

			this.loaded = true
		},
		getTime: function() {
			return moment.duration(this.time, "seconds").format("h:mm:ss")			
		},
		getTotalTime: function() {
			return moment.duration(this.totalTime, "seconds").format("h")			
		},
		onStart: function() {
			this.playing = true
			this.vueInsomnia().on();			
			this.running = setInterval(() => {
				this.time += 1
				if(this.time >= this.totalTime) {
					this.onStop()
					this.onCompleted()
				}
			}, 1000)
		},
		onStop: function() {
			clearInterval(this.running)
			console.log("STOPED")			
			this.playing = false
			this.time = 0
			this.vueInsomnia().off();
		},
		onCompleted: function() {
			console.log("DONE. complete functions here")
			this.audio = new Audio("http://soundbible.com/mp3/cartoon-birds-2_daniel-simion.mp3");
			this.audio.play();
			setTimeout(() => {
				this.audio.pause()
				this.audio.currentTime = 0;

			}, 6000)
			// alert("Time to Eat~")
			// alert 대신에 dialog 로 바꾸자.
		},
		getValue: function() {
			let value = (this.time / this.totalTime) * 100
			return +value
		}
	}
}
</script>
