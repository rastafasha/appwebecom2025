import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tienda } from 'src/app/models/tienda.model';
import { TiendaService } from 'src/app/services/tienda.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSumitted = false;

  registerForm:FormGroup;
  tiendas: Tienda[];
  tienda: Tienda;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private tiendaService: TiendaService,
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [ '', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      local: [''],
      terminos: [false, Validators.required],

    }, {
      validators: this.passwordsIguales('password', 'password2')

    });
  }




  ngOnInit(): void {
    this.getTiendas();
  }

  getTiendas(){
    this.tiendaService.cargarTiendas().subscribe((resp:any)=>{
      this.tiendas = resp;
      //filtramos las tiendas y buscamos la que se llama web
      this.tiendas = this.tiendas.filter((tienda:Tienda) => tienda.nombre === 'Web');
      //mostramos la info de la tienda con el nombre web
      this.tienda = this.tiendas[0];

    })
  }

  crearUsuario(){
    this.formSumitted = true;
    //agregamos el id de la tienda a la respuesta

    this.registerForm.value.local = this.tienda._id;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }

    //realizar el posteo del usuario
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      resp =>{
        console.log(resp);
        this.router.navigateByUrl('/login');
      },(err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );

  }

  campoNoValido(campo: string): boolean {
    if(this.registerForm.get(campo).invalid && this.formSumitted){
      return true;
    }else{
      return false;
    }


  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSumitted;
  }

  passwordNoValido(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSumitted){
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

}
