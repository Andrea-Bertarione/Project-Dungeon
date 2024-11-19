import { Component, inject } from '@angular/core';
import { accountService } from 'src/app/services/account.service';

@Component({
  	selector: 'app-main-page',
  	templateUrl: './main-page.component.html',
  	styleUrls: ['./main-page.component.sass'],
	providers: [accountService]
})
export class MainPageComponent {
	accountHandler = inject(accountService);

	showSection = (section: HTMLElement) => {
		section.scrollIntoView({ behavior: 'smooth' });
	}
}
