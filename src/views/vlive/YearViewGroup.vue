<template>
  <div class="thewrap">
    <div v-if="monthlyData.length > 0 && loadingCompleted === true">
        <div v-for="(month, i) in monthlyData" v-bind:key="i">
            <div class="thebox" v-if="month.datas.length > 0">
                <div class="month-deco">
                    <div>{{getMonthName(month.month)}}, {{year}}</div>
                    <div class="totalplay">{{month.totalPlayTime}}</div>
                </div>
                <div class="thethe" v-for="(data, j) in month.datas" v-bind:key="j">
                    <div><a class="thelink" target="_blank" :href="data.url">[{{data.date}}] {{data.title}}</a></div>
                    <div class="play">{{data.playtime}}</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');


.thewrap {
	// border:1px solid lightgray;
	border-radius: 5px;
	// width: 700px;
    width:100%;
	padding:50px 20px;
	margin-bottom:50px;
	.month-deco {
		// text-align:center;
		margin-bottom:30px;
        margin-top:10px;
		font-weight:bold;
		// font-family: 'Mali', cursive;
		color:#242424;
        width:100%;
        display:grid;
        grid-template-columns: 1fr 100px;        
        .totalplay { text-align:right;}
	}
	.month-deco2 {
		text-align:center;
		margin-bottom:30px;
		// font-family: 'Mali', cursive;
		font-size:12px;
		color:#242424;
	}
    .thebox {
		// font-family: 'Mali', cursive;
        // background: rgb(246,247,248);
        padding:20px;
        margin-bottom:50px;
        font-size:14px;
        width:700px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        .thethe{
            width:100%;
            display:grid;
            grid-template-columns: 1fr 100px;
            .play{
                text-align: right;
            }
            .thelink {
                text-decoration: none;
                color:black;
                &:hover {
                    text-decoration: underline;
                }
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
	name: 'YearView',
	data: function() {
		return {
            monthlyData:[],
            loadingCompleted: false,
		}
	},
    props: ['year', 'datas'],
  components: {
    
  },
  computed: {
		// ques: function() {
		// 	return questions
		// }
	},
    watch: { 
        year: function() { // watch it
            console.log('Year changed')
        },
        datas: function() { // watch it
            console.log('Datas changed')
            this.loadData()
        }        
    },    
	methods: {
        secToTime: function(seconds) {
            return moment.duration(seconds, 'seconds').format("hh:mm:ss")
        },
        sortData: function(monData) {
            const result = monData.sort((a, b) => parseInt(b.datecode) - parseInt(a.datecode))
            return result
        },
        loadData: function() {
            this.loadingCompleted = false
            this.monthlyData = []
            if(this.datas) {
                for(let i=12; i>=1; i--) {
                    let mon = i
                    mon < 10 ? mon = "0" + i : mon = i + ""
                    console.log(mon)
                    let currMonthData = []
                    let datecodeFilter = this.year + mon
                    this.datas.filter(v => {
                        if(v.datecode.includes(datecodeFilter)){
                            let theRow = {title: v.title, playtime: v.playtime, date: v.date, datecode: v.datecode, url: "http://www.vlive.tv" + v.url}
                            currMonthData.push(theRow)
                        }
                    })

                    let finalCurrMonthData = this.sortData(currMonthData)
                    let playtime = this.calPlayTime(finalCurrMonthData)

                    let thisMonth = {
                        month: mon,
                        datas: finalCurrMonthData,
                        totalPlayTime: playtime
                    }
                    this.monthlyData.push(thisMonth)
                    this.loadingCompleted = true                        
                }                
            }
        },
        calPlayTime: function(timeData) {
            let total = 0;
            timeData.forEach(v => {
                let times = v.playtime
                let hr = 0, min, sec
                let meme = times.split(":")
                if(meme.length >= 3) {
                    hr = meme[0]
                    min = meme[1]
                    sec = meme[2]
                } else {
                    min = meme[0]
                    sec = meme[1]
                }
                total += (3600* parseInt(hr)) + (60*parseInt(min)) + parseInt(sec)
            })
            return moment.duration(total, 'seconds').format("hh:mm:ss")
        },        
		getMonthName: function(mon) {
			return moment(mon, 'MM').format('MMMM').toUpperCase()
		},
        onVliveUrl: function() {

        }      
	},
	mounted: function() {
        this.loadData()
	}
}
</script>
