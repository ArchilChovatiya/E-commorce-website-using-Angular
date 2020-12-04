import { Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>;
  constructor(private authfb:AngularFireAuth,private route:ActivatedRoute,private router:Router,private toastr: ToastrService) { 
    this.user$=this.authfb.authState;
    
  }


  async loginWithGoogle(){
     
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '';
    localStorage.setItem('returnUrl',returnUrl);
    await this.authfb.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())   
  }
  loginWithFacebook(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '';
    localStorage.setItem('returnUrl',returnUrl);
    this.authfb.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
  }

  logout(){
    
    this.authfb.auth.signOut().then(x=>{this.router.navigate(['/login'])
    this.toastr.success('Logged out successfully',null,{tapToDismiss:true,closeButton:true})
  });
    
  }
}

export class EmailPasswordCredentials {
  email: string;
  password: string;
}