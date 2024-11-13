import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
	isOpen = false;

	openBar = () => {
		this.isOpen = !this.isOpen;
	}
}
