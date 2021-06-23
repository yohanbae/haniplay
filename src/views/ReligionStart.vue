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
				<img v-if="currentReligion===''" src="~@/assets/baby_defaults.png" alt="hh" />
				<img v-if="currentReligion==='budah'" src="~@/assets/baby_budahs.png" alt="hh" />
				<img v-if="currentReligion==='christian'" src="~@/assets/baby_christians.png" alt="hh" />
				<img v-if="currentReligion==='hindi'" src="~@/assets/baby_hindus.png" alt="hh" />
				<img v-if="currentReligion==='islam'" src="~@/assets/baby_islams.png" alt="hh" />

				<div class="conver-wrap">
					<div v-if="initial">
						<p>What religious world are you curious if you will go Heaven or Hell</p>
					</div>

					<div v-if="displayQuestion">
						<div v-if="questionLoading">Loading Question</div>
						<div v-else>
							<div>{{currentQuestion.question}}</div>
						</div>
					</div>

					<div v-if="displayHeaven">
						<div class="title">Thanks for the answers!</div>
						{{heavenResult}}
						<div class="title2">click below to see the result</div>
					</div>

					<div v-if="displayResult && !displayHeavenHow">
						<div class="title">Will you go to heaven?</div>
						{{finalResult}}
						<div class="title2">click below to learn more</div>
					</div>

					<div v-if="displayHeavenHow">
						<div class="title">How to be saved?</div>
						{{heavenHow}}
					</div>

				</div>
				<div class="symbol-wrap">
					<div class="pages">{{ currentPage }} / {{ totalPage}}</div>
				</div>
			</div>

			<div v-if="initial">
				<div class="selectWrap" @click="onSelect(1)">Buddhism</div>
				<div class="selectWrap" @click="onSelect(2)">Christian</div>
				<div class="selectWrap" @click="onSelect(3)">Hinduism</div>
				<div class="selectWrap" @click="onSelect(4)">Islam</div>
			</div>

			<div v-if="displayQuestion">
				<div v-if="questionLoading">Loading</div>		
				<div v-else>
					<div v-for="(choice, i) in currentQuestion.answer" v-bind:key="i">
						<div class="selectWrap" @click="selectAnswer(choice.type, choice.point)">{{choice.ans}}</div>
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
						url="https://iroom.com/religion"
						:title="snsResult"
						description="Find out if you will go to heaven or hell: "
						quote="Heaven or Hell"
						:hashtags="`heaven,hell,christian,islam,buddahism,hinduism`"
					>
						Share on Facebook
					</ShareNetwork>
					<ShareNetwork
						network="twitter"
						url="https://iroom.com/religion"
						:title="`Heaven or Hell? ${snsResult}. Find out where will you go after you died by religions`"
						quote="Heaven or Hell"
						:hashtags="`heaven,hell,christian,islam,buddahism,hinduism`"
					>
						Share on Twitter
					</ShareNetwork>					
				</div>
			</div>				

		</div>
		<div class="footer">Hanison - All rights reserved</div>
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
		font-size:18px;
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
		.title {
			font-size:20px;
			color:#af4261;
			margin:20px 0;
		}
		.title2 {
			font-size:14px;
			color:#af4261;
			margin:20px 0;
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
	// background: -webkit-linear-gradient(to right, #FFFFFF, #FFEFBA);  /* Chrome 10-25, Safari 5.1-6 */
	// background: linear-gradient(to right, #FFFFFF, #FFEFBA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
			hashtag: "christian",
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

			this.heavenHow = "In the Christian world, the only way to heaven is Jesus Christ. You must believe that Jesus died for your sin and accept him as your only savior and start your new life as a Christian."
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

			this.heavenHow = "In the Hindu world, true salvation isn't about going to heaven. Even heaven and hell are temporary places in reincarnation. The true salvation is getting out of the repeating circle. You must pay all the karma and love your gods."
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

			this.heavenHow = "Islamic is about obedience. You must follow all the duties of Allah. You must confess your faith, five times pray, offer a donation, keep Ramadan fasting, and visiting Mecca. These duties will lead you to salvation."
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

			this.heavenHow = "In the Budah world, true salvation isn't about going to heaven. Even heaven and hell are temporary places in reincarnation. The true salvation is getting out of the repeating suffering. You must pay all the karma and work hard and set yourself free from all the sufferings."
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
			let perc = 0
			if(this.currentReligion === "christian") {
				if(this.mainPoint >= 10) {
					state = "You will go to heaven 100%"
					perc = 100
				} else {
					state="0%. You won't go to heaven. In the Christian world, the only way to heaven is Jesus no matter how you are good or bad."
					perc = 0
				}
				heaven = `Heaven is being with God. The bible says there will be a New Jerusalem after the judgment day. There will be no sickness, disease, or death. Peace and joy will be forever with God. So will you be able to go to heaven?`
				// this.theway = "In the Christian world, Jesus is the only way to heaven. No matter how you are good or bad, you must accept Jesus as your savior that died for your sin."
				this.snsResult = `I will be going to Heaven ${perc}% in the Christian world`
			}

			if(this.currentReligion === "islam") {
				if(this.jihad) {
					state += "Jihad is the best way to heaven. No matter what, you will go to heaven 100%. Congratulation."
					perc = 100
				}else {
					if(this.mainPoint >= 5) {
						state += "I'm so proud to see you as such a perfect Muslim. You did a great job. You did all duties. You are good. However, it still depends on the great Allah. If Allah is in a bad mood when you front him, then you might go to hell. Therefore, the possibility is 50%."
						perc = 50
					} else {
						if(this.rich) {
							state += "You didn't do all the duties as a Muslim. However, since you are RICH, you can start doing good things such as helping people or donating. It's not late to be a good Muslim. Currently, your possibility is 10%."
							perc = 10
						} else if(this.mainPoint > 1){
							state += `You must work hard to keep doing the five duties as a Muslim. So far you did only ${this.mainPoint}. So far, ${this.mainPoint * 10}% possibility. Do not give up and let's work harder.`
							perc = this.mainPoint * 10
						}else {								
							state += "0% possibility of going to heaven. I'm sorry to tell you that there's no salvation for you so far."
							perc = 0
						}
					}
					
					if(this.gender === "female") {
						// state += "<br />Unfortunately the quran tell you about the heaven only for men. However theres interpretation that there gonna be a heaven for woman. Do not lose hope and keep work hard."
					}
				}
				heaven = "Islamic is the paradise after your death. Each person will receive their own paradise. There will be the river of alcohol that you never get drunk. There will be your husband/wife forever. If you are a very good Muslic, 72 beautiful women will be waiting for you as your good servant and you will have unlimited power to make love with them. You will be joyful and happy forever."
				// this.theway = "No matter how you are a good Muslim, we are not sure. Some doctors say that Jihad is the only way to heaven 100 percent. Jihad meant struggling hard to become a good Muslim. Hope you don't give up and work hard."
				this.snsResult = `I will be going to Heaven ${perc}% in the Islam world`
			}

			if(this.currentReligion === "hindi") {				
				if(this.mainPoint >= 5) {
					if(this.gender === "male") {
						state += "Congratulation. You are at a high level of salvation. We don't know if this life would be your end of recycling however, you are at a high level."
						perc = 90
					} else {
						state += "You are a very good hindi. However since you are woman, you need to reborn as a man again. Hope do not lose your faith and keep working hard."
						perc = 0
					}
				} else {
					state += "Sadly you are not there yet. You still need more hard works to do."
					perc = 30
				}

				heaven = "Hindi's heaven is a temporary place to stay. Eventually, you will be reborn into the suffering world. The true salvation is to get out of the cycle and become free. Becoming a God. You must work hard to have good karma."
				// this.theway = "To set free from reincarnation, you must work hard to have good karma. If you are a woman, you must reborn as a man first. It will be helpful if you are Brahmin. You must keep serve and love your god."
				this.snsResult = `I will be going to get true salvation ${perc}% in the Hinduism world`
			}

			if(this.currentReligion === "budah") {
				if(this.mainPoint >= 5) {
					state += "Congratulation. You are at a high level of salvation. We don't know if this life would be your end of recycle however, you are at high level."
					perc = 90
				} else {
					state += "Sadly you are not there yet."
					perc = 0
				}

				heaven = "Buddhaism's heaven is a temporary place to stay. Eventually, you will be reborn into the suffering world. The true salvation is to get out of the cycle and become free. Becoming a God. You must work hard to have good karma."
				// this.theway = "To set free from reincarnation, you must work hard to have good karma. Continuously memorize Buddhist texts and meditations to get set free from all sufferings."
				this.snsResult = `I will be going to get true salvation ${perc}% in the Buddhism world`
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
				this.$router.push('/religion/jp')					
			}
		},
	},

}
</script>
