let tuitionListing = [
    {listingID: 'abcasdw', tutorID: 'nnnnn', date: '23/11/2023', time: '3PM-5PM', status: 'available', parentID: '', addNote: ''},
    {listingID: 'abcdadh', tutorID: 'nnnnn', date: '24/11/2023', time: '4PM-6PM', status: 'pending', parentID: 'aaaaa', addNote: 'Hi, my kid has ADHD'},
    {listingID: 'abcakjl', tutorID: 'nnnnn', date: '23/11/2023', time: '3PM-5PM', status: 'pending', parentID: 'bbbbb', addNote: 'Hi, it would be lovely to have you as tutor for my child!'},
    {listingID: 'abcdsdw', tutorID: 'nnnnn', date: '24/11/2023', time: '4PM-6PM', status: 'confirmed', parentID: 'ccccc', addNote: 'yessirrr lets gooooo'},
    {listingID: 'abcwwww', tutorID: 'nnnnn', date: '23/11/2023', time: '3PM-5PM', status: 'confirmed', parentID: 'bbbbb', addNote: 'ohh yeahhhhhh lets go'},
    {listingID: 'abcdppp', tutorID: 'nnnnn', date: '24/11/2023', time: '4PM-6PM', status: 'available', parentID: '', addNote: ''},
    {listingID: 'xyzllll', tutorID: 'xxxxx1', date: '22/11/2023', time: '7PM-9PM', status: 'available', parentID: '', addNote: ''},
    {listingID: 'xyzvasw', tutorID: 'xxxxx1', date: '25/11/2023', time: '3PM-5PM', status: 'available', parentID: '', addNote: ''}, 
    {listingID: 'xyznbpo', tutorID: 'xxxxx', date: '22/11/2023', time: '7PM-9PM', status: 'available', parentID: '', addNote: ''}
]

let tutorProfile = {tutorID: 'nnnnn', name: 'Thomas', sex: 'm', profileURL: './pictures/thomas.png', nearestMRT: 'Yishun', contactNo: '91234567', subject: ['Math', 'English', 'Science'], active: true}

let parentProfiles = [
    {parentID: 'aaaaa', name: 'Nickel', gender: 'm', nearestMRT: 'Ang Mo Kio', childEducationLevel: 'Primary', childGender: 'f', childName: 'Kim', subject: ['Math', 'English']},
    {parentID: 'bbbbb', name: 'Ben', gender: 'm', nearestMRT: 'Bishan', childEducationLevel: 'Primary', childGender: 'f', childName: 'Kang', subject: ['Math', 'English']},
    {parentID: 'ccccc', name: 'Katherine', gender: 'f', nearestMRT: 'Punggol', childEducationLevel: 'Primary', childGender: 'f', childName: 'Kua', subject: ['Math', 'English']}
]

const app = Vue.createApp({
    created() {
        this.renderListings()
    },

    data() {
        return {
            availableListings: [],
            pendingListings: [],
            confirmedListings: [],

            newListing: {
                date: '',
                time: ''
            }
        }
    },

    methods: {
        //push each listing to the respective category: available, pending, confirmed
        renderListings() {
            for (listing of tuitionListing) {
                if (tutorProfile.tutorID === listing.tutorID) {
                    if (listing.status === 'available') {
                        this.availableListings.push(listing)
                    }
                    if (listing.status === 'pending') {
                        //retrive parent Info from database based on parent ID
                        let parentInfor
                        for (parent of parentProfiles) {
                            if (parent.parentID == listing.parentID) {
                                parentInfor = parent
                            }
                        }
                        listing['parentName'] = parentInfor.name
                        listing['childName'] = parentInfor.childName
                        if (parentInfor.childGender == 'f') {
                            listing['childGender'] = 'Female'
                        }
                        else {
                            listing['childGender'] = 'Male'
                        }
                        listing['eduLevel'] = parentInfor.childEducationLevel

                        this.pendingListings.push(listing)
                    } 
                    if (listing.status === 'confirmed') {
                        let parentInfor
                        for (parent of parentProfiles) {
                            if (parent.parentID == listing.parentID) {
                                parentInfor = parent
                            }
                        }
                        listing['parentName'] = parentInfor.name
                        listing['childName'] = parentInfor.childName
                        
                        if (parentInfor.childGender == 'f') {
                            listing['childGender'] = 'Female'
                        }
                        else {
                            listing['childGender'] = 'Male'
                        }
                        listing['eduLevel'] = parentInfor.childEducationLevel
                        this.confirmedListings.push(listing)
                    }
                }
            }
        },

        handleAccept(listingID) {
            console.log(`update the status of this listing: ${listingID} to confirmed`)
        },

        handleReject(listingID) {
            //To be discussed: if we need to inform or store a list of rejected booking request, we need to create seperate table to store the booking request
            //or alternately, we can have another table to store the tuition listing before updating the status back to 'available', or we can just email them lol!
            console.log(`update the status of this listing: ${listingID} to available`)
        },

        handleDateFormat(inputDate) {
            var parts = inputDate.split("-");
            var formatedDate = parts[2] + '/' + parts[1] + '/' + parts[0];
            return formatedDate
        },

        handleNewListing() {
            //add new listing to table: {listingID = '...', tutorID, date, time, status = 'available', parentID = ''}
            //NOTE: need to present reloading page to allow new listing to be displayed, currently kept for testing
            tutorID = tutorProfile.tutorID
            formatedDate = this.handleDateFormat(this.newListing.date)
            tuitionListing.push({listingID: 'asdwasdw', tutorID: tutorID, date: formatedDate, time: this.newListing.time, status: 'available', parentID: ''})
            console.log(tuitionListing)
        }


    }
})

app.mount('#app')