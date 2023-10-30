//Retrieve tutors with active = true"
let tutorProfiles = [
    {tutorID: 'nnnnn', name: 'Thomas', sex: 'm', profileURL: './pictures/thomas.png', nearestMRT: 'Yishun', contactNo: '91234567', subject: ['Math', 'English', 'Science'], active: true},
    {tutorID: 'xxxxx', name: 'Cheryl', sex: 'f', profileURL: './pictures/cheryl.png', nearestMRT: 'Bishan', contactNo: '91234568', subject: ['Science', 'English'], active: true},
    {tutorID: 'nnnnn1', name: 'Cong', sex: 'm', profileURL: './pictures/thomas.png', nearestMRT: 'Yishun', contactNo: '91234567', subject: ['Math', 'English', 'Science'], active: true},
    {tutorID: 'xxxxx1', name: 'Josh', sex: 'f', profileURL: './pictures/cheryl.png', nearestMRT: 'Bishan', contactNo: '91234568', subject: ['Science', 'English'], active: true}

]


//new set of data for testing filter
let tutorProfiles1 = [
    {tutorID: 'nnnnkxca', name: 'Kelvin', sex: 'm', profileURL: './pictures/thomas.png', nearestMRT: 'Yishun', contactNo: '91234567', subject: ['Math', 'English', 'Science'], active: true},
    {tutorID: 'xxxxxascasc', name: 'Jing Jia', sex: 'f', profileURL: './pictures/cheryl.png', nearestMRT: 'Bishan', contactNo: '91234568', subject: ['Science'], active: true},
    {tutorID: 'nnnnn1asdac', name: 'Cong', sex: 'm', profileURL: './pictures/thomas.png', nearestMRT: 'Yishun', contactNo: '91234567', subject: ['Math', 'English', 'Science'], active: true},
    {tutorID: 'xxxxx1asdasd', name: 'Josh', sex: 'f', profileURL: './pictures/cheryl.png', nearestMRT: 'Bishan', contactNo: '91234568', subject: ['Science', 'English'], active: true}

]

let tuitionListing = [
    {listingID: 'abcasdw', tutorID: 'nnnnn', date: '23/11/2023', time: '3PM-5PM', status: 'available', parentID: ''},
    {listingID: 'abcdadh', tutorID: 'nnnnn', date: '24/11/2023', time: '4PM-6PM', status: 'pending', parentID: 'aaaaa'},
    {listingID: 'abcakjl', tutorID: 'nnnnn1', date: '23/11/2023', time: '3PM-5PM', status: 'pending', parentID: 'bbbbb'},
    {listingID: 'abcdsdw', tutorID: 'nnnnn1', date: '24/11/2023', time: '4PM-6PM', status: 'confirmed', parentID: 'ccccc'},
    {listingID: 'abcwwww', tutorID: 'nnnnn1', date: '23/11/2023', time: '3PM-5PM', status: 'available', parentID: ''},
    {listingID: 'abcdppp', tutorID: 'nnnnn', date: '24/11/2023', time: '4PM-6PM', status: 'available', parentID: ''},
    {listingID: 'xyzllll', tutorID: 'xxxxx1', date: '22/11/2023', time: '7PM-9PM', status: 'available', parentID: ''},
    {listingID: 'xyzvasw', tutorID: 'xxxxx1', date: '25/11/2023', time: '3PM-5PM', status: 'available', parentID: ''},
    {listingID: 'xyznbpo', tutorID: 'xxxxx', date: '22/11/2023', time: '7PM-9PM', status: 'available', parentID: ''}
]

//store the current user Infor
let parentProfile = {
    parentID: 'aaaaa', name: 'Nickel', gender: 'm', nearestMRT: 'Ang Mo Kio', childEducationLevel: 'Primary', childGender: 'f', childName: 'Kim', subject: ['Math', 'English'] 
}           

//Retrieve mrtCoordinates
let mrtCoordinates = {
    Yishun: [1.429666, 103.835044],
    Bishan: [1.35092, 103.848206],
    AngMoKio: [1.370025,103.849588]
}

//Functions 
//Render TutorProfiles
const app = Vue.createApp({
    created() {
        //trigger renderProfiles onload
        this.renderProfiles()
    },

    data() {
        return {
            tutors: [], //Store Tutor Profiles to display
            selected: null, //store selected Tuition Listing
            notes: '', //parent notes to tutor

            filter: {
                eduLevel: 'primary'
            },

            eduLevels: {
                primary: {
                    key: 'primary',
                    string: 'Primary',
                    subjects: ['Primary Math', 'Primary English', 'Primary Science', 'Primary Chinese', 'Primary Higher Chinese']
                },
                lowerSec: {
                    key: 'lowerSec',
                    string: 'Lower Secondary',
                    subjects: ['Lower Sec Math', 'Lower Sec English', 'Lower Sec Science', 'Lower Sec Higher Chinese', 'Lower Sec Geography', 'Lower Sec History', 'Lower Sec Literature']
                },
                upperSec: {
                    key: 'upperSec',
                    string: 'Upper Secondary',
                    subjects: ['Upper Sec E-Math', 'Upper Sec A-Math', 'Upper Sec English', 'Upper Sec Physics', 'Upper Sec Chemistry', 'Upper Sec Biology', 'Upper Sec Chinese', 'Upper Sec Higher Chinese', 'Upper Sec Geography', 'Upper Sec History', 'Upper Sec Social Studies', 'Upper Sec Literature', 'Principles of Accounts']
                }
            },

            filter: {
                subjects: ['Primary Math', 'Primary English', 'Primary Science', 'Primary Chinese', 'Primary Higher Chinese'],
                eduLevel: 'primary'
            },

            filterResult: {
                subject: 'Primary Math',
                distanceRadius: null,
            },

            //sort MRT stations based on region for filter
            regions: ['North']

            
        }
    },    
    methods: {
        //change subjects filter based on the education level
        changeSubjects() {
            let key = this.filter.eduLevel
            let subjects = this.eduLevels[key].subjects
            this.filterResult.subject = subjects[0]
            this.filter.subjects = subjects
        },
        
        //convert array subjects to string
        handleSubjectArray(tutors) {
            for (tutor of tutors) {
                subjectStr = ''
                subjects = tutor['subject']
                //if the length of the array > 1, add 'and ' to the last subject
                if (subjects.length > 1) {
                    for (subject of subjects) {
                        if (subjects.indexOf(subject) == (subjects.length-1)) {
                            subjectStr += `and ${subject}`
                        }
                        else {
                            subjectStr += `${subject}, `
                        }
                    }
                }
                //else just add as a string
                else {
                    subjectStr += subjects.toString()
                }
                //assign the value back the object
                tutor['subject'] = subjectStr
            }
        },
        //add a list of tuition listing of each tutor into data tutors as a key value pair timeslot: []
        handleTimeSlot(tutors) {
            for (tutor of tutors) {
                timeSlots = []
                tutorID = tutor.tutorID
                //retrieve the tuition listing from batabase based on the Tutor ID
                for (listing of tuitionListing) {
                    if (tutorID == listing.tutorID) {
                        timeSlots.push(listing)
                    }
                }
                //sort the tuition slots based on date
                timeSlots.sort((a, b) => {
                    const dateA = new Date(a.date.split('/').reverse().join('/'));
                    const dateB = new Date(b.date.split('/').reverse().join('/'));
                    return timeslots = dateA - dateB;
                })
                tutor['timeSlots'] = timeSlots
                console.log(timeSlots)
            }
        },

        calculateDistance(tutors) {
            //get coordinates of the parent nearest MRt
            parentMRT = parentProfile.nearestMRT
            parentStr = parentMRT.split(' ').join('')
            parentCoordinates = mrtCoordinates[parentStr]

            for (tutor of tutors) {
            //get coordinates of the tutor
                tutorMRT = tutor.nearestMRT
                tutorStr = tutorMRT.split(' ').join('')
                tutorCoordinates = mrtCoordinates[tutorStr]

            //calculate distance
                const origin = new google.maps.LatLng(parentCoordinates[0], parentCoordinates[1]);
                const destination = new google.maps.LatLng(tutorCoordinates[0], tutorCoordinates[1]);

                let distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
                
                distance = distance/1000
                distance = distance.toFixed(1)
               
                tutor['distance'] = distance
            }

            //sort based on distance
            tutors.sort((a, b) => {
                return a.distance - b.distance
            })
    
        },

        handleBooking() {
            console.log(this.selected, this.notes)
            //update the status of the Tuition Listing to pending
            //Check the Tuition Listings of the Tutor (to make sure that we only render tutors who have available tuition listing)
                //If null => set the 'active' of the tutor to 'false'
        },

        handleFilter() {
            console.log(this.filterResult.subject, this.filterResult.distanceRadius)
            //retrieve from the database the tutors that matches the filter: subject
            //each time the filtered is clicked, it need to retrieve a new set of tutors from the database else the listing of subjects will be messed up
            let subjectFiltered = tutorProfiles1
            //push the array of object into this.tutors to render
           
            let finalFiltered = []
            this.handleTimeSlot(subjectFiltered)
            this.handleSubjectArray(subjectFiltered)
            this.calculateDistance(subjectFiltered)
            if (this.filterResult.distanceRadius !== null) {
                for (tutor of subjectFiltered) {
                    console.log(tutor)
                    if (tutor.distance < this.filterResult.distanceRadius) {
                        finalFiltered.push(tutor)
                    }
                }
                this.tutors = finalFiltered
            }
            else {
                this.tutors = subjectFiltered
            }

        },

        resetSelected() {
            this.selected = null
            this.notes = null
        },

        renderProfiles() {
            this.tutors = tutorProfiles
            this.handleTimeSlot(this.tutors)
            this.handleSubjectArray(this.tutors)
            this.calculateDistance(this.tutors)
        }
    }
})

app.mount('#app')










