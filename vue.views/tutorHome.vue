<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <div class="p-3 border bg-light mb-3">
                    <h4 class="text-center">Your Requests</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Parent's Name</th>
                                <th>Child's Name</th>
                                <th>Education Level</th>
                                <th>Subject</th>
                                <th>Date & Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request of requests" :key="request.tutorID">
                                <td>{{request.parentName}}</td>
                                <td>{{request.childName}}</td>
                                <td>{{request.educationLevel}}</td>
                                <td>{{request.listingID}}</td>
                                <td>{{request.date}} | {{ request.time }}</td>
                                <td><a href="#" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#' + request.listingID">View</a></td>
                                
                                <div v-for="request of requests" :key="request.tutorID">
                                    <div class="modal fade" :id="request.listingID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Book a Tuition Session with </h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <ul>
                                                        <li>{{request.parentName}}</li>
                                                        <li>{{request.childName}}</li>
                                                        <li>{{request.childGender}}</li>
                                                        <li>{{request.educationLevel}}</li>
                                                        <li v-if="request.notes != ''">
                                                        {{request.notes}}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="modal-footer">
                                                    <button @click="acceptRequest(request.listingID,request.id)" data-bs-dismiss="modal"  class="btn btn-primary">Accept</button> 
                                                    <button @click="rejectRequest(request.listingID,request.id)" data-bs-dismiss="modal" class="btn btn-primary">Reject</button> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tr>
                            
                            
                        </tbody>
                    </table>
                </div>
                <div class="p-3 border bg-light">
                    <h4 class="text-center">Your Listings</h4>
                    <ul class="list-group list-group-flush text-center">
                        <li v-for="(schedule) in schedules" :key="schedule.uid" class="list-group-item border text-center mb-2 mx-2">
                            <strong>{{schedule.date}}</strong>  <br>
                            {{schedule.time}}
                        </li>
                    </ul>
                    <div class="text-center">
                        <button type="button" class="btn btn-light text-center fs-4" data-bs-toggle="modal" data-bs-target="#modal"> + </button>  
                    </div>
                    <div id="modal" class="modal fade" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Viewing Pending Listing </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form @submit.prevent="addNewProfile()">
                                    <div class="modal-body">
                                        <label class="form-label" for="preferredDate">Date</label>
                                        <input v-model="form.date" class="form-control" type="date" id="preferredDate" name="preferredDate">
                                        <br>
                                        <label class="form-label" for="preferredTime">Time</label>
                                        <select v-model="form.time" class="form-control" id="preferredTime" name="preferredTime">
                                            <option value="" selected disabled>Choose a timeslot</option>
                                            <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                                            <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                                            <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                                            <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                                            <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                                            <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM</option>
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button data-bs-dismiss="modal"  type="submit" class="btn btn-primary">Create</button> 
                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="p-3 border bg-light">
                    <h4><strong>Upcoming Sessions</strong></h4><br/>
                    <div v-for="confirmed of confirmedRequests" :key="confirmed.id" class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{confirmed.childName}}</h5>
                            <p class="card-text">{{confirmed.date}} {{confirmed.time}}</p>
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#' + confirmed.listingID">View</a>
                        </div>
                    </div>
                    <div v-for="confirmed of confirmedRequests" :key="confirmed.id">
                        <div class="modal fade" :id="confirmed.listingID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">View confirmed listing</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form>
                                        <div class="modal-body">
                                            <ul>
                                                <li>{{confirmed.parentName}}</li>
                                                <li>{{confirmed.childName}}</li>
                                                <li>{{confirmed.childGender}}</li>
                                                <li>{{confirmed.educationLevel}}</li>
                                                <li v-if="confirmed.notes != ''">
                                                {{confirmed.notes}}
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="modal-footer">
                                            <button data-bs-dismiss="modal" type="button" class="btn btn-secondary">Close</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

</template>

<script>

import { db , auth} from '/src/firebase/init.js'
    import {collection,doc, addDoc, onSnapshot, query, where, updateDoc,} from 'firebase/firestore'
    export default {
        
        data() {
            return {
                popupVisible: false,
                id: null,
                form: {
                    date: null,
                    time: '',
                    status: 'available',
                    tutorName: ''
                },
                options: { day: '2-digit', month: 'long', year: 'numeric'},
                schedules: [],
                upcomingSchedules: [],
                requests: [],
                confirmedRequests: [],
            }
        },
        methods: {
            showPopup() {
                this.popupVisible = true
            },
            closePopup(){
                this.popupVisible = false
            },
            addNewProfile: function() {
                var selectedDate = new Date(this.form.date)
                var newDate = selectedDate.toLocaleDateString(undefined,this.options)

                onSnapshot(query(collection(db,'tutors'), where('userID', '==', this.id)), (snap) => {
                    
                    snap.forEach((doc) => {
                        if(doc.exists()) {
                            this.form.tutorName = doc.data().name
                        }
                    })
                })



                addDoc(collection(db,'listings'),{
                    date: newDate,
                    status: this.form.status,
                    time: this.form.time,
                    uid: this.id,
                    tutorName: this.form.tutorName
                    
                })
                this.popupVisible = false
                this.form.date = null
                this.form.time = null

                alert("Schedule Created Successfully!")
            },
            getSchedules() {
                onSnapshot(query(collection(db,'listings'), where('uid', '==', this.id)), (snap) => {
                    this.schedules = []
                    snap.forEach((doc) => {
                        if(doc.exists()) {
                            this.schedules.push(doc.data())
                        }
                    })
                    this.schedules.sort((a, b) => {
                        // Assuming 'date' is a string in the format "YYYY-MM-DD"
                        return new Date(a.date) - new Date(b.date);
                    });
                })
            },
            
            getRequests() {
                onSnapshot(query(collection(db,'requests'), where('tutorID', '==', this.id),where("status", "==", "pending")), (snap) => {
                    this.requests = []
                    snap.forEach((doc) => {
                        if(doc.exists()) {
                            this.requests.push({id:doc.id, ...doc.data()})
                        }
                    })
                    this.requests.sort((a, b) => {
                        // Assuming 'date' is a string in the format "YYYY-MM-DD"
                        return new Date(a.date) - new Date(b.date);
                    });
                })
            },
            getConfirmedRequests(){
                onSnapshot(query(collection(db,'requests'), where('tutorID', '==', this.id),where("status", "==", "confirmed")), (snap) => {
                    this.confirmedRequests = []
                    snap.forEach((doc) => {
                        if(doc.exists()) {
                            this.confirmedRequests.push({id:doc.id, ...doc.data()})
                        }
                    })
                    this.confirmedRequests.sort((a, b) => {
                        // Assuming 'date' is a string in the format "YYYY-MM-DD"
                        return new Date(a.date) - new Date(b.date);
                    });
                })
            },
            acceptRequest(listingID,requestID){
                
                const listingRef = doc(db, "listings", listingID)
                const requestRef = doc(db,'requests',requestID)
                if(window.confirm("Are you sure you want to accept this request?")){
                    updateDoc(listingRef, {
                        status: 'unavailable'
                    })
                    updateDoc(requestRef, {
                        status: 'confirmed'
                    })
                    alert("Request Successfully Accepted")
                }
                
            },
            rejectRequest(listingID,requestID){
                
                const listingRef = doc(db, "listings", listingID)
                const requestRef = doc(db,'requests',requestID)
                if(window.confirm("Are you sure you want to reject this request?")){
                    updateDoc(listingRef, {
                        status: 'available'
                    })
                    updateDoc(requestRef, {
                        status: 'rejected'
                    })

                    alert("Request Successfully Rejected")
                }
                
            }
        },
        created() {
            var user = auth.currentUser
            if(user){
                this.id = user.uid
            }
            this.getSchedules()
            this.getRequests()
            this.getConfirmedRequests()
        }
    }
</script>

<style>
   

    
</style>