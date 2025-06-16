import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos/productos.component';
import { ProductoComponent } from './pages/productos/producto/producto.component';

export const routes: Routes = [

    {path: '', component: HomeComponent },
    {path: 'productos', component: ProductosComponent },
    {path: 'producto/:id', component: ProductoComponent },
];
