import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'client';

  menu: number  = 0;

/*? click() {
    console.log('Click');
    if(this.menu === 0) {
      this.menu = 1;
    } else {
      this.menu = 0;
    }
  }*/
}
