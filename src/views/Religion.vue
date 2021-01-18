<template>
  <div>
    <!-- <div class="header">
    </div> -->
		<div class="main">
			<div class="main-wrap">
				<img src="../assets/baby_defaults.png" alt="hh" />
				<div class="conver-wrap">
					What if you die tonight<br />
					Will you go to HEAVEN or HELL?<br />
					Let's find out how religions talk about this!
				</div>
				<div class="symbol-wrap">
				<v-icon class="mr-3">mdi-christianity-outline </v-icon>
				<v-icon class="mr-3">mdi-islam</v-icon>
				<v-icon class="mr-3">mdi-buddhism</v-icon>
				<v-icon>mdi-hinduism</v-icon>
				</div>
			</div>
			<img class="heaven" src="../assets/heaven.png" alt="heaven" />
			<img class="hell" src="../assets/hell.png" alt="hell" />
			<div class="titles">HEAVEN OR HELL</div>
			<button class="thebutton mt-5" @click="onStart">START GAME</button>
		</div>
    <div class="footer">
      Hanison - All rights reserved : Contact
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali&display=swap');
.main-wrap {
	border:1px solid rgba(0,0,0,0);
	position: relative;
	z-index: 10;

	text-align: center;
	margin-top:50px;
	@media only screen and (min-width: 1275px) {
		height:400px;
		margin-top:0px;
	}
	.conver-wrap {
		background: rgba(255,255,255, 0.4);
		font-family: 'Mali', cursive;
		font-size:15px;
		text-align: center;
		padding:20px 5px;
		border-radius:10px;
		@media only screen and (min-width: 1275px) {
			border-top:20px solid lightblue;
			border-radius:0px;
			height:200px;
			font-size:25px;
			margin-top:100px;
			padding: 30px;
			padding-left: 280px;
			text-align: left;
		}
	}
	img {
		width:100px;
		pointer-events: none;
		@media only screen and (min-width: 1275px) {
			width:250px;
			position:absolute;
			bottom:20px; left:20px;
		}
	}
}

.symbol-wrap {
	text-align:right;
	margin-top:5px;
}

.titles {
	font-family: 'Sigmar One', cursive;
	background-color: #f3ec78;
	background-image: linear-gradient(45deg, #b33b29, #af4261);
	background-size: 100%;
	-webkit-background-clip: text;
	-moz-background-clip: text;
	-webkit-text-fill-color: transparent; 
	-moz-text-fill-color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: rgba(255,255,255,0.9);
	text-align: center;	
	z-index: 1000;
	font-size:24px;
	margin-top:30px;
	@media only screen and (min-width: 1275px) {
		font-size: 50px;
		margin-top:0px;
	}
}

.thebutton {
	z-index: 10;
	color:rgba(255,255,255,0.9);
	width:100%;
	font-size:20px;
	background: #0a79f0;
	padding:10px 0;
	border:4px solid #0e5bad;
	font-family: 'Mali', cursive;
	font-weight:bold;
	&:hover {
		background:#208afa;
	}
	&:focus {
		background:gray;
	}
}


.heaven, .hell {
	position:absolute;
	width:40%;
	z-index: 1;
	pointer-events: none;
	height:150px;
	@media only screen and (min-width: 1275px) {
		height:400px;
	}
}
.heaven {
	bottom:0; left:0;
	width:40%;
}

.hell {
	bottom:0; right:0;
		height: 200px;
	@media only screen and (min-width: 1275px) {
		height:600px;
	}
}


.header {
  height: 40px;
  background:lightblue;
  position: absolute;
  width:100%;
  left:0; top:0;
}

.main {
	padding:20px;
  width:100%; height:100vh;
  background: #2980B9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #FFFFFF, #6DD5FA, #2980B9);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #FFFFFF, #6DD5FA, #2980B9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	@media only screen and (min-width: 768px) {
		padding: 50px 20%;
	}
}

.footer {
  height:30px;
  background:rgba(135, 188, 245, 0.5);
  position: absolute;
  width:100%;
  left:0; bottom:0;
  font-size:12px;
  display:grid;
  align-items: center;
  text-align: center;
	z-index: 100;

}


</style>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Religion',
  components: {
    // HelloWorld
  },
  computed: {
		// ques: function() {
		// 	return questions
		// }
	},
	methods: {
		onStart: function() {
			this.$router.push(`/religion/start`)
		}
	},
}
</script>
