<template>
    <div>
        <div>
            <h1>All Uploads</h1>
            <div v-for="each in profile" :key="each.id">
                Title: {{ each.data.title }}<br>
                Desc: {{ each.data.desc }}<br>
                <button @click="deleteItem(each.data.title,each.data.uid, each.id)">Delete</button>
            </div>
        </div>

        
        
    </div>
</template>

<script>
import { db , auth,storage } from '/src/firebase/init.js'
import {ref, deleteObject} from 'firebase/storage'
import {collection, onSnapshot, where, query, doc, deleteDoc} from 'firebase/firestore'


export default {
    data() {
        return {
            teaches: [],
            name: null,
            profile: [],
            photoURL: null,
            title: null,
        }
    },
    methods: {
        async getUsers() {
            
            onSnapshot(query(collection(db,'resource'), where('uid', '==', this.name)), (snap) => {
                this.profile = []
                snap.forEach((doc) => { 
                    if(doc.exists()) {
                        console.log(doc.id)
                        this.profile.push({id: doc.id, data: doc.data()})
                        
                    }
                })
            })
            
        },
        async deleteItem(title,uid,id){
            
            
            try {
                await deleteDoc(doc(db, "resource", id));
                const desertRef = ref(storage, 'resource/' + title + "." + uid);
                deleteObject(desertRef)
                alert("File Successfully Deleted!")
            }
            
            catch{
                alert("OH NO")
            }
        }
    }
    ,
    created(){
        var user = auth.currentUser
        this.name = user.uid
        this.getUsers()
    }   
}
</script>