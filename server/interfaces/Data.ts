export interface DBInterface {
    wordList: wordDesc[];
    scoresList: number[];
}
export interface wordDesc {
    id: number;
    word: string;
    pos: posEnum
}

export enum posEnum {
    adverb = 'adverb',
    verb = 'verb',
    noun = 'noun',
    adjective = 'adjective'
}
export interface TestQuestions{
    questions:wordDesc[];
    options:posEnum[];
}