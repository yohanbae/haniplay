<template>
  <div>
		<div class="header">
			<span class="titles" @click="onRestart">HEAVEN OR HELL</span>

			<div class="lang-wrap">
				<select class="lang" name="language" id="cars" @change="onLanguage($event)">
					<option value="kor">Korean</option>
					<option value="eng">English</option>
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
						<p>알아보고 싶은 종교 세계관을 선택해주세요</p>
					</div>

					<div v-if="displayQuestion">
						<div v-if="questionLoading">Loading Question</div>
						<div v-else>
							<div>{{currentQuestion.question}}</div>
						</div>
					</div>

					<div v-if="displayHeaven">
						<div class="title">설문이 모두 끝났습니다!</div>
						{{heavenResult}}
						<div class="title2">아래 버튼을 눌러 결과를 확인하세요</div>
					</div>

					<div v-if="displayResult && !displayHeavenHow">
						<div class="title">결과</div>
						{{finalResult}}
						<div class="title2">아래 버튼을 눌러 더 알아봅시다</div>
					</div>

					<div v-if="displayHeavenHow">
						<div class="title">구원이란 어떻게 가능할까?</div>
						{{heavenHow}}
					</div>

				</div>
				<div class="symbol-wrap">
					<!-- <v-icon class="mr-3">mdi-christianity-outline </v-icon>
					<v-icon class="mr-3">mdi-islam</v-icon>
					<v-icon class="mr-3">mdi-buddhism</v-icon>
					<v-icon class="mr-3">mdi-hinduism</v-icon> -->
					<div class="pages">{{ currentPage }} / {{ totalPage}}</div>
				</div>
			</div>

			<div v-if="initial">
				<div class="selectWrap" @click="onSelect(1)">불교</div>
				<div class="selectWrap" @click="onSelect(2)">기독교</div>
				<div class="selectWrap" @click="onSelect(3)">힌두교</div>
				<div class="selectWrap" @click="onSelect(4)">이슬람교</div>
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
				<div class="selectWrap" @click="onFinalResult">결과보기</div>
			</div>

			<div v-if="displayResult">
				<div class="selectWrap" v-if="!displayHeavenHow" @click="OnHowHeaven">이 종교세계에서 구원받으려면?</div>
				<div class="selectWrap" @click="onRestart">다른 종교 알아보기</div>
				<div class="sns">
					<ShareNetwork
						network="facebook"
						url="https://haniplay/religion/ko"
						:title="snsResult"
						description="Find out if you will go to heaven or hell: "
						quote="Heaven or Hell"
						hashtags="천국,지옥,기독교,이슬람,불교,힌두교"
					>
						페이스북에 공유
					</ShareNetwork>
					<ShareNetwork
						network="twitter"
						url="https://haniplay/religion/ko"
						:title="`Heaven or Hell? ${snsResult}. 내가 죽어서 어디에 가게될지 종교별로 알아보기`"
						quote="Heaven or Hell"
						hashtags="천국,지옥,기독교,이슬람,불교,힌두교"
					>
						트위터에 공유
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
import {questionChristianCommon, questionChristianPoint, questionIslamCommon, questionIslamPoint, questionHindiCommon, questionHindiPoint,questionBudahCommon, questionBudahPoint } from "../../library/questionsKo"

export default {
  name: 'ReligionStartKo',
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

			this.heavenHow = "기독교 세계관에서는 예수만이 유일한 구원자입니다. 예수가 죽음으로 당신의 죄값을 치뤘기 때문에, 당신은 지옥에 가지 않게 되었고, 이 사실을 믿고 예수를 영접하며 새 삶을 시작하면 당신은 천국에 갈 수 있습니다."
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

			this.heavenHow = "힌두교의 세계관에서 천국과 지옥은 윤회의 반복 속에 잠시 머무르는 장소일 뿐입니다. 진정한 구원은 고통의 윤회에서 업보를 치루고 자유해지는 것입니다. 이를 위해서는 업보를 갚고 당신의 신을 사랑해야 합니다. 만약 당신이 여자라면 먼저 남성으로 다시 태어나야합니다."
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

			this.heavenHow = "이슬람은 복종의 종교입니다. 알라신께서 당신에게 내린 명령을 수행해야 합니다. 특히 5가지 의무가 있습니다. 이슬람으로서의 신앙고백, 하루 다섯번의 기도, 가난한 자들을 위한 자선, 매년 라마단 금식, 메카의 성지순례를 행해야만 합니다. 이 다섯가지 의무를 지킬때 당신은 낙원으로 갈 확률이 높아지게 됩니다."
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

			this.heavenHow = "불교세계에서는 해탈의 깨달음에 이르려면 깊은 수행이 필요합니다. 번뇌와 집착 욕망으로부터 벗어날 수있도록 수련에 정진하고 명상하십시오."
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
					state = "당신이 천국에 갈 확률은 100%입니다"
					perc = 100
				} else {
					state="당신이 천국에 갈 확률은 0% 입니다"
					perc = 0
				}
				heaven = "기독교의 천국이란 신과 함께 영원히 함께 하는 것입니다. 성경에서는 심판의 날때 세상이 불타고 새로운 예루살렘에 선택받은 자들이 들어갈거라고 합니다. 그곳에는 병자나 죽음 전쟁이 없을 것이고 항상 기쁨이 가득할 것입니다. 과연 당신은 이 천국에 들어갈 수 있을까요?"
				this.snsResult = `기독교 세계관에서 내가 천국에 갈 확률은 ${perc}%`
			}

			if(this.currentReligion === "islam") {
				if(this.jihad) {
					state += "당신이 천국에 갈 확률은 100% 입니다. 지하드 성전은 무슬림으로서 위대한 행위입니다. 축하합니다."
					perc = 100
				}else {
					if(this.mainPoint >= 5) {
						state += "당신이 천국에 갈 확률은 50%입니다. 당신은 모든 의무를 지켜낸 훌륭한 무슬림입니다! 하지만 결과는 오직 알라신에게만 달려있습니다. 만약 당신이 알라를 대면할 때 그의 기분이 좋지 않다면 당신은 지옥에 갈 수도 있습니다."
						perc = 50
					} else {
						if(this.rich) {
							state += "당신이 천국에 갈 확률을 아주 낮습니다. 당신은 무슬림으로서 모든 의무를 행하지 않았습니다. 그러나 당신은 부자이므로 아직 기회가 남아있습니다. 지금부터라도 선행과 자선을 많이 베풀며 노력한다면 천국에 갈 수 있는 확률이 높아질 것입니다"
							perc = 10
						} else if(this.mainPoint > 1){
							state += `당신이 천국에 갈 확률은 ${this.mainPoint * 10}% 입니다`
							perc = this.mainPoint * 10
						}else {								
							state += "당신이 천국에 갈 확률은 0%입니다"
							perc = 0
						}
					}
					
					if(this.gender === "female") {
						// state += "<br />Unfortunately the quran tell you about the heaven only for men. However theres interpretation that there gonna be a heaven for woman. Do not lose hope and keep work hard."
					}
				}
				heaven = "이슬람의 천국은 아름다운 낙원입니다. 그곳엔 술의 강이 흐르고 마셔도 마셔도 취하지 않을 것입니다. 그곳엔 현세의 배우자가 당신과 영원히 함께 할 것입니다. 만약 당신이 특별한 신앙을 가진 자라면, 72명의 아름다운 처녀들이 당신을 기다리고 있을 것이며, 그중 하나는 당신의 현생에서 본 가장 아름다운 여인일 겁니다. 당신에겐 그 처녀들 전부와 사랑을 나눌 무한한 힘이 주어집니다. 더 이상 어려운 의무를 지키지않고 행복한 영생을 보내게 됩니다."
				this.snsResult = `이슬람 세계관에서 내가 천국에 갈 확률은 ${perc}%`
			}

			if(this.currentReligion === "hindi") {
				if(this.mainPoint >= 5) {
					if(this.gender === "male") {
						state += "축하합니다. 당신은 구원에 이르기위한 높은 단계에 다가가 있습니다. 어쩌면 이번 생이 윤회의 마지막 생일지도 모릅니다."
						perc = 90
					} else {
						state += "당신은 아주 훌륭한 힌두교인입니다. 그러나 안타깝게도 당신은 여성입니다. 윤회의 고통에서 벗어나려면 먼저 남성으로 환생해야만 합니다. 희망을 잃지말고 수련에 정진하세요."
						perc = 0
					}
				} else {
					state += "안타깝게도 당신에게 쌓인 업보가 많습니다. 더 많은 수행이 필요합니다."
					perc = 30
				}

				heaven = "힌두교에서 천국이란 윤회의 반복속에서 잠시 머무를 뿐인 장소입니다. 진정한 구원은 반복되는 윤회에서 벗어나는 것입니다. 이를위해 업보를 갚기위한 노력이 필요합니다."
				this.snsResult = `힌두교 세계관에서 내가 해탈할 확률은 ${perc}%`
			}

			if(this.currentReligion === "budah") {
				if(this.mainPoint >= 5) {
					state += "훌륭합니다. 당신은 해탈에 가까운 경지에 이르렀습니다. 어쩌면 이번 생이 윤회의 마지막 생일지도 모릅니다. 더 수련에 정진하십시오."
					perc = 90
				} else {
					state += "안타깝게도 아직 더 많은 수행이 필요합니다."
					perc = 0
				}

				heaven = "불교의 세계관에서 천국 깨달음을 얻어 더 이상 윤회하지 않아도 되는 곳입니다. 해탈에 이르는 깨달음을 업기까지 업보를 갚고 수련에 정진해야 합니다"
				this.snsResult = `불교 세계관에서 내가 해탈할 가능성은 ${perc}%`
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
			this.$router.push('/religion/ko')		
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
