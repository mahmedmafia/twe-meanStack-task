import { readFile } from 'fs';
import { promisify } from 'util';
import { DBInterface } from '../interfaces/Data';
const readFilePromise = promisify(readFile);
//It's Ok for this as it will not result any value until it's called
const readFromFile = readFilePromise('TestData.json')
//This Class Acts as a Repository For Interacting with the Data File
export class DataHelper {
    //fetch the wordList part of the DataOBject
    static async fetchWordsList() {
        try {
            const fileData = await readFromFile;
            return this.getAllWordsList(fileData);
        } catch (err) {
            throw err;
        }
    }
    //fetch the scoreList part of the DataOBject
    static async fetchScoreList() {
        try {
            const fileData = await readFromFile;
            return this.getAllScoreList(fileData);
        } catch (err) {
            throw err;
        }
    }

    //transform the Buffer data from the file to json Object
    private static transformData(bufferData: Buffer): DBInterface {
        try {
            return JSON.parse(bufferData.toString('utf-8'));
        } catch (err) {
            throw err;
        }
    }
     private static getAllWordsList(bufferData: Buffer) {
        return this.transformData(bufferData).wordList;
    }
    private static getAllScoreList(bufferData: Buffer) {
        return this.transformData(bufferData).scoresList;
    }
    
};
