import React from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/About/theme'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as THREE from "three";
import { Redirect } from 'react-router'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { Water } from 'three/examples/jsm/objects/Water.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import TWEEN from '@tweenjs/tween.js'
import ProgressBar from '../components/About/ProgressBar'


class About extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            doRouting: false,
            target: null,
            loaded: false
        }
        this.scene = null
        this.renderer = null
        this.camera = null
        this.controls = null
        this.route = this.route.bind(this)
    }
    route(target) {
        if(this.state.doRouting){
            this.setState({target: target})
            console.log("routing")
        }
    }
    componentDidMount(){
        /**
         * Base--------------------------------------------------------------------------------------
         */


        this.route(null)
        this.setState({doRouting: false})
        let gui = new dat.GUI({ closed: false, width: 700})
        gui.domElement.id = 'gui';
        this.scene = new THREE.Scene()
        const clickableObjects = []
        let currentIntersect = null
        const mouse = new THREE.Vector2()


        /**
         * Set Up File loaders-----------------------------------------------------------------------
         */


        //Loading Manager
        const loadingManager = new THREE.LoadingManager()

        loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };
        loadingManager.onLoad = () => {
            // const loadingScreen = document.getElementById('loading-screen')
            // loadingScreen.classList.add( 'fade-out' );
            // loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
            this.setState({loaded: true})
            console.log( 'Loading complete!');
        };
        loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };

        loadingManager.onError = function ( url ) {
            console.log( 'There was an error loading ' + url );
        };

        function onTransitionEnd( event ) {
            event.target.remove();
        }

        //Models
        const dracoLoader = new DRACOLoader(loadingManager)
        dracoLoader.setDecoderPath('./draco/')
        const gltfLoader = new GLTFLoader(loadingManager)
        gltfLoader.setDRACOLoader(dracoLoader)

        //Textures
        const textureLoader = new THREE.TextureLoader(loadingManager)
        const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

        //Fonts
        const fontLoader = new FontLoader(loadingManager)

        //Helper functions for main file loading
        function loadWithPromise(url, loader){
            return new Promise((resolve, reject) => {
                loader.load(url, data=> resolve(data), null, reject);
            });
        }

        async function doLoading(url, loader, textureUrl, textureLoader, scene){
            const gltfData = await loadWithPromise(url, loader)
            const texture = await loadWithPromise(textureUrl, textureLoader)
            texture.flipY = false
            const material = new THREE.MeshBasicMaterial({ map: texture})
            // const material = new THREE.MeshBasicMaterial({ color: '#121212'})
            gltfData.scene.traverse((child) => {child.material = material});    
            let model = gltfData.scene
            applyModelSettings(model)
            scene.add(model)
            // console.log(scene)
            return model
        }

        function applyModelSettings(model){
            model.scale.set(0.5, 0.5, 0.5)
        }


        /**
         * Constants----------------------------------------------------------------------------
         */


         const params = {
            cursorx: 0,
            cursory: 2,
            cursorz: 0,
            animationDuration: 1000
        }
        
        const cameraSettings = {
            cameraPositionX: 79.39020840624255,
            cameraPositionY: 5.30854889867763,
            cameraPositionZ: 44.76856193642261,
            fov: 8,
            targetx: 0,
            targety: 2,
            targetz: 0
        }
        const cameraSettings1 = {
            cameraPositionX: 10.09952891398274,
            cameraPositionY: 5.283287750839582,
            cameraPositionZ: 0.6046661058867199,
            fov: 35,
            targetx: 9.2,
            targety: 1.8,
            targetz: 38
        }
        
        const cameraSettings2 = {
            cameraPositionX: 19.549670902554276,
            cameraPositionY: 1.9951785273600007,
            cameraPositionZ: 12.074181724836727,
            fov: 40,
            targetx: 19,
            targety: 1.1,
            targetz: 24
        }

        const lightColors = {
            ambientLightColor: 0xffffff,
            directionalLightColor: 0xffffff
        }
        
        const oceanSettings = {
            oceanColor: 0x001e0f,
            oceanSunColor: 0x333333,
            distortionScale: 2.5,
            timeModifier: 320
        }

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }


        /**
         * Imported Data --------------------------------------------------------------------
         */
        //General
        const waterTexture = textureLoader.load('/textures/Misc/waternormals.jpg', function ( texture ) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }) 

        //Sky Textures
        const skyCubeTexture = cubeTextureLoader.load([
            'textures/Sky/px.png',
            'textures/Sky/nx.png',
            'textures/Sky/py.png',
            'textures/Sky/ny.png',
            'textures/Sky/pz.png',
            'textures/Sky/nz.png'
        ]);
        
        //Move this somewhere :)
        this.scene.background = skyCubeTexture;

        //Dock Building
        let DockBuilding_Building = doLoading(
            '/models/DockBuilding/glTF-Draco/DockBuilding_Model_Building.glb', gltfLoader,
            '/textures/DockBuilding/DockBuilding_Building.png', textureLoader,
            this.scene
        )
        let DockBuilding_Surface = doLoading(
            '/models/DockBuilding/glTF-Draco/DockBuilding_Model_Surface.glb', gltfLoader,
            '/textures/DockBuilding/DockBuilding_Surface.png', textureLoader,
            this.scene
        )
        let DockBuilding_Pylons = doLoading(
            '/models/DockBuilding/glTF-Draco/DockBuilding_Model_Pylons.glb', gltfLoader,
            '/textures/DockBuilding/DockBuilding_Pylons.png', textureLoader,
            this.scene
        )
        let DockBuilding_Deco = doLoading(
            '/models/DockBuilding/glTF-Draco/DockBuilding_Model_Deco.glb', gltfLoader,
            '/textures/DockBuilding/DockBuilding_Deco.png', textureLoader,
            this.scene
        )

        //Maine State Pier
        let MaineStatePier_Building = doLoading(
            '/models/MaineStatePier/glTF-Draco/MaineStatePier_Model_Building_8K.glb', gltfLoader,
            '/textures/MaineStatePier/MaineStatePier_Building_8K.png', textureLoader,
            this.scene
        )
        let MaineStatePier_Surface = doLoading(
            '/models/MaineStatePier/glTF-Draco/MaineStatePier_Model_Surface.glb', gltfLoader,
            '/textures/MaineStatePier/MaineStatePier_Surface.png', textureLoader,
            this.scene
        )
        let MaineStatePier_Pylons = doLoading(
            '/models/MaineStatePier/glTF-Draco/MaineStatePier_Model_Pylons.glb', gltfLoader,
            '/textures/MaineStatePier/MaineStatePier_Pylons.png', textureLoader,
            this.scene
        )
        let MaineStatePier_Deco = doLoading(
            '/models/MaineStatePier/glTF-Draco/MaineStatePier_Model_Deco.glb', gltfLoader,
            '/textures/MaineStatePier/MaineStatePier_Deco.png', textureLoader,
            this.scene
        )

        //Park
        let Park_Surface = doLoading(
            '/models/Park/glTF-Draco/Park_Surface.glb', gltfLoader,
            '/textures/Park/Park_Surface.png', textureLoader,
            this.scene
        )
        let Park_Foliage = doLoading(
            '/models/Park/glTF-Draco/Park_Foliage.glb', gltfLoader,
            '/textures/Park/Park_Foliage.png', textureLoader,
            this.scene
        )
        let Park_Deco = doLoading(
            '/models/Park/glTF-Draco/Park_Deco.glb', gltfLoader,
            '/textures/Park/Park_Deco.png', textureLoader,
            this.scene
        )
        let Park_Rocks = doLoading(
            '/models/Park/glTF-Draco/Park_Rocks.glb', gltfLoader,
            '/textures/Park/Park_Rocks.png', textureLoader,
            this.scene
        )

        //Bug Light
        let BugLight = doLoading(
            '/models/BugLight/glTF-Draco/BugLight.glb', gltfLoader,
            '/textures/BugLight/BugLight.png', textureLoader,
            this.scene
        )
        
        //Fort Gorges
        let FortGorges = doLoading(
            '/models/FortGorges/glTF-Draco/FortGorges.glb', gltfLoader,
            '/textures/FortGorges/FortGorges.png', textureLoader,
            this.scene
        )

        //City
        let City_Modeled = doLoading(
            '/models/City/glTF-Draco/City_Modeled.glb', gltfLoader,
            '/textures/City/City_Modeled.png', textureLoader,
            this.scene
        )

        let City_Projected = doLoading(
            '/models/City/glTF-Draco/City_Projected.glb', gltfLoader,
            '/textures/City/City_Projected.png', textureLoader,
            this.scene
        )
        /**
         * Load Fonts and Matcaps
         */
        let helvetica, matcapTexture
        let fontLoadPromise = loadWithPromise('/fonts/helvetiker_regular.typeface.json',fontLoader).then(result => { helvetica = result })
        let matcapTexturePromise = loadWithPromise('/textures/matcaps/1.png',textureLoader).then(result =>{ matcapTexture = result})


        /**
         * Load-Dependent Mesh ----------------------------------------------------------------
         */


        //Make Text Geometry
        function generateTextGeometry(text, font, size, height){
            //Generate Text and add to scene
            const textGeometry = new TextGeometry(
                text,
                {
                    font: font,
                    size: size,
                    height: height,
                    curveSegments: 4,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5
                }
            )
            textGeometry.computeBoundingBox()
            textGeometry.center()
            return textGeometry
        }
        //Generate Scene Text after Font/Matcap Load
        let greetingText, cityText, cityText1, overViewText
        Promise.all([fontLoadPromise, matcapTexturePromise]).then(() => {
            const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

            //Greeting Text
            const greetingTextGeometry = generateTextGeometry('Hi, I\'m Henry',helvetica, 0.5, 0.2)
            greetingText = new THREE.Mesh(greetingTextGeometry, textMaterial)
            greetingText.position.set(-50,5.5,-30)
            greetingText.scale.set(5,5,5)
            greetingText.rotation.y = .4* Math.PI
            this.scene.add(greetingText)

            //City Text
            const cityTextGeometry = generateTextGeometry('I\'m a 3D Artist',helvetica, 0.5, 0.2)
            cityText = new THREE.Mesh(cityTextGeometry, textMaterial)
            cityText.position.set(9.5,11,41.3)
            cityText.scale.set(5,5,5)
            cityText.rotation.y = 1* Math.PI
            this.scene.add(cityText)

            //City Text2
            const cityTextGeometry1 = generateTextGeometry('and Software Engineer',helvetica, 0.5, 0.2)
            cityText1 = new THREE.Mesh(cityTextGeometry1, textMaterial)
            cityText1.position.set(9.5,8,41.3)
            cityText1.scale.set(3,3,3)
            cityText1.rotation.y = 1* Math.PI
            this.scene.add(cityText1)
            
            //continue the process
            tick()
        });

            
        //Water
        const buildWater = (scene) => {
            const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
            const water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: waterTexture,
                alpha: 1.0,
                sunDirection: new THREE.Vector3(),
                sunColor: oceanSettings.oceanSunColor,
                waterColor: oceanSettings.oceanColor,
                distortionScale: oceanSettings.distortionScale,
                fog: scene.fog !== undefined
            }
            );
            water.rotation.x =- Math.PI / 2;
            scene.add(water);
            
            const waterUniforms = water.material.uniforms;
            return water;
        }

        const water = buildWater(this.scene)


        /**
         * Generated Mesh ---------------------------------------------------------------------
         */


        //3d Buttons
        const buttonMaterial = new THREE.MeshBasicMaterial({ color: '#ff0000' })
        const buttonGeometry = new THREE.SphereGeometry(0.5, 16, 16)

        const button1 = new THREE.Mesh(buttonGeometry,buttonMaterial)
        button1.position.set(10.7,1.8,6.2)
        this.scene.add(button1)

        const button2 = new THREE.Mesh(buttonGeometry,buttonMaterial)
        button2.position.set(9.5,2,26)
        this.scene.add(button2)

        const button3 = new THREE.Mesh(buttonGeometry,buttonMaterial)
        button3.position.set(19,1.8,24)
        this.scene.add(button3)

        const object1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.MeshStandardMaterial({ color: '#ff0000' })
        )
        object1.position.x = - 2

        const object2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({ color: '#ff0000' })
        )

        const object3 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({ color: '#ff0000' })
        )
        object3.position.x = 2

        this.scene.add(object1, object2, object3)

        clickableObjects.push(button1, button2, button3, object1, object2, object3)
       

        /**
         * Lights ---------------------------------------------------------------------------
         */


        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        ambientLight.visible = false
        this.scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
        const targetObject = new THREE.Object3D()
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.camera.far = 15
        directionalLight.shadow.camera.left = - 7
        directionalLight.shadow.camera.top = 7
        directionalLight.shadow.camera.right = 7
        directionalLight.shadow.camera.bottom = - 7
        directionalLight.position.set(5, 5, 5)
        directionalLight.visible = true
        directionalLight.target = targetObject
        this.scene.add(directionalLight, targetObject)
        console.log(directionalLight)

        const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
        directionalLightHelper.visible = false
        this.scene.add(directionalLightHelper)

        
        /**
         * GUI ------------------------------------------------------------------------------
         */
        

        //3D Cursor 
        let cursor = null
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.4,
        })
        
        const createBox = (width, height, depth, position) =>{
            //Three.js Mesh
            const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
            mesh.scale.set(width, height, depth)
            mesh.castShadow = true
            mesh.position.copy(position)
            return mesh
        }

        //Debug functions
        const debugObject = {}
        debugObject.placeCursor = () => {
            if(!cursor){
                console.log("placing 3D cursor")
                cursor = createBox(
                    1,
                    1,
                    1,
                {
                    x: params.cursorx,
                    y: params.cursory,
                    z: params.cursorz
                })
                this.scene.add(cursor)
            }
        }

        // Camera GUI
        debugObject.logCamera = () => {
            console.log("Camera Details")
            console.log(this.camera)
        }

        //Lights 
        var lightsGUI = gui.addFolder("Lighting")

        var ambientGUI = lightsGUI.addFolder("Ambient Light")
        ambientGUI.addColor(lightColors, 'ambientLightColor').onChange(() =>{ambientLight.color.set(lightColors.ambientLightColor)}).name("Color")
        ambientGUI.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
        ambientGUI.add(ambientLight, 'visible')

        var directionalGUI = lightsGUI.addFolder("Directional Light")
        directionalGUI.addColor(lightColors, 'directionalLightColor').onChange(() =>{directionalLight.color.set(lightColors.directionalLightColor)}).name("Color")
        directionalGUI.add(directionalLight, 'intensity').min(0).max(5).step(0.001)
        directionalGUI.add(directionalLight.position, 'x').min(- 20).max(20).step(0.001).name("Light: x")
        directionalGUI.add(directionalLight.position, 'y').min(- 20).max(20).step(0.001).name("Light: y")
        directionalGUI.add(directionalLight.position, 'z').min(- 20).max(20).step(0.001).name("Light: z")
        directionalGUI.add(targetObject.position, 'x').min(- 20).max(20).step(0.001).onChange(() => { directionalLightHelper.update()}).name("Target: x")
        directionalGUI.add(targetObject.position, 'y').min(- 20).max(20).step(0.001).onChange(() => { directionalLightHelper.update()}).name("Target: y")
        directionalGUI.add(targetObject.position, 'z').min(- 20).max(20).step(0.001).onChange(() => { directionalLightHelper.update()}).name("Target: z")
        directionalGUI.add(directionalLight, 'visible')
        directionalGUI.add(directionalLightHelper, 'visible').name('helper')

        
        // 3D Cursor
        var cursorGUI = gui.addFolder("3D Cursor")
        cursorGUI.add(debugObject, 'placeCursor')
        cursorGUI.add(params, 'cursorx').min(-100).max(100).step(0.001)
        cursorGUI.add(params, 'cursory').min(-100).max(100).step(0.001)
        cursorGUI.add(params, 'cursorz').min(-100).max(100).step(0.001)
        
        // Camera GUI
        var cameraGUI = gui.addFolder("Camera")
        cameraGUI.add(debugObject, 'logCamera')
        
        // Ocean GUI
        const oceanFolder = gui.addFolder("Ocean")
        oceanFolder.add(oceanSettings, 'timeModifier').min(0).max(500).step(1)
    


        /**
         * Event Handlers -------------------------------------------------------------------
         */


        const handleResize = () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
    
            // Update camera
            if(this.camera){
                this.camera.aspect = sizes.width / sizes.height
                this.camera.updateProjectionMatrix()
            }
    
            // Update renderer
            if(this.renderer){
                this.renderer.setSize(sizes.width, sizes.height)
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            }
        }

        const handleMouseMove = (evt) => {
            mouse.x = evt.clientX / sizes.width * 2 - 1
            mouse.y = - (evt.clientY / sizes.height) * 2 + 1
        }
    
        const handleClick = () => {
            if(currentIntersect)
            {
                switch(currentIntersect.object)
                {
                    case object1:
                        console.log('click on object 1')
                        removeListeners()
                        this.route("/projects")
                        break

                    case object2:
                        console.log('click on object 2')
                        removeListeners()
                        this.route("/photography")
                        break

                    case object3:
                        console.log('click on object 3')
                        removeListeners()
                        this.route("/")
                        break
                    case button1:
                        console.log('seting: cameraSettings1')
                        cameraToMarker(cameraSettings1, this.camera, this.controls)
                        break

                    case button2:
                        console.log('seting: cameraSettings2')
                        cameraToMarker(cameraSettings2,this.camera, this.controls)
                        break

                    case button3:
                        console.log('seting: cameraSettings')
                        cameraToMarker(cameraSettings,this.camera, this.controls)
                        break
                    default:
                        console.log("Unhandled Click Event: ", currentIntersect.object)
                        break
                }
            } 
        }

        //Attatch listeners to window
        function attatchListeners(){
            window.addEventListener('resize', handleResize)
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('click', handleClick) 
        }

        //Remove Listeners From Window, also dismantles gui
        function removeListeners(){
            window.removeEventListener('resize',handleResize)
            window.removeEventListener('mousemove',handleMouseMove)
            window.removeEventListener('click',handleClick)

            //Hide the gui first so it doesnt require reload to go away
            gui.hide()
            gui = null
        }


        /**
        * Camera Movement ---------------------------------------------------------------------
        */


        /**
         * Big Boi Tween Time
         * Function Structure is as follows:
         * 
         * Quaternion Tween
         *      -Field of View Tween
         *          -Camera Position Tween
         *              -Camera/Controls Target Tween
         * 
         * All values are tweened simultaniously (via chaining the onStart() methods)
         * Special thanks to Dan Hammond and his wonderful blog post detailing this 
         * method: https://blogs.perficient.com/2020/05/21/3d-camera-movement-in-three-js-i-learned-the-hard-way-so-you-dont-have-to/
         */
        function cameraToMarker(marker, camera, controls) {
            const storedMarkerPosition = new THREE.Vector3(marker.targetx, marker.targety, marker.targetz);
            const startQuaternion = camera.quaternion.clone();
            camera.lookAt(storedMarkerPosition);
            const endQuaternion = camera.quaternion.clone();
            camera.quaternion.set(startQuaternion);
            let time = {t: 0};
            let currentFov = {fov: camera.fov}
            let currentTarget = {x: controls.target.x,y: controls.target.y,z: controls.target.z}


            new TWEEN.Tween(time)
                .to({t: 1}, params.animationDuration/2)
                .onStart(() =>{
                    new TWEEN.Tween(currentFov)
                    .to({fov: marker.fov}, params.animationDuration)
                    .onStart(() =>{
                        new TWEEN.Tween(camera.position)
                        .to({
                            x: marker.cameraPositionX,
                            y: marker.cameraPositionY,
                            // y: camera.position.y,
                            z: marker.cameraPositionZ,
                        }, params.animationDuration)
                        .onStart(() => {
                            new TWEEN.Tween(currentTarget)
                            .to({
                                x: marker.targetx,
                                y: marker.targety,
                                z: marker.targetz
                            }, params.animationDuration)
                            .easing(TWEEN.Easing.Quadratic.InOut)
                            .onUpdate(() =>{
                                camera.lookAt(new THREE.Vector3(currentTarget.x, currentTarget.y, currentTarget.z));
                                controls.target.set(currentTarget.x, currentTarget.y, currentTarget.z)
                            })
                            .start()
                        })
                        .easing(TWEEN.Easing.Quadratic.InOut)
                        .start();
                    })
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .onUpdate(() => {
                        camera.fov = currentFov.fov
                        camera.updateProjectionMatrix();
                    })
                    .onComplete(() => {
                        camera.fov = marker.fov
                        camera.updateProjectionMatrix();
                    })
                    .start();
                })
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(() => {
                    camera.quaternion.slerpQuaternions(startQuaternion, endQuaternion, time.t);
                })
                .onComplete(() => {
                    camera.quaternion.set(endQuaternion);
                    camera.lookAt(storedMarkerPosition);
                    controls.target.set(marker.targetx, marker.targety, marker.targetz)
                })
                .start();
        }

        /**
        * Scene Setup --------------------------------------------------------------------------
        */
        
        /**
         * Scene Setup Functions
         */
        // Camera
        const setupCamera = () => {
            this.camera = new THREE.PerspectiveCamera(cameraSettings.fov, sizes.width / sizes.height, 0.1, 1000)
            this.camera.position.set(cameraSettings.cameraPositionX,cameraSettings.cameraPositionY,cameraSettings.cameraPositionZ)
            this.scene.add(this.camera)
        }

        // Renderer
        const setupRenderer = () => {
            this.renderer = new THREE.WebGLRenderer()
            this.renderer.setSize(sizes.width, sizes.height)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            this.mount.appendChild( this.renderer.domElement );
        }

        // Controls
        const setupControls = () => {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement)
            this.controls.target.set(cameraSettings.targetx,cameraSettings.targety,cameraSettings.targetz)
            this.controls.enableDamping = true
        }

        const init = () => {
            attatchListeners()
            setupCamera()
            setupRenderer()
            setupControls()
        }

        init()        

        /**
         * Animation Loop ---------------------------------------------------------------------
         */


        const clock = new THREE.Clock()
        let previousTime = 0
        const raycaster = new THREE.Raycaster() 

        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime

            //Water
            water.material.uniforms[ 'time' ].value += 1.0 / oceanSettings.timeModifier;

            //cursor
            if(cursor){ cursor.position.set(params.cursorx,params.cursory,params.cursorz)}    


            // Animate objects
            object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
            object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
            object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

            //Raycasting from mouse pointer
            if(this.camera != null && this.state.doRouting){
                raycaster.setFromCamera(mouse,  this.camera)

                // const clickableObjects = [object1, object2, object3, button1, button2, button3]
                let intersects = null
                intersects = raycaster.intersectObjects(clickableObjects)

                //Mouse Enter/Mouse Leave (general)
                if(intersects.length){
                    if(!currentIntersect){}
                    currentIntersect = intersects[0]
                } else {
                    if(currentIntersect) {}
                    currentIntersect = null
                }

                //Do stuff to intersected objects
                for(const object of clickableObjects) {
                    object.material.color.set('#ff0000')
                } 
                for(const intersect of intersects) {
                    intersect.object.material.color.set('#0000ff')
                }
            }

            // Update controls
            if(this.controls != null){
                this.controls.update()
            }

            TWEEN.update();

            // Render
            if(this.renderer != null){
                this.renderer.render(this.scene,  this.camera)
            }

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }
        //Enable Router Links (raycaster)
        this.setState({doRouting: true})
        tick()
    }
    componentWillUnmount(){
        this.scene = null
        this.camera = null
        this.renderer = null
        this.controls = null
        // test.remove()
        // window.removeEventListener("click",  {})
    }
    render(){
        if(this.state.target != null){
            return <Redirect to={this.state.target}/>
        } else {
            return (
                <>
                    <RoutedSideBar isOpen = {this.state.isOpen} toggle = {() => this.setState({isOpen: !this.state.isOpen})} theme = {theme}/>
                    <LinkBar toggle = {() => this.setState({isOpen: !this.state.isOpen})} title = "About" theme = {theme}/>
                    {!this.state.loaded && <ProgressBar/>}
                    <div ref={ref => (this.mount = ref)} />
                </>
            )
        }
    }
}

export default About