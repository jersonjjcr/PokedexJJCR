import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

const PikachuModel = () => {
	const meshRef = useRef();
	const [geometry, setGeometry] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loader = new STLLoader();
		loader.load(
			'/pikachumewtwo.stl',
			(geo) => {
				setGeometry(geo);
			},
			undefined,
			(err) => {
				console.error('Error loading STL:', err);
				setError(err);
			}
		);
	}, []);

	useEffect(() => {
		if (geometry && meshRef.current) {
			const box = new THREE.Box3().setFromObject(meshRef.current);
			const center = box.getCenter(new THREE.Vector3());
			meshRef.current.position.set(-center.x, -center.y, -center.z);
			meshRef.current.scale.set(0.1, 0.1, 0.1);
		}
	}, [geometry]);

	// Rotación sutil automática
	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.rotation.y += 0.01;
		}
	});

	if (error) {
		return (
			<mesh>
				<boxGeometry args={[2, 1, 0.5]} />
				<meshStandardMaterial color="red" />
			</mesh>
		);
	}

	if (!geometry) return null;

	return (
		<mesh ref={meshRef} geometry={geometry}>
			<meshStandardMaterial color="yellow" metalness={0.3} roughness={0.6} />
		</mesh>
	);
};

const PikachuCanvas = () => {
	return (
		<Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, 0, 10], fov: 40 }}>
			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 5, 5]} intensity={0.8} />
			<PikachuModel />
		</Canvas>
	);
};

export default PikachuCanvas;
