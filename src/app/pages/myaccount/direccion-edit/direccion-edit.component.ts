import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Direccion } from '../../../models/direccion.model';
import { DireccionService } from '../../../services/direccion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { AsideCuentaComponent } from '../aside-cuenta/aside-cuenta.component';


@Component({
  selector: 'app-direccion-edit',
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    AsideCuentaComponent


  ],
  templateUrl: './direccion-edit.component.html',
  styleUrls: ['./direccion-edit.component.css']
})
export class DireccionEditComponent implements OnInit {

  public direccion!: Direccion;
  public identity;
  public direccionForm!: FormGroup;
  pageTitle!:string;
  public url!:string;
  public paises!:any;
  public direccion_data : any = {};
  public data_paises : any = [];

  constructor(
    private usuarioService: UsuarioService,
    private _direccionService: DireccionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    // this.usuario = usuarioService.usuario;
    let USER = localStorage.getItem('user');
    if(USER){
      this.identity = JSON.parse(USER);
      console.log(this.identity);
    }
   }

  ngOnInit(): void {
    if(this.identity){
      this.direccion_data = {};
      this.identity;
      this.url = environment.baseUrl;

      this.http.get('https://restcountries.com/v2/all').subscribe(
        data => {

          this.paises = data;
            // (this.paises as Country[]).forEach((element: Country) => {
            //   this.data_paises.push(element.nativeName);
            // });

        }
      );
    }
    this.activatedRoute.params.subscribe( ({id}) => this.getDireccion(id));
  }


  getDireccion(id:string){


    if(!id !== null && id !== undefined){
      this.pageTitle = 'Editing';
      this._direccionService.get_direccion(id).subscribe(
        res => {
          this.direccionForm.patchValue({
            id: res._id,
            nombres_completos: res.nombres_completos,
            direccion: res.direccion,
            referencia: res.referencia,
            pais: res.pais,
            ciudad: res.ciudad,
            zip: res.zip,
            user: this.identity.uid,
          });
          this.direccion = res;
          console.log(this.direccion);
        }
      );

  }else{
    this.pageTitle = 'Creating ';
  }
  this.validarFormulario();

  }

  validarFormulario(){
    this.direccionForm = this.fb.group({
      nombres_completos: ['',Validators.required],
      direccion: ['',Validators.required],
      referencia: ['',Validators.required],
      pais: [''],
      ciudad: [''],
      zip: [''],
      user: [this.identity.uid],
    })
  }



  onSubmit(){
    const {nombres_completos, direccion,referencia, pais,
      ciudad,zip, user } = this.direccionForm.value;

    if(this.direccion){
      //actualizar
      const data = {
        ...this.direccionForm.value,
        _id: this.direccion._id
      }
      this._direccionService.update(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${nombres_completos}  actualizado correctamente`, 'success');
          console.log(this.direccion);
        });

    }else{
      //crear
      this._direccionService.registro(this.direccionForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${nombres_completos} creado correctamente`, 'success');
        this.router.navigateByUrl(`/app/cuenta/direcciones`);
      })
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
