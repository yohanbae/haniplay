<template>
  <div v-if="authorized">
    <div v-if="loadingCompleted">
        <h5>HOIHOI</h5>
        <div class="table-wrap">
            <v-data-table
                :headers="headers"
                :items="allList"
                :items-per-page="20"
                :search="search"
                class="elevation-1"
                @click:row="onClick"
            >
                <template v-slot:top>
                    <v-text-field
                    v-model="search"
                    label="Search (UPPER CASE ONLY)"
                    class="mx-4"
                    ></v-text-field>
                </template>            
            </v-data-table>
        </div>

        <v-container>
            <h3>Add Data</h3>
            <input class="add-input" type="text" placeholder="Name" v-model="vName" />
            <input class="add-input" type="text" placeholder="Title" v-model="vTitle" />
            <input class="add-input" type="text" placeholder="Date" v-model="vDate" />
            <input class="add-input" type="text" placeholder="Datecode" v-model="vDatecode" />
            <input class="add-input" type="text" placeholder="Playtime" v-model="vPlaytime" />
            <input class="add-input" type="text" placeholder="Gender" v-model="vGender" />
            <input class="add-input" type="text" placeholder="URL" v-model="vUrl" />
            <v-btn @click="onAdd">ADD</v-btn>
        </v-container>


        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                Will you delete this Data?
                </v-card-title>

                <v-card-text>
                    {{pickData.name}} : {{pickData.date}} : {{pickData.title}} 
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="onDelete">YES</v-btn>
                <v-btn color="primary" text @click="dialog = false">CANCEL</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
    <div v-else>Loading</div>

  </div>
  <div v-else>
      <input type="password" class="add-input" v-model="code" />
      <v-btn @click="onLogin">ENTER</v-btn>      
  </div>
</template>

<style scoped>
.homes {
  display:grid;
  align-items: center;
  justify-content: center;
  font-size:12px;
  color:#333333;
  height:100vh;
  text-align: center;
}
.table-wrap {
    width:1000px;
    padding:40px;
}

.add-input {
    border:1px solid gray;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import firebase from "firebase/app";

export default {
  name: 'Editor',
  components: {
    // HelloWorld
  },
    data: function() {
        return {
            code:"",
            authorized: false,
            allList: [],
            groupData: [],
            loadingCompleted: false,
            search: '',
            dialog: false,
            pickData: {},
            headers: [{text:'Group Name', value:'name'},{text:'Title',value:'title'},{text:'Play Time',value:'playtime'},{text:'Date',value:'datecode'}, {text:'URL', value:'url'}],
            vName:"", vTitle:"", vPlaytime:"", vDate:"",vDatecode:"",vGender:"",vUrl:""
        }
    },
    methods: {
        onLogin: function() {
            if(this.code === "gentlebae") {
                this.authorized = true
            }
        },
        onClick: function(e) {
            this.pickData = e
            this.dialog = true
        },
        onDelete: async function() {
            console.log("DELETE CONFIRMED", this.pickData)
            const removedData = this.allList.filter(v => v.url !== this.pickData.url)
            try {
                await firebase.firestore().collection("vlive").doc('vlivedata').set({
                    group_data: this.groupData,
                    vlivemap: removedData
                });
                this.loadData()
                this.dialog = false
            } catch {
                console.log("Failed to delete due to network connection")
            }
            // once delete, reload the DATA
        },
        loadData: async function() {
            this.loadingCompleted = false
            try {
                const meme = firebase.firestore().collection('vlive').doc('vlivedata')				
				const rawData = await meme.get();
                this.allList = rawData.data().vlivemap
                this.groupData = rawData.data().group_data
                this.loadingCompleted = true
            } catch {
                console.log("Error")
            }
        },
        onAdd: async function() {
            if(this.vName!=="" && this.vTitle!=="" && this.vPlaytime!=="" && this.vDate!=="" && this.vDatecode!=="" && this.vGender!=="" && this.vUrl!=="") {
                this.allList.push({
                    name: this.vName,
                    title: this.vTitle,
                    playtime: this.vPlaytime,
                    date: this.vDate,
                    datecode: this.vDatecode,
                    gender: this.vGender,
                    url: this.vUrl
                })
                await firebase.firestore().collection("vlive").doc('vlivedata').set({
                    group_data: this.groupData,
                    vlivemap: this.allList
                });
    
                this.vName=""
                this.vTitle=""
                this.vPlaytime=""
                this.vDate=""
                this.vDatecode=""
                this.vGender=""
                this.vUrl=""
                this.loadData();
                console.log("Data Added")
            } else {
                console.log("Fill out all textbox")
            }

        }
    },
    mounted: function() {
        this.loadData()
	}
}
</script>
