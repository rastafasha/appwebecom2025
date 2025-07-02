import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos/productos.component';
import { ProductoComponent } from './pages/productos/producto/producto.component';
import { BlogListComponent } from './pages/blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './pages/blog/blog-detail/blog-detail.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { GenericPageComponent } from './pages/generic-page/generic-page.component';

export const routes: Routes = [

    {path: '', component: HomeComponent },
    {path: 'marcas', component: MarcasComponent },
    {path: 'tiendas', component: TiendasComponent },
    {path: 'productos', component: ProductosComponent },
    {path: 'producto/:slug', component: ProductoComponent },
    {path: 'productos/marca/:slug', component: ProductosComponent },
    {path: 'productos/tienda/:id', component: ProductosComponent },
    {path: 'blogs', component: BlogListComponent },
    {path: 'blog/:slug', component: BlogDetailComponent },
    {path: 'page/:slug', component: GenericPageComponent },
    {path: '**', component: HomeComponent }
];
