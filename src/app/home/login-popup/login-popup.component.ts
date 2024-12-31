import { NgIf } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, Output, SimpleChanges,EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../@Service/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-popup',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.scss'
})
export class LoginPopupComponent implements OnChanges {
  @Input() showPupup:boolean = false;
  @Output() hidepopup:any = new EventEmitter();
  isLoginMode:boolean = true;
  registerForm:any;
  loginForm:any;

  constructor(private fb:FormBuilder, private _authService:AuthService,private messageService: MessageService,private router:Router){
    this.registerForm = this.fb.group({
      fullName: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      mobileNumber: new FormControl(null,[Validators.required]),
      gender: new FormControl("male",[Validators.required]),
      password: new FormControl(null,[Validators.required]),
      confPassword: new FormControl(null,[Validators.required]),
    });
    this.loginForm = this.fb.group({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required]),
    });
  }
  RF(ctrl:any){return this.registerForm.get(ctrl) as FormControl};
  get LF(){return this.loginForm.controls};
  ngOnChanges(changes: SimpleChanges): void {
    if(this.showPupup){
      this.showPopup()
    }else{
      this.hidePopup();
    }
  }

  showPopup() {
    if (typeof document !== 'undefined') {
      const overlay:any = document.getElementById('overlay');
      const popup:any = document.getElementById('popup');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
          popup.classList.add('active');
      }, 10);
    }
}

  hidePopup() {
    if (typeof document !== 'undefined') {
      const overlay:any = document.getElementById('overlay');
      const popup:any = document.getElementById('popup');
      popup.classList.remove('active');
      setTimeout(() => {
          overlay.style.display = 'none';
          document.body.style.overflow = '';
          this.showPupup = false;
          this.hidepopup.emit(false);
      }, 300);
    };
};

  registerUser(){
    if(this.registerForm.invalid){
      this.registerForm.markAsTouched();
      return;
    };

    this._authService.registerUser(this.registerForm.value).subscribe(
      (res)=>{
        console.log(res);
        this.toggleRegLogIn();
        this.registerForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration has been successfully done' });
      },(err)=>{
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong, please try again' });
      }
    )
  };

  loginUser(){
    console.log(this.loginForm);
    if(this.loginForm.invalid){
      return;
    };
     this._authService.loginUser(this.loginForm.value).subscribe(
      (res)=>{
        this.loginForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged in successful' });
        this.router.navigate(['admin']);
      },(err)=>{
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong, please try again' });
      }
    )
  };

  toggleRegLogIn(){
    this.isLoginMode = !this.isLoginMode;
  };
}
