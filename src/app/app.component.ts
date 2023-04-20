import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  role: number = Number(localStorage.getItem('role'));

  ngOnInit(): void {
    /*interval(500)
    .pipe()
    .subscribe(() => {
      this.role = Number(localStorage.getItem('role'));
    });*/
  }
}
