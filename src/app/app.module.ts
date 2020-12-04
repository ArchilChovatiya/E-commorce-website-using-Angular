import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import { AppRoutingModule, export_class } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { AuthGuardLoginService } from './auth-guard-login.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-6-datatable';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartServiceService } from './cart-service.service';
import { OrderService } from './order.service';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    AppComponent,
    export_class,
    ProductFormComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    AuthGuardLoginService,
    CategoryService,
    AdminAuthGuardService,
    CartServiceService,
    OrderService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { 

}

