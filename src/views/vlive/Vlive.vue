<template>
  <div>
	<div class="thewrap">
		<div class="thebox">
			<div class="thetitle">
				<span><v-icon large color="#001219">mdi-video-box</v-icon> VLIVE PLAYTIME</span>
			</div>
			<div class="select-wrap">
				<v-select :items="years" v-model="select" label="YEAR" solo item-text="year" item-value="src" return-object v-on:input="changeYear"></v-select>
				<v-select v-if="grouplist.length > 0" :items="grouplist" label="GROUPS" solo item-text="name" item-value="name" return-object v-on:input="changeGroup"></v-select>
			</div>
			<div class="update-wrap">
				<div>Last updated on {{lastDate}}</div>
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
				<YearView :year="currYear" :datas="filteredData" />
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
			font-weight: bold; margin:20px 0;
			font-size:25px;
			height:60px;
			display:grid;
			align-items: center;
			letter-spacing: 1px;
			color:#001219;
		}
		.select-wrap {
			display:grid;
			width:100%;
			grid-template-columns: 1fr 1fr;
			grid-gap: 10px;
		}

		.update-wrap{
			font-size:12px;
			display:grid;
			grid-template-columns: 1fr 1fr;
			margin-bottom:5px;
			.report{
				text-align:right;
				cursor:pointer;		
			}
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
	padding:30px;
}

</style>

<script>
// import Vue from 'vue'
import moment from 'moment';
// import {vliveData} from './data'
import YearView from './YearView.vue'
// import {groupsFromPython} from './groups'
import firebase from "firebase/app";


export default {
	name: 'Vlive',
	data: function() {
		return {
			currYear: "",
			filteredData:[],
			loadingCompleted: false,
			select: { year: '2021', src: '2021' },
			years: [
				{ year: '2021', src: '2021' },
				{ year: '2020', src: '2020' },
				{ year: '2019', src: '2019' },
				{ year: '2018', src: '2018' },
				{ year: '2017', src: '2017' },				
				{ year: '2016', src: '2016' },
				{ year: '2015', src: '2015' },
			],
			grouplist:[],
			dialog: false,
			reportText: "",
			reportGroup: "",
			lastDate: ""
		}
	},

  components: {
    YearView
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
		changeGroup: function(obj) {
			this.$router.push(`/vlive/group/${obj.name.toLowerCase()}`)
		},
		loadData: async function() {
			this.loadingCompleted = false
			this.select = this.years[0]
            try {
                const meme2021 = firebase.firestore().collection('vlive2021').doc('vlivedata')				
				const rawData2021 = await meme2021.get();

                const meme2020 = firebase.firestore().collection('vlive2020').doc('vlivedata')				
				const rawData2020 = await meme2020.get();
                // const vliveData = meme.docs.map(doc => doc.data())

				if(!rawData2021.exists){
					console.log("something wrong")
				}else{
					const vRaw2021 = rawData2021.data().vlivemap
					const vRaw2020 = rawData2020.data().vlivemap

					// const vliveData = rawData.data().vlivemap
					const vliveData = [...vRaw2021, ...vRaw2020]
					this.filteredData = vliveData.filter(d => d.datecode.includes(this.currYear))

					this.grouplist = rawData2021.data().group_data

					const lastDateRange = this.filteredData.sort((a,b) => parseInt(b.datecode) - parseInt(a.datecode))
					this.lastDate = lastDateRange[0].date

					this.loadingCompleted = true
				}

            } catch {
                console.log("Error")
            }
		},

	},
	mounted: function() {
		console.log("init")
		this.currYear = moment().format('YYYY');
		this.loadData()
	}
}
</script>
