// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navUl = document.querySelector('nav ul');
navToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
});

// Enhanced 3D Logo Animation on Homepage
if (document.getElementById('logo3d')) {
    const logoContainer = document.getElementById('logo3d');
    const errorMessage = document.getElementById('logo-error');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    function updateRendererSize() {
        const width = Math.min(window.innerWidth * 1, 800);
        renderer.setSize(width, width);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        renderer.domElement.style.margin = '0 auto';
        // Adjust camera based on object size
        camera.position.set(0, 0, 6); // Increased z distance for better visibility
    }

    updateRendererSize();
    window.addEventListener('resize', updateRendererSize);
    logoContainer.appendChild(renderer.domElement);

    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(
        'assets/logo.mtl',
        (materials) => {
            materials.preload();
            const objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(
                'assets/logo.obj',
                (object) => {
                    // Center and scale the object
                    object.scale.set(1.5, 1.5, 1.5); // Increased scale for visibility
                    object.position.set(0, 0, 0); // Center the object
                    scene.add(object);

                    // Enhanced lighting
                    const pointLight1 = new THREE.PointLight(0x00ffff, 2, 100);
                    pointLight1.position.set(10, 10, 10);
                    scene.add(pointLight1);
                    const pointLight2 = new THREE.PointLight(0x00b7b7, 1.5, 100);
                    pointLight2.position.set(-10, -10, 10);
                    scene.add(pointLight2);
                    scene.add(new THREE.AmbientLight(0x00ffff, 0.5));

                    // Ensure object is visible
                    const boundingBox = new THREE.Box3().setFromObject(object);
                    const center = boundingBox.getCenter(new THREE.Vector3());
                    object.position.sub(center); // Center the object relative to its geometry
                    camera.lookAt(center);

                    function animate() {
                        requestAnimationFrame(animate);
                        object.rotation.y += 0.01;
                        object.rotation.x += 0.005;
                        object.position.y = Math.sin(Date.now() * 0.001) * 0.5; // Floating effect
                        renderer.render(scene, camera);
                    }
                    animate();
                },
                undefined,
                (error) => {
                    console.error('Error loading OBJ file:', error);
                    errorMessage.style.display = 'block';
                }
            );
        },
        undefined,
        (error) => {
            console.error('Error loading MTL file:', error);
            errorMessage.style.display = 'block';
        }
    );
}