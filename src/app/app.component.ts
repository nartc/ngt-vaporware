import { Component } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { VaporwareScene } from './scene.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [NgtCanvas],
	template: `
		<ngt-canvas
			[sceneGraph]="scene"
			[camera]="{ near: 0.01, far: 20, position: [0, 0.06, 1.1] }"
			[gl]="{ useLegacyLights: true }"
		/>
	`,
})
export class AppComponent {
	scene = VaporwareScene;
}
