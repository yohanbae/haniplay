<template>
	<div>
		<div class="thewrap">
			<div class="thebox">
				<div class="thetitle">{{this.$route.params.groupname.toUpperCase()}}</div>
				<div class="select-wrap">
					<v-select :items="years" v-model="select" label="YEAR" solo item-text="year" item-value="src" return-object v-on:input="changeYear"></v-select>
					<v-dialog v-model="dialog" max-width="600px">
					<template v-slot:activator="{ on, attrs }">
						<div class="report" v-bind="attrs" v-on="on">Report</div>
					</template>
					<v-card>
						<v-card-title>
						<span class="text-h5">Report</span>
						</v-card-title>
						<v-card-text>
						<v-container>
							<v-text-field v-model="reportGroup" label="Which Group's data is wrong?"></v-text-field>						
							<v-textarea auto-grow solo name="input-7-4" label="Write a detail" v-model="reportText"></v-textarea>
						</v-container>
						</v-card-text>
						<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
						<v-btn color="blue darken-1" text @click="onSubmitReport">Submit</v-btn>
						</v-card-actions>
					</v-card>
					</v-dialog>								
				</div>
			</div>
		</div>
		<div class="thewrap">
			<div class="thebox">
				<div v-if="filteredData.length > 0 && loadingCompleted===true">
					<YearViewGroup :year="currYear" :datas="filteredData" />
				</div>
				<div class="loading-wrap" v-else>
					<v-progress-circular indeterminate color="gray"></v-progress-circular>
				</div>
			</div>
		</div>
		<div class="footer">
			Copyright ⓒ Hanison Dev, All rights reserved
		</div>		
	</div>

</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');

.thewrap{
	width:100%;
	display:grid;
	justify-content: center;
	padding:10px;
	// background:rgb(229, 236, 243);
	.thebox {
		width:700px;
		.thetitle{
			text-align: center; font-weight: bold; margin:50px 0;
			font-size:25px;
			color:#001219;		
		}
		.select-wrap {
			display:grid;
			width:100%;
			grid-template-columns: 1fr 1fr;
			grid-gap: 10px;
			height:50px;
		}
		.report {
			height:50px;
			display:grid;
			align-items: center;
			text-align:right;
			font-size:12px;
			cursor:pointer;
			&:hover{opacity:0.8;}
		}
	}
	.loading-wrap { text-align: center;
		padding-top:50px;
		padding-bottom:50px;
	}
}

.footer {
	font-size:12px;
	text-align: center;
	padding:0 0 30px 0;
}

</style>

<script>
// import Vue from 'vue'
import moment from 'moment';
// import {vliveData} from './data'
import YearViewGroup from './YearViewGroup.vue'
import firebase from "firebase/app";

export default {
	name: 'GroupView',
	data: function() {
		return {
			currYear: "",
			filteredData:[],
			loadingCompleted: false,
			select: {}, // { year: '2021', src: '2021' },
			years: [],
			// 	{ year: '2018', src: '2018' },
			// 	{ year: '2019', src: '2019' },
			// 	{ year: '2020', src: '2020' },
			// 	{ year: '2021', src: '2021' }
			// ],
			dialog: false,
			reportGroup: "",
			reportText: ""
		}
	},

  components: {
    YearViewGroup
  },
  computed: {
		// ques: function() {
		// 	return questions
		// }
	},
	methods: {
		onSubmitReport: async function() {
			const data = {
				group: this.reportGroup,
				feedback: this.reportText,
			}
			try{
				await firebase.firestore().collection('vlive_feedback').doc().set(data);
				console.log("Success. Thank you for your feedback")
				this.reportText = ""
				this.reportGroup = ""
			}catch{
				console.log("Network Error. Please try again")
			}
			this.dialog = false
		},		
		changeYear: function(obj) {
			this.currYear = obj.src
			this.loadData()
		},		
		loadData: async function() {
			this.loadingCompleted = false
            try {
                // const meme = await firebase.firestore().collection('vlive').get()
                // const vliveData = meme.docs.map(doc => doc.data())
                const meme2021 = firebase.firestore().collection('vlive2021').doc('vlivedata')				
				const rawData2021 = await meme2021.get();

                const meme2020 = firebase.firestore().collection('vlive2020').doc('vlivedata')				
				const rawData2020 = await meme2020.get();

				if(!rawData2021.exists){
					console.log("something wrong")
				}else{
					const vRaw2021 = rawData2021.data().vlivemap
					const vRaw2020 = rawData2020.data().vlivemap
					const vliveData = [...vRaw2021, ...vRaw2020]					

					this.filteredData = vliveData.filter(d => d.datecode.includes(this.currYear)).filter(v => v.name.toLowerCase() === this.$route.params.groupname.toLowerCase())	
					const optionData = vliveData.filter(v => v.name.toLowerCase() === this.$route.params.groupname.toLowerCase())
					const sortedOption = optionData.sort((a,b) => parseInt(a.datecode) - parseInt(b.datecode))
	
					let recentYear = parseInt(sortedOption[sortedOption.length - 1].datecode.slice(0,4))
					let oldYear = parseInt(sortedOption[0].datecode.slice(0,4))
					console.log(oldYear, recentYear)
	
					// Calculate available DATA
					for(let i = oldYear; i <= recentYear; i++){
						let row = {year: i, src:i}
						this.years.push(row)
					}
					this.select = {year:recentYear, src:recentYear}
	
					this.loadingCompleted = true
				}
            } catch {
                console.log("Error")
            }
		},
		goBack: function() {
			this.$router.push('/vlive')
		}
	},
	mounted: function() {
		this.currYear = moment().format('YYYY');
		this.loadData()
	}
}
</script>
