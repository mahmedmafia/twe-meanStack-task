import { DataHelper } from "../helpers/DataHelper";
import { posEnum, TestQuestions, wordDesc } from "../interfaces/Data";
import { ITestService } from "../interfaces/ITestService";

export class handleTestService implements ITestService {
    //for cleaner code this properties has mobed up to Class,to avoid the much referncing in the functions
    wordsList: wordDesc[] = [];
    options = new Set<posEnum>()
    async getRank(score: number): Promise<number> {
        try {
            let scoreList = await DataHelper.fetchScoreList();
            scoreList = scoreList.sort((a, b) => b - a);
            //get the last rank with the latest core from the bottom
            const rank = [...scoreList].reverse().findIndex(res => res == score);
            //here to get the ranking due to top
            return scoreList.length-rank+1;
        } catch (err) {
            throw err;
        }
    }
    async getPracticeQuestions(): Promise<TestQuestions> {
        try {

            this.wordsList = await DataHelper.fetchWordsList();
            //making questionlength dynamic
            const questionsLength = 10;
            //will shuffle questions then return the first 10
            let randomQuestions = this.makeQuestionsRandom(questionsLength);
            //check if there is at least one adj and one verb and one noun then swap it with the record
            //that has most questions 
            let questions = this.handleMissingCategories(randomQuestions);
            return { questions, options: [...this.options] };
        } catch (err) {
            throw err;
        }

    }
    private makeQuestionsRandom(questionsLength: number) {
        return this.wordsList.sort((a, b) => {
            this.options.add(a.pos);
            return Math.random() - Math.random();
        }).slice(0, questionsLength)
    }
    private handleMissingCategories(questions: wordDesc[]) {
        let ObjectOptinos: any = {};
        //make dictionary with  every pos number repetion  in the selected shuffled questions
        questions.map(s => {
            if (!ObjectOptinos.hasOwnProperty(s.pos)) {
                ObjectOptinos[s.pos] = 1;
            } else {
                ObjectOptinos[s.pos] += 1;
            }
            return s;
        });
        const entires: [string, number][] = Object.entries(ObjectOptinos);
        for (const [key, value] of entires) {
            //1-find the not repeated key
            //2-get a record from the doc where it has the key
            //3-check the dictionary for the key with the most questions
            //4-get any question with that key and Swap it with record from the word list
            if (value == 0) {
                const entireKey = entires.find(res => {
                    const [key, val] = res;
                    if (val >= 2) return res;
                });
                const newQuestion = this.wordsList.find(res => {
                    return res.pos == key
                });
                if (entireKey) {
                    let questionToBeReplacedIndex = questions.findIndex(res => res.pos == entireKey[0]);
                    questions[questionToBeReplacedIndex] == newQuestion;
                }
            }
        }
        return questions;
    }
}
