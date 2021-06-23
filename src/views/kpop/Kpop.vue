<template>
  <div>
	<div class="thewrap">
		<div class="thebox">
			<div class="thetitle">KPOP ALBUM PRICES</div>
			<div v-if="selectAlbum.length > 0 && loadingCompleted===true">
				<v-select dense :items="selectAlbum" label="QUICK SEARCH" solo item-text="name" item-value="data_id" return-object v-on:input="onQuickSearch"></v-select>
			</div>			
			<v-dialog v-model="dialog" max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<div class="report" v-bind="attrs" v-on="on">Do you see any incorrect data or is your country missing?</div>
			</template>
			<v-card>
				<v-card-title>
				<span class="text-h5">Report</span>
				</v-card-title>
				<v-card-text>
				<v-container>
					<v-textarea auto-grow solo name="input-7-4" label="Feel free to send us your feedback"></v-textarea>
				</v-container>
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
				<v-btn color="blue darken-1" text @click="dialog = false">Submit</v-btn>
				</v-card-actions>
			</v-card>
			</v-dialog>				
				
		</div>
	</div>

	<div class="thewrap">
		<div class="thebox">
			<div v-if="kpopAlbum.length > 0 && loadingCompleted===true">
                <div v-if="pickId===''">
					<div class="album-box" v-for="album in kpopAlbum" :key="album.album_name">
						<div class="the-title"><strong>{{getDateFormat(album.datecode)}}</strong> {{album.name}} - {{album.album_name}}</div>
						<AlbumPrices :albumData="album" :allData="kpopData" />
						<h5 class="carrier">* The Final prices include item price and shipping fee but no Customs Fee. DHL&UPS might charge you additional customs fee after purchase. EMS has almost $0 customs fee.</h5>
					</div>
				</div>
				<div v-else>
					<div v-if="pickAlbum" class="album-box">
						<div class="the-title"><strong>{{pickAlbum.datecode}}</strong> {{pickAlbum.name}} - {{pickAlbum.album_name}}</div>
						<AlbumPrices :albumData="pickAlbum" :allData="kpopData" />
						<h5 class="carrier">* The Final prices include item price and shipping fee but no Customs Fee. DHL&UPS might charge you additional customs fee after purchase. EMS has almost $0 customs fee</h5>
					</div>					
				</div>
			</div>
			<div v-else>Loading</div>
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
	// padding:10px;
	// background:rgb(229, 236, 243);
	@media only screen and (max-width: 450px) {
		width:100%;
		display:block;
		padding:0 10px;
	}
	.thebox {
		width:700px;
		@media only screen and (max-width: 450px) {
			width:100%;
			display:block;
			text-align:center;
		}

		.thetitle{ 
			font-weight: bold; margin:50px 0 20px 0; font-size:25px;
		}
		.report { text-align:right;font-size:10px;
			cursor: pointer;
			margin-bottom:10px;
			&:hover{ text-decoration: underline;}
		}
		.select-wrap {
			display:grid;
			width:100%;
			grid-template-columns: 1fr 1fr;
			grid-gap: 10px;
		}

		.album-box{
			box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
			margin-bottom:60px;
			padding:30px;
			@media only screen and (max-width: 450px) {
				padding:20px 10px;
			}	       			
			.the-title {
				margin-bottom:20px;
				font-size:18px;
				@media only screen and (max-width: 450px) {
					text-align: center; font-size:15px;
				}				
			}
			.carrier { margin-top:20px; font-weight:100;
				@media only screen and (max-width: 450px) {
					text-align: left; font-size:10px;
				}			
			}
		}
		
	}
}

.footer {
	font-size:12px;
	text-align: center;
	padding:30px;
	padding-top:0;
}

</style>

<script>
// import Vue from 'vue'
import moment from 'moment';
import firebase from "firebase/app";
import AlbumPrices from './AlbumPrices.vue'


export default {
	name: 'Kpop',
	data: function() {
		return {
			loadingCompleted: false,
			kpopData:[],
            kpopAlbum:[],
            country: "Canada",
            qty: 3,
			pickId: "",
			pickAlbum: {},
			selectAlbum:[],
			dialog: false
		}
	},
  components: {
    AlbumPrices
  },
  computed: {
		// ques: function() {
		// 	return questions
		// }
	},
	methods: {
        getDateFormat: function(datecode) {
			let mon = datecode.slice(4,6)
			mon = moment(mon, 'MM').format('MMM').toUpperCase()
			let day = datecode.slice(6,8)
            return mon + "" + parseInt(day)
        },
		onQuickSearch: function(obj) {
			this.displayById(obj.data_id)
		},
		generateDate: function() {

		},
		displayById: function(id) {
			this.loadingCompleted = false
			if(id === ''){
				this.pickId = ''				
				this.pickAlbum = {}
			} else {
				this.pickId = id
				let momo = this.kpopAlbum.find(v => v.data_id === id)
				this.pickAlbum = momo
			}
			this.loadingCompleted = true
		},
		loadData: async function() {
			this.loadingCompleted = false
            try {
                const meme = await firebase.firestore().collection('kpop').get()
                this.kpopData = meme.docs.map(doc => doc.data())

                const momo = await firebase.firestore().collection('kpop_album').get()
                this.kpopAlbum = momo.docs.map(doc => doc.data())


				// Generate Month for : This month + Next Month
				let datecode0 = moment().add(-1, 'months').format('YYYY') + moment().add(-1, 'months').format('MM')
				let datecode1 = moment().format('YYYY') + moment().format('MM')
				let datecode2 = moment().add(1, 'months').format('YYYY') + moment().add(1, 'months').format('MM')

				this.kpopAlbum = this.kpopAlbum.filter(v => v.datecode.includes(datecode1) || v.datecode.includes(datecode2) || v.datecode.includes(datecode0))
				this.kpopAlbum.sort((a, b) => parseInt(b.datecode) - parseInt(a.datecode))

				this.selectAlbum = this.kpopAlbum.map(v => {
					return {
						name: v.name + " - " + v.album_name,
						data_id: v.data_id
					}
				})
				this.selectAlbum.sort((a,b) => b.name - a.name)
				this.selectAlbum.push({name:"Show All", data_id:''})
                this.loadingCompleted = true
            } catch {
                console.log("Error")
            }
		},

	},
	mounted: function() {
		console.log("init")
		// this.currYear = moment().format('YYYY');
		this.loadData()
	}
}
</script>
