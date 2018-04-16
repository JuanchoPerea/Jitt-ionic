import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,Events } from 'ionic-angular';
//sanitizer for url
import{DomSanitizer} from '@angular/platform-browser'
//servicio
import {QuizsService} from '../../providers/quizs-service';
import { LanguageProvider } from '../../providers/language/language';

//storage
import { Storage } from '@ionic/storage';



/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  public quiz=[];
  public questions=[];
  public options=[];	
  public testRadioOpen=true;
  public testRadioResult=[];
  public user_id='';
  public title="";
  public questionTitle="";
  public answerTitle="";
  public buttom="";
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public quizsService:QuizsService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public events:Events,
    public language:LanguageProvider,
    private dom:DomSanitizer,
    private local: Storage
  	) {
  	this.quiz=this.navParams.get('quiz');
    this.local.get(`login`).then(
        data =>{
          if (data){
          this.user_id=data.id.toLowerCase();
          }
        }); 
    this.presentLoadingCustom();
 
  }


  ionViewWillEnter() {
    console.log('ionViewDidLoad QuizPage');
    this.showAllQuizQuestion(this.quiz);
   this.showLanguage();

   
  }

  showAllQuizQuestion(quiz){
    this.quizsService.showAllQuizQuestion(quiz.id).subscribe(
      (data) => { // Success
       this.questions = JSON.parse(data['_body']);
      },
      (error) =>{
        console.error(error);
      }
    );

  }

  showAllQuizQuestionOptions(quiz,question){
    return this.quizsService.showAllQuizQuestionOptions(quiz,question);    
  }

  showHelp(question){
   let alert = this.alertCtrl.create({
       message: question.help
    });
   
    alert.addButton('OK');
    
    alert.present();
   

  }



  showRadio(question) {
    console.log(question);
    let subtitle='';
    if(question.mediatype=='image'){
      subtitle='<img src="'+question.mediaurl+'" alt="imagen_'+question.id+'" />';
    } 
    if(question.mediatype=='other'&& question.mediaurl!=''){
      if(question.mediaurl.startsWith('https://www.youtube.com/')){ 
        let youtube=question.mediaurl.replace(/watch\u003Fv=/i, "embed/"); 
         let videoUrl = this.dom.bypassSecurityTrustResourceUrl(youtube);
        subtitle='<iframe width=100% [src]="'+videoUrl+'" allowfullscreen ></iframe>';      
      }else{
        subtitle='<a href="'+question.mediaurl+'">'+question.mediaurl+'</a>';
      }
    }
    let inputs=[];    
    this.showAllQuizQuestionOptions(question.quiz_id, question.id)
    .subscribe(
      (data) => { // Success
        this.options = JSON.parse(data['_body']);  
        this.options.forEach(item=>{
         
          inputs.push({
              type: 'radio', 
              name: item.text, 
              label: item.text, 
              value: item
          });

        });

        let buttons=[{text:'Cancel'},
        {
          text: 'OK',
          handler: data => {
            this.testRadioOpen = false;
            console.log(question.id);
            this.testRadioResult[question.id] = data;
          }
        }];
       let alert = this.alertCtrl.create({
       message: question.text,
       subTitle: subtitle,
       inputs: inputs,
       buttons: buttons
       });      
        alert.present();
      },
      (error) =>{
        console.error(error);
      }
    );
     console.log(this.testRadioResult);
   console.log(this.testRadioResult[question.id]);

  }

 

  enviarCuestionario(){
    console.log(this.testRadioResult);
    console.log(this.user_id);
    let resultado=[];
    this.testRadioResult.forEach(item=>{
      console.log(item);
      if(item)
      resultado.push({user_id:this.user_id, quiz_id:item.quiz_id, quiz_question_id:item.quiz_question_id, quiz_question_option_id:item.id})
    })
    console.log(resultado);
    //enviamos a BBDD
     this.quizsService.addQuizVoted(resultado)
    .subscribe(
      (data) => { // Success
       console.log(data);

      },
      (error) =>{
        console.error(error);
      }
    );   
    this.events.publish('quiz: envio', this.testRadioResult);

    //save in local
    this.local.set(`respuestasQuiz/${this.quiz['id']}`,this.testRadioResult);   

    this.navCtrl.pop();
  }


  showLanguage(){
//comprobamos si existe el logueo, sino redirigimos
      this.local.ready().then(()=>{
        this.local.get(`language`)
        .then(data =>{        
          this.language.showLanguage(data,'QuizPage').subscribe(
            (data) => { // Success
              //console.log('datos: '+data)
              //let texto=JSON.parse(data['_body']);
              this.title=data.text;
              this.questionTitle=data.hijos[0].text;
              this.answerTitle=data.hijos[1].text;
              this.buttom=data.hijos[2].text;

            },
            (error) =>{
              console.error(error);
              
            }
          );
        })
        ;  
    });    

  }

  //loading 
  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: '',
      content: `
        <ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>`,
      duration: 1000
    });
    this.showAllQuizQuestion(this.quiz);
    this.showLanguage();
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

}
