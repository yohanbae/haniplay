<template>
  <div>
		<div class="header">
			<span class="titles" @click="onRestart">HEAVEN OR HELL</span>

			<div class="lang-wrap">
				<select class="lang" name="language" id="cars" @change="onLanguage($event)">
					<option value="eng">English</option>
					<option value="kor">Korean</option>
					<option value="jap">Japanese</option>
				</select>
			</div>
		</div>
		<div class="main">
			<div class="main-wrap">
				<img v-if="currentReligion===''" src="../assets/baby_defaults.png" alt="hh" />
				<img v-if="currentReligion==='budah'" src="../assets/baby_budahs.png" alt="hh" />
				<img v-if="currentReligion==='christian'" src="../assets/baby_christians.png" alt="hh" />
				<img v-if="currentReligion==='hindi'" src="../assets/baby_hindus.png" alt="hh" />
				<img v-if="currentReligion==='islam'" src="../assets/baby_islams.png" alt="hh" />

				<div class="conver-wrap">
					<div v-if="initial">
						<p>What religion world are you curious if you will go Heaven or Hell</p>
					</div>

					<div v-if="displayQuestion">
						<div v-if="questionLoading">Loading Question</div>
						<div v-else>
							<div>{{currentQuestion.question}}</div>
						</div>
					</div>

					<div v-if="displayHeaven">
						{{heavenResult}}
					</div>

					<div v-if="displayResult && !displayHeavenHow">
						{{finalResult}}
					</div>

					<div v-if="displayHeavenHow">
						{{heavenHow}}
					</div>

				</div>
				<div class="symbol-wrap">
					<div class="pages">{{ currentPage }} / {{ totalPage}}</div>
				</div>
			</div>

			<div v-if="initial">
				<div class="selectWrap" @click="onSelect(1)">Budah</div>
				<div class="selectWrap" @click="onSelect(2)">Christian</div>
				<div class="selectWrap" @click="onSelect(3)">Hindi</div>
				<div class="selectWrap" @click="onSelect(4)">Islam</div>
			</div>

			<div v-if="displayQuestion">
				<div v-if="questionLoading">Loading</div>		
				<div v-else>
					<div v-for="(choice, i) in currentQuestion.answer" v-bind:key="i">
						<div class="selectWrap" @click="selectAnswer(choice.type, choice.point)">{{choice.ans}} : {{choice.point}}</div>
					</div>
				</div>
			</div>

			<div v-if="displayHeaven">
				<div class="selectWrap" @click="onFinalResult">SEE THE RESULT</div>
			</div>

			<div v-if="displayResult">
				<div class="selectWrap" v-if="!displayHeavenHow" @click="OnHowHeaven">HOW TO GO TO HEAVEN 100%?</div>
				<div class="selectWrap" @click="onRestart">SEE OTHER RELIGIONS</div>
				<div class="sns">
					<ShareNetwork
						network="facebook"
						url="https://haniplay/religion"
						:title="snsResult"
						description="Find out if you will go to heaven or hell: "
						quote="The hot reload is so fast it\'s near instant. - Evan You"
						hashtags="vuejs,vite"
					>
						Share on Facebook
					</ShareNetwork>
					<ShareNetwork
						network="twitter"
						url="https://haniplay/religion"
						:title="`${snsResult}. Find if you will go to heaven or hell`"
						quote="The hot reload is so fast it\'s near instant. - Evan You"
						:hashtags="`heaven,hell,${hashtag}`"
					>
						Share on Twitter
					</ShareNetwork>					
				</div>
			</div>				

		</div>
		<div class="footer">Hanison - All rights reserved : Contact</div>
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
		min-height:400px;
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
			min-height:200px;
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
	align-items: center;
	display:grid;
	width:100%;
}


.selectWrap {
	padding:10px 20px;
	border:2px solid #60a0d1;
	margin-bottom:15px;
	text-align: center;
	cursor: pointer;
	background: white;
	font-family: 'Mali', cursive;
	color: #2a4559;
	&:hover{
		background:#60a0d1;
		color:white;
	}
}


.header {
  height: 40px;
  // background:lightblue;
  position: absolute;
  width:100%;
  left:0; top:0;
	display:grid;
	align-items:center;
	grid-template-columns: 1fr 1fr;
	.titles {
		font-family: 'Potta One', cursive;
		font-size:14px;
		color: #af4261;
		width:200px;
		margin-left:20px;
		cursor:pointer;
		@media only screen and (min-width: 768px) {
			margin-left:50px;
		}		
	}

	.lang-wrap{
		text-align:right;
		.lang {
			background:white;
			width:100px;
			font-size:12px;
			padding:3px 10px;
			border-radius:3px;
			margin-right:20px;
			@media only screen and (min-width: 768px) {
				margin-right:50px;
			}		
		}
	}

}

.main {
	padding:20px;
  width:100%; min-height:100vh;
	background: #FFEFBA;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #FFFFFF, #FFEFBA);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #FFFFFF, #FFEFBA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	@media only screen and (min-width: 768px) {
		padding: 50px 20%;
	}
}

.footer {
  height:30px;
  // background:lightblue;
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

.sns {
	font-size:13px;
	display:grid;
	grid-template-columns: 1fr 1fr;
	text-align:center;
	a {color:black;}
}

.pages {
	font-size:12px;
	margin-bottom:15px;
	@media only screen and (min-width: 768px) {
		font-size:15px;
	}
}

</style>

<script>
import {questionChristianCommon, questionChristianPoint, questionIslamCommon, questionIslamPoint, questionHindiCommon, questionHindiPoint,questionBudahCommon, questionBudahPoint } from "../library/questions"

export default {
  name: 'ReligionStart',
  components: {
    // HelloWorld
  },
  data: function() {
		return {
			questions: [],
			initial: true,
			totalPage: 0,
			currentPage: 0,
			currentReligion: "",
			currentQuestion: {},
			questionLoading: true,
			commonPoint: 0,
			mainPoint: 0,
			displayResult: false,
			displayHeaven: false,
			displayQuestion: false,
			displayHeavenHow: false,
			gender: "",
			jihad: false,
			rich: false,
			finalResult: "",
			heavenResult: "",
			snsResult: "I will be going to Heaven 100% in Christian world",
			heavenHow: "",
			hashtag: "Christian",
			theway: ""
		}
	},
	methods: {
		onSelect: function(i) {
			switch(i) {
				case 1:
					this.generateBudahQuestions()
					break;
				case 2:
					this.generateChristianQuestions()
					break;
				case 3:
					this.generateHindiQuestions()
					break;
				case 4:
					this.generateIslamQuestions()
					break;
				default:
					// code block
			}
			this.initial = false
		},
		generateChristianQuestions: function() {
			this.currentReligion = "christian"
			this.questions = [...questionChristianCommon, ...questionChristianPoint]

			// need to MIX this.questions, make them random order
			this.questions.sort(function () {
					return Math.round(Math.random()) - 0.5
			})

			this.totalPage = this.questions.length - 1
			this.generateCurrentQuestion()
			this.displayQuestion = true

			this.heavenHow = "In the Christian world, the only way to heaven is Jesus Christ. You must believe that Jesus died for your sin and accept him as your only savior and start your new life as Christian."
		},
		generateHindiQuestions: function() {
			this.currentReligion = "hindi"
			this.questions = [...questionHindiCommon, ...questionHindiPoint]

			// need to MIX this.questions, make them random order
			this.questions.sort(function () {
					return Math.round(Math.random()) - 0.5
			})

			this.totalPage = this.questions.length - 1
			this.generateCurrentQuestion()
			this.displayQuestion = true

			this.heavenHow = "In the Hindu world, the true salvation isn't about going heaven. Even heaven and hell are temporary place in the reincarnation. The true salvation is getting out of the repeating circle. You must pay all the karma and love your gods."
		},		
		generateIslamQuestions: function() {
			this.currentReligion = "islam"
			this.questions = [...questionIslamCommon, ...questionIslamPoint]

			// need to MIX this.questions, make them random order
			this.questions.sort(function () {
					return Math.round(Math.random()) - 0.5
			})

			this.totalPage = this.questions.length - 1
			this.generateCurrentQuestion()
			this.displayQuestion = true

			this.heavenHow = "Islamic is about obedience. You must follow all the duties from Allah. You must confess your faith, five times of pray, offer donation, keep Ramadan fasting and visiting Mecca. This duties will lead you to the salvation."
		},
		generateBudahQuestions: function() {
			this.currentReligion = "budah"
			this.questions = [...questionBudahCommon, ...questionBudahPoint]

			// need to MIX this.questions, make them random order
			this.questions.sort(function () {
					return Math.round(Math.random()) - 0.5
			})

			this.totalPage = this.questions.length - 1
			this.generateCurrentQuestion()
			this.displayQuestion = true

			this.heavenHow = "In the Budah world, the true salvation isn't about going heaven. Even heaven and hell are temporary place in the reincarnation. The true salvation is getting out of the repeating suffering. You must pay all the karma and work hard and set you free from all the sufferings."
		},		
		generateCurrentQuestion: function() {
			this.questionLoading = true
			this.currentQuestion = this.questions[this.currentPage]
			this.questionLoading = false
		},
		selectAnswer: function(type, point) {
			if(type === "common") this.commonPoint = this.commonPoint + point
			if(type === "main") this.mainPoint = this.mainPoint + point
			if(type === "gender") {
				if(point === 1) this.gender = "male"
				if(point === 2) this.gender = "female"
			}
			if(type === "rich") {
				if(point === 1) this.rich = true
			}
			if(type === "jihad") {
				if(point === 1) this.jihad = true
			}

			if(this.totalPage !== this.currentPage) {
				this.currentPage = this.currentPage + 1
				this.generateCurrentQuestion()
			} else {
				this.displayQuestion = false
				this.generateResult()
			}

		},
		generateResult: function() {
			let state = ""
			let heaven = ""
			if(this.currentReligion === "christian") {
				if(this.mainPoint >= 10) {
					state = "You will go to heaven 100%"
				} else {
					state="0%. You won't go to heaven. In the Christian world, only way to heaven is Jesus no matter how you are good or bad."
				}
				heaven = "Heaven is being with God. The bible says there will be a New Jerusalem after the judgement day. There will be no sick, disease or death. Peace and joy will be forever with God. So will you be able to go to heaven?"
				this.theway = "In the Christian world, Jesus is the only way to heaven in the Christian world. No matter how you are good or bad, you must accept Jesus is your savior that died for your sin."
			}

			if(this.currentReligion === "islam") {
				if(this.jihad) {
					state += "Jihad is the best way to heaven. No matter about your life style, you will go to heaven 100%. Congratulation."
				}else {
					if(this.mainPoint >= 5) {
						state += "I'm so proud see you such a perfect Muslim. You did a great job. You did all duties. Your are good. However, it still depends on the great Allah. If Allah is in bad mood when you front him, then you might go to hell. Therefore, the possibility is 50%."
					} else {
						if(this.rich) {
							state += "You didn't do all the duties as Muslim. However since you are a RICH, you can start doing good things such as helping people or donation. It's not late to be a good Muslim. Currently your possibility is 10%."
						} else if(this.mainPoint > 1){
							state += `You must work hard to keep doing the five duties as muslim. So far you did only ${this.mainPoint}. So far, ${this.mainPoint * 10}% posibility. Do not give up and let's work harder.`
						}else {								
							state += "0% possibility of going to heaven. I'm sorry to tell you that there's no salvation for you so far."
						}
					}
					
					if(this.gender === "female") {
						// state += "<br />Unfortunately the quran tell you about the heaven only for men. However theres interpretation that there gonna be a heaven for woman. Do not lose hope and keep work hard."
					}
				}
				heaven = "Islamic is the paradise after your death. Each person will receive own paradise. There will be four beautiful women as your good servant, river of alcohol that you never get drunk. There's no Allah so you are completely free. You will be joyful and happy forever."
				this.theway = "No matter how you are a good muslim, we are not sure. Some doctors say that Jihad is the only way to the heaven 100 percent. Jihad meant struggling hard to become a good muslim. Hope you dont give up and work hard."
			}

			if(this.currentReligion === "hindi") {
				if(this.mainPoint >= 5) {
					if(this.gender === "male") {
						state += "Congratulation. You are at high level of salvation. We don't know if this life would be your end of recycle however, you are at high level."
					} else {
						state += "You are a very good hindi. However since you are woman, you need to reborn as a man again. Hope do not lose your faith and keep working hard."
					}
				} else {
					state += "Sadly you are not there yet. You stil need more hard works to do."
				}

				heaven = "Hindi's heaven is temporary place to stay. Eventually you will be reborn to the suffering world. The true salvation is to get out of the cycle and become free. Becoming a God. You must work hard to have a good karma."
				this.theway = "To set free from the reincarnation, you must work hard to have a good karma. If you are woman, you must born as a man first. It will be helpful if you are Brahmin. You must keep serve and love your god."
			}

			if(this.currentReligion === "budah") {
				if(this.mainPoint >= 5) {
					state += "Congratulation. You are at high level of salvation. We don't know if this life would be your end of recycle however, you are at high level."
				} else {
					state += "Sadly you are not there yet."
				}

				heaven = "Budaism's heaven is temporary place to stay. Eventually you will be reborn to the suffering world. The true salvation is to get out of the cycle and become free. Becoming a God. You must work hard to have a good karma."
				this.theway = "To set free from the reincarnation, you must work hard to have a good karma. If you are woman, you must born as a man first. It will be helpful if you are Brahmin. You must keep serve and love your god."
			}


			this.heavenResult = heaven
			this.finalResult = state
			this.displayHeaven = true
			// this.displayResult = true
		},
		onFinalResult: function() {
			this.displayHeaven = false
			this.displayResult = true
		},
		OnHowHeaven: function() {
			// this.displayResult = false
			this.displayHeavenHow = true
		},
		onRestart: function() {
			this.$router.push('/religion')		
		},
		onLanguage: function(event) {
			if(event.target.value === "eng") {
				this.$router.push('/religion')		
			} else if(event.target.value === "kor") {
				this.$router.push('/religion/ko')					
			} else if(event.target.value === "jap") {
				console.log('jap')
			// this.$router.push('/religion/jp')					
			}
		},
	},

}
</script>
