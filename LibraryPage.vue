<template>
    <div>
        <div>
            <h1>All Uploads</h1>
            <div v-for="each in profile" :key="each.id">
                Title: {{ each.title }}<br>
                Desc: {{ each.desc }}<br>
                <a :href="each.file_url" target="_blank" >
                    <button>View File</button>
                </a>        
            </div>
        </div>

        <div>
            <h1>Upload Form</h1>
            <form @submit.prevent="uploadFile">
            Title Name <input ref="title" type="text" required placeholder="Name"> <br>
            Short Description <input ref="desc" type="text" required placeholder="Name"> <br>
            <input type="file" ref="myFile">
            
            <button>Upload</button>
        </form>
        </div>
        
    </div>
</template>

<script>
import { db , auth, storage} from '/src/firebase/init.js'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {collection, addDoc, onSnapshot, query} from 'firebase/firestore'


export default {
    data() {
        return {
            teaches: [],
            name: null,
            profile: [],
            photoURL: null
        }
    },
    methods: {
        
        uploadFile: function() {
            var fileName = this.$refs.title.value + "." + this.name
            const storageRef = ref(storage, 'resource/' + fileName)
  
            uploadBytes(storageRef, this.$refs.myFile.files[0])
            .then(() => {   
                return getDownloadURL(storageRef)
            })
            .then((url) => {
                console.log(url)
                this.photoURL = url
                addDoc(collection(db,'resource'),{
                    title: this.$refs.title.value,
                    desc: this.$refs.desc.value,
                    file_url:this.photoURL,
                    uid: this.name
                })
                
            })
            .then(() => {
            this.$refs.title.value = "";
            this.$refs.desc.value = "";
            this.$refs.myFile.value = null;
            })
        },
        async getUsers() {
            onSnapshot(query(collection(db,'resource')), (snap) => {
                this.profile = [];
                snap.forEach((doc) => {
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