import { Component, OnInit } from '@angular/core';
import{ AuthService} from '../auth.service';
import{Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    userName:"",
    password:"",
    _id:null
  }
  warning:string;
  loading:boolean= false;

  constructor( private auth:AuthService, private router: Router) { }

  onSubmit(f:NgForm):void{
    if(this.user.userName!="" && this.user.password!=""){
      this.loading= true;
      this.auth.login(this.user).subscribe(
        (success)=>{
          this.loading= false;
          localStorage.setItem('access_token',success.token);
          this.router.navigate(['/newReleases']);
        },
        (err)=>{
          this.warning=err.error.message;
          this.loading= false;
        }
      )
    }
  }

  ngOnInit(): void {
  }

}
