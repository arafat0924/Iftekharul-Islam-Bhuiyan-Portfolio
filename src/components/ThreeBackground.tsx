import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        // Subtle fog to fade out distant elements into the background color
        scene.fog = new THREE.FogExp2(0x060b19, 0.025);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); // Lock at 1 for speed
        mountRef.current.appendChild(renderer.domElement);

        // --- 1. Central Wireframe Globes (Represents Global/International Law & Structure) ---
        const globeGroup = new THREE.Group();

        const globeGeometry1 = new THREE.IcosahedronGeometry(12, 2);
        const globeMaterial1 = new THREE.MeshBasicMaterial({
            color: 0x4f46e5, // Indigo
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const globe1 = new THREE.Mesh(globeGeometry1, globeMaterial1);
        globeGroup.add(globe1);

        const globeGeometry2 = new THREE.IcosahedronGeometry(15, 1);
        const globeMaterial2 = new THREE.MeshBasicMaterial({
            color: 0x10b981, // Emerald
            wireframe: true,
            transparent: true,
            opacity: 0.08
        });
        const globe2 = new THREE.Mesh(globeGeometry2, globeMaterial2);
        globeGroup.add(globe2);

        scene.add(globeGroup);

        // --- 2. Particle Systems (Represents Network, Youth, Connections) ---
        const createParticleSystem = (count: number, size: number, colorHex: number, radius: number) => {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);

            for (let i = 0; i < count * 3; i += 3) {
                // Spherical distribution
                const r = radius * Math.cbrt(Math.random());
                const theta = Math.random() * 2 * Math.PI;
                const phi = Math.acos(2 * Math.random() - 1);

                positions[i] = r * Math.sin(phi) * Math.cos(theta);
                positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
                positions[i + 2] = r * Math.cos(phi);
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({
                size,
                color: new THREE.Color(colorHex),
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            return new THREE.Points(geometry, material);
        };

        const system1 = createParticleSystem(400, 0.15, 0x4f46e5, 45); // Indigo
        const system2 = createParticleSystem(250, 0.2, 0x10b981, 40);  // Emerald
        const system3 = createParticleSystem(200, 0.25, 0x22d3ee, 35);  // Cyan

        scene.add(system1);
        scene.add(system2);
        scene.add(system3);

        // --- 3. Mouse Interaction (Parallax) ---
        let mouseX = 0;
        let mouseY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        };

        document.addEventListener('mousemove', onDocumentMouseMove);

        // --- 4. Animation Loop ---
        let animationFrameId: number;
        let lastTime = performance.now();

        const animate = () => {
            // Stop rendering if tab is hidden
            if (document.hidden) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            // Limit FPS to 30 for background effects to save CPU/GPU
            const now = performance.now();
            const delta = now - lastTime;

            if (delta < 33) { // ~30 FPS
                animationFrameId = requestAnimationFrame(animate);
                return;
            }
            lastTime = now;

            // Rotate globes
            globe1.rotation.y += 0.002;
            globe1.rotation.x += 0.001;
            globe2.rotation.y -= 0.0015;
            globe2.rotation.z += 0.001;

            // Rotate particle systems
            system1.rotation.y += 0.001;
            system1.rotation.x += 0.0005;

            system2.rotation.y -= 0.0008;
            system2.rotation.z += 0.0005;

            system3.rotation.x -= 0.0005;
            system3.rotation.y += 0.0008;

            // Smooth camera parallax
            camera.position.x += (mouseX * 0.015 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 0.015 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // --- 5. Resize Handler ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            cancelAnimationFrame(animationFrameId);

            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

            // Dispose geometries and materials
            globeGeometry1.dispose();
            globeMaterial1.dispose();
            globeGeometry2.dispose();
            globeMaterial2.dispose();
            system1.geometry.dispose();
            (system1.material as THREE.Material).dispose();
            system2.geometry.dispose();
            (system2.material as THREE.Material).dispose();
            system3.geometry.dispose();
            (system3.material as THREE.Material).dispose();

            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
