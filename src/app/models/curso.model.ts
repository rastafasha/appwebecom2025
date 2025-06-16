
import { environment } from "../../environments/environment";
import { Categoria } from "./categoria.model";

const base_url = environment.mediaUrlRemoto;

export class Curso{
  constructor(

        public titulo: string,
        public precio_ahora: number,
        public precio_antes: number,
        public video_review: string,
        public info_short: string,
        public detalle: string,
        public categoria: Categoria,
        public subcategoria: string,
        public isFeatured: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public img: string,
    public _id: string

  ){}


  get imagenUrl(){

    if(!this.img){
      return `${base_url}/uploads/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/uploads/cursos/${this.img}`;
    }else {
      return `${base_url}/uploads/cursos/no-image.jpg`;
    }

  }
}

