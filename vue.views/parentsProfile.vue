<template>
    <div v-if="!uploaded">
        <div class="container firstBox">
            <div class="row">
                <form class="row g-3" enctype="multipart/form-data" id="parentForm" @submit.prevent="addNewProfile">
                    <!-- Parent Profile Form -->
                    <div class="col-sm-12 col-md-6">
                        <div class="p-3 border bg-light">
                            <h1>Parent Profile</h1>
                            <div class="row g-3" >
                                <div class="col-md-6">
                                    <label for="firstName"  class="form-label">Name</label>
                                    <input type="text" v-model="form.pName" class="form-control" id="parentsName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="emailAddress" class="form-label">Email Address</label>
                                    <input type="email" disabled v-model="email" class="form-control" id="emailAddress" required>
                                </div>
                                
                                <div class="col-12">
                                    <label for="parentsGender">Gender:  </label>
                                    <select id="parentsGender" v-model="form.pGender" name="parentsGender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="contactNumber" class="form-label">Contact Number</label>
                                    <input type="number" v-model="form.contact" class="form-control" id="phoneNumber" required>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <!-- Child Profile Form -->
                    <div class="col-sm-12 col-md-6">
                        <div class="p-3 border bg-light">
                            <h1>Kid Profile</h1>
                            <div class="row g-3" enctype="multipart/form-data" id="childForm" @submit.prevent="addNewProfile">
                                <div class="col-md-6">
                                    <label for="firstName" class="form-label">Name</label>
                                    <input type="text" v-model="form.cName" class="form-control" id="nameChild" required>
                                </div>
                                <div class="col-12">
                                    <label for="parentsGender">Gender:  </label>
                                    <select id="parentsGender" v-model="form.cGender" name="parentsGender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <!-- Create a list of all MRT's in Singapore -->
                                <div class="col-12">
                                    <label for="nearestMRT">Nearest MRT: </label>
                                    <select id="nearestMRT" v-model="form.location" name="nearestMRT">
                                        <!-- The dropdown options will be added here -->
                                        <option value="" disabled>Select an MRT station</option>
                                        <option v-for="station in mrtStations" :key="station">
                                            {{ station }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="educationLevel" class="form-label">Current Education Level</label>
                                    <select class="form-select" v-model="form.selectedLevel"  id="educationLevel">
                                        <option selected value="Primary School">Primary School</option>
                                        <option value="Lower Sec">Lower Secondary School</option>
                                        <option value="Upper Sec">Upper Secondary School</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="subjects" class="form-label">Subjects</label>
                                    <div id="subjects-checkbox">
                                        <!-- The checkbox options will be added here dynamically -->
                                        <div class="row">
                                            <div v-for="(subject, index) in emptySubjects" :key="subject" class="col-md-6">
                                                
                                                <input class="form-check-input" v-model="form.selectedSubjects" type="checkbox" :value="form.selectedLevel + ' ' + subject" :id="subject">
                                                <label class="form-check-label" :for="subject">{{ subject }}</label>
                                                <!-- Check if index + 1 is divisible by 2, if so, close the current row and open a new one -->
                                                <div v-if="(index + 1) % 2 === 0" class="w-100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center pt-3">
                        <button type="submit" id="saveDetailsButton" class="btn btn-primary">Save Details</button>
                    </div>
                </form>
                
            </div>
            
        </div>
    </div>

    <div v-else>
        <div class="container firstBox">
            <div class="row">
                <form class="row g-3" enctype="multipart/form-data" id="parentForm" @submit.prevent="updateProfile">
                    <!-- Parent Profile Form -->
                    <div class="col-sm-12 col-md-6">
                        <div class="p-3 border bg-light">
                            <h1>Parent Profile</h1>
                            <div class="row g-3" >
                                <div class="col-md-6">
                                    <label for="firstName"  class="form-label">Name</label>
                                    <input type="text" v-model="existing.pName" class="form-control" id="parentsName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="emailAddress" class="form-label">Email Address</label>
                                    <input type="email" disabled v-model="email" class="form-control" id="emailAddress" required>
                                </div>
                                
                                <div class="col-12">
                                    <label for="parentsGender">Gender:  </label>
                                    <select id="parentsGender" v-model="existing.pGender" name="parentsGender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="contactNumber" class="form-label">Contact Number</label>
                                    <input type="number" v-model="existing.contact" class="form-control" id="phoneNumber" required>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <!-- Child Profile Form -->
                    <div class="col-sm-12 col-md-6">
                        <div class="p-3 border bg-light">
                            <h1>Kid Profile</h1>
                            <div class="row g-3" enctype="multipart/form-data" id="childForm" @submit.prevent="addNewProfile">
                                <div class="col-md-6">
                                    <label for="firstName" class="form-label">Name</label>
                                    <input type="text" v-model="existing.cName" class="form-control" id="nameChild" required>
                                </div>
                                <div class="col-12">
                                    <label for="parentsGender">Gender:  </label>
                                    <select id="parentsGender" v-model="existing.cGender" name="parentsGender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <!-- Create a list of all MRT's in Singapore -->
                                <div class="col-12">
                                    <label for="nearestMRT">Nearest MRT: </label>
                                    <select id="nearestMRT" v-model="existing.location" name="nearestMRT">
                                        <!-- The dropdown options will be added here -->
                                        <option value="" disabled>Select an MRT station</option>
                                        <option v-for="station in mrtStations" :key="station">
                                            {{ station }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="educationLevel" class="form-label">Current Education Level</label>
                                    <select class="form-select" v-model="existing.selectedLevel"  id="educationLevel">
                                        <option selected value="Primary School">Primary School</option>
                                        <option value="Lower Sec">Lower Secondary School</option>
                                        <option value="Upper Sec">Upper Secondary School</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="subjects" class="form-label">Subjects</label>
                                    <div id="subjects-checkbox">
                                        <!-- The checkbox options will be added here dynamically -->
                                        <div class="row">
                                            <div v-for="(subject, index) in existingSubjects" :key="subject" class="col-md-6">
                                                
                                                <input class="form-check-input" v-model="existing.selectedSubjects" type="checkbox" :value="existing.selectedLevel + ' ' + subject" :id="subject">
                                                <label class="form-check-label" :for="subject">{{ subject }}</label>
                                                <!-- Check if index + 1 is divisible by 2, if so, close the current row and open a new one -->
                                                <div v-if="(index + 1) % 2 === 0" class="w-100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center pt-3">
                        <button type="submit" id="updateDetailsButton" class="btn btn-primary">Update Details</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { db , auth} from '/src/firebase/init.js'
import {collection, addDoc, onSnapshot, query, where, doc, updateDoc} from 'firebase/firestore'
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                pName: '',
                cName: '',
                pGender: 'male',
                cGender: 'male',
                contact: null,
                selectedLevel: 'Primary School',
                selectedSubjects: [],
                location: '',
            },
            existing: {
                pName: '',
                cName: '',
                pGender: '',
                cGender: '',
                contact: null,
                selectedLevel: '',
                selectedSubjects: [],
                location: '',
            },
            subjectsOptions: {
                'Primary School': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese'],
                'Lower Sec': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese', 'Geography', 'Literature', 'History'],
                'Upper Sec': ['English', 'E Math', 'A Math', 'Chinese', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Social Studies', 'Principles of Accounts', 'Literature'],
            },
            email: "",
            id: null,
            uploaded: false,
            mrtStations: [],
            profileUID: null,
        }
    },
    computed: {
        emptySubjects() {
            return this.subjectsOptions[this.form.selectedLevel] || [];
        },
        existingSubjects(){
            return this.subjectsOptions[this.existing.selectedLevel] || [];
        }


    },
    methods: {
        
        addNewProfile: function() {
            addDoc(collection(db,'parents'),{
                parentName: this.form.pName,
                childName: this.form.cName,
                email: this.email,
                parentGender: this.form.pGender,
                childGender: this.form.cGender,
                level:this.form.selectedLevel,
                contactNumber: this.form.contact,
                subjects:this.form.selectedSubjects,
                userID:this.id,
                location: this.form.location
            })
            alert("Profile Created Successfully!")
        },

        getUsers() {
            onSnapshot(query(collection(db,'parents'), where('userID', '==', this.id)), (snap) => {

                snap.forEach((doc) => {
                    if(doc.exists()) {
                        this.profileUID = doc.id
                        this.uploaded = true
                        this.existing.pName = doc.data().parentName
                        this.existing.cName = doc.data().childName
                        this.existing.contact = doc.data().contactNumber
                        this.existing.pGender = doc.data().parentGender
                        this.existing.cGender = doc.data().childGender
                        this.existing.location = doc.data().location
                        this.existing.selectedSubjects = doc.data().subjects
                        this.existing.selectedLevel = doc.data().level
                    }
                })
            })
           
        },
        
        updateProfile: function(){
            const docRef = doc(db, 'parents', this.profileUID);
            updateDoc(docRef , {
                parentName: this.existing.pName,
                childName: this.existing.cName,
                parentGender: this.existing.pGender,
                childGender: this.existing.cGender,
                level:this.existing.selectedLevel,
                contactNumber: this.existing.contact,
                subjects:this.existing.selectedSubjects,
                location: this.existing.location
            })
            alert("Profile Updated Successfully!")
        }    
    }
    ,
    created(){
        var user = auth.currentUser
        if(user){
            this.id = user.uid
            this.email = user.email
        }
        
        this.getUsers()

        // Fetch MRT station names from the text file
        axios.get('/stations.txt')
            .then((response) => {

                // Split the response into an array of station names and remove empty entries
                this.mrtStations = response.data.split('\n').filter(line => line.trim() !== '')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
</script>

<style scoped>
    .max-dimensions {
        max-width: 300px;
        max-height: 200px;
    }
      .image-upload {
        text-align: center;
        position: relative;
        }

      .image-preview {
        width: 200px; /* Set the desired width */
        height: 300px; /* Set the desired height */
        border: 2px dashed #ccc;
        padding: 10px;
        cursor: pointer;
        position: relative;
        margin: 0 auto; /* Center horizontally */
        display: flex;
        align-items: center; /* Center vertically */
        justify-content: center; /* Center horizontally */
      }

      #imageUpload, #imageUpload2 {
        display: none;
      }

      .upload-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: #007bff;
        cursor: pointer;
      }
</style>