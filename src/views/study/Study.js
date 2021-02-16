import Vue from 'vue'
import VueYouTubeEmbed, { getIdFromURL } from 'vue-youtube-embed'
import moment from 'moment';
import 'moment-duration-format';
Vue.use(VueYouTubeEmbed)

export default {
	name: 'Study',
	components: {
		Keypress: () => import('vue-keypress')
	},
	data: function() {
		return {
			time: 0,
			times: [ {label: "1 hr", hr:1 }, {label: "2 hr", hr:2 }, {label: "3 hr", hr:3 }, {label: "4 hr", hr:4 }, {label: "5 hr", hr:5 }, {label: "6 hr", hr:6 }, {label: "7 hr", hr:7 }, {label: "8 hr", hr:8 }, {label: "9 hr", hr:9 }, {label: "10 hr", hr:10 }],
			weekGoals: [],
			theTotal: [],
			goalLoaded: false,
			runner: null,
			playing: false,
			youtubeList: [],
			youtubeListLoaded: false,
			youtubeId: "",
			youtubeLoaded: false,
			newYoutubeUrl: "",
			updateYoutubeUrl: "",
			updateDialog: false,
			today: 0,
			todayTotal: 10,
			success: false,
			historyLabels: [],
			historyValues: [],
			dayPassTimer: null,
			currentDate: 0,
			manageDialog: false
		}
	},
	methods: {
		ready: function(event) {
			this.player = event.target
		},
		onStart: function() {
			if(!this.playing && this.time < this.todayTotal){
				this.playing = true
				let recordTime = 0 // this is for the local saving current time every 1 minute

				console.log("STARTING")
				this.runner = setInterval(() => {
					if(this.time < this.todayTotal){						
						this.time += 1
						recordTime += 1
						window.document.title = "Playing " + moment.duration(this.time, "seconds").format("h:mm:ss")	
						if(recordTime >= 60) {
							// Save to LocalStorage
							recordTime = 0

							//SAVE TO LOCAL
							let theTime = JSON.parse(localStorage.getItem('SA_CURRENT'))
							theTime.sort((a, b) => a.date - b.date)			
							if(theTime[theTime.length - 1].date === moment().format('YYYYMMDD')) {
								theTime[theTime.length - 1].current = this.time
							}
							localStorage.setItem("SA_CURRENT", JSON.stringify(theTime))
							console.log("saved", theTime)
						}
					} else {
						clearInterval(this.runner)
						this.playing = false
						this.success = true
						// save the record here
						window.document.title = "Good job!"	

						//SAVE TO LOCAL
						let theTime = JSON.parse(localStorage.getItem('SA_CURRENT'))
						theTime.sort((a, b) => a.date - b.date)			
						if(theTime[theTime.length - 1].date === moment().format('YYYYMMDD')) {
							theTime[theTime.length - 1].current = this.time
						}
						localStorage.setItem("SA_CURRENT", JSON.stringify(theTime))

					}
				}, 1000)

				if(this.youtubeId){
					this.player.playVideo()
				}
			}else {
				if (this.playing){
					this.playing = false
					window.document.title = "Paused " + moment.duration(this.time, "seconds").format("h:mm:ss")	
					clearInterval(this.runner)

					//SAVE TO LOCAL
					let theTime = JSON.parse(localStorage.getItem('SA_CURRENT'))
					theTime.sort((a, b) => a.date - b.date)			
					if(theTime[theTime.length - 1].date === moment().format('YYYYMMDD')) {
						theTime[theTime.length - 1].current = this.time
					}
					localStorage.setItem("SA_CURRENT", JSON.stringify(theTime))

					if(this.youtubeId){
						this.player.pauseVideo()
					}
					console.log("STARTING")

				}
			}

		},
		onManage: function() {
			this.manageDialog = true
		},
		getTime: function() {
			// return moment.duration(this.time, "seconds").format("h [hrs], m [min], s [sec]")			
			return moment.duration(this.time, "seconds").format("h:mm:ss")			
		},
		getTotalTime: function() {
			return moment.duration(this.todayTotal, "seconds").format("h")			
		},
		getTotalTimeSec: function() {
			return moment.duration(this.todayTotal, "seconds").format("h:mm:ss")			
		},		
		getTodayDate: function() {
			// return moment().format("LL").toString().toUpperCase()
			return moment().format("dddd, MMM DD").toString().toUpperCase()
		},
		onYoutube: function(id) {
			this.youtubeLoaded = false
			this.youtubeId = id
			this.youtubeLoaded = true
		},
		addYoutube: async function() {			
			if(this.newYoutubeUrl.length < 5) {
				alert("Wrong Address");
				this.newYoutubeUrl = ""
				return false				
			}

			let theid = getIdFromURL(this.newYoutubeUrl)			
			// check if same exist

			let findOne = this.youtubeList.find(v => v.id === theid)
			if(findOne) {
				alert("Address Exist")
				this.newYoutubeUrl = ""
				return false
			}

			if(theid.slice(0,4) === "http") {
				alert("Wrong Address");
				this.newYoutubeUrl = ""
				return false
			}

			console.log("middle", theid)
			var img = new Image();
			img.src = "http://img.youtube.com/vi/" + theid + "/mqdefault.jpg";
			let path = this
			img.onload = await function () {
				if (img.width === 120) {
					alert("Error: Invalid video id");
					path.newYoutubeUrl = ""
					return false
				} else {
					path.youtubeLoaded = false
					path.youtubeList.push({
						url: path.newYoutubeUrl,
						id: theid,
						thumb: "http://img.youtube.com/vi/" + theid + "/0.jpg"
					})
					path.youtubeId = theid
					localStorage.setItem("SA_YOUTUBE", JSON.stringify(path.youtubeList))
					path.youtubeLoaded = true
				}
			}
		},
		onYoutubeUpdate: function() {
			console.log(this.youtubeId)
			this.updateDialog = true
		},
		onConfirmYoutubeUpdate: async function() {
			if(this.updateYoutubeUrl.length < 5) {
				alert("Wrong Address");
				this.updateYoutubeUrl = ""
				return false				
			}

			let theid = getIdFromURL(this.updateYoutubeUrl)			
			// check if same exist

			let findOne = this.youtubeList.find(v => v.id === theid)
			if(findOne) {
				alert("Address Exist")
				this.updateYoutubeUrl = ""
				return false
			}

			if(theid.slice(0,4) === "http") {
				alert("Wrong Address");
				this.updateYoutubeUrl = ""
				return false
			}

			var img = new Image();
			img.src = "http://img.youtube.com/vi/" + theid + "/mqdefault.jpg";
			let path = this
			img.onload = await function () {
				if (img.width === 120) {
					alert("Error: Invalid video id");
					path.updateYoutubeUrl = ""
					return false
				} else {
					path.youtubeLoaded = false

					path.youtubeList = path.youtubeList.map(v => {
						if(v.id === path.youtubeId) {
							v.id = theid
							v.url = path.updateYoutubeUrl
							v.thumb = "http://img.youtube.com/vi/" + theid + "/0.jpg"
						}
						return v
					})

					path.updateYoutubeUrl = ""
					path.youtubeId = theid
					localStorage.setItem("SA_YOUTUBE", JSON.stringify(path.youtubeList))
					path.youtubeLoaded = true
				}
			}			
			this.updateDialog = false
		},
		getPercent: function() {			
			let perc = this.time / this.todayTotal * 100
			return perc

		},
		timePick: function(day) {
			// check today first. if they are same, then 
			if(moment().day() === day) {
				if(this.time >= this.theTotal[day] * 3600) {
					console.log("This hr, you already reached todays goal.")
					this.success = true
				}

				if(this.success && this.theTotal[day] * 3600 > this.time) {
					console.log("You will lose the success")
					this.success = false
				}
				this.todayTotal = this.theTotal[day] * 3600
			}

			this.weekGoals[day].goal = this.theTotal[day]

			localStorage.setItem("SA_GOAL", JSON.stringify(this.weekGoals))
		},
		generateHistory: function() { // Generate history data for the Bottom Graph
			let theTime = JSON.parse(localStorage.getItem('SA_CURRENT'))			
			for(let i = 6; i >= 1; i--) {
				let date = moment().subtract(i, 'day').format('YYYYMMDD')
				let value = 0

				let findDate = theTime.find(v => v.date === date)
				if(findDate) {
					value = findDate.current
				}
				this.historyLabels.push(date.slice(6,8))
				this.historyValues.push(value)
			}
			this.historyLabels.push(moment().format("DD"))
			this.historyValues.push(this.time)
			console.log(this.historyLabels)
		}
	},
	mounted: function() {
		let thelist
		this.goalLoaded = false
		
		if(localStorage.getItem('SA_GOAL')) { // GET DATA FROM LOCALSTORAGE
			this.weekGoals = JSON.parse(localStorage.getItem('SA_GOAL'))

			let theTime = JSON.parse(localStorage.getItem('SA_CURRENT'))
			theTime.sort((a, b) => a.date - b.date)			

			if(theTime[theTime.length - 1].date === moment().format('YYYYMMDD')) {
				this.time = theTime[theTime.length - 1].current
				console.log("receiived today data")
			} else {
				theTime.push({ date: moment().format("YYYYMMDD"), moment: moment(), current: 0 })
				localStorage.setItem("SA_CURRENT", JSON.stringify(theTime))
				this.time = 0
				console.log("First time of the day")				
			}

			thelist = JSON.parse(localStorage.getItem('SA_YOUTUBE'))

		} else { // FIRST TIME USER, SET INITIAL DATA + LOCALSTORAGE
			this.weekGoals = [ {name:"sunTotal", goal: 3}, {name:"monTotal", goal: 5}, {name:"tueTotal", goal: 5}, {name:"wedTotal", goal: 5}, {name:"thuTotal", goal: 5}, {name:"friTotal", goal: 5}, {name:"satTotal", goal: 3}]
			localStorage.setItem("SA_GOAL", JSON.stringify(this.weekGoals))

			let meme = moment()
			localStorage.setItem("SA_CURRENT", JSON.stringify([{ date: meme.format("YYYYMMDD"), moment: meme, current: 0 }]))
			this.time = 0

			thelist = [{ url: "https://www.youtube.com/watch?v=5qap5aO4i9A", id: "5qap5aO4i9A", thumb: "http://img.youtube.com/vi/5qap5aO4i9A/0.jpg" } ]
			localStorage.setItem("SA_YOUTUBE", JSON.stringify(thelist))
		}

		for(let i=0; i < 7; i++) {
			this.theTotal[i] = this.weekGoals[i].goal
		}

		this.todayTotal = this.theTotal[moment().day()] * 3600

		this.generateHistory() // Generate History for the Bottom Graph
		this.goalLoaded = true

		this.youtubeList = thelist
		if(this.youtubeList.length > 0) {
			this.youtubeId = this.youtubeList[0].id
			this.youtubeLoaded = true
			this.youtubeListLoaded = true;
		}

		// Check current day changed, reload page if so.
		this.currentDate = moment().format("YYYYMMDD")			
		this.dayPassTimer = setInterval(() => {
			let dateNow = moment().format("YYYYMMDD")
			if(this.currentDate !== dateNow) location.reload()
		}, 10000)

	}
}