<template>
    <v-card>
        <div class="thewrap">
        <v-tabs color="deep-blue accent-4" right>
        <v-tabs-slider color="#b5c8db"></v-tabs-slider>
        <v-tab>Boy Group</v-tab>
        <v-tab>Girl Group</v-tab>
        <v-tab-item v-for="n in 2" :key="n">
            <v-container fluid>
                <!-- boyGroupData, girlGroupData로 바꿔서. 해줘라. monthlyData지우고 -->
                <div v-if="n===1">
                    <div v-if="boyGroupData.length > 0 && loadingCompleted === true">
                        <div v-for="(month, i) in boyGroupData" v-bind:key="i">
                            <div v-if="month.datas.length > 0">
                                <!-- {{month.month}} -->
                                <!-- <div v-for="(data, j) in month.datas" v-bind:key="j">
                                    {{data.name}} {{secToTime(data.playtime)}}
                                </div> -->
                                <Chart :chartData="month.datas" :yearFrom="year" :monthFrom="month.month" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="n===2">
                    <div v-if="girlGroupData.length > 0 && loadingCompleted === true">
                        <div v-for="(month, i) in girlGroupData" v-bind:key="i">
                            <div v-if="month.datas.length > 0">
                                <!-- {{month.month}} -->
                                <!-- <div v-for="(data, j) in month.datas" v-bind:key="j">
                                    {{data.name}} {{secToTime(data.playtime)}}
                                </div> -->
                                <Chart :chartData="month.datas" :yearFrom="year" :monthFrom="month.month" />
                            </div>
                        </div>
                    </div>
                </div>
            </v-container>
        </v-tab-item>
        </v-tabs>
        </div>
    </v-card>

</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');

.thetab {
    padding-right:20px;
}

</style>

<script>
// import Vue from 'vue'
import moment from 'moment';
import 'moment-duration-format';
import Chart from './Chart.vue'

export default {
	name: 'YearView',
	data: function() {
		return {
            boyGroupData: [],
            girlGroupData: [],
            loadingCompleted: false
		}
	},
    props: ['year', 'datas'],
  components: {
    Chart
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
            let blacklist = monData.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []); // 전체 어떤 그룹들이 있는지를 리스트업한다. 중복을 제외해버림.

            let boyBlacklist = blacklist.filter(v => v.gender === "boy")
            let girlBlacklist = blacklist.filter(v => v.gender === "girl")

            const boyResult = boyBlacklist.map(v => {
                let momo = monData.filter(x => x.name === v.name)
                let playtime = this.calPlayTime(momo)
                return {name: v.name, playtime}                
            })

            const girlResult = girlBlacklist.map(v => {
                let momo = monData.filter(x => x.name === v.name)
                let playtime = this.calPlayTime(momo)
                return {name: v.name, playtime}                
            })            

            boyResult.sort((a, b) => b.playtime - a.playtime)
            girlResult.sort((a, b) => b.playtime - a.playtime)

            return [boyResult, girlResult]
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
                total += 3600* parseInt(hr) + 60*parseInt(min) + parseInt(sec)
            })
            return total
        },
        loadData: function() {
            this.loadingCompleted = false
            // this.monthlyData = []
            this.boyGroupData = []
            this.girlGroupData = []

            if(this.datas) {
                for(let i=12; i>=1; i--) {
                    let mon = i
                    mon < 10 ? mon = "0" + i : mon = i + ""
                    console.log(mon)
                    let currMonthData = []
                    let datecodeFilter = this.year + mon

                    this.datas.filter(v => {
                        if(v.datecode.includes(datecodeFilter))
                            currMonthData.push(v)
                    })

                    let bothCurrMonthData = this.sortData(currMonthData) 

                    let boyThisMonth = {
                        month: mon,
                        datas: bothCurrMonthData[0] // [0] has BoyGroup Data
                    }
                    let girlThisMonth = {
                        month: mon,
                        datas: bothCurrMonthData[1] // [1] has GirlGroup Data
                    }

                    this.boyGroupData.push(boyThisMonth)
                    this.girlGroupData.push(girlThisMonth)
                    this.loadingCompleted = true                        
                }                
            }
        }
	},
	mounted: function() {
        this.loadData()
	}
}
</script>
