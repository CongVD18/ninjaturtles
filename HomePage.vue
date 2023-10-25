<template>

    <div v-for="profile in profiles" :key="profile.id">
        Name: {{ profile.name }}<br>
        Age: {{ profile.age }}<br>
        Highest Education: {{ profile.highestEdu}}<br>
        Teaches: {{ profile.teaches.join(', ')}} <br>
        Speaks: {{ profile.speaks}} <br>
        Location: {{ profile.location }} <br><br>
        
    </div>
    
    
    
</template>

<script>
import { db } from '/src/firebase/init.js'
import {collection, onSnapshot,} from 'firebase/firestore'


export default {
    
    data() {
        return {
            profiles: [],
        }
    },
    created() {
        this.getProfiles()
        
        
    },
    methods: {
        async getProfiles() {
            
            onSnapshot(collection(db,'tutors'),(snap) => {
                snap.forEach((doc) => {
                    this.profiles.push(doc.data())
                })
            })
            this.profiles = []

        },
        
    },
    
}


</script>