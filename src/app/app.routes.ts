import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos/productos.component';
import { ProductoComponent } from './pages/productos/producto/producto.component';
import { BlogListComponent } from './pages/blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './pages/blog/blog-detail/blog-detail.component';

export const routes: Routes = [

    {path: '', component: HomeComponent },
    {path: 'productos', component: ProductosComponent },
    {path: 'producto/:id', component: ProductoComponent },
    {path: 'blogs', component: BlogListComponent },
    {path: 'blog/:id', component: BlogDetailComponent },
];
