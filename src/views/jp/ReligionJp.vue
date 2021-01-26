<template>
  <div>
    <!-- <div class="header">
    </div> -->
		<div class="main">
			<div class="main-wrap">
				<img src="../../assets/baby_defaults.png" alt="hh" />
				<div class="conver-wrap">
                    만약 오늘 밤에 죽게된다면<br />
                    내 영혼은 어디로 갈까요?<br />
                    각 종교에서 어떻게 설명하는지 알아봅시다
				</div>
				<div class="symbol-wrap">
				<v-icon class="mr-3">mdi-christianity-outline </v-icon>
				<v-icon class="mr-3">mdi-islam</v-icon>
				<v-icon class="mr-3">mdi-buddhism</v-icon>
				<v-icon>mdi-hinduism</v-icon>
				</div>
			</div>
			<img class="heaven" src="../../assets/heaven.png" alt="heaven" />
			<img class="hell" src="../../assets/hell.png" alt="hell" />
			<div class="titles">HEAVEN OR HELL</div>
			<button class="thebutton mt-5" @click="onStart">시작하기</button>
		</div>
    <div class="footer">
      Hanison - All rights reserved
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Potta+One&display=swap');
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
		background:white;
		font-family: 'Mali', cursive;
		font-size:15px;
		text-align: center;
		padding:20px 5px;
		border-radius:10px;

		-webkit-box-shadow: 3px 3px 3px 0px rgba(79,79,79,1);
		-moz-box-shadow: 3px 3px 3px 0px rgba(79,79,79,1);
		box-shadow: 3px 3px 3px 0px rgba(79,79,79,1);

		@media only screen and (min-width: 1275px) {
			// border-top:20px solid lightblue;
			border-radius:5px;
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
	font-family: 'Potta One', cursive;
	color: #af4261;
	text-align: center;	
	z-index: 1000;
	font-size:30px;
	margin-top:30px;
	@media only screen and (min-width: 1275px) {
		font-size: 50px;
		margin-top:0px;
	}
}

.thebutton {
	z-index: 10;
	color: #af4261;
	width:100%;
	font-size:20px;
	// background: #0a79f0;
	padding:10px 0;
	border:4px solid #af4261;
	font-family: 'Mali', cursive;
	font-weight:bold;
	&:hover {
		background:#af4261;
		color:white;
	}
	&:focus {
		outline: none;
		background:#db587d;
		color:white;
	}
}


.heaven, .hell {
	position:absolute;
	width:40%;
	z-index: 1;
	pointer-events: none;
	height:150px;
	@media only screen and (min-width: 768px) {
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
	@media only screen and (min-width: 768px) {
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
	background: #FFEFBA;  /* fallback for old browsers */
	// background: -webkit-linear-gradient(to right, #FFFFFF, #FFEFBA);  /* Chrome 10-25, Safari 5.1-6 */
	// background: linear-gradient(to right, #FFFFFF, #FFEFBA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	@media only screen and (min-width: 768px) {
		padding: 50px 20%;
	}
}

.footer {
  height:30px;
  // background:rgba(135, 188, 245, 0.5);
  position: absolute;
  width:100%;
  left:0; bottom:0;
  font-size:12px;
  display:grid;
  align-items: center;
  text-align: center;
	z-index: 100;
	border-top:1px solid lightgray;
}

</style>

<script>

export default {
  name: 'ReligionJp',
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
			this.$router.push(`/religion/jp/start`)
		}
	},
}
</script>
