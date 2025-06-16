import { environment } from "../../environments/environment";

const base_url = environment.baseUrl;
export class Slider {
  constructor(
    public first_title: string,
    public subtitulo: string,
    public description: string,
    public enlace: string,
    public target: string,
    public boton: string,
    public mostrarInfo: boolean,
    public mostrarboton: boolean,
    public status: boolean,
    public img: string,
    public updatedAt: Date,
    public createdAt: Date,
    public _id?: string,

    ){}

  get imagenUrl(){

    if(!this.img){
      return `${base_url}/uploads/sliders/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/uploads/sliders/${this.img}`;
    }else {
      return `${base_url}/uploads/sliders/no-image.jpg`;
    }

  }


}
