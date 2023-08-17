import { Component, CUSTOM_ELEMENTS_SCHEMA, effect } from '@angular/core';
import {
	createAttachFunction,
	extend,
	injectBeforeRender,
	injectNgtRef,
	injectNgtStore,
	NgtArgs,
	type NgtNode,
} from 'angular-three';
import {
	EffectComposer,
	GammaCorrectionShader,
	RenderPass,
	RGBShiftShader,
	ShaderPass,
	UnrealBloomPass,
	type Pass,
} from 'three-stdlib';

extend({ EffectComposer, RenderPass, ShaderPass, UnrealBloomPass });

declare global {
	interface HTMLElementTagNameMap {
		'ngt-shader-pass': NgtNode<ShaderPass, typeof ShaderPass>;
	}
}

@Component({
	selector: 'app-effects',
	standalone: true,
	templateUrl: './effects.component.html',
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Effects {
	GammaCorrectionShader = GammaCorrectionShader;
	RGBShiftShader = RGBShiftShader;

	private store = injectNgtStore();
	gl = this.store.select('gl');
	scene = this.store.select('scene');
	camera = this.store.select('camera');
	size = this.store.select('size');

	composerRef = injectNgtRef<EffectComposer>();

	passAttach = createAttachFunction<EffectComposer, Pass>(
		({ parent, child }) => {
			parent.addPass(child);
			return () => parent.removePass(child);
		},
	);

	constructor() {
		effect(() => {
			const [size, composer] = [this.size(), this.composerRef.nativeElement];
			if (!composer) return;
			composer.setSize(size.width, size.height);
		});

		injectBeforeRender(
			({ delta }) => {
				const composer = this.composerRef.nativeElement;
				if (!composer) return;
				composer.render(delta);
			},
			{ priority: 1 },
		);
	}
}
