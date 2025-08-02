import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      planeGeometry: any;
      meshPhongMaterial: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
    }
  }
}

export {};