import { Component, OnInit,Renderer2 } from '@angular/core';
import {NgProgress} from 'ngx-progressbar';
import {AuthService} from '../services/auth.service';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public
    password:string = '';
    old_password:string;
    password_confirmation:string;
    hasError = false;
  
  constructor(
    private auth:AuthService,
    private router:Router,
    private renderer: Renderer2,
    public ngProgress: NgProgress,
  
  ) {}
  ngOnInit() {
  }
  
  resetPassword():void {
    this.auth
            .resetPassword(this.old_password, this.password, this.password_confirmation)
            .subscribe(
                response => {
                   console.log(response);
                },
                err => {
                  this.hasError = err.error.error.message;
                    }
            );
  }

}
