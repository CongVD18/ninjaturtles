<template>
    <div v-if="!profileExists">
        <form @submit.prevent="addNewProfile">
            First Name <input ref="name" type="text" required placeholder="Name"> <br>
            Age <input ref="age" type="number" required placeholder="Age"> <br>
            Highest Educaton <input ref="edu" required type="text" placeholder="Highest Education"> <br>
            Speaks <input ref="speaks" type="text" required placeholder="Speaks"> <br>
            Teaches <br>
            <input type="checkbox" v-model="teaches" value="English">English<br>
            <input type="checkbox" v-model="teaches" value="Maths">Maths<br>
            <input type="checkbox" v-model="teaches" value="Chinese">Chinese<br>
            Location <input ref="location" type="text" required placeholder="Name"> <br>
            <input type="file" ref="myFile">
            
            <button>Add New</button>
        </form>
        
    </div>
    

    <div v-else>
        <div v-for="each in profile" :key="each.uid">
            <h1>{{ each.name }}</h1>
            <img  :src="each.photo_url">
            <a :href="each.photo_url" target="_blank" >
                <button>View Photo</button>
            </a>
            <button @click="downloadPhoto(each.photo_url, each.name)">Download Photo</button>
        </div>
    </div>


    
</template>

<script>
import { db , auth, storage} from '/src/firebase/init.js'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {collection, addDoc, onSnapshot, query, where} from 'firebase/firestore'


export default {
    data() {
        return {
            teaches: [],
            name: null,
            profile: [],
            profileExists: false,
            photoURL: null
        }
    },
    methods: {
        
        addNewProfile: function() {
            const storageRef = ref(storage, 'tutorsProfile/' + this.name + 'DP')
            console.log(this.$refs.myFile.files[0])
            uploadBytes(storageRef, this.$refs.myFile.files[0])
            .then(() => {
                console.log("uploaded")
                return getDownloadURL(storageRef)
            })
            .then((url) => {
                console.log(url)
                this.photoURL = url
                addDoc(collection(db,'tutors'),{
                    name:this.$refs.name.value,
                    age:this.$refs.age.value,
                    location:this.$refs.location.value,
                    highestEdu:this.$refs.edu.value,
                    speaks:this.$refs.speaks.value,
                    teaches:this.teaches,
                    uid:this.name,
                    photo_url:this.photoURL
                })
            })
            
        },
        async getUsers() {
            
            onSnapshot(query(collection(db,'tutors'), where('uid', '==', this.name)), (snap) => {
                snap.forEach((doc) => {
                    this.profile = [];
                    if(doc.exists()) {
                        this.profile.push(doc.data())
                    }
                })
            })
           
        },
        
    }
    ,
    created(){
        var user = auth.currentUser
        this.name = user.uid
        this.getUsers()
        
    }   
}


</script>