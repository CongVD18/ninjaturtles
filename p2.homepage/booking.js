//Retrieve from databa the tutors with the Status = "Available"
let tutorProfiles = [
    {tutorID: '1111', name: 'Thomas', sex: 'm', profileURL: '...', nearestMRT: 'Yishun', contactNo: '91234567', teachingLevel: ['Primary', 'Lower Secondary'], subject: ['Math', 'English']},
    {tutorID: '1112', name: 'Cheryl', sex: 'f', profileURL: '...', nearestMRT: 'Bishan', contactNo: '91234568', teachingLevel: ['Primary', 'Upper Secondary'], subject: ['Science', 'English']}
]


let tuitionLising = [
    {listingID: 'abc', tutorID: '1111', date: '23/11/2023', Time: '3PM-5PM', status: 'available'},
    {listingID: 'abcd', tutorID: '1111', date: '24/11/2023', Time: '4PM-6PM', status: 'available'},
    {listingID: 'xyz', tutorID: '1112', date: '22/11/2023', Time: '7PM-9PM', status: 'available'},
    {listingID: 'xyzv', tutorID: '1112', date: '25/11/2023', Time: '3PM-5PM', status: 'available'}
]

let parentProfile = {
    parentID: '2222', name: 'Nickel', sex: 'm', nearestMRT: 'Ang Mo Kio', childEducationLevel: 'Primary', childSex: 'f', childName: 'Kim', subject: ['Math', 'English'] 
}
           



//Functions 
//Render TutorProfiles
const app = Vue.createApp({
    data() {
        return {
            tutors: []
        }
    },    
    methods: {
        renderProfiles() {
            //Infor to display for each tutor: Name, Gender, Highest Qualification, Nearest MRT, tuition slots[Date + Time Slot]
           this.tutors = tutorProfiles
        }
    }

})

app.mount('#app')










