<template>
  <div class="main-wrap">
		<div class="themain" v-if="goalLoaded">
			<div class="thetitle">STUDY TUBE</div>      
			<div class="topleft">
				Set and track your study time<br />
				while listening to your favorite focus music youtube channel<br /><br />
			</div>
			<div class="topleft2">
				{{getTodayDate()}}<br/>
				{{getTotalTime()}} HOURS
			</div>
			<div class="time-wrap" @click="onStart">
				<v-progress-circular class="thepros" :rotate="-90" :size="600" :width="2" :value="getPercent()" color="teal">
					<div class="thecenter">{{ getTime()}} / {{getTotalTimeSec()}}</div>
					<div class="clickbottom" v-if="success">
						Hooray~
					</div>
					<div v-else>
						<div v-if="playing" class="clickbottom">click or press enter to pause</div>
						<div v-else class="clickbottom">click or press enter to start</div>
					</div>
				</v-progress-circular>
				<v-progress-circular class="thepros-m" :rotate="-90" :size="200" :width="2" :value="getPercent()" color="teal">
					<div class="thecenter">{{ getTime()}} / {{getTotalTimeSec()}}</div>
					<div class="clickbottom" v-if="success">
						Hooray~
					</div>					
					<div v-else>
						<div v-if="playing" class="clickbottom">click or press enter to pause</div>
						<div v-else class="clickbottom">click or press enter to start</div>
					</div>
				</v-progress-circular>
				<v-progress-circular class="thepros-med" :rotate="-90" :size="400" :width="2" :value="getPercent()" color="teal">
					{{ getTime()}} / {{getTotalTimeSec()}}
					<div class="clickbottom" v-if="success">
						Hooray~
					</div>					
					<div v-else>
						<div v-if="playing" class="clickbottom">click or press enter to pause</div>
						<div v-else class="clickbottom">click or press enter to start</div>
					</div>
				</v-progress-circular>				
			</div>

			<div class="historybottom">
				<v-sparkline class="graph-position" :fill="true" auto-draw :labels="historyLabels" :value="historyValues" stroke-linecap="round" smooth="5" color="rgba(0, 128, 128, 0.2)" line-width="1" padding="5"></v-sparkline>
				<!-- <div class="labels">
					<div class="label-elem" v-for="item in historyLabels" v-bind:key="item">Jan.{{item}}</div>
				</div> -->
			</div>
		</div>

		<div class="youtube_side">
			<div v-if="youtubeLoaded">
				<div class="youtube-box">
					<youtube :video-id="youtubeId" player-width="400" player-height="200" @ready="ready"></youtube>
				</div>
				<div class="theright">
					<v-btn small @click="onYoutubeUpdate"><v-icon small color="darken-2">mdi-cog-outline</v-icon></v-btn>
				</div>
				<v-dialog v-model="updateDialog" width="500">
					<v-card>
						<v-card-title class="headline grey lighten-2">
							Change Url
						</v-card-title>

						<v-card-text>
							<v-text-field v-model="updateYoutubeUrl" label="new url"></v-text-field>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-btn @click="onConfirmYoutubeUpdate">Update</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>				
			</div>

			<div class="youtube-list-wrap" v-if="youtubeListLoaded">
				<div v-for="item in youtubeList" v-bind:key="item.id" class="youtube-elem" @click="onYoutube(item.id)">
					<img :src="item.thumb" alt="hhe" />
					<span class="ml-5">{{item.url}}</span>
				</div>
			</div>
			<div v-if="youtubeList.length < 4" class="addwrap">
				<input type="text" class="add-youtube" v-model="newYoutubeUrl" placeholder="insert youtube url up to 4" aria-label="dd" />
				<button @click="addYoutube" class="youtube-button"><v-icon small color="darken-2">mdi-send</v-icon></button>
			</div>

			<div @click="onManage" class="manage-button">TIME SETTING</div>
			<v-dialog v-model="manageDialog" width="700">
				<v-card>
					<v-card-title class="box-title">
						TIME SETTING
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text>
						<div class="schedule-wrap">
							<v-select @change="timePick(1)" v-model="theTotal[1]" :items="times" item-text="label" item-value="hr" label="MON"></v-select>
							<v-select @change="timePick(2)" v-model="theTotal[2]" :items="times" item-text="label" item-value="hr" label="TUE"></v-select>
							<v-select @change="timePick(3)" v-model="theTotal[3]" :items="times" item-text="label" item-value="hr" label="WED"></v-select>
							<v-select @change="timePick(4)" v-model="theTotal[4]" :items="times" item-text="label" item-value="hr" label="THU"></v-select>
							<v-select @change="timePick(5)" v-model="theTotal[5]" :items="times" item-text="label" item-value="hr" label="FRI"></v-select>
							<v-select @change="timePick(6)" v-model="theTotal[6]" :items="times" item-text="label" item-value="hr" label="SAT"></v-select>
							<v-select @change="timePick(0)" v-model="theTotal[0]" :items="times" item-text="label" item-value="hr" label="SUN"></v-select>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>	
			<div class="tip">
				<strong>Tips</strong><br />
				Set the study time and keep it every day with your favorite focus music channel<br /><br />
				Make sure to lower the youtube quality so you won't waste your data.<br /><br />
				You can save up to four youtube channels. All the credits will go to the channel owner.
			</div>
		</div>
		<Keypress key-event="keyup" :key-code="32" @success="onStart" />
		<Keypress key-event="keyup" :key-code="13" @success="onStart" />
  </div>
</template>

<style lang="scss" scoped>
.main-wrap {
	display: block;
	@media only screen and (min-width: 768px) {
		display:grid;
		grid-template-columns: 1fr 400px;
		min-height:100vh;
		padding:40px 20px 10px 50px;
		grid-gap:20px;
	}

	.themain {
		height:40vh;
		padding:10px;
		@media only screen and (min-width: 768px) {
			position:relative;
			padding:0;
			height: auto;
		}
		.thetitle{
			margin-top:10px;
			color:#008080;
			font-weight:bold;
			font-size:25px;
			text-align:center;
			margin-bottom:20px;
			@media only screen and (min-width: 768px) {
				text-align:left;
				font-size:25px;
				margin-bottom:0px;
				margin-top:0px;
				font-weight:300;
			}
		}		
		.historybottom {
			position: absolute;
			// left:calc((100% - 1000px) / 2);
			left:0;
			bottom:0;
			width:100%;
			height:auto;
			z-index:10;
			pointer-events: none;
			display:none;
			@media only screen and (min-width: 768px) {
				display:block;
			}

			.labels {
				width:100%;
				height:30px;
				left:0; bottom:-10px;
				position:absolute;
				pointer-events: none;
				display:grid;
				grid-template-columns: repeat(7, 1fr);
				align-items:center;
				padding:2px;

				.label-elem {
					font-size:10px;
					text-align: right;
					color:#008080;
				}
			}
		}	// HISTORY PART

		.topleft, .topleft2 {
			font-size:12px;
			text-align:center;		
			@media only screen and (min-width: 768px) {
				width:300px;
				text-align:left;
			}
		}
		.topleft2 {
			display:none;
			@media only screen and (min-width: 768px) {
				display:block;
				position:absolute;
				right:20px;
				top:5px;
				text-align: right;
				font-size:15px;
				color:#008080;
				font-weight:300;
				opacity:0.6;
			}			
		}
	} // themain, LEFT SIDE END


	.time-wrap {
		text-align: center;
		cursor: pointer;
		z-index:99;
		transition: 500ms;
		width:100%;
		height:50vh;
		@media only screen and (min-width: 768px) {
			display:grid;
			align-items:center;
			justify-content: center;
			position: absolute;
			left:0; top:0;
			height:100%;
		}
		@media only screen and (min-width: 768px) and (max-width: 1275px) {
			// display:grid;
			// align-items:center;
			// justify-content: center;
			// position: absolute;
			// left:0; top:0;
			// height:100%			
		}
		@media only screen and (min-width: 1080px) {

		}

		.thepros, .thepros-m, .thepros-med {
			position:relative;

			.clickbottom {
				position: absolute;
				width:100%;
				bottom:50px;
				left:0;
				font-size:10px;
			}
		}
		.thepros{
				display:none;
			@media only screen and (min-width: 1275px) {
				display:grid;
				align-items:center;
			}
		}
		.thepros-m {
			.clickbottom {
				bottom:20px;
			}
			@media only screen and (min-width: 768px) {
				display:none;
			}
		}
		.thepros-med {
			.clickbottom {
				bottom:20px;
			}
			display:none;
			@media only screen and (min-width: 768px) and (max-width: 1275px) {
				display:grid;
				align-items:center;
			}			
		}
		&:hover {
			opacity: 1;
		}
	} // Time Wrap END

	.youtube_side {
		padding:5px;
		@media only screen and (min-width: 768px) {
			padding:0px;
		}
		.youtube-box{
			border-radius:10px;
			overflow: hidden;
			height: 200px;
			margin-top:30px;
			margin-bottom:10px;
			width:400px;
			margin-left: calc((100% - 400px) / 2);
			@media only screen and (min-width: 768px) {
				padding:0px;
				margin-left:0;
			}			
		}
		.youtube-list-wrap {
			margin-top:10px;
			width:400px;
			margin-left: calc((100% - 400px) / 2);
			@media only screen and (min-width: 768px) {
				padding:0px;
				margin-left:0;
				width:100%;
			}			
			.youtube-elem {
				border:1px solid lightgrey;
				padding:5px;
				margin-bottom:5px;
				display:grid;
				align-items:center;
				grid-template-columns: 60px 1fr;
				font-size:12px;
				border-radius: 10px;
				cursor: pointer;
				&:hover{
					background:#ededed;
				}
				img {
					width:50px; 
					height:50px;
					border-radius:10px;
				}
			}
		}

		.addwrap {
			display: grid;
			grid-template-columns: 1fr 40px;
			grid-gap:20px;
			margin-top:20px;

			width:400px;
			margin-left: calc((100% - 400px) / 2);
			@media only screen and (min-width: 768px) {
				padding:0px;
				margin-left:0;
				width:100%;
			}	

			.add-youtube {
				// border-bottom:1px solid lightgray;
				background:#ededed;
				border-radius:5px;
				padding:5px 10px;
				font-size:12px;
				&:focus{
					outline: none;
				}
			}

			.youtube-button {
				border:1px solid lightgray;
				border-radius:5px;
				padding:5px 0;
			}
		}

		.manage-button {
			font-size: 13px;
			color:#008080;
			cursor:pointer;
			margin-top:30px;			
			margin-bottom:30px;
			text-align:center;
			&:hover{
				text-decoration: underline; 
			}
			@media only screen and (min-width: 768px) {
				text-align:left;
				margin-bottom:30px;
			}
		}

		.tip{
			font-size: 13px;
			text-align: center;
			padding: 0 10px;
			margin-bottom:30px;
			@media only screen and (min-width: 768px) {
				text-align:left;
				padding:0;
				margin-bottom:0px;
			}			
		}
	} // Youtube Side END

} // Main-Wrap END

.theright {
	text-align: right; 
	width:400px;
	margin-left: calc((100% - 400px) / 2);
	@media only screen and (min-width: 768px) {
		padding:0px;
		margin-left:0;
		width:100%;
	}	
}

.box-title {
	color: #008080;
}
.schedule-wrap {
	font-size:12px;
	width:150px;
	margin-left:100px;
	margin-top:20px;
	@media only screen and (min-width: 768px) {
		margin-left: 30px;
		margin-top:20px;
		width:600px;
		display:grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap:30px;
	}
}

</style>

<script src="./Study.js"></script>

