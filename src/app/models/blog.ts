import { environment } from "../../environments/environment";


const base_url = environment.mediaUrlRemoto;
export class Blog {
  _id!: string;
  titulo!: string;
  categoria!: string;
  descripcion!: string;
  video_review!: string;
  isFeatured!: boolean;
  status!: string;
  imgUrl!: string;
  img!: string;
  createdAt!: Date;


  get imagenUrl(){

    if(!this.img){
      return `${base_url}/uploads/blogs/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/uploads/blogs/${this.img}`;
    }else {
      return `${base_url}/uploads/blogs/no-image.jpg`;
    }

  }
}
