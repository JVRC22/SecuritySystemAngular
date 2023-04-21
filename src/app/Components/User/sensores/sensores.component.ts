import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { catchError, of } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.css']
})
export class SensoresComponent implements OnInit {

  id: number = 0;
  public socket = io('http://192.168.80.172:3333')

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.router.params.pipe(catchError(error => of({ id: null }))).subscribe(params => {this.id = params['id']});
    this.coneccion();
    console.log(this.id)
  }

  coneccion()
  {
    this.socket.on('casa-' +String(this.id), (data) => {
      console.log("Recibido");
    })
  }

}
