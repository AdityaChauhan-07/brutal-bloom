import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Planet {
  mesh: THREE.Mesh;
  orbit: THREE.Group;
  distance: number;
  speed: number;
  size: number;
  name: string;
  rings?: THREE.Mesh;
  moons?: THREE.Mesh[];
  atmosphere?: THREE.Mesh;
}

interface Meteor {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  trail: THREE.Points;
}

const Mystery: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const solarSystemRef = useRef<THREE.Group>();
  const planetsRef = useRef<Planet[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const asteroidBeltRef = useRef<THREE.Points>();
  const animationFrameRef = useRef<number>();
  const orbitLinesRef = useRef<THREE.Line[]>([]);
  
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [focusedPlanet, setFocusedPlanet] = useState<string>('');
  const [showOrbits, setShowOrbits] = useState(true);
  const [showMeteors, setShowMeteors] = useState(true);
  
  // Mouse interaction
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [systemRotation, setSystemRotation] = useState({ x: 0.2, y: 0 });

  // Realistic solar system data with proper colors and characteristics
  const PLANETS_DATA = [
    { 
      name: 'Sun', 
      distance: 0, 
      size: 5, 
      speed: 0, 
      color: 0xFFF2CC, 
      emissive: 0xFFE135,
      emissiveIntensity: 1.2,
      info: 'NUCLEAR FUSION REACTOR - 5778K Surface',
      atmosphere: true
    },
    { 
      name: 'Mercury', 
      distance: 12, 
      size: 0.6, 
      speed: 0.048, 
      color: 0x8C6239, 
      emissive: 0x000000,
      emissiveIntensity: 0,
      info: 'SCORCHED ROCK WORLD - No Atmosphere',
      metallic: 0.8,
      roughness: 0.9
    },
    { 
      name: 'Venus', 
      distance: 16, 
      size: 0.95, 
      speed: 0.035, 
      color: 0xFFC649, 
      emissive: 0x331100,
      emissiveIntensity: 0.2,
      info: 'SULFURIC ACID CLOUDS - 462°C Surface',
      atmosphere: true,
      atmosphereColor: 0xFFBB33
    },
    { 
      name: 'Earth', 
      distance: 20, 
      size: 1.0, 
      speed: 0.030, 
      color: 0x6B93D6, 
      emissive: 0x001122,
      emissiveIntensity: 0.1,
      info: 'BLUE MARBLE - Life Support Active',
      continents: 0x3A7F3A,
      atmosphere: true,
      atmosphereColor: 0x87CEEB,
      hasMoon: true
    },
    { 
      name: 'Mars', 
      distance: 25, 
      size: 0.8, 
      speed: 0.024, 
      color: 0xCD5C5C, 
      emissive: 0x110000,
      emissiveIntensity: 0.05,
      info: 'RED IRON OXIDE DESERT - Polar Caps',
      iceCaps: 0xFFFFFF,
      atmosphere: true,
      atmosphereColor: 0xFFBBAA
    },
    { 
      name: 'Jupiter', 
      distance: 35, 
      size: 3.8, 
      speed: 0.013, 
      color: 0xD8CA66, 
      emissive: 0x221100,
      emissiveIntensity: 0.3,
      info: 'GAS GIANT - Great Red Spot Storm',
      bands: true,
      atmosphere: true,
      atmosphereColor: 0xE6D873
    },
    { 
      name: 'Saturn', 
      distance: 45, 
      size: 3.2, 
      speed: 0.010, 
      color: 0xFAD5A5, 
      emissive: 0x332200,
      emissiveIntensity: 0.2,
      hasRings: true,
      info: 'RINGED GIANT - Low Density World',
      bands: true,
      atmosphere: true,
      atmosphereColor: 0xFFE4B5
    },
    { 
      name: 'Uranus', 
      distance: 55, 
      size: 2.2, 
      speed: 0.007, 
      color: 0x4FD0E7, 
      emissive: 0x001133,
      emissiveIntensity: 0.15,
      info: 'ICE GIANT - Tilted 98 Degrees',
      atmosphere: true,
      atmosphereColor: 0x66DDFF,
      tilt: Math.PI / 2
    },
    { 
      name: 'Neptune', 
      distance: 65, 
      size: 2.1, 
      speed: 0.005, 
      color: 0x4B70DD, 
      emissive: 0x000044,
      emissiveIntensity: 0.2,
      info: 'WINDY ICE GIANT - 2100 km/h Winds',
      atmosphere: true,
      atmosphereColor: 0x5577FF
    },
  ];

  // Initialize the solar system
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 30, 80);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Solar system group
    const solarSystem = new THREE.Group();
    scene.add(solarSystem);
    solarSystemRef.current = solarSystem;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    scene.add(ambientLight);

    // Sun light (from center)
    const sunLight = new THREE.PointLight(0xFFE135, 2, 100);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Create planets
    createPlanets();

    // Create asteroid belt
    createAsteroidBelt();

    // Create initial meteors
    createMeteors();

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const createPlanets = () => {
    const planets: Planet[] = [];
    const orbitLines: THREE.Line[] = [];

    PLANETS_DATA.forEach((planetData) => {
      // Create orbit group
      const orbit = new THREE.Group();
      solarSystemRef.current?.add(orbit);

      // Create orbit line (brutalist style)
      if (planetData.distance > 0) {
        // Orbit ring
        const orbitGeometry = new THREE.RingGeometry(
          planetData.distance - 0.3, 
          planetData.distance + 0.3, 
          64
        );
        const orbitMaterial = new THREE.MeshBasicMaterial({
          color: 0xFFE135,
          transparent: true,
          opacity: 0.08,
          side: THREE.DoubleSide
        });
        const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbitRing.rotation.x = Math.PI / 2;
        solarSystemRef.current?.add(orbitRing);

        // Add brutal orbit line segments
        const linePoints = [];
        const segments = 128;
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          linePoints.push(new THREE.Vector3(
            Math.cos(angle) * planetData.distance,
            0,
            Math.sin(angle) * planetData.distance
          ));
        }
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x666666,
          transparent: true,
          opacity: showOrbits ? 0.4 : 0
        });
        const orbitLine = new THREE.Line(lineGeometry, lineMaterial);
        solarSystemRef.current?.add(orbitLine);
        orbitLines.push(orbitLine);
      }

      // Create planet geometry (more realistic spheres)
      let geometry: THREE.BufferGeometry;
      
      if (planetData.name === 'Sun') {
        // Sun as detailed sphere with surface texture
        geometry = new THREE.SphereGeometry(planetData.size, 32, 32);
      } else {
        // All planets as detailed spheres
        geometry = new THREE.SphereGeometry(planetData.size, 24, 24);
      }

      // Create realistic material based on planet type
      let material: THREE.Material;
      
      if (planetData.name === 'Sun') {
        // Sun material with intense glow
        material = new THREE.MeshBasicMaterial({
          color: planetData.color,
        });
      } else if ((planetData as any).metallic !== undefined) {
        // Rocky planets with metallic properties (Mercury)
        material = new THREE.MeshStandardMaterial({
          color: planetData.color,
          emissive: planetData.emissive as number,
          emissiveIntensity: planetData.emissiveIntensity || 0,
          metalness: (planetData as any).metallic || 0,
          roughness: (planetData as any).roughness || 0.7,
        });
      } else {
        // Standard planet material
        material = new THREE.MeshPhongMaterial({
          color: planetData.color,
          emissive: planetData.emissive as number,
          emissiveIntensity: planetData.emissiveIntensity || 0.1,
          shininess: 30,
          transparent: false,
        });
      }

      // Create planet mesh
      const planetMesh = new THREE.Mesh(geometry, material);
      planetMesh.position.x = planetData.distance;
      planetMesh.castShadow = planetData.name !== 'Sun';
      planetMesh.receiveShadow = planetData.name !== 'Sun';
      
      // Apply tilt for Uranus
      if ((planetData as any).tilt) {
        planetMesh.rotation.z = (planetData as any).tilt;
      }
      
      orbit.add(planetMesh);

      // Create atmosphere for planets that have them
      let atmosphere: THREE.Mesh | undefined;
      if ((planetData as any).atmosphere) {
        const atmosphereGeometry = new THREE.SphereGeometry(planetData.size + 0.2, 16, 16);
        const atmosphereMaterial = new THREE.MeshBasicMaterial({
          color: (planetData as any).atmosphereColor || planetData.color,
          transparent: true,
          opacity: planetData.name === 'Sun' ? 0.4 : 0.15,
          side: THREE.BackSide
        });
        atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        planetMesh.add(atmosphere);
      }

      // Create Earth's Moon
      if ((planetData as any).hasMoon) {
        const moonGeometry = new THREE.SphereGeometry(0.27, 12, 12);
        const moonMaterial = new THREE.MeshPhongMaterial({
          color: 0xC0C0C0,
          emissive: 0x111111,
          emissiveIntensity: 0.05
        });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(3, 0, 0);
        moon.castShadow = true;
        moon.receiveShadow = true;
        
        // Moon orbit group
        const moonOrbit = new THREE.Group();
        moonOrbit.add(moon);
        planetMesh.add(moonOrbit);
      }

      // Create Saturn's rings (realistic ice particles)
      let rings: THREE.Mesh | undefined;
      if (planetData.hasRings) {
        const ringGeometry = new THREE.RingGeometry(
          planetData.size + 0.5, 
          planetData.size + 2.5, 
          64
        );
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0xE6D7C1,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide
        });
        rings = new THREE.Mesh(ringGeometry, ringMaterial);
        rings.rotation.x = Math.PI / 2;
        rings.rotation.z = Math.PI / 8; // Slight tilt
        planetMesh.add(rings);
      }

      // Store planet data
      const planet: Planet = {
        mesh: planetMesh,
        orbit: orbit,
        distance: planetData.distance,
        speed: planetData.speed,
        size: planetData.size,
        name: planetData.name,
        rings: rings,
        atmosphere: atmosphere
      };

      planets.push(planet);
    });

    planetsRef.current = planets;
    orbitLinesRef.current = orbitLines;
  };

  // Create asteroid belt between Mars and Jupiter
  const createAsteroidBelt = () => {
    const asteroidCount = 500;
    const asteroidPositions = new Float32Array(asteroidCount * 3);
    const asteroidColors = new Float32Array(asteroidCount * 3);
    
    for (let i = 0; i < asteroidCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 28 + Math.random() * 6; // Between 28-34 units (Mars-Jupiter gap)
      const height = (Math.random() - 0.5) * 2;
      
      asteroidPositions[i * 3] = Math.cos(angle) * distance;
      asteroidPositions[i * 3 + 1] = height;
      asteroidPositions[i * 3 + 2] = Math.sin(angle) * distance;
      
      // Asteroid colors (rocky grey-brown)
      const brightness = 0.3 + Math.random() * 0.4;
      asteroidColors[i * 3] = brightness * 0.8;     // R
      asteroidColors[i * 3 + 1] = brightness * 0.6; // G
      asteroidColors[i * 3 + 2] = brightness * 0.4; // B
    }
    
    const asteroidGeometry = new THREE.BufferGeometry();
    asteroidGeometry.setAttribute('position', new THREE.BufferAttribute(asteroidPositions, 3));
    asteroidGeometry.setAttribute('color', new THREE.BufferAttribute(asteroidColors, 3));
    
    const asteroidMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const asteroidBelt = new THREE.Points(asteroidGeometry, asteroidMaterial);
    solarSystemRef.current?.add(asteroidBelt);
    asteroidBeltRef.current = asteroidBelt;
  };

  // Create meteors flying through space
  const createMeteors = () => {
    const meteors: Meteor[] = [];
    
    for (let i = 0; i < 15; i++) {
      createSingleMeteor(meteors);
    }
    
    meteorsRef.current = meteors;
  };

  const createSingleMeteor = (meteors: Meteor[]) => {
    // Random starting position outside the solar system
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 20;
    const startPos = new THREE.Vector3(
      Math.cos(angle) * distance,
      (Math.random() - 0.5) * 40,
      Math.sin(angle) * distance
    );
    
    // Random target (generally towards the center)
    const targetAngle = angle + (Math.random() - 0.5) * Math.PI;
    const targetDistance = Math.random() * 30;
    const targetPos = new THREE.Vector3(
      Math.cos(targetAngle) * targetDistance,
      (Math.random() - 0.5) * 20,
      Math.sin(targetAngle) * targetDistance
    );
    
    // Meteor geometry and material
    const meteorGeometry = new THREE.SphereGeometry(0.2 + Math.random() * 0.3, 6, 6);
    const meteorMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF6600,
    });
    const meteorMesh = new THREE.Mesh(meteorGeometry, meteorMaterial);
    meteorMesh.position.copy(startPos);
    
    // Create trail effect
    const trailGeometry = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(20 * 3); // 20 trail points
    const trailColors = new Float32Array(20 * 3);
    
    for (let i = 0; i < 20; i++) {
      trailPositions[i * 3] = startPos.x;
      trailPositions[i * 3 + 1] = startPos.y;
      trailPositions[i * 3 + 2] = startPos.z;
      
      const alpha = 1 - (i / 20);
      trailColors[i * 3] = 1;      // R
      trailColors[i * 3 + 1] = 0.4; // G
      trailColors[i * 3 + 2] = 0;   // B
    }
    
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
    
    const trailMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const trail = new THREE.Points(trailGeometry, trailMaterial);
    
    // Calculate velocity
    const velocity = targetPos.clone().sub(startPos).normalize().multiplyScalar(0.8 + Math.random() * 0.4);
    
    const meteor: Meteor = {
      mesh: meteorMesh,
      velocity: velocity,
      life: 0,
      maxLife: 200 + Math.random() * 100,
      trail: trail
    };
    
    solarSystemRef.current?.add(meteorMesh);
    solarSystemRef.current?.add(trail);
    meteors.push(meteor);
  };

  // Update orbit visibility
  useEffect(() => {
    orbitLinesRef.current.forEach(line => {
      if (line.material instanceof THREE.LineBasicMaterial) {
        line.material.opacity = showOrbits ? 0.4 : 0;
      }
    });
  }, [showOrbits]);



  // Animation loop
  const animate = () => {
    animationFrameRef.current = requestAnimationFrame(animate);

    if (rendererRef.current && sceneRef.current && cameraRef.current && isAnimating) {
      // Rotate planets in their orbits
      planetsRef.current.forEach((planet) => {
        if (planet.speed > 0) {
          planet.orbit.rotation.y += planet.speed * animationSpeed * 0.01;
        }
        
        // Individual planet rotation (realistic slow spin)
        planet.mesh.rotation.y += 0.003 * animationSpeed;

        // Ring rotation for Saturn
        if (planet.rings) {
          planet.rings.rotation.z += 0.005 * animationSpeed;
        }

        // Moon rotation for Earth
        if (planet.name === 'Earth') {
          const moonOrbit = planet.mesh.children.find(child => child instanceof THREE.Group);
          if (moonOrbit) {
            moonOrbit.rotation.y += 0.02 * animationSpeed; // Moon orbits faster
          }
        }
      });

      // Animate meteors
      if (showMeteors) {
        meteorsRef.current.forEach((meteor, index) => {
          meteor.life += animationSpeed;
          
          if (meteor.life < meteor.maxLife) {
            // Update meteor position
            meteor.mesh.position.add(meteor.velocity.clone().multiplyScalar(animationSpeed));
            
            // Update trail
            const positions = meteor.trail.geometry.attributes.position.array as Float32Array;
            const colors = meteor.trail.geometry.attributes.color.array as Float32Array;
            
            // Shift trail positions
            for (let i = positions.length - 3; i >= 3; i -= 3) {
              positions[i] = positions[i - 3];
              positions[i + 1] = positions[i - 2];
              positions[i + 2] = positions[i - 1];
            }
            
            // Add new position at front
            positions[0] = meteor.mesh.position.x;
            positions[1] = meteor.mesh.position.y;
            positions[2] = meteor.mesh.position.z;
            
            // Update trail colors (fade out over distance)
            for (let i = 0; i < colors.length; i += 3) {
              const alpha = 1 - (i / (3 * 20));
              colors[i] = alpha;     // R
              colors[i + 1] = alpha * 0.4; // G
              colors[i + 2] = 0;     // B
            }
            
            meteor.trail.geometry.attributes.position.needsUpdate = true;
            meteor.trail.geometry.attributes.color.needsUpdate = true;
          } else {
            // Remove old meteor and create new one
            solarSystemRef.current?.remove(meteor.mesh);
            solarSystemRef.current?.remove(meteor.trail);
            meteor.mesh.geometry.dispose();
            (meteor.mesh.material as THREE.Material).dispose();
            meteor.trail.geometry.dispose();
            (meteor.trail.material as THREE.Material).dispose();
            
            meteorsRef.current.splice(index, 1);
            createSingleMeteor(meteorsRef.current);
          }
        });
      }

      // Rotate asteroid belt slowly
      if (asteroidBeltRef.current) {
        asteroidBeltRef.current.rotation.y += 0.0005 * animationSpeed;
      }

      // System rotation based on mouse
      if (solarSystemRef.current) {
        solarSystemRef.current.rotation.x = systemRotation.x;
        solarSystemRef.current.rotation.y += 0.001 * animationSpeed; // Slow auto rotation
      }



      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    } else if (rendererRef.current && sceneRef.current && cameraRef.current) {
      // Still render when paused but don't animate
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;

    const deltaX = e.clientX - mousePosition.x;
    const deltaY = e.clientY - mousePosition.y;

    setSystemRotation(prev => ({
      x: Math.max(-Math.PI/2, Math.min(Math.PI/2, prev.x - deltaY * 0.01)),
      y: prev.y + deltaX * 0.01
    }));

    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (!cameraRef.current) return;
    
    const delta = e.deltaY * 0.1;
    const distance = cameraRef.current.position.distanceTo(new THREE.Vector3(0, 0, 0));
    
    if (distance + delta > 20 && distance + delta < 200) {
      cameraRef.current.position.multiplyScalar(1 + delta / distance);
    }
  };

  // Focus on planet
  const focusOnPlanet = (planetName: string) => {
    const planet = planetsRef.current.find(p => p.name === planetName);
    if (!planet || !cameraRef.current) return;

    setFocusedPlanet(planetName);
    
    // Smooth camera transition to planet
    const targetDistance = planet.size * 8;
    const currentPos = cameraRef.current.position.clone();
    const planetWorldPos = new THREE.Vector3();
    planet.mesh.getWorldPosition(planetWorldPos);
    
    const direction = planetWorldPos.clone().sub(currentPos).normalize();
    const newPos = planetWorldPos.clone().sub(direction.multiplyScalar(targetDistance));
    
    // Simple lerp to new position
    const steps = 60;
    let step = 0;
    
    const animateCamera = () => {
      if (step < steps && cameraRef.current) {
        step++;
        const progress = step / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        cameraRef.current.position.lerpVectors(currentPos, newPos, easeProgress);
        cameraRef.current.lookAt(planetWorldPos);
        
        if (step < steps) {
          requestAnimationFrame(animateCamera);
        }
      }
    };
    
    animateCamera();
  };

  // Reset camera
  const resetCamera = () => {
    if (!cameraRef.current) return;
    
    setFocusedPlanet('');
    
    const targetPos = new THREE.Vector3(0, 30, 80);
    const currentPos = cameraRef.current.position.clone();
    
    const steps = 60;
    let step = 0;
    
    const animateCamera = () => {
      if (step < steps && cameraRef.current) {
        step++;
        const progress = step / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        cameraRef.current.position.lerpVectors(currentPos, targetPos, easeProgress);
        cameraRef.current.lookAt(0, 0, 0);
        
        if (step < steps) {
          requestAnimationFrame(animateCamera);
        }
      }
    };
    
    animateCamera();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black mb-4 text-primary tracking-tight">
            SOLAR
            <br />
            <span className="text-concrete ml-8">SYSTEM</span>
          </h1>
          <p className="text-xl md:text-2xl text-steel max-w-2xl font-bold">
            Realistic 3D solar system with authentic planet colors, 
            atmospheric effects, asteroid belt, and meteor showers.
          </p>
        </div>
      </div>

      {/* 3D Solar System Container */}
      <div 
        ref={mountRef}
        className="fixed inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={() => {
          setFocusedPlanet('');
        }}
        style={{ zIndex: 1 }}
      />

      {/* Control Panel */}
      <div className="fixed bottom-8 left-8 z-20 space-y-4">
        <div className="bg-background/90 backdrop-blur-sm p-6 border-2 border-primary">
          <h3 className="text-lg font-black text-primary mb-4">SYSTEM CONTROLS</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={`px-3 py-2 font-bold border-2 transition-all text-sm ${
                  isAnimating 
                    ? 'bg-primary text-background border-primary' 
                    : 'bg-background text-primary border-primary hover:bg-primary hover:text-background'
                }`}
              >
                {isAnimating ? 'PAUSE' : 'PLAY'}
              </button>
              
              <button
                onClick={() => setShowOrbits(!showOrbits)}
                className={`px-3 py-2 font-bold border-2 transition-all text-sm ${
                  showOrbits 
                    ? 'bg-concrete text-background border-concrete' 
                    : 'bg-background text-concrete border-concrete hover:bg-concrete hover:text-background'
                }`}
              >
                ORBITS
              </button>
              
              <button
                onClick={() => setShowMeteors(!showMeteors)}
                className={`px-3 py-2 font-bold border-2 transition-all text-sm col-span-2 ${
                  showMeteors 
                    ? 'bg-steel text-background border-steel' 
                    : 'bg-background text-steel border-steel hover:bg-steel hover:text-background'
                }`}
              >
                METEORS
              </button>
          </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-steel">SPEED:</span>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-bold text-primary w-8">{animationSpeed.toFixed(1)}</span>
      </div>

            <button
              onClick={resetCamera}
              className="w-full px-4 py-2 font-bold border-2 border-steel text-steel hover:bg-steel hover:text-background transition-all"
            >
              RESET VIEW
            </button>
          </div>
        </div>


      </div>

      {/* Planet Selection */}
      <div className="fixed top-8 right-8 z-20">
        <div className="bg-background/90 backdrop-blur-sm p-6 border-2 border-concrete max-w-xs">
          <h3 className="text-lg font-black text-concrete mb-4">NAVIGATE</h3>
          <div className="grid grid-cols-2 gap-2">
            {PLANETS_DATA.map((planet) => (
              <button
                key={planet.name}
                onClick={() => focusOnPlanet(planet.name)}
                className={`px-3 py-2 text-sm font-bold border transition-all ${
                  focusedPlanet === planet.name
                    ? 'bg-primary text-background border-primary'
                    : 'bg-background text-foreground border-steel hover:border-primary hover:text-primary'
                }`}
              >
                {planet.name.toUpperCase()}
              </button>
              ))}
            </div>
          </div>
      </div>

        {/* Planet Info */}
        {focusedPlanet && (
          <div className="bg-primary/90 text-background p-4 border-2 border-primary max-w-xs">
            <h4 className="font-black text-lg mb-2">{focusedPlanet.toUpperCase()}</h4>
            <p className="text-sm font-bold">
              {PLANETS_DATA.find(p => p.name === focusedPlanet)?.info}
            </p>
          </div>
        )}

      {/* Instructions */}
      <div className="fixed bottom-8 right-8 z-20">
        <div className="bg-steel/90 text-background p-4 border-2 border-steel max-w-xs">
          <h4 className="font-black mb-2">INTERACTION:</h4>
          <ul className="text-sm space-y-1 font-bold">
            <li>• DRAG to rotate system</li>
            <li>• SCROLL to zoom in/out</li>
            <li>• CLICK planets to focus</li>

            <li>• TOGGLE meteors & orbits</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mystery;