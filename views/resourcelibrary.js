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
            },

            //Typing animation data
            text: '',
            phrases: ['Resource Library'],
            sleepTime: 100,
            curPhraseIndex: 0,
        }
    },

    created() {
        this.writeLoop();
    },

    methods: {
        changeSubjects() {
            let key = this.filter.eduLevel
            let subjects = this.eduLevels[key].subjects
            this.filterResult.subject = subjects[0]
            this.filter.subjects = subjects
        },

        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        
        async writeLoop() {
            while (true) {
              let curWord = this.phrases[this.curPhraseIndex];
  
              for (let i = 0; i < curWord.length; i++) {
                this.text = curWord.substring(0, i + 1);
                await this.sleep(this.sleepTime);
              }
  
              await this.sleep(this.sleepTime * 10);
  
              for (let i = curWord.length; i > 0; i--) {
                this.text = curWord.substring(0, i - 1);
                await this.sleep(this.sleepTime);
              }
  
              await this.sleep(this.sleepTime * 5);
  
              if (this.curPhraseIndex === this.phrases.length - 1) 
                {this.curPhraseIndex = 0;} 
              else {this.curPhraseIndex++;}
            }
        }
    }
})

app.mount('#app')