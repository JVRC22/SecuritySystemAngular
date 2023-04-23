import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { TiendasService } from 'src/app/Services/tiendas.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit 
{
  apiFailed: boolean = false;
  text: string = "";

  constructor(private router: Router, private fb: FormBuilder, private rourte: ActivatedRoute, private adminService: AdminService, private tiendasService: TiendasService, private dialogRef: MatDialogRef<DeleteModalComponent>, @Inject(MAT_DIALOG_DATA) private data: {accion: number, id: number }) { }

  ngOnInit(): void {
    this.setText();
  }

  setText()
  {
    switch(this.data.accion)
    {
      case 1:
        this.text = "¿Seguro que desea eliminar este usuario?";
        break;

      case 2:
        this.text = "¿Seguro que desea eliminar este moderador?";
        break;

      case 3:
        this.text = "¿Seguro que desea eliminar esta tienda?";
        break;
    }
  }

  closeDialog()
  {
    this.dialogRef.close();
  }

  onSubmit()
  {
    switch(this.data.accion)
    {
      case 1:
        this.adminService.deleteUsuario(this.data.id).subscribe(
          response => {
            this.dialogRef.close();
            this.router.navigate(['/usuarios']);
          },
          error => {
            this.apiFailed = true;
          }
        );
        break;
      
      case 2:
        this.adminService.deleteUsuarioModerador(this.data.id).subscribe(
          response => {
            this.dialogRef.close();
            this.router.navigate(['/moderadores']);
          },
          error => {
            this.apiFailed = true;
          }
        );
        break;

      case 3:
        this.tiendasService.deleteTienda(this.data.id).subscribe(
          response => {
            this.dialogRef.close();
            this.router.navigate(['/tiendas']);
          },
          error => {
            this.apiFailed = true;
          }
        );
        break;
    }
  }

  onAnimationEnd(): void {
    this.apiFailed = false;
  }
}