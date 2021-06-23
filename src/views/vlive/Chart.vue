<template>
	<div class="thewrap" v-if="chartData.length > 0 && loadingCompleted===true">
		<div class="month-deco">{{getMonthName(monthFrom)}}, {{yearFrom}}</div>
		<div class="month-deco2">pre-recorded videos, MV, comeback show not included</div>

		<div v-for="(data, i) in chartData" :key="i" class="thebar">
			<div class="barwrap" @click="onGroup(data.name)">
				<span class="theword">{{data.name}}</span>
				<span class="thebar" :style="{width: getPerc(data.playtime) + '%'}">
					<div class="hoho">{{secToTime(data.playtime)}}</div>
				</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');

body {
	background: rgb(246, 247, 248);
}

.thewrap {
	border-radius: 5px;
	padding:50px 20px;
	margin-bottom:50px;
	// background: rgb(246,247,248);
	// border:1px solid black;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	.month-deco {
		margin-bottom:5px;
		font-weight:bold;
		color:#242424;
		letter-spacing: 1px;
	}
	.month-deco2 {
		margin-bottom:30px;
		font-size:12px;
		color:#242424;
		opacity:0.8;
		letter-spacing: 1px;
	}
	.barwrap {
		height:25px;		
		margin-bottom:5px;
		position:relative;
		width:calc(100% - 60px);
		&:hover{opacity: 0.8; cursor: pointer;}
		.theword{
			font-size:12px;
			z-index: 10;
			position: absolute;
			top:4px; left:10px;
			// color: rgb(90, 106, 207);
			color:#001219;
			letter-spacing: 1px;
		}
		.thebar {
			position:absolute;
			top:0; left:0;
			height:25px;
			// background: rgb(90, 106, 207);
			background:rgb(181,200,219);
			text-align: right;
			// border-top-right-radius: 5px;
			// border-bottom-right-radius: 5px;
			border-radius:5px;
			.hoho {
				position:absolute;
				color: rgb(90, 106, 207);
				font-size:12px;
				top:4px; right:-50px;
			}
		}
	}
}

</style>

<script>
// import Vue from 'vue'
import moment from 'moment';
import 'moment-duration-format';

export default {
	name: 'Chart',
	data: function() {
		return {
			total: 0,
			loadingCompleted: false
		}
	},
	props: ['chartData', 'yearFrom', 'monthFrom'],
	watch: { 
		chartData: function() { // watch it
				console.log('Datas changed')
				this.loadData()
		}        
	},    
  components: {
  },
  computed: {
		// ques: function() {
		// 	return questions
		// }
	},
	methods: {
		loadData: function() {
			this.loadingCompleted = false
			// this.total = 0
			// this.chartData.forEach(v => { this.total += parseInt(v.playtime)})			
			this.total = this.chartData[0].playtime
			console.log(this.total)
			this.loadingCompleted = true			
		},
		secToTime: function(seconds) {
				return moment.duration(seconds, 'seconds').format("hh:mm:ss")
		},
		getPerc: function(playtime) {
			let meme = (parseInt(playtime) / this.total) * 100
			return meme
		},
		onGroup: function(name) {
			document.documentElement.scrollTop = 0; 
			this.$router.push(`/vlive/group/${name.toLowerCase()}`)
		},
		getMonthName: function(mon) {
			return moment(mon, 'MM').format('MMMM').toUpperCase()
		}
	},
	mounted: function() {
		if(this.chartData && this.chartData.length > 0) {
			this.loadData()
		}
	}
}
</script>
