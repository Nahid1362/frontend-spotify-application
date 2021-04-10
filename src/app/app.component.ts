/**********************************************************************************
 *   WEB422 – Assignment 06
 *   I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.*
 *  Name: Nahid Mohammadzadeh Student ID: 101296192 Date: April 10, 2021
 **********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import {AuthService} from './auth.service'
import { User } from './User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: User;
  title = 'web422-a5';
  searchString: String ='';

  constructor( private router: Router, private authService:AuthService ){}


  handleSearch(f: NgForm){
    this.router.navigate(['/search'], {queryParams: {q: this.searchString}});
    this.searchString= "";

  }

  ngOnInit():void{
    this.router.events.subscribe((event)=>{
      if( event instanceof NavigationStart){
        this.token= this.authService.readToken();
      }
    });
  }

  logout():void{
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
