<template>
  <div>
		<div class="header">
			<span class="titles" @click="onRestart">HEAVEN OR HELL</span>

			<div class="lang-wrap">
				<select class="lang" name="language" id="cars" @change="onLanguage($event)">
					<option value="jap">Japanese</option>
					<option value="eng">English</option>
					<option value="kor">Korean</option>
				</select>
			</div>
		</div>
		<div class="main">
			<div class="main-wrap">
				<img v-if="currentReligion===''" src="../../assets/baby_defaults.png" alt="hh" />
				<img v-if="currentReligion==='budah'" src="../../assets/baby_budahs.png" alt="hh" />
				<img v-if="currentReligion==='christian'" src="../../assets/baby_christians.png" alt="hh" />
				<img v-if="currentReligion==='hindi'" src="../../assets/baby_hindus.png" alt="hh" />
				<img v-if="currentReligion==='islam'" src="../../assets/baby_islams.png" alt="hh" />

				<div class="conver-wrap">
					<div v-if="initial">
						<p>調べたい宗教世界観を選択してください</p>
					</div>

					<div v-if="displayQuestion">
						<div v-if="questionLoading">Loading Question</div>
						<div v-else>
							<div>{{currentQuestion.question}}</div>
						</div>
					</div>

					<div v-if="displayHeaven">
						<div class="title">設問が全て終わりました!</div>
						{{heavenResult}}
						<div class="title2">下のボタンを押して結果を確認してください</div>
					</div>

					<div v-if="displayResult && !displayHeavenHow">
						<div class="title">あなたは天国に行けるでしょうか?</div>
						{{finalResult}}
						<div class="title2">下のボタンを押してもっと見てみましょう</div>
					</div>

					<div v-if="displayHeavenHow">
						<div class="title">救援とはどうすれば可能だろうか?</div>
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
				<div class="selectWrap" @click="onSelect(1)">仏教</div>
				<div class="selectWrap" @click="onSelect(2)">基教</div>
				<div class="selectWrap" @click="onSelect(3)">ヒンドゥー教</div>
				<div class="selectWrap" @click="onSelect(4)">イスラム教</div>
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
				<div class="selectWrap" @click="onFinalResult">結果を見る</div>
			</div>

			<div v-if="displayResult">
				<div class="selectWrap" v-if="!displayHeavenHow" @click="OnHowHeaven">この宗教世界から救われるには?</div>
				<div class="selectWrap" @click="onRestart">他宗教を調べる</div>
				<div class="sns">
					<ShareNetwork
						network="facebook"
						url="https://haniplay/religion/jp"
						:title="snsResult"
						description="Find out if you will go to heaven or hell: "
						quote="Heaven or Hell"
						hashtags="天国,地獄,キリスト教,イスラム,仏教,ヒンドゥー教"
					>
						Share on Facebook
					</ShareNetwork>
					<ShareNetwork
						network="twitter"
						url="https://haniplay/religion/jp"
						:title="`Heaven or Hell? ${snsResult}. 私が死んでどこに行くか宗教別に分かるよ`"
						quote="Heaven or Hell"
						hashtags="天国,地獄,キリスト教,イスラム,仏教,ヒンドゥー教"
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
import {questionChristianCommon, questionChristianPoint, questionIslamCommon, questionIslamPoint, questionHindiCommon, questionHindiPoint,questionBudahCommon, questionBudahPoint } from "../../library/questionsJp"

export default {
  name: 'ReligionStartJp',
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

			this.heavenHow = "キリスト教の世界観ではイエスだけが唯一の救援者です。 イエスが死によりあなたの罪の償いをしたので、あなたは地獄に行かなくなり、この事実を信じてイエスを迎えて新しい人生を始めれば、あなたは天国に行くことができます"
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

			this.heavenHow = "ヒンズー教の世界観において、天国と地獄は輪廻の繰り返しの中、しばし留まる場所でしかありません。 真の救援は、苦痛の輪廻から報い、自由になることです。 このためには因果応報をし、あなたの神を愛さなければなりません。 もしあなたが女なら先に男性に生まれ変わらなければなりません"
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

			this.heavenHow = "イスラムは服従の宗教です。 アラー神があなたに下した命令を遂行しなければなりません。 特に5つの義務があります。 イスラムとしての信仰告白、一日5回の祈祷、貧しい人たちのための慈善、毎年ラマダン断食、メッカの聖地巡礼を行わなければなりません。 この5つの義務を守れば、あなたは楽園へ行く確率が高くなります"
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

			this.heavenHow = "仏教世界では解脱の悟りを開くためには深い修行が必要です。 煩悩や執着への欲望から解放できるよう、修練に精進し、瞑想してください。"
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
					state = "あなたが天国に行く確率は100%です。"
					perc = 100
				} else {
					state="あなたが天国に行く確率は0%です"
					perc = 0
				}
				heaven = "キリスト教天国とは、神と共に永遠に共にすることです。 聖書では、「審判の日」に世の中が燃え、新しいエルサレムに選ばれた者たちが入るそうです。 そこは、病人も死も戦争もないだろうし、いつも喜びでいっぱいでしょう」。 果してあなたはこの天国に入れるでしょうか。?"
				this.snsResult = `キリスト教世界観で私が天国に行く確率は ${perc}%`
			}

			if(this.currentReligion === "islam") {
				if(this.jihad) {
					state += "あなたが天国に行く確率は100%です。 ジハード聖戦はムスリムとして偉大な行為です。 おめでとうございます。"
					perc = 100
				}else {
					if(this.mainPoint >= 5) {
						state += "あなたが天国に行く確率は50%です。 あなたは全ての義務を守り抜いた立派なムスリムです! しかし、結果はただアラーシーンだけにかかっています。 もしあなたがアラーに対面する時、彼の機嫌がよくないなら、あなたは地獄に陥ることもあります。"
						perc = 50
					} else {
						if(this.rich) {
							state += "あなたが天国に行く確率がとても低いです。 貴方はムスリムとして全ての義務を果たしました。 しかしあなたはお金持ちなのでまだきかいがのこっています。 今からでも善行と慈善をたくさん施しながら努力すれば天国に行くことができる確率が高くなるはずです."
							perc = 10
						} else if(this.mainPoint > 1){
							state += `あなたが天国に行く確率は ${this.mainPoint * 10}% です`
							perc = this.mainPoint * 10
						}else {								
							state += "あなたが天国に行く確率は0%です。"
							perc = 0
						}
					}
					
					if(this.gender === "female") {
						// state += "<br />Unfortunately the quran tell you about the heaven only for men. However theres interpretation that there gonna be a heaven for woman. Do not lose hope and keep work hard."
					}
				}
				heaven = "「イスラムの天国は、美しい楽園です。 そこには酒の川が流れてあなたは飲んでも酔わないでしょう. また、四人の美しい娘たちがあなたを待っているはずで、その中の一つはあなたの現世で見た一番美しい女性でしょう。 あなたにはその4人の娘たちと愛を交わす無限の力が与えられます。 これ以上難しい義務を守らず、幸せな永生を送るようになります"
				this.snsResult = `イスラム世界観で私が天国に行く確率は ${perc}%`
			}

			if(this.currentReligion === "hindi") {
				if(this.mainPoint >= 5) {
					if(this.gender === "male") {
						state += "おめでとうございます。あなたは救援に至るための高い段階に近づいています。 もしかしたら今生が輪廻の最後の誕生日かもしれません."
						perc = 90
					} else {
						state += "貴方はとても立派なヒンズー教徒です。 しかし残念なことにあなたは女性です。 輪廻の苦しみから逃れるためには、まず男性に生まれ変わらなければなりません。 希望を失わずに修練に精進してください."
						perc = 0
					}
				} else {
					state += "残念ながら、あなたにたまった因果が多いです。 より多くの修行が必要です。"
					perc = 30
				}

				heaven = "ヒンズー教で天国とは輪廻の繰り返しの中でしばらく留まるだけの場所です。 真の救いは繰り返される輪廻から抜け出すことです。 因果応報のための努力が必要です."
				this.snsResult = `ヒンズー教の世界観から私が解脱する確率は ${perc}%`
			}

			if(this.currentReligion === "budah") {
				if(this.mainPoint >= 5) {
					state += "立派です。あなたは解脱に近い境地に達しました。 もしかしたら今生が輪廻の最後の誕生日かもしれません。 もっと修練に精進してください。"
					perc = 90
				} else {
					state += "残念ながら、まだもっと多くの修行が必要です。"
					perc = 0
				}

				heaven = "仏教の世界観から天国への悟りを開き、輪廻しなくてもすむ場所です。 解脱の悟りを背負うまで、報い修行に励まなければなりません"
				this.snsResult = `仏教の世界観から私が解脱する可能性は ${perc}%`
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
			this.$router.push('/religion/jp')		
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
