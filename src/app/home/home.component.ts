import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [LoginPopupComponent,RouterLink,NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  openLoginPopup:boolean = false;
  activeFragment:any = "";
  isSticky:boolean = false;
  constructor(private ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.ActivatedRoute.fragment.subscribe(
      (res)=>{
        if(res){
          this.activeFragment = res;
          this.scrollSmooth(res);
        }
      }
    )
  }
  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      let text: any = document.getElementById('text');
      let bird1: any = document.getElementById('bird1');
      let bird2: any = document.getElementById('bird2');
      let btn: any = document.getElementById('btn');
      let rocks: any = document.getElementById('rocks');
      let forest: any = document.getElementById('forest');
      let water: any = document.getElementById('water');
      let header: any = document.getElementById('header');

      window.addEventListener('scroll', function () {
        let value = window.scrollY;

        text.style.top = 50 + value * -0.1 + '%';
        bird2.style.top = value * -1.5 + 'px';
        bird2.style.left = value * 2 + 'px';
        bird1.style.top = value * -1.5 + 'px';
        bird1.style.left = value * -5 + 'px';
        btn.style.marginTop = value * 1.5 + 'px';
        rocks.style.top = value * -0.12 + 'px';
        forest.style.top = value * 0.25 + 'px';
        header.style.top = value * 0.5 + 'px';
      });

      window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if(scrollTop >= 900){
          this.isSticky = true;
        }else{
          this.isSticky = false;
        }
      });
      
      
    }
  }

  scrollSmooth(id:any){
    setTimeout(()=>{
      const element = document.getElementById(id) as HTMLElement;
      element.scrollIntoView({ behavior: 'smooth' });
    },500);
  }

  loginAndExplore(){
    this.openLoginPopup = true;
  }
  hidepopupevent(e:any){
    this.openLoginPopup = e;
  }
}
