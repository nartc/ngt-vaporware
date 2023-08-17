import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';

@Component({
	selector: 'app-lights',
	standalone: true,
	templateUrl: './lights.component.html',
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Lights {
	Math = Math;
}
