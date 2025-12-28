import React, { useEffect, useRef, useState } from 'react';
import BlindSpotDashboard from './BlindSpotDashboard';

interface LandingPageProps {
  onNavigateToDashboard: () => void;
  onNavigateToContact?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToDashboard, onNavigateToContact }) => {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const manifestoCanvasRef = useRef<HTMLCanvasElement>(null);
  const manifestoSectionRef = useRef<HTMLElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isYearlyBilling, setIsYearlyBilling] = useState(true);

  // Smooth scroll helper with navbar offset
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Initialize Three.js 3D Background
    if (heroCanvasRef.current && heroSectionRef.current && window.THREE) {
      const canvas = heroCanvasRef.current;
      const section = heroSectionRef.current;
      const scene = new window.THREE.Scene();

      // Get dimensions from the section element
      const width = section.offsetWidth;
      const height = section.offsetHeight;

      const camera = new window.THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new window.THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Create particle system
      const particlesGeometry = new window.THREE.BufferGeometry();
      const particlesCount = 8000;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 12;
      }

      particlesGeometry.setAttribute('position', new window.THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new window.THREE.PointsMaterial({
        size: 0.015,
        color: 0x10B981,
        transparent: true,
        opacity: 1,
        blending: window.THREE.AdditiveBlending
      });

      const particlesMesh = new window.THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      // Add rotating wireframe torus
      const torusGeometry = new window.THREE.TorusGeometry(1.5, 0.4, 16, 100);
      const torusMaterial = new window.THREE.MeshBasicMaterial({
        color: 0x10B981,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      const torus = new window.THREE.Mesh(torusGeometry, torusMaterial);
      scene.add(torus);

      // Add wireframe spheres for more visual interest
      const sphere1Geometry = new window.THREE.SphereGeometry(0.8, 16, 16);
      const sphere1Material = new window.THREE.MeshBasicMaterial({
        color: 0x10B981,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const sphere1 = new window.THREE.Mesh(sphere1Geometry, sphere1Material);
      sphere1.position.set(-2, 1, -1);
      scene.add(sphere1);

      const sphere2Geometry = new window.THREE.SphereGeometry(0.5, 12, 12);
      const sphere2Material = new window.THREE.MeshBasicMaterial({
        color: 0x10B981,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      const sphere2 = new window.THREE.Mesh(sphere2Geometry, sphere2Material);
      sphere2.position.set(2, -1, -2);
      scene.add(sphere2);

      camera.position.z = 3;

      // Mouse movement effect
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate particles (reduced by 40%)
        particlesMesh.rotation.y += 0.0006;
        particlesMesh.rotation.x += 0.0003;

        // Rotate torus (reduced by 40%)
        torus.rotation.x += 0.006;
        torus.rotation.y += 0.003;

        // Rotate spheres (reduced by 40%)
        sphere1.rotation.x += 0.0048;
        sphere1.rotation.y += 0.0072;
        sphere2.rotation.x -= 0.0036;
        sphere2.rotation.y -= 0.0054;

        // Mouse parallax effect
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        const newWidth = section.offsetWidth;
        const newHeight = section.offsetHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    }

  }, []);

  // 3D Background for Value Manifesto Section
  useEffect(() => {
    if (manifestoCanvasRef.current && manifestoSectionRef.current && window.THREE) {
      const canvas = manifestoCanvasRef.current;
      const section = manifestoSectionRef.current;
      const scene = new window.THREE.Scene();

      const width = section.offsetWidth;
      const height = section.offsetHeight;

      const camera = new window.THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      const renderer = new window.THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Create abstract connection particles - suggesting reaching/connection
      const particlesGeometry = new window.THREE.BufferGeometry();
      const particlesCount = 5000;
      const posArray = new Float32Array(particlesCount * 3);
      
      // Create particles in two clusters (suggesting two entities connecting)
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        // Left cluster
        if (i < particlesCount / 2) {
          posArray[i3] = (Math.random() - 0.5) * 4 - 2;
          posArray[i3 + 1] = (Math.random() - 0.5) * 3;
          posArray[i3 + 2] = (Math.random() - 0.5) * 2;
        } 
        // Right cluster
        else {
          posArray[i3] = (Math.random() - 0.5) * 4 + 2;
          posArray[i3 + 1] = (Math.random() - 0.5) * 3;
          posArray[i3 + 2] = (Math.random() - 0.5) * 2;
        }
      }

      particlesGeometry.setAttribute('position', new window.THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new window.THREE.PointsMaterial({
        size: 0.02,
        color: 0x10B981,
        transparent: true,
        opacity: 0.6,
        blending: window.THREE.AdditiveBlending
      });

      const particlesMesh = new window.THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      // Add abstract wireframe shapes suggesting connection
      // Left side - abstract form
      const leftGeometry = new window.THREE.OctahedronGeometry(1.2, 1);
      const leftMaterial = new window.THREE.MeshBasicMaterial({
        color: 0x10B981,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const leftMesh = new window.THREE.Mesh(leftGeometry, leftMaterial);
      leftMesh.position.set(-3, 0, -2);
      scene.add(leftMesh);

      // Right side - abstract form
      const rightGeometry = new window.THREE.OctahedronGeometry(1.2, 1);
      const rightMaterial = new window.THREE.MeshBasicMaterial({
        color: 0x10B981,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const rightMesh = new window.THREE.Mesh(rightGeometry, rightMaterial);
      rightMesh.position.set(3, 0, -2);
      scene.add(rightMesh);

      // Connecting bridge/arc between them
      const arcPoints = [];
      for (let i = 0; i <= 50; i++) {
        const t = i / 50;
        const x = -3 + (t * 6);
        const y = Math.sin(t * Math.PI) * 1.5;
        const z = -2 + Math.sin(t * Math.PI) * 0.5;
        arcPoints.push(new window.THREE.Vector3(x, y, z));
      }
      const arcGeometry = new window.THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMaterial = new window.THREE.LineBasicMaterial({
        color: 0x10B981,
        transparent: true,
        opacity: 0.4
      });
      const arcLine = new window.THREE.Line(arcGeometry, arcMaterial);
      scene.add(arcLine);

      // Add flowing particles along the connection
      const connectionParticlesGeometry = new window.THREE.BufferGeometry();
      const connectionCount = 100;
      const connectionPosArray = new Float32Array(connectionCount * 3);
      const connectionTimeOffsets = new Float32Array(connectionCount);
      
      for (let i = 0; i < connectionCount; i++) {
        connectionTimeOffsets[i] = Math.random() * Math.PI * 2;
        const i3 = i * 3;
        connectionPosArray[i3] = 0;
        connectionPosArray[i3 + 1] = 0;
        connectionPosArray[i3 + 2] = 0;
      }
      connectionParticlesGeometry.setAttribute('position', new window.THREE.BufferAttribute(connectionPosArray, 3));
      
      const connectionMaterial = new window.THREE.PointsMaterial({
        size: 0.05,
        color: 0x10B981,
        transparent: true,
        opacity: 0.8,
        blending: window.THREE.AdditiveBlending
      });
      const connectionParticles = new window.THREE.Points(connectionParticlesGeometry, connectionMaterial);
      scene.add(connectionParticles);

      camera.position.z = 6;
      camera.position.y = 0.5;

      let time = 0;
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        time += 0.01;

        // Rotate abstract forms
        leftMesh.rotation.x += 0.002;
        leftMesh.rotation.y += 0.003;
        rightMesh.rotation.x -= 0.002;
        rightMesh.rotation.y -= 0.003;

        // Animate particles slowly
        particlesMesh.rotation.y += 0.0005;

        // Animate connection particles along the arc
        const positions = connectionParticlesGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < connectionCount; i++) {
          const t = ((time * 0.5 + connectionTimeOffsets[i]) % (Math.PI * 2)) / (Math.PI * 2);
          const i3 = i * 3;
          positions[i3] = -3 + (t * 6);
          positions[i3 + 1] = Math.sin(t * Math.PI) * 1.5;
          positions[i3 + 2] = -2 + Math.sin(t * Math.PI) * 0.5;
        }
        connectionParticlesGeometry.attributes.position.needsUpdate = true;

        // Subtle camera movement
        camera.position.x = Math.sin(time * 0.3) * 0.5;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        const newWidth = section.offsetWidth;
        const newHeight = section.offsetHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.svg" 
                alt="First Up Financial" 
                className="h-24 w-auto"
                style={{ maxHeight: '96px' }}
              />
            </div>

            <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
              <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} className="text-gray-200 hover:text-white transition-colors cursor-pointer">Features</a>
              <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} className="text-gray-200 hover:text-white transition-colors cursor-pointer">How It Works</a>
              <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')} className="text-gray-200 hover:text-white transition-colors cursor-pointer">Pricing</a>
              <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')} className="text-gray-200 hover:text-white transition-colors cursor-pointer">FAQ</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToContact ? onNavigateToContact() : onNavigateToDashboard(); }} className="text-gray-200 hover:text-white transition-colors cursor-pointer">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={onNavigateToDashboard} className="hidden md:block text-gray-200 hover:text-white transition-colors text-sm font-medium">
                Sign In
              </button>
              <button onClick={onNavigateToDashboard} className="bg-accent text-black px-6 py-2 rounded-lg font-semibold text-sm hover:bg-white transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Background */}
      <section ref={heroSectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
        <canvas ref={heroCanvasRef} className="absolute inset-0 w-full h-full z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/60 to-[#050505]/90 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider">Beyond The Big 3</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-6 text-white">
              Take Control of
              <br />
              <span className="text-accent">
                Your Credit Data
              </span>
            </h1>

            <p className="text-xl font-semibold leading-relaxed mb-10 max-w-xl" style={{ color: '#ffffff' }}>
              Whatever your financial goals, start here. Access up-to-date credit insights, chart your path to freedom, and connect with industry-vetted partners on a fully secure platform.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button onClick={onNavigateToDashboard} className="bg-accent text-black px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all flex items-center gap-2 group">
                <span>Access Freeze Hub</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button onClick={() => setIsVideoModalOpen(true)} className="border-2 border-white/40 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all">
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              <a href="#" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-2.5 rounded-lg hover:bg-white/20 transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-none">Download on the</span>
                  <span className="text-sm font-semibold leading-none mt-0.5">App Store</span>
                </div>
              </a>
              <a href="#" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-2.5 rounded-lg hover:bg-white/20 transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-none">GET IT ON</span>
                  <span className="text-sm font-semibold leading-none mt-0.5">Google Play</span>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces&auto=format&q=80'
                ].map((imageUrl, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050505] overflow-hidden bg-gray-700">
                    <img 
                      src={imageUrl} 
                      alt={`User ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to letter if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className = 'w-10 h-10 rounded-full bg-accent/20 border-2 border-[#050505] flex items-center justify-center text-xs font-bold text-accent';
                          parent.textContent = String.fromCharCode(65 + i);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">2,400+ users</p>
                <p className="text-xs font-bold" style={{ color: '#ffffff' }}>protected and counting</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="glass-panel spotlight-card rounded-xl p-6 border border-white/10 w-full relative overflow-hidden" style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur-xl' }}>
              <BlindSpotDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="trust-section pt-16 pb-0 border-y border-white/10 relative" style={{ background: '#050505' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-50">
          <p className="text-center text-base font-mono uppercase tracking-widest mb-0 pb-4 relative z-50 font-bold" style={{ color: '#ffffff' }}>
            Trusted By Financial Institutions
          </p>
        </div>
      </section>

      {/* Agency Marquee */}
      <div className="border-y border-white/5 bg-[#080808] pt-0 pb-8 relative z-20 overflow-hidden marquee-mask w-full">
        <div className="flex whitespace-nowrap animate-marquee" style={{ width: 'max-content' }}>
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex gap-20 px-10 items-center">
              <span className="font-display font-semibold text-2xl hover:text-danger transition-colors" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>CHEXSYSTEMS</span>
              <span className="font-display font-semibold text-2xl hover:text-warning transition-colors" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>INNOVIS</span>
              <span className="font-display font-semibold text-2xl hover:text-accent transition-colors" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>NCTUE</span>
              <span className="font-display font-semibold text-2xl hover:text-blue-400 transition-colors" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>LEXISNEXIS</span>
              <span className="font-display font-semibold text-2xl hover:text-purple-400 transition-colors" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>TELETRACK</span>
            </div>
          ))}
        </div>
      </div>

      {/* Value Manifesto Section */}
      <section ref={manifestoSectionRef} id="features" className="features-section py-16 px-6 relative z-20 overflow-hidden" style={{ background: '#050505' }}>
        <canvas ref={manifestoCanvasRef} className="absolute inset-0 w-full h-full z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/80 to-[#050505]/95 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 border-b border-white/10 pb-8 relative z-10">
            <span className="text-accent font-mono text-xs tracking-widest block mb-2">/// VALUE MANIFESTO</span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight" style={{ color: '#ffffff' }}>Who We Are</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-6 relative z-10">
            {/* Hero Card - Game Changer Statement */}
            <div className="md:col-span-2 md:row-span-2 glass-panel rounded-xl overflow-hidden relative" style={{ background: 'rgba(10, 10, 10, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="scan-line"></div>
              <div className="relative p-8 z-10 h-full flex flex-col justify-between min-h-[400px]">
                <div>
                  <h3 className="font-display font-bold text-3xl md:text-4xl mb-4 tracking-tight" style={{ color: '#ffffff' }}>
                    THE SYSTEM HAS A BLIND SPOT.
                  </h3>
                  <h4 className="font-display font-semibold text-xl md:text-2xl mb-6 tracking-tight" style={{ color: '#ffffff' }}>
                    WE ARE YOUR EYES.
                  </h4>
                  <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Lenders, banks, and insurers assess you using 'Secondary Data' that standard apps ignore.
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                    <div className="mb-3">
                      <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Standard Apps</p>
                      <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>3 Bureaus Only</p>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'rgba(16, 185, 129, 0.8)' }}>First Up</p>
                      <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>3 Bureaus + ChexSystems + LexisNexis + Innovis</p>
                    </div>
                  </div>
                </div>
                {/* First Up™ Architecture Watermark/Seal */}
                <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 blur-xl"></div>
                    <span className="relative text-accent font-mono text-sm font-semibold tracking-wider" style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
                      First Up™ Architecture
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 1: Unlocking Capital */}
            <div className="md:col-span-1 glass-panel rounded-xl p-6 flex flex-col justify-between min-h-[200px]" style={{ background: 'rgba(10, 10, 10, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-accent/20 border border-accent/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xs font-mono mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>ChexSystems</p>
                <h3 className="font-display font-bold text-lg md:text-xl mb-3" style={{ color: '#ffffff' }}>Unlocking Capital</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Our platform identifies and challenges erroneous ChexSystems data that can block banking access. You control the process through our dispute tools.
                </p>
              </div>
            </div>

            {/* Pillar 2: Securing The Keys */}
            <div className="md:col-span-1 glass-panel rounded-xl p-6 flex flex-col justify-between min-h-[200px]" style={{ background: 'rgba(10, 10, 10, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-accent/20 border border-accent/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xs font-mono mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Innovis</p>
                <h3 className="font-display font-bold text-lg md:text-xl mb-3" style={{ color: '#ffffff' }}>Securing The Keys</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Mortgage underwriters check data that standard apps don't show. Our platform audits your Innovis profile for accuracy and provides tools to correct errors.
                </p>
              </div>
            </div>

            {/* Pillar 3: Preserving Wealth */}
            <div className="md:col-span-1 glass-panel rounded-xl p-6 flex flex-col justify-between min-h-[200px]" style={{ background: 'rgba(10, 10, 10, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-accent/20 border border-accent/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.11 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xs font-mono mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>LexisNexis</p>
                <h3 className="font-display font-bold text-lg md:text-xl mb-3" style={{ color: '#ffffff' }}>Preserving Wealth</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Our platform identifies LexisNexis data errors that may inflate your premiums. Access dispute tools to challenge inaccurate information and maintain accurate reporting.
                </p>
              </div>
            </div>

            {/* Support Card - Understanding & Guidance */}
            <div className="md:col-span-1 glass-panel rounded-xl p-6 flex flex-col justify-between min-h-[200px]" style={{ background: 'rgba(10, 10, 10, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div>
                <div className="w-10 h-10 bg-accent/20 border border-accent/30 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl mb-2" style={{ color: '#ffffff' }}>We Understand</h3>
                <p className="text-xs font-mono mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>The Firstup Financial Promise</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Sometimes these challenges aren't your fault. Life happens. We believe all you need is a boost—a clear guide to make things right. That's what we're here for.
                </p>
              </div>
            </div>

            {/* Threat Intelligence Bar - Authoritative Research Data */}
            <div className="md:col-span-4 glass-panel rounded-xl p-6 border" style={{ 
              background: '#111111', 
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(251, 146, 60, 0.2)',
              boxShadow: '0 0 15px rgba(251, 146, 60, 0.08), inset 0 0 15px rgba(251, 146, 60, 0.03)'
            }}>
              <div className="mb-8">
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: '#ffffff' }}>Did you know?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1: Identity Theft Velocity */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5" style={{ color: 'rgba(251, 146, 60, 0.8)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>IDENTITY THEFT VELOCITY</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-4xl font-display font-bold" style={{ color: '#ffffff' }}>
                      Every 4 Seconds
                    </span>
                  </div>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    A new identity theft victim occurs in the US.
                  </p>
                  <p className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                    Source: ITRC & FTC historical analysis data.
                  </p>
                </div>

                {/* Column 2: Annual Fraud Reports */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5" style={{ color: 'rgba(251, 146, 60, 0.8)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l4-4 4 4 5-5M3 21V9a2 2 0 012-2h14a2 2 0 012 2v12" />
                    </svg>
                    <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>ANNUAL FRAUD REPORTS</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-4xl font-display font-bold" style={{ color: '#ffffff' }}>
                      5.7 Million+
                    </span>
                  </div>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Total fraud and identity reports filed annually.
                  </p>
                  <p className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                    Source: FTC Consumer Sentinel Network Data Book (2023).
                  </p>
                </div>

                {/* Column 3: Projected Lifetime Impact */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5" style={{ color: 'rgba(251, 146, 60, 0.8)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-3h6m-9 0a9 9 0 1118 0 9 9 0 01-18 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16l-3-3m0 0l3-3m-3 3h6" />
                    </svg>
                    <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>PROJECTED LIFETIME IMPACT</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-4xl font-display font-bold" style={{ color: '#ffffff' }}>
                      ~$400,000
                    </span>
                  </div>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Estimated average cost of sustained poor credit.
                  </p>
                  <p className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                    Source: Industry analysis on long-term subprime lending costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge: Connection Between Problem and Solution */}
      <section className="py-16 px-6 relative" style={{ background: '#050505' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-display font-semibold leading-relaxed uppercase tracking-wider" style={{ color: '#ffffff' }}>
            BECAUSE THE FINANCIAL SYSTEM HIDES DATA FROM YOU, WE BUILT THE COMMAND CENTER TO GIVE YOU FULL VISIBILITY.
          </p>
        </div>
      </section>

      {/* Premium Transition Element */}
      <div className="relative w-full overflow-hidden" style={{ background: '#050505', height: '24px' }}>
        {/* Animated Gradient Lines */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1200 24" preserveAspectRatio="none">
            <defs>
              <linearGradient id="transitionGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="transitionGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" stopOpacity="0" />
                <stop offset="50%" stopColor="#34D399" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Flowing Curved Lines */}
            <path
              d="M0,12 Q300,6 600,12 T1200,12"
              stroke="url(#transitionGrad1)"
              strokeWidth="1"
              fill="none"
              className="transition-line-1"
              style={{ filter: 'url(#glow)' }}
            />
            <path
              d="M0,14 Q300,8 600,14 T1200,14"
              stroke="url(#transitionGrad2)"
              strokeWidth="0.75"
              fill="none"
              className="transition-line-2"
              style={{ filter: 'url(#glow)' }}
            />
            <path
              d="M0,10 Q300,16 600,10 T1200,10"
              stroke="url(#transitionGrad2)"
              strokeWidth="0.75"
              fill="none"
              className="transition-line-3"
              style={{ filter: 'url(#glow)' }}
            />
            
            {/* Connecting Dots */}
            {[150, 450, 750, 1050].map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy={12}
                r="1.5"
                fill="#10B981"
                opacity="0.6"
                className="transition-dot"
                style={{ 
                  filter: 'url(#glow)',
                  animation: `pulse 2s ease-in-out infinite ${i * 0.3}s`
                }}
              />
            ))}
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-accent rounded-full transition-particle"
              style={{
                left: `${(i * 20 + 10)}%`,
                top: `${30 + (i % 2) * 40}%`,
                opacity: 0.3,
                animation: `floatParticle ${3 + (i % 2)}s ease-in-out infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-32 h-32 bg-accent/10 rounded-full blur-2xl transition-orb-1"
            style={{
              left: '20%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'orbFloat1 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute w-32 h-32 bg-accent/10 rounded-full blur-2xl transition-orb-2"
            style={{
              right: '20%',
              top: '50%',
              transform: 'translate(50%, -50%)',
              animation: 'orbFloat2 10s ease-in-out infinite'
            }}
          />
        </div>

        {/* Center Accent Line */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-accent/50 to-transparent"></div>

        <style>{`
          @keyframes floatParticle {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
            25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
            50% { transform: translateY(-10px) translateX(-10px); opacity: 0.6; }
            75% { transform: translateY(-30px) translateX(5px); opacity: 0.9; }
          }
          @keyframes orbFloat1 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2) translateX(20px); }
          }
          @keyframes orbFloat2 {
            0%, 100% { transform: translate(50%, -50%) scale(1); }
            50% { transform: translate(50%, -50%) scale(1.2) translateX(-20px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          .transition-line-1 {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: drawLine 6s ease-in-out infinite;
          }
          .transition-line-2 {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: drawLine 8s ease-in-out infinite 1s;
          }
          .transition-line-3 {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: drawLine 7s ease-in-out infinite 0.5s;
          }
          @keyframes drawLine {
            0% { stroke-dashoffset: 200; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { stroke-dashoffset: -200; opacity: 0; }
          }
        `}</style>
      </div>

      {/* How to Start your journey with First up Financial */}
      <section id="how-it-works" className="how-it-works-section py-16 relative overflow-hidden" style={{ background: '#050505' }}>
        {/* SVG Animation Background */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <svg id="svg-stage" xmlns="http://www.w3.org/2000/svg" viewBox="-40 -180 1250 1100" style={{ width: '100%', height: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <path className="mp" fill="none" stroke="url(#grad-accent)" strokeWidth="4" d="M-92 17.713c154.32 237.253 348.7 486.913 585.407 466.93 137.542-17.257 247.733-123.595 279.259-239.307 27.368-100.43-21.323-229.59-140.017-241.76-118.693-12.172-208.268 98.897-231.122 199.803-34.673 151.333 12.324 312.301 125.096 429.074C639.395 749.225 815.268 819.528 995 819" style={{ strokeDasharray: '1000', strokeDashoffset: '1000', animation: 'drawPath 8s ease-in-out infinite' }} />
            
            {/* Waypoint/Flag at branching point (around Step 2 position) */}
            <g className="waypoint" style={{ animation: 'pulse 2s ease-in-out infinite', transform: 'translate(450px, 400px)' }}>
              <path fill="url(#grad-accent)" opacity="0.6" d="M0 0L20 0L20 15L10 25L0 15Z" />
              <path stroke="url(#grad-accent)" strokeWidth="1.5" fill="none" d="M0 0L20 0L20 15L10 25L0 15Z" />
            </g>
            
            <defs>
              <linearGradient id="grad-accent" x1="154" x2="160" y1="49" y2="132" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#10B981"></stop>
                <stop offset="0.5" stopColor="#34D399"></stop>
                <stop offset="1" stopColor="#14B8A6"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-50">
          <div className="text-center mb-16 relative z-50">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight" style={{ color: '#ffffff' }}>
              Your Financial Command Center
            </h2>
            <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: '#ffffff', opacity: 0.8 }}>
              From assessment to automation, manage your financial reputation from a single console.
            </p>
          </div>

          {/* Timeline Path */}
          <div className="max-w-4xl mx-auto relative z-50">
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/60 to-accent/30"></div>
              
              {[
                { 
                  step: '01', 
                  title: 'Initialize Your Console', 
                  description: 'After a secure setup, enter your dashboard. Take the Smart Tour to instantly assess your immediate needs: lockdown your data in the Freeze Hub, pull your real-time reports, or access high-level educational strategy.',
                  icon: 'dashboard'
                },
                { 
                  step: '02', 
                  title: 'Build Your Journey', 
                  description: 'Enter the Journey Center and select your target—whether it is "Buy a House" or "Reach 800 Score." The system automatically populates a step-by-step roadmap aligned specifically with that goal.',
                  icon: 'waypoint'
                },
                { 
                  step: '03', 
                  title: 'Automate Your Momentum', 
                  description: 'Stay on track without the mental load. Sync with your calendar to set automatic 30-day check-ins and receive push notifications when it\'s time to send out your next round of dispute letters.',
                  icon: 'calendar'
                }
              ].map((item, i) => (
                <div key={i} className="relative mb-16 last:mb-0">
                  {/* Timeline Node with Icon */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 top-1/2 w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center z-10 shadow-lg shadow-accent/30">
                    {item.icon === 'dashboard' && (
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                      </svg>
                    )}
                    {item.icon === 'waypoint' && (
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                    )}
                    {item.icon === 'calendar' && (
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-20 md:ml-0 ${i % 2 === 0 ? 'md:mr-[55%] md:text-right' : 'md:ml-[55%] md:text-left'}`}>
                    <div className="mb-2">
                      <span className="text-xs font-mono text-accent font-bold uppercase tracking-widest">Step {item.step}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-3" style={{ color: '#ffffff' }}>{item.title}</h3>
                    <p className="text-base leading-relaxed" style={{ color: '#ffffff', opacity: 0.85 }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes drawPath {
            0% {
              stroke-dashoffset: 1000;
            }
            50% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -1000;
            }
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 0.6;
              transform: translate(450px, 400px) scale(1);
            }
            50% {
              opacity: 1;
              transform: translate(450px, 400px) scale(1.1);
            }
          }
          .mp {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: drawPath 8s ease-in-out infinite;
          }
          .waypoint {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing-section py-24 px-6 lg:px-12 relative overflow-hidden">
        {/* High contrast background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a]"></div>
        
        {/* Grid pattern for texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Contrasting accent areas */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/10 to-transparent"></div>
        </div>
        
        {/* Subtle radial gradients for depth */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-50">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-16 relative z-50">
            <div>
              <h2 className="text-sm uppercase tracking-widest font-mono mb-4" style={{ color: '#ffffff', opacity: 0.6 }}>PRICING</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight" style={{ color: '#ffffff' }}>
                Start free<br />
                <span style={{ opacity: 0.6 }}>Upgrade to scale</span>
              </h3>
            </div>
            {/* Billing Cycle Toggle */}
            <div className="mt-6 md:mt-0">
              <div className="text-xs uppercase tracking-widest font-mono mb-3" style={{ color: '#ffffff', opacity: 0.6 }}>BILLING CYCLE</div>
              <div className="flex gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
                <button 
                  onClick={() => setIsYearlyBilling(false)}
                  className="px-4 py-2 rounded text-sm font-medium transition-all" 
                  style={{ color: '#ffffff', opacity: isYearlyBilling ? 0.6 : 1, background: isYearlyBilling ? 'transparent' : 'rgba(255, 255, 255, 0.1)' }}
                >
                  MONTHLY
                </button>
                <button 
                  onClick={() => setIsYearlyBilling(true)}
                  className="px-4 py-2 rounded text-sm font-medium transition-all" 
                  style={{ color: '#ffffff', opacity: isYearlyBilling ? 1 : 0.6, background: isYearlyBilling ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }}
                >
                  YEARLY
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-50">
            {[
              {
                name: 'Starter',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                ),
                description: 'For individuals to access freeze links and guides',
                price: '$0',
                buttonText: 'Get Started',
                buttonStyle: 'bg-white/10 border border-white/20 text-white hover:bg-white/20',
                featureHeader: "WHAT'S INCLUDED",
                features: [
                  'Freeze Link Directory',
                  'Educational Guides',
                  'Community Support'
                ]
              },
              {
                name: 'Protected',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12M6.157 7.582A8.959 8.959 0 003 12m3.157-4.418A11.953 11.953 0 0112 10.5c2.998 0 5.74-1.1 7.843-2.918M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
                  </svg>
                ),
                popular: true,
                badge: isYearlyBilling ? 'SAVE 25%' : undefined,
                description: 'For users who want full protection and partner access',
                price: isYearlyBilling ? '$219.99' : '$19.99',
                priceDetails: isYearlyBilling ? 'PER USER/YEAR' : 'PER USER/MONTH',
                buttonText: 'Start free 7 day trial',
                buttonStyle: 'bg-accent text-black hover:bg-accent/90',
                featureHeader: 'EVERYTHING IN STARTER, PLUS',
                features: [
                  'Journey Credit Guide',
                  'Alerts',
                  'Premium Educational Content (Business Credit & Consumer Law)'
                ]
              },
              {
                name: 'Enterprise',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15m-15 18v-9m15 9v-9M4.5 3l7.5 9m0 0l7.5-9M12 12v9" />
                  </svg>
                ),
                description: 'Built for small to medium size enterprises. Great for educational institutions—discounting available.',
                price: 'Custom',
                buttonText: 'Contact sales',
                buttonStyle: 'bg-white/10 border border-white/20 text-white hover:bg-white/20',
                featureHeader: 'EVERYTHING IN PROTECTED, PLUS',
                features: [
                  'White-label Solution',
                  'API Access',
                  'Dedicated Support',
                  'SLA Guarantee',
                  'Custom Integrations'
                ]
              }
            ].map((plan, i) => (
              <div key={i} className={`pricing-card rounded-lg p-8 border relative transition-all backdrop-blur-sm ${plan.popular ? 'border-accent/40 bg-accent/10 shadow-lg shadow-accent/20' : 'border-white/20 bg-white/10 shadow-lg'}`} style={{ opacity: 1 }}>
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-6 bg-accent text-black px-3 py-1 rounded text-xs font-bold uppercase">
                    {plan.badge}
                  </div>
                )}
                
                {/* Icon */}
                <div className="mb-6" style={{ color: '#ffffff' }}>
                  {plan.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-display font-bold mb-2" style={{ color: '#ffffff' }}>{plan.name}</h3>
                
                {/* Description */}
                <p className="text-sm mb-6" style={{ color: '#ffffff', opacity: 0.7 }}>{plan.description}</p>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-display font-bold" style={{ color: '#ffffff' }}>{plan.price}</span>
                  </div>
                  {plan.priceDetails && (
                    <p className="text-xs uppercase tracking-wide" style={{ color: '#ffffff', opacity: 0.6 }}>{plan.priceDetails}</p>
                  )}
                </div>
                
                {/* Button */}
                <button
                  onClick={plan.price === '$0' ? onNavigateToDashboard : undefined}
                  className={`w-full py-3 rounded-lg font-semibold transition-all text-sm mb-8 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
                
                {/* Features */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-mono mb-4" style={{ color: '#ffffff', opacity: 0.6 }}>
                    {plan.featureHeader}
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm" style={{ color: '#ffffff', opacity: 0.9 }}>
                        <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section py-24 relative overflow-hidden">
        {/* Subtle background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505] to-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-50">
          <div className="text-center mb-16 relative z-50">
            <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4" style={{ color: '#ffffff' }}>
              What Our Users Say
            </h2>
          </div>

          {/* Main Testimonial Card */}
          <div className="relative z-50 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 md:p-12 relative overflow-hidden">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50"></div>
              
              <div className="relative z-10">
                {/* Quote */}
                <div className="mb-8">
                  <svg className="w-12 h-12 text-accent mb-4 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-xl md:text-2xl leading-relaxed font-light italic" style={{ color: '#ffffff' }}>
                    After my identity was stolen, First Up helped me freeze everything at all four agencies. The process was straightforward, and I finally feel secure again. Their partner network even helped me get a second chance banking account.
                  </p>
                </div>
                
                {/* Author Info */}
                <div className="pt-6 border-t border-white/10">
                  <p className="font-semibold text-lg mb-1" style={{ color: '#ffffff' }}>Sarah M.</p>
                  <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.7 }}>Identity Theft Survivor</p>
                  <p className="text-xs" style={{ color: '#ffffff', opacity: 0.5 }}>San Diego, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation and Additional Testimonials */}
          <div className="flex items-center justify-between relative z-50">
            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all" style={{ color: '#ffffff' }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all" style={{ color: '#ffffff' }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* See All Stories Link */}
            <a href="#" className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#ffffff' }}>
              See all stories
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Additional Testimonials Grid (Smaller Cards Below) */}
          <div className="grid md:grid-cols-2 gap-6 mt-12 relative z-50">
            {[
              {
                name: 'James K.',
                role: 'Second Chance Banking',
                location: 'Phoenix, AZ',
                quote: 'ChexSystems had me blacklisted for years. Their partner network helped me get a checking account again.'
              },
              {
                name: 'Maria L.',
                role: 'Privacy Advocate',
                location: 'Austin, TX',
                quote: 'Complete data sovereignty. This is what financial privacy should look like in 2024.'
              }
            ].map((testimonial, i) => (
              <div key={i} className="testimonial-card p-6 rounded-lg border border-white/10 bg-white/5 relative z-50" style={{ opacity: 1 }}>
                <p className="leading-relaxed mb-6 text-base" style={{ color: '#ffffff', opacity: 0.9 }}>
                  "{testimonial.quote}"
                </p>
                <div className="relative z-50 pt-4 border-t border-white/10">
                  <p className="font-semibold text-sm mb-1" style={{ color: '#ffffff' }}>{testimonial.name}</p>
                  <p className="text-xs mb-1" style={{ color: '#ffffff', opacity: 0.7 }}>{testimonial.role}</p>
                  <p className="text-xs" style={{ color: '#ffffff', opacity: 0.5 }}>{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 relative" style={{ background: '#050505' }}>
        <div className="max-w-4xl mx-auto text-center relative z-50">
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6" style={{ color: '#ffffff' }}>
            Ready to Take Control?
          </h2>
          <p className="text-xl mb-10 font-semibold" style={{ color: '#ffffff' }}>
            Join 2,400+ users protecting their financial data today
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={onNavigateToDashboard}
              className="bg-accent text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white transition-all"
            >
              Get Started Free
            </button>
            <button className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all">
              Schedule Demo
            </button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>Or download the mobile app</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-2.5 rounded-lg hover:bg-white/20 transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-none">Download on the</span>
                  <span className="text-sm font-semibold leading-none mt-0.5">App Store</span>
                </div>
              </a>
              <a href="#" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-2.5 rounded-lg hover:bg-white/20 transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-none">GET IT ON</span>
                  <span className="text-sm font-semibold leading-none mt-0.5">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section py-24 relative overflow-hidden">
        {/* Subtle background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505] to-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-50">
          <div className="text-center mb-16 relative z-50">
            <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4" style={{ color: '#ffffff' }}>
              FAQ
            </h2>
            <p className="text-lg" style={{ color: '#ffffff', opacity: 0.8 }}>
              Find answers to common questions about credit freezes, our platform, and financial protection.
            </p>
          </div>

          <div className="space-y-12 relative z-50">
            {[
              {
                category: 'CREDIT FREEZES',
                questions: [
                  {
                    q: 'Is freezing my credit really free?',
                    a: 'Yes! Freezing your credit at each agency is completely free by federal law. We simply provide the tools and guidance to do it efficiently.'
                  },
                  {
                    q: 'Will this affect my credit score?',
                    a: 'No. Freezing your credit files does not affect your credit score. It only prevents new accounts from being opened without your permission.'
                  },
                  {
                    q: 'How long does it take to freeze all agencies?',
                    a: 'Most users complete all 4 freezes in under 30 minutes using our guided hub.'
                  },
                  {
                    q: 'Can I unfreeze when I need credit?',
                    a: 'Absolutely. You can temporarily or permanently unfreeze at any time using the PIN provided by each agency.'
                  }
                ]
              },
              {
                category: 'PLATFORM & FEATURES',
                questions: [
                  {
                    q: 'What makes you different from credit monitoring?',
                    a: 'Credit monitoring alerts you after fraud happens. We help you prevent it by locking down access to your data.'
                  },
                  {
                    q: 'Do I need to provide my Social Security Number?',
                    a: 'No. We never store your SSN. You provide it directly to each credit bureau when freezing your files.'
                  },
                  {
                    q: 'How secure is my data?',
                    a: 'We use bank-level encryption and never store sensitive financial information. Your data sovereignty is our priority.'
                  }
                ]
              },
              {
                category: 'PARTNERS & PROTECTION',
                questions: [
                  {
                    q: 'What is Hold Harmless protection?',
                    a: 'Our Hold Harmless agreements provide legal protection for both you and our financial partners, ensuring clear liability terms in writing.'
                  },
                  {
                    q: 'How do I get matched with partners?',
                    a: 'Once you have a Protected plan, you can access our partner matching system. We connect you with vetted second chance banking and financial service providers.'
                  }
                ]
              }
            ].map((category, catIndex) => (
              <div key={catIndex} className="space-y-3">
                <h3 className="text-xl font-display font-bold mb-6 tracking-wider" style={{ color: '#ffffff' }}>
                  {category.category}
                </h3>
                {category.questions.map((faq, i) => (
                  <details key={i} className="faq-item group border-b border-white/10 relative z-50" style={{ opacity: 1 }}>
                    <summary className="flex items-center justify-between py-5 cursor-pointer hover:opacity-80 transition-opacity relative z-50 list-none">
                      <span className="font-medium text-base pr-4 flex-1 text-left" style={{ color: '#ffffff' }}>{faq.q}</span>
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                        <svg className="w-5 h-5 transition-all duration-200 group-open:rotate-45" style={{ color: '#ffffff', opacity: 0.6 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </summary>
                    <div className="pb-5 leading-relaxed relative z-50 text-sm pl-0" style={{ color: '#ffffff', opacity: 0.85 }}>
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="/logo.svg" 
                alt="First Up Financial" 
                className="h-16 w-auto mb-4"
                style={{ maxHeight: '64px' }}
              />
              <p className="text-white/90 text-sm mb-6">
                Empowering financial access through data sovereignty.
              </p>
              <div className="flex flex-col gap-2">
                <a href="#" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-all w-fit">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] leading-none">Download on the</span>
                    <span className="text-xs font-semibold leading-none mt-0.5">App Store</span>
                  </div>
                </a>
                <a href="#" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-all w-fit">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] leading-none">GET IT ON</span>
                    <span className="text-xs font-semibold leading-none mt-0.5">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white">Product</h4>
              <ul className="space-y-2 text-white/90 text-sm">
                <li><a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} className="hover:text-white transition-colors cursor-pointer">Features</a></li>
                <li><a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white">Company</h4>
              <ul className="space-y-2 text-white/90 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white">Legal</h4>
              <ul className="space-y-2 text-white/90 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/90">
            <p>© 2025 First Up Financial Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setIsVideoModalOpen(false)}>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    THREE: any;
    gsap: any;
    ScrollTrigger: any;
    motion?: {
      animate: any;
      scroll: any;
    };
  }
}

export default LandingPage;
