import { NgIf } from '@angular/common';
import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	ElementRef,
	ViewChild,
} from '@angular/core';
import { NgtArgs, injectBeforeRender, injectNgtRef } from 'angular-three';
import { injectNgtsTextureLoader } from 'angular-three-soba/loaders';
import type { Mesh, PlaneGeometry } from 'three';

@Component({
	selector: 'app-terrain',
	standalone: true,
	templateUrl: './terrain.component.html',
	imports: [NgIf, NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Terrain {
	Math = Math;

	geometryRef = injectNgtRef<PlaneGeometry>();

	@ViewChild('frontPlane') frontPlane?: ElementRef<Mesh>;
	@ViewChild('backPlane') backPlane?: ElementRef<Mesh>;

	textures = injectNgtsTextureLoader(() => ({
		grid: 'assets/grid.png',
		displacement: 'assets/displacement.png',
		metalness: 'assets/metalness.png',
	}));

	constructor() {
		injectBeforeRender(({ clock }) => {
			const [frontPlane, backPlane] = [
				this.frontPlane?.nativeElement,
				this.backPlane?.nativeElement,
			];
			if (frontPlane && backPlane) {
				const elapsedTime = clock.getElapsedTime();
				frontPlane.position.z = (elapsedTime * 0.15) % 2;
				backPlane.position.z = ((elapsedTime * 0.15) % 2) - 2;
			}
		});
	}
}
