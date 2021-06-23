<template>
  <div v-if="authorized">
    <div v-if="loadingCompleted">
        <h5>HOIHOI</h5>
        <div class="table-wrap">
            <v-data-table
                :headers="headers"
                :items="allList"
                :items-per-page="50"
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

        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                Will you delete this Data?
                </v-card-title>

                <v-card-text>
                    {{pickData.name}} : {{pickData.album_name}} : {{ pickData.platform}} : {{pickData.country}} : {{pickData.qty}}
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
            loadingCompleted: false,
            search: '',
            dialog: false,
            pickData: {},
            headers: [{text:'Group Name', value:'name'},{text:'Title',value:'album_name'},{text:'Country',value:'country'},{text:'QTY',value:'qty'}, {text:'Platform', value:'platform'}],
            vName:"", vTitle:"", vPlaytime:"", vDate:"",vDatecode:"",vGender:""
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
            try {
                const id = `${this.pickData.album_name}:${this.pickData.platform}:${this.pickData.country}:${this.pickData.qty}`
                await firebase.firestore().collection("kpop").doc(id).delete()
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
                const meme = await firebase.firestore().collection('kpop').get()
                const momo = meme.docs.map(doc => doc.data())
                this.allList = momo
                this.loadingCompleted = true
            } catch {
                console.log("Error")
            }
        },
    },
    mounted: function() {
        this.loadData()
	}
}
</script>
