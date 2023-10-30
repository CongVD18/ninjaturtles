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

let tutorProfile = {tutorID: 'nnnnn', name: 'Thomas', sex: 'm', profileURL: './pictures/thomas.png', nearestMRT: 'Yishun', contactNo: '91234567', subject: ['Math', 'English', 'Science'], active: true}

let parentProfiles = [
    {parentID: 'aaaaa', name: 'Nickel', sex: 'm', nearestMRT: 'Ang Mo Kio', childEducationLevel: 'Primary', childSex: 'f', childName: 'Kim', subject: ['Math', 'English']},
    {parentID: 'bbbbb', name: 'Ben', sex: 'm', nearestMRT: 'Bishan', childEducationLevel: 'Primary', childSex: 'f', childName: 'Kim', subject: ['Math', 'English']},
    {parentID: 'ccccc', name: 'Katherine', sex: 'f', nearestMRT: 'Punggol', childEducationLevel: 'Primary', childSex: 'f', childName: 'Kim', subject: ['Math', 'English']}
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
        }
    },

    methods: {
        renderListings() {
            for (listing of tuitionListing) {
                if (listing.status === 'available') {
                    this.availableListings.push(listing)
                }
                if (listing.status === 'pending') {
                    this.pendingListings.push(listing)
                } 
                if (listing.status === 'confirmed') {
                    this.confirmedListings.push(listing)
                }
            }
        },
    }
})

app.mount('#app')