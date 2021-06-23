<template>
    <div v-if="loadingCompleted" class="thebox">
        <div class="album-box">
            <img class="album-img" :src="albumData.img" />
            <div>
                <div class="top-box">
                    <v-select v-model="country" :items="countries" label="Country" v-on:input="changeCountry"></v-select>
                    <v-select v-model="qty" :items="qtys" label="QTY" v-on:input="changeQty"></v-select>
                </div>
                <div class="thelist more-bottom">
                    <span><strong>STORE</strong></span>
                    <span><strong>Final Price</strong></span>
                    <span><strong>Shipping</strong></span>
                </div>
                <div v-if="loadingCompleted">
                    <div class="thelist more-small" v-for="(data, i) in prices" :key="i">
                        <strong><a :href="albumData[data.platform]" target="_blank">{{data.platform.toUpperCase()}}</a></strong>
                        <div>USD ${{ data.price }}</div>
                        <div v-bind:class="[data.carrier.toUpperCase()==='EMS' ? 'ems-word' : '']">{{data.carrier.toUpperCase()}}</div>
                    </div>
                    <div class="custom-box">
                        <input type="checkbox" v-model="checkbox" :id="`customsfee${albumData.data_id}`" class="customsfee" @click="onCustoms" />
                        <label :for="`customsfee${albumData.data_id}`" class="label-style">Apply customs fee</label>
                        <span class="input-euro left">
                            <input class="custom-input" type="text" v-model="theFee" :disabled="checkbox" />
                        </span>
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


.top-box{
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:20px;
    width:calc(100% - 60px);
    @media only screen and (max-width: 450px) {
        width:100%;
    }	           
}

.thelist {
    font-size:14px;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    width:calc(100% - 60px);
    @media only screen and (max-width: 450px) {
        width:100%;
        text-align: left;
    }	           
    .therights { width:100%; text-align: right;}
    a {
        text-decoration: none;
        color:#2c528c ;
    }

}
.more-bottom { margin-bottom:5px; }
.more-small { font-size:13px;
    &:hover{
        text-decoration: underline;
    }
}

.album-box{
    display:grid;
    grid-template-columns: 150px 1fr;
    grid-gap:30px;

    @media only screen and (max-width: 450px) {
        display:block;
        width:100%;
    }			
    .album-img {
        width:100%;
        @media only screen and (max-width: 450px) {
            width:200px;
        }	        
    }
}
.ems-word {
    font-weight:bold;
}

.custom-box {
    width:calc(100% - 60px);
    // text-align:right;
    margin-top:20px;
    padding-right:30px;
    @media only screen and (max-width: 450px) {
        width:100%;
        text-align: left;
    }	               
}
.custom-input {
    width:40px;
    border: 1px solid gray;
    font-size:12px;
    text-align: right;
    border-radius:3px; 
    padding-right:5px;
}

 .input-euro {
     position: relative;
     margin-left:5px;
 }

 .input-euro:before {
     position: absolute;
     top: 1px;
     left: 5px;
     content:"$";
     font-size:12px;
 }

.label-style { font-size: 12px; margin-left:5px; }
.customsfee { vertical-align: middle; }
</style>

<script>
// import Vue from 'vue'
// import moment from 'moment';
// import 'moment-duration-format';
// import axios from 'axios'

export default {
	name: 'AlbumPrices',
	data: function() {
		return {
            loadingCompleted: false,
            prices: [],
            originalPrices: [],
            country: 'U.S.A',
            qty: 3,
            countries: [],
            qtys: [],
            checkbox: false,
            theFee:20,
		}
	},
    props: ['albumData', 'allData'],
  components: {
  },
	methods: {
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
        getAvailCountries: function(data) {
            // this.countries = []
            const datas = data.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.country === thing.country
                ))
            )
            datas.forEach(v=> this.countries.push(v.country))
            // console.log(datas)
        },
        getAvailQtys: function(data) {
            this.qtys = []
            const dataC = data.filter(v => v.country === this.country)
            const datas = dataC.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.qty === thing.qty
                ))
            )
            // this.qty = datas[0].qty
            datas.forEach(v=> this.qtys.push(v.qty))
        },        
        changeCountry: function(obj) {
            this.country = obj
            this.loadData()
        },
        changeQty: function(obj) {
            this.qty = obj
            this.loadData()
        },
        onCustoms: function() {
            if(isNaN(this.theFee) || parseInt(this.theFee) < 0) {
                alert("Please type correct number")
                this.theFee = 0
                this.checkbox = false
                return false                
            }

            this.loadingCompleted = false
            if(this.checkbox) {
                this.prices = this.originalPrices                
            } else {
                let momo = this.prices.map(v => {
                    let newPrice = v.price
                    if(v.carrier.toUpperCase() === 'DHL' || v.carrier.toUpperCase() === 'UPS') {
                        newPrice = newPrice + parseInt(this.theFee)
                    }
                    return {
                        carrier: v.carrier,
                        country: v.country,
                        platform: v.platform,
                        price: newPrice,
                        qty: v.qty
                    }
                })
                this.prices = momo
                this.prices.sort((a,b) => a.price - b.price)            
            }
            this.loadingCompleted = true
        },
        loadData: function() {
            this.loadingCompleted = false
            this.prices = []
            const meme = this.allData.filter(v => v.data_id === this.albumData.data_id)
            meme.forEach(v => {
                v.prices.forEach(y => {
                    this.prices.push(y)
                })
            })
            this.getAvailCountries(meme)
            this.getAvailQtys(meme)

            this.prices = this.prices.filter(v => v.country === this.country && v.qty === this.qty) // need to add QTY as well
            this.prices.sort((a,b) => a.price - b.price)
            this.originalPrices = this.prices
            this.loadingCompleted = true
        },
	},
	mounted: function() {
        this.loadData()
	}
}
</script>
