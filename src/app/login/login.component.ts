import { Component} from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    
  constructor(private authSer:AuthService) { }
  obser:Subscription;
  loginWithGoogle(){
    this.authSer.loginWithGoogle();
  }
  loginWithFacebook(){
    this.authSer.loginWithFacebook();
  }
}
