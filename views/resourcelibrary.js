const app = Vue.createApp({
    data() {
        return {
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
                documentType: 'Lecture Note'
            }
        }
    },

    methods: {
        changeSubjects() {
            let key = this.filter.eduLevel
            let subjects = this.eduLevels[key].subjects
            this.filterResult.subject = subjects[0]
            this.filter.subjects = subjects
        },
    }
})

app.mount('#app')