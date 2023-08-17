import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgtArgs, extend } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import * as THREE from 'three';
import { Effects } from './components/effects/effects.component';
import { Lights } from './components/lights/lights.component';
import { Terrain } from './components/terrain/terrain.component';

extend(THREE);

/**
 * Vaporware Scene is ported from Maxime's article: https://blog.maximeheckel.com/posts/vaporwave-3d-scene-with-threejs/
 */
@Component({
	standalone: true,
	templateUrl: './scene.component.html',
	imports: [NgtArgs, NgtsOrbitControls, Lights, Terrain, Effects],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VaporwareScene {
	Math = Math;
}
