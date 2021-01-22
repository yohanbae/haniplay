<template>
  <div class="thewrap">
		<div class="main">
			<div class="thetitle">YUMMY EGG TIMER</div>
			<button class="theselect" @click="onSelect">
				{{ eggStyle==='soft' ? "soft" : null }}
				{{ eggStyle==='hard' ? "hard" : null }}				
				boiled 
				{{ eggStyle==='soft' ? "7" : null }}
				{{ eggStyle==='hard' ? "10" : null }} minutes
			</button>
			<v-dialog v-model="eggStyleDialog" width="350">
				<v-card class="theselectwrap">
					<div class="wraptitle">
						Select Egg Style
					</div>
					<div class="theinside">
						<div class="egg-style" @click="onSelectStyle(1)">
							<div>SOFT BOILED</div>
							<img src="../../assets/egg.png" alt="sm" />
						</div>
						<div class="egg-style" @click="onSelectStyle(2)">
							<div>HARD BOILED</div>
							<img src="../../assets/egg.png" alt="sm" />
						</div>
					</div>
				</v-card>
			</v-dialog>

			<div class="egg-part">
				<div class="describe">Add egg into the boiling water<br /> Then tab this START button</div>

				<div v-if="!playing" @click="onStart">
					<img src="../../assets/egg.png" alt="haha" />
					<div>START</div>
				</div>
				<div v-else @click="onStop">
					<img src="../../assets/egg.png" alt="haha" />
					<div>STOP</div>
				</div>
			</div>
			<div class="progress-wrap">
				<v-progress-linear color="yellow" buffer-value="0" :value="getValue()" height="30" stream>
					<span class="progress-text">
						{{getTime()}} /
						{{ eggStyle==='soft' ? "7:00" : null }}
						{{ eggStyle==='hard' ? "10:00" : null }}					
					</span>
				</v-progress-linear>
			</div>
		</div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');

.main {
	width:400px;
	background:url('../../assets/egg_background.png');
	background-size: cover;
	margin-left: calc((100% - 400px) / 2);
	min-height:100vh;
	padding:10px;
	text-align:center;
	.thetitle {
		font-family: 'Hachi Maru Pop', cursive;
		margin: 50px 0;
		font-weight:bold;
		font-size:25px;
	}
	.theselect {
		background:white;
		width: 250px;
		text-align: center;
		padding:4px 0;
		font-size:20px;
		border-radius:5px;
		margin-bottom:50px;
		border:2px solid lightgray;
		&:focus{
			outline: none;
		}
	}

	.egg-part {
		font-size:20px;
		margin-bottom:100px;
		.describe {
			padding: 0px 20px;
			margin-bottom:50px;
			font-size: 20px;
		}
		img {
			width: 100px;
			height:100px;
		}
	}
}

.theselectwrap {
	padding:20px;
	.wraptitle {
		text-align: center;
		font-size:25px;
	}
	.theinside {
		margin:20px 0;
		background:white;
		.egg-style {
			border-radius:5px;
			border:1px solid lightgray;
			padding:10px 0px;
			padding-left:30px;
			margin-bottom:10px;
			display: grid;
			grid-template-columns: 1fr 50px;
			align-items: center;
			text-align:left;

			cursor:pointer;
			&:hover{
				background: gray;
				color:white;
			}
			img { width: 30px; height:30px; }

		}
	}
}

.progress-wrap {
	width:250px;
	margin-left:calc((100% - 250px) /2);
	background:white;
	border:1px solid lightgray;
	border-radius:5px;
	.progress-text {
		font-size:20px;
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
			time: 0,
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
