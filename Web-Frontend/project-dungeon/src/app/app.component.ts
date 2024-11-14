import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
	isOpen = false;

	/*
	bookmarks = [
		{ text: "Character manager",color: "#ef67a5", icon: "swordsman.png", left: "35%", top: "29%" },
		{ text: "Dice roller",color: "#00aee0", icon: "d20.png", left: "23%", top: "35%" },
		{ text: "Campaign tracker",color: "#e2e647", icon: "treasure-map.png", left: "38%", top: "41%" },
		{ text: "Manuals library",color: "#ffd81b", icon: "books.png", left: "28%", top: "47%" },
		{ text: "Settings",color: "#94cbc3", icon: "settings.png", left: "10%", top: "53%" },
		
	];
	*/

	bookmarks = [
		{ 
			text: "Character Manager", 
			color: "#D47E96", // A muted rose color that harmonizes with a vintage theme 
			icon: "swordsman.png", 
			left: "35%", 
			top: "29%"
		},
		{ 
			text: "Dice Roller", 
			color: "#7AACC8", // A desaturated blue, giving it a classic feel 
			icon: "d20.png", 
			left: "23%", 
			top: "35%"
		},
		{ 
			text: "Campaign Tracker", 
			color: "#B8C260", // A softer yellow-green, less neon, for a medieval map feel 
			icon: "treasure-map.png", 
			left: "38%",
			top: "41%"
		},
		{ 
			text: "Manuals Library", 
			color: "#E3B540", // A warm gold tone to evoke the feel of ancient books 
			icon: "books.png", 
			left: "28%", 
			top: "47%"
		},
		{ 
			text: "Settings", 
			color: "#A0B9AC", // A soft teal, hinting at a more subdued option like a settings panel 
			icon: "settings.png", 
			left: "10%", 
			top: "53%"
		},
	];

	openBar = () => {
		this.isOpen = !this.isOpen;
	};
}
