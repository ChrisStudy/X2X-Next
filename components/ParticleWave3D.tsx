import React from "react";
import { Vanta } from "vanta-react";

export default function VantaWavesBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <Vanta
                effect="waves"
                background={false}
                options={{
                    backgroundAlpha: 0,
                    color: 0x0,
                    shininess: 10,
                    waveHeight: 8,
                    waveSpeed: 0.3,
                    zoom: 1,
                    mouseControls: false,
                    touchControls: false,
                    gyroControls: false,
                }}
            />
        </div>
    );
}
// "use client";
// import { useEffect, useRef } from "react";
// import * as THREE from "three";
//
// export default function WavesBackground() {
//     const mountRef = useRef(null);
//
//     useEffect(() => {
//         const el = mountRef.current;
//         const W = el.clientWidth;
//         const H = el.clientHeight;
//
//         const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(W, H);
//         renderer.setPixelRatio(window.devicePixelRatio);
//         renderer.setClearColor(0x000000, 0);
//         renderer.domElement.style.display = "block";
//         el.appendChild(renderer.domElement);
//
//         const scene = new THREE.Scene();
//
//         // Vanta 用的是正交感很强的低角度透视
//         const camera = new THREE.PerspectiveCamera(25, W / H, 1, 5000);
//         camera.position.set(0, 400, 800);
//         camera.lookAt(0, 0, 0);
//
//         // 更大更密的网格，覆盖整个视野
//         const SEG = 100;
//         const SIZE = 1800;
//         const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
//         geo.rotateX(-Math.PI / 2.2); // 略微倾斜，模拟 Vanta 的视角
//
//         const mat = new THREE.MeshLambertMaterial({
//             color: 0x000000,
//             side: THREE.FrontSide,
//         });
//
//         const mesh = new THREE.Mesh(geo, mat);
//         mesh.position.y = -50;
//         scene.add(mesh);
//
//         // Vanta 的光照：一个环境光 + 两个方向光
//         scene.add(new THREE.AmbientLight(0xffffff, 1.0));
//
//         const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
//         light1.position.set(0.5, 1, 0.5);
//         scene.add(light1);
//
//         const light2 = new THREE.DirectionalLight(0x404040, 0.8);
//         light2.position.set(-1, 0.5, -0.5);
//         scene.add(light2);
//
//         const positions = geo.attributes.position;
//         const count = positions.count;
//
//         // 缓存原始 x/y 坐标
//         const ox = new Float32Array(count);
//         const oy = new Float32Array(count);
//         for (let i = 0; i < count; i++) {
//             ox[i] = positions.getX(i);
//             oy[i] = positions.getY(i);
//         }
//
//         let t = 0;
//         let animId;
//
//         const animate = () => {
//             animId = requestAnimationFrame(animate);
//             t += 0.003 * 0.3; // waveSpeed
//
//             for (let i = 0; i < count; i++) {
//                 const x = ox[i];
//                 const y = oy[i];
//                 // Vanta 波浪公式：多个正弦叠加
//                 const z =
//                     Math.sin(x * 0.008 + t * 2.0) * 20 * 0.4 +
//                     Math.sin(x * 0.005 + y * 0.005 + t * 1.5) * 20 * 0.6 +
//                     Math.sin(y * 0.01 + t * 1.8) * 20 * 0.3;
//                 positions.setZ(i, z * (8 / 20)); // waveHeight: 8
//             }
//
//             positions.needsUpdate = true;
//             geo.computeVertexNormals();
//             renderer.render(scene, camera);
//         };
//         animate();
//
//         const onResize = () => {
//             const w = el.clientWidth;
//             const h = el.clientHeight;
//             camera.aspect = w / h;
//             camera.updateProjectionMatrix();
//             renderer.setSize(w, h);
//         };
//         window.addEventListener("resize", onResize);
//
//         return () => {
//             cancelAnimationFrame(animId);
//             window.removeEventListener("resize", onResize);
//             geo.dispose();
//             mat.dispose();
//             renderer.dispose();
//             el.removeChild(renderer.domElement);
//         };
//     }, []);
//
//     return (
//         <div
//             ref={mountRef}
//             style={{ position: "absolute", inset: 0, zIndex: -10, overflow: "hidden", width: "100%", height: "100%" }}
//         />
//     );
// }