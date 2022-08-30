import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HandleTestService {
  APIURL = 'http://localhost:3000/';
  testUrl = this.APIURL + 'test';
  submitScoreURL=this.testUrl+'/submit';
  constructor(private http: HttpClient) { }
  fetchQuestions() {
    return this.http.get<TestInterface>(this.testUrl);
  }
  sumbitScore(userScore:number){
    return this.http.post<number>(this.submitScoreURL,{score:userScore});
  }
}
export interface TestInterface {
  questions:question[];
  options:string[];

}
export interface question{
  id: number;
  word: string;
  pos: string;
  index?:number;
}
