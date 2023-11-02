<template>
    <!-- <div>
        <div>
            <h1>All Uploads</h1>
            <div v-for="each in profile" :key="each.id">
                Title: {{ each.data.title }}<br>
                Desc: {{ each.data.desc }}<br>
                <button @click="deleteItem(each.data.title,each.data.uid, each.id)">Delete</button>
                
            </div>
        </div>
    </div> -->
    <div class="container firstBox">
        <div class="row">
            <div class="col-12">
                <div class="p-3 border bg-light mb-3">
                    <h3 class="text-center">My Uploads</h3>
                    <table class="table table-responsive">
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th class="text-end">Settings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="profile in profiles" :key="profile.id">
                                <td>{{ profile.data.title }}</td>
                                <td class="text-end">
                                    <a :href="profile.data.file_url" target="_blank" class="btn btn-primary btn-sm me-1">View</a>
                                    <a @click="deleteResource(profile.data.title,profile.id)" class="btn btn-danger btn-sm">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="p-3 border bg-light mb-3">
                    <h3 class="text-center">Upload a File</h3>
                    <form @submit.prevent="uploadFile">
                        <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" v-model="form.title" class="form-control" id="title" name="title">
                        </div>
                        <div class="mb-3">
                            <label for="file" class="form-label">Input File</label>
                            <input type="file" ref="fileName" class="form-control" id="file" name="file">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" v-model="form.desc" id="description" name="description" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="type" class="form-label">Type</label>
                            <select class="form-select" id="type" v-model="form.type"  name="type">
                                <option value="Worksheet">Worksheet</option>
                                <option value="Notes">Notes</option>
                                <option value="Past Year Paper">Past Year Paper</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="educationLevel" class="form-label">Education Level</label>
                            <select class="form-select" id="educationLevel" v-model="form.subjectLevel" name="educationLevel">
                                <option value="Pri School">Primary</option>
                                <option value="Lower Sec">Lower Secondary</option>
                                <option value="Upper Sec">Upper Secondary</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="subject" class="form-label">Subject</label>
                            <select class="form-select" id="subject" name="subject" v-model="selectedSubject">
                                <option v-for="subject in subjectsList" :key="subject" >{{ subject }}</option>       
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db , auth,storage } from '/src/firebase/init.js'
import {ref, deleteObject, uploadBytes, getDownloadURL} from 'firebase/storage'
import {collection, onSnapshot, where, query, doc, deleteDoc, addDoc} from 'firebase/firestore'


export default {
    data() {
        return {
            profiles: [],
            form: {
                title: '',
                fileName: '',
                desc: '',
                type: '',
                subjectLevel: '',
                selectedSubject: '',
                file_url: ''
                 
            },
            subjectsOptions: {
                'Pri School': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese'],
                'Lower Sec': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese', 'Geography', 'Literature', 'History'],
                'Upper Sec': ['English', 'E Math', 'A Math', 'Chinese', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Social Studies', 'Principles of Accounts', 'Literature'],
            },
            userID: null
        }
    },
    methods: {
        async getResources() {
            
            onSnapshot(query(collection(db,'resource'), where('uid', '==', this.userID)), (snap) => {
                this.profiles = []
                snap.forEach((doc) => { 
                    if(doc.exists()) {
                        this.profiles.push({id: doc.id, data: doc.data()})
                    }
                })
            })
            
        },
        async deleteResource(title,id){
            
            const confirmDelete = window.confirm("Are you sure you want to delete this resource?");
            if(confirmDelete){
                try {
                    await deleteDoc(doc(db, "resource", id));
                    const desertRef = ref(storage, 'resource/' + title + ".pdf");
                    deleteObject(desertRef)
                    alert("File Successfully Deleted!")
                }
                
                catch{
                    alert("OH NO")
                }
            }
            
        },
        uploadFile: function() {
            const storageRef = ref(storage, 'resource/' + this.form.title +".pdf")
            
            uploadBytes(storageRef, this.$refs.fileName.files[0])
            .then(() => {   
                return getDownloadURL(storageRef)
            })
            .then((url) => {
                console.log(url)
                this.file_url = url
                addDoc(collection(db,'resource'),{
                    title: this.form.title,
                    desc: this.form.desc,
                    file_url:this.file_url,
                    type: this.form.type,
                    level: this.form.subjectLevel,
                    subject: this.form.selectedSubject,
                    uid: this.userID
                })
                alert("File Updated Successfully")
            })
            .then(() => {
                this.form.title = '',
                this.$refs.fileName = '',
                this.$refs.fileName.value = '',
                this.form.desc = '',
                this.form.type = '',
                this.form.subjectLevel = '',
                this.form.selectedSubject = ''
           
            })
        },
    }
    ,
    created(){
        var user = auth.currentUser
        if(user){
            this.userID = user.uid
        }
        
        this.getResources()

    },
    computed: {
        subjectsList() {
            return this.subjectsOptions[this.form.subjectLevel] || [];
        }
    }
}
</script>