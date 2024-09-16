import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import Parse from "parse";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JAZKE';

  constructor(public auth: AuthService,
    private toastr: ToastrService,) {
      // let serverURL2 = `https://jubilee.plot411.com/parse`;
      // let serverURL2 = `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/parse`;
      let serverURL2 = `http://localhost:3100/parse`;
      var keyApplicationId = 'debunkbot';
      var keyParseServerKey = 'debunkbot12@!!';
      // var keyLiveQueryUrl = 'wss://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/';


    (Parse as any).serverURL = serverURL2;
    // Parse.liveQueryServerURL = keyLiveQueryUrl
    // console.log('host', host, serverURL)
    Parse.initialize(keyApplicationId, keyParseServerKey)
    // Parse.enableLocalDatastore()

  }

  ngOnInit(): void {
    this.checkLoader();
    this.listenForPaymentChanges()
  }



  checkLoader() {
    console.log('checking loader')
    setTimeout(() => {
      let preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.remove();
      }
    }, 100);
  }


  async refreshUser() {
    await this.auth.currentUser?.fetch()
  }

  async listenForPaymentChanges() {
    let query = new Parse.Query('GatewayPayment');
    query.equalTo('userId', this.auth.currentUserId)
    let subscription = await query.subscribe();

    subscription.on('open', () => {
      console.log('subscription opened');
    });

    subscription.on('create', (object) => {
      console.log('object created', object);

      if (object.get('dollar_amount')) {
        this.refreshUser()
        this.toastr.success('Your payment has been received', 'Thank you!')
      }
    });

    subscription.on('update', (object) => {
      console.log('object updated', object);
      if (object.get('dollar_amount')) {
        this.refreshUser()
      }

    });

    // let object = await query.first()
    // if (object) {

    // }
  }
}
