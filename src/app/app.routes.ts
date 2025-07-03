import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos/productos.component';
import { ProductoComponent } from './pages/productos/producto/producto.component';
import { BlogListComponent } from './pages/blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './pages/blog/blog-detail/blog-detail.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { GenericPageComponent } from './pages/generic-page/generic-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MyaccountComponent } from './pages/myaccount/myaccount.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { CartCheckoutComponent } from './pages/myaccount/cart-checkout/cart-checkout.component';
import { Direccion } from './models/direccion.model';
import { DireccionesComponent } from './pages/myaccount/direcciones/direcciones.component';
import { PerfilComponent } from './pages/myaccount/perfil/perfil.component';
import { DireccionEditComponent } from './pages/myaccount/direccion-edit/direccion-edit.component';
import { ChatTicketComponent } from './pages/myaccount/ordenes/chat-ticket/chat-ticket.component';
import { DetalleOrdenComponent } from './pages/myaccount/ordenes/detalle-orden/detalle-orden.component';
import { IndexOrdenesComponent } from './pages/myaccount/ordenes/index-ordenes/index-ordenes.component';
import { FavoritesComponent } from './pages/myaccount/favorites/favorites.component';

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
    {path: 'login', component: LoginComponent },
    {path: 'registro', component: RegisterComponent },
    {path: 'recovery-password', component: RecoveryComponent },
    {path: 'my-account', component: MyaccountComponent },
    {path: 'my-account/perfil/:id', component: PerfilComponent },
    {path: 'my-account/direcciones', component: DireccionesComponent },
    {path: 'my-account/direccion/crear', component: DireccionEditComponent },
    { path: 'my-account/ordenes', component: IndexOrdenesComponent},
    {path: 'my-account/direccion/edit/:id', component: DireccionEditComponent },
    { path: 'my-account/ordenes/detalles/:id', component: DetalleOrdenComponent},
    { path: 'my-account/ordenes/tickets/:id', component: ChatTicketComponent},
    {path: 'my-account/cart', component: CartCheckoutComponent },
    {path: 'my-account/favoritos', component: FavoritesComponent },
    {path: 'cart', component: CarritoComponent},
    {path: '**', component: HomeComponent }
];
