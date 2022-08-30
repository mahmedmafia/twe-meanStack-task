import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { HandleTestService, question, TestInterface } from 'src/app/services/handle-test.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  userName = '';
  display = 'none';
  testStarted = false;
  testFinished = false;
  questions: question[] = [];
  answers: string[] = []
  questionNumber = 0;
  questionsCount: number = 5;
  correctAnswer = false;
  progress = 0;
  questionsAnsweredRight = 0;
  rank$!: any;
  testForm: FormGroup = new FormGroup({
    formQuestions: new FormArray([]),
  })
  constructor(private handleTestServ: HandleTestService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')! || '';
    if (this.userName) {
      this.rank$ = +localStorage.getItem('rank')!;
      this.questionNumber = +localStorage.getItem('questionNumber')!;
      this.questions =JSON.parse(localStorage.getItem('questions')!);
      this.answers = JSON.parse(localStorage.getItem('answers')!);
    }
    this.fetchQuestionsForTest();
  }
  private fetchQuestionsForTest = () => {
    this.handleTestServ.fetchQuestions().subscribe(res=> this.handleResponsResult(res))
  }
  private handleResponsResult(res: TestInterface) {
    this.questions=res.questions.map(question => {
      this.addQuestion(question.word, question.pos);
      return question;
    });
    this.answers = res.options;
    this.questionsCount=this.questions.length;
  }
  addQuestion(question: string, answer: string) {
    const formGroup = new FormGroup({
      question: new FormControl(question),
      answer: new FormControl('', Validators.required),
      rightAnswer: new FormControl(answer),
    });
    this.formQuestions.push(formGroup);
  }
  submit() {
    const questionRecValue = this.formQuestions.controls[this.questionNumber].value;
    if (questionRecValue.answer == questionRecValue.rightAnswer) {
      this.correctAnswer = true;
      this.questionsAnsweredRight += 1;
    } else {
      this.correctAnswer = false;
    }
    this.openModal();
  }

  onNextQuestion() {
    this.closeModal();
    this.questionNumber++;
    this.progress = (this.questionNumber / this.questionsCount) * 100;
    if (this.questionNumber == this.questionsCount) {
      this.testFinished = true;
      const score = (this.questionsAnsweredRight / this.questionsCount) * 100;
      this.rank$ = this.handleTestServ.sumbitScore(score);
    }
  }
  closeModal() {
    this.display = "none";
  }
  tryAgain() {
    this.formQuestions.clear();
    this.fetchQuestionsForTest();
    this.questionNumber = 0;
    this.questionsAnsweredRight = 0;
    this.rank$ = new Observable((observer: Observer<number>) => {
      observer.next(0);
    });
    this.testFinished = false;
    this.progress = 0;
  }
  get formQuestions() {
    return this.testForm.get('formQuestions') as FormArray;
  }
  openModal() {
    this.display = "block";
  }
}
