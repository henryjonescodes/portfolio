import React from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/VirtualPortfolio/theme'
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
import ProgressBar from '../components/VirtualPortfolio/ProgressBar'
import FooterController from '../components/VirtualPortfolio/FooterController'


class virtualportfolio extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            doRouting: false,
            target: null,
            loaded: false,
            progress: 0,
            progressText: "",
            camHistory: {
                previous: null,
                current: null,
                next: null,
            },
            doCameraMove: null,
            windowSize: "medium"
        }
        this.scene = null
        this.mixer = null
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
    navigate = (direction) => {
        if(this.state.loaded){
            this.setState({doCameraMove: direction})
        }
    }
    componentDidMount(){
        /**
         * Base--------------------------------------------------------------------------------------
         */


        this.route(null)
        this.setState({doRouting: false})
        let gui = new dat.GUI({ closed: true, width: 700})
        dat.GUI.toggleHide();
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

        //Enable cache
        THREE.Cache.enabled = true

        loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };
        loadingManager.onLoad = () => {
            //Run camera movements in the background to preload
            changeScene(cameraSettings.cam1, this.camera, this.controls)
            changeScene(cameraSettings.cam2, this.camera, this.controls)
            changeScene(cameraSettings.cam3, this.camera, this.controls)
            changeScene(cameraSettings.cam0, this.camera, this.controls)

            adjustScene()
         
            //Set loaded flag and print
            this.setState({loaded: true})
            console.log( 'Loading complete!');
        };
        loadingManager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
            this.setState({progress: (100/itemsTotal) * itemsLoaded})
            this.setState({progressText: 'Loading file: ' + url})
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };

        loadingManager.onError = function ( url ) {
            console.log( 'There was an error loading ' + url );
        };

        // function onTransitionEnd( event ) {
        //     event.target.remove();
        // }

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
            gltfData.scene.traverse((child) => {child.material = material});    
            let model = gltfData.scene
            applyModelSettings(model)
            scene.add(model)
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
            focusx: 0,
            focusy: 2,
            focusz: 0,
            animationDuration: 1000,
            quaternionChangeFactor: .5,
            positionChangeFactor: 1,
            fovChangeFactor: 1,
            targetChangeFactor: 1,
        }
        const cameraSettings = {
            cam0: {
                name: "camera0",
                next: "camera1",
                previous: "camera3",
                base:{
                    cameraPositionX: 40.9235445832725,
                    cameraPositionY: 0.9102533027335034,
                    cameraPositionZ: 25.147989013507928,
                    fov: 8,
                    targetx: 5.347,
                    targety: -0.176,
                    targetz: 0
                },
                ultrawide: {
                    cameraPositionX: 40.9235445832725,
                    cameraPositionY: 0.9102533027335034,
                    cameraPositionZ: 25.147989013507928,
                    fov: 8,
                    targetx: 3.012,
                    targety: -0.1,
                    targetz: 0
                },
                mobile: {
                    cameraPositionX: 56.45587462939155,
                    cameraPositionY: 2.270209735117911,
                    cameraPositionZ: 35.86198830571717,
                    fov: 8,
                    targetx: 6.461,
                    targety: -1.152,
                    targetz: 0
                }
            },
            cam1: {
                name: "camera1",
                next: "camera2",
                previous: "camera0",
                base:{
                    cameraPositionX: 97.04554742862695,
                    cameraPositionY: 2.1777107078658604,
                    cameraPositionZ: 43.93157045658174,
                    fov: 8,
                    targetx: 0,
                    targety: 2,
                    targetz: -2.25
                },
                ultrawide: {
                    cameraPositionX: 95.97996643956765,
                    cameraPositionY: 1.8174088163604705,
                    cameraPositionZ: 46.76319569208742,
                    fov: 8,
                    targetx: 0,
                    targety: 2,
                    targetz: -2.25
                },
                mobile: {
                    cameraPositionX: 92.03087141178693,
                    cameraPositionY: 4.921262221262806,
                    cameraPositionZ: 53.2356786736392,
                    fov: 8,
                    targetx: 1.471,
                    targety: 1.471,
                    targetz: 0
                }
            },
            cam2 :{
                name: "camera2",
                next: "camera3",
                previous: "camera1",
                base:{
                    cameraPositionX: 10.09952891398274,
                    cameraPositionY: 5.283287750839582,
                    cameraPositionZ: 0.6046661058867199,
                    fov: 35,
                    targetx: 9.2,
                    targety: 1.8,
                    targetz: 38
                },
                ultrawide: {
                    cameraPositionX: 10.315275819654154,
                    cameraPositionY: 2.6876164019928384,
                    cameraPositionZ: 4.122858410011901,
                    fov: 35,
                    targetx: 9.2,
                    targety: 1.8,
                    targetz: 38
                },
                mobile: {
                    cameraPositionX: 10.524802974225377,
                    cameraPositionY: 4.338794001610231,
                    cameraPositionZ: -13.05502816449912,
                    fov: 37,
                    targetx: 9.594,
                    targety: 1.8,
                    targetz: 38
                }
            },
            cam3: {
                name: "camera3",
                next: "camera0",
                previous: "camera2",
                base:{
                    cameraPositionX: 19.516065816822447,
                    cameraPositionY: 1.9018917087338703,
                    cameraPositionZ: 14.787505370950727,
                    fov: 42,
                    targetx: 18.85,
                    targety: 1.902,
                    targetz: 19.287
                },
                ultrawide: {
                    cameraPositionX: 19.516065816822447,
                    cameraPositionY: 1.9018917087338703,
                    cameraPositionZ: 14.787505370950727,
                    fov: 42,
                    targetx: 18.85,
                    targety: 1.902,
                    targetz: 19.287
                },
                mobile: {
                    cameraPositionX: 19.549670902554276,
                    cameraPositionY: 1.9951785273600007,
                    cameraPositionZ: 12.074181724836727,
                    fov: 40,
                    targetx: 19,
                    targety: 1.1,
                    targetz: 24
                }
            }
        }
        
        this.setState({
            camHistory:{
                previous: cameraSettings.cam3,
                current: cameraSettings.cam0,
                next: cameraSettings.cam1,
            }
        })

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

        //Islands
        let IslandGroup = new THREE.Group()
        doLoading(
            '/models/Islands/glTF-Draco/Island_Rocks.glb', gltfLoader,
            '/textures/Islands/Island_Rocks.png', textureLoader,
            IslandGroup
        )

        doLoading(
            '/models/Islands/glTF-Draco/Peaks_Foliage.glb', gltfLoader,
            '/textures/Islands/Peaks_Foliage.png', textureLoader,
            IslandGroup
        )

        doLoading(
            '/models/Islands/glTF-Draco/Diamond_Foliage_1.glb', gltfLoader,
            '/textures/Islands/Diamond_Foliage_1.png', textureLoader,
            IslandGroup
        )

        doLoading(
            '/models/Islands/glTF-Draco/Diamond_Foliage_2.glb', gltfLoader,
            '/textures/Islands/Diamond_Foliage_2.png', textureLoader,
            IslandGroup
        )

        this.scene.add(IslandGroup)

        //Dock Building
        doLoading(
            '/models/DockBuilding/glTF-Draco/DockBuilding_Model_Building.glb', gltfLoader,
            '/textures/DockBuilding/DockBuilding_Building.png', textureLoader,
            this.scene
        )
        doLoading(
            '/models/DockBuilding/glTF-Draco/DockBuilding_Model_Surface.glb', gltfLoader,
            '/textures/DockBuilding/DockBuilding_Surface.png', textureLoader,
            this.scene
        )
        doLoading(
            '/models/DockBuilding/glTF-Draco/DockBuilding_Model_Pylons.glb', gltfLoader,
            '/textures/DockBuilding/DockBuilding_Pylons.png', textureLoader,
            this.scene
        )
        doLoading(
            '/models/DockBuilding/glTF-Draco/DockBuilding_Model_Deco.glb', gltfLoader,
            '/textures/DockBuilding/DockBuilding_Deco.png', textureLoader,
            this.scene
        )

        //Maine State Pier
        doLoading(
            '/models/MaineStatePier/glTF-Draco/MaineStatePier_Model_Building_8K.glb', gltfLoader,
            '/textures/MaineStatePier/MaineStatePier_Building_8K.png', textureLoader,
            this.scene
        )
        doLoading(
            '/models/MaineStatePier/glTF-Draco/MaineStatePier_Model_Surface.glb', gltfLoader,
            '/textures/MaineStatePier/MaineStatePier_Surface.png', textureLoader,
            this.scene
        )
        doLoading(
            '/models/MaineStatePier/glTF-Draco/MaineStatePier_Model_Pylons.glb', gltfLoader,
            '/textures/MaineStatePier/MaineStatePier_Pylons.png', textureLoader,
            this.scene
        )
        doLoading(
            '/models/MaineStatePier/glTF-Draco/MaineStatePier_Model_Deco.glb', gltfLoader,
            '/textures/MaineStatePier/MaineStatePier_Deco.png', textureLoader,
            this.scene
        )

        //Park
        doLoading(
            '/models/Park/glTF-Draco/Park_Surface.glb', gltfLoader,
            '/textures/Park/Park_Surface.png', textureLoader,
            this.scene
        )
        doLoading(
            '/models/Park/glTF-Draco/Park_Foliage.glb', gltfLoader,
            '/textures/Park/Park_Foliage.png', textureLoader,
            this.scene
        )
        doLoading(
            '/models/Park/glTF-Draco/Park_Deco.glb', gltfLoader,
            '/textures/Park/Park_Deco.png', textureLoader,
            this.scene
        )
        doLoading(
            '/models/Park/glTF-Draco/Park_Rocks.glb', gltfLoader,
            '/textures/Park/Park_Rocks.png', textureLoader,
            this.scene
        )

        //Bug Light
        doLoading(
            '/models/BugLight/glTF-Draco/BugLight.glb', gltfLoader,
            '/textures/BugLight/BugLight.png', textureLoader,
            this.scene
        )
        
        //Fort Gorges
        doLoading(
            '/models/FortGorges/glTF-Draco/FortGorges.glb', gltfLoader,
            '/textures/FortGorges/FortGorges.png', textureLoader,
            this.scene
        )

        //City
        doLoading(
            '/models/City/glTF-Draco/City_Modeled.glb', gltfLoader,
            '/textures/City/City_Modeled.png', textureLoader,
            this.scene
        )

        doLoading(
            '/models/City/glTF-Draco/City_Projected.glb', gltfLoader,
            '/textures/City/City_Projected.png', textureLoader,
            this.scene
        )
        
        //Boats and Floats
       
        // this.mixer = new THREE.AnimationMixer(boatsAndFloats)
        // const action = this.mixer.clipAction(boatsAndFloats.animations[0])
        // action.play()

        // console.log(boatsAndFloats);
        let boatsAndFloats, boatsAndFloatsTexture
        let boatsAndFloatsPromise = loadWithPromise('/models/BoatsAndFloats/glTF-Draco/BoatsAndFloats.glb', gltfLoader).then(result => { boatsAndFloats = result })
        let boatsAndFloatsTexturePromise = loadWithPromise('/textures/BoatsAndFloats/BoatsAndFloats.png', textureLoader).then(result => { boatsAndFloatsTexture = result })


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
        let greetingText, cityText, professionText, professionText1
        Promise.all([fontLoadPromise, matcapTexturePromise, boatsAndFloatsPromise, boatsAndFloatsTexturePromise]).then(() => {
            const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

            //Greeting Text
            const greetingTextGeometry = generateTextGeometry('Hi, I\'m Henry',helvetica, 0.5, 0.2)
            greetingText = new THREE.Mesh(greetingTextGeometry, textMaterial)
            greetingText.position.set(19,1.2,9.6)
            greetingText.scale.set(.7,.7,.7)
            greetingText.rotation.y = .4* Math.PI
            this.scene.add(greetingText)

            //Profession Text
            const professionTextGeometry = generateTextGeometry('I\'m a 3D Artist',helvetica, 0.5, 0.2)
            professionText = new THREE.Mesh(professionTextGeometry, textMaterial)
            professionText.scale.set(3.5,3.5,3.5)
            professionText.position.set(-57.2,9.5,-30)
            professionText.rotation.y = .4* Math.PI
            this.scene.add(professionText)

            //Profession Text
            const professionText1Geometry = generateTextGeometry('and Software Engineer',helvetica, 0.5, 0.2)
            professionText1 = new THREE.Mesh(professionText1Geometry, textMaterial)
            professionText1.position.set(-57.2,7.5,-30)
            professionText1.scale.set(2.7,2.7,2.7)
            professionText1.rotation.y = .4* Math.PI
            this.scene.add(professionText1)

            //City Text
            const cityTextGeometry = generateTextGeometry('from Portland Maine',helvetica, 0.5, 0.2)
            cityText = new THREE.Mesh(cityTextGeometry, textMaterial)
            cityText.position.set(9.5,4.2,55.374)
            cityText.scale.set(4,4,4)
            cityText.rotation.y = 1* Math.PI
            this.scene.add(cityText)

            //handle boats
            boatsAndFloatsTexture.flipY = false
            const boatsAndFloatsMaterial = new THREE.MeshBasicMaterial({map: boatsAndFloatsTexture})
            boatsAndFloats.scene.traverse((child) => {child.material = boatsAndFloatsMaterial});    
            boatsAndFloats.scene.scale.set(0.5, 0.5, 0.5)
            this.scene.add(boatsAndFloats.scene)

            //Add boat animations to mixer
            this.mixer = new THREE.AnimationMixer(boatsAndFloats.scene)
            boatsAndFloats.animations.forEach((animation) =>{
                const action = this.mixer.clipAction(animation)
                action.play()
            })

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
            
            return water;
        }

        const water = buildWater(this.scene)


        /**
         * Generated Mesh ---------------------------------------------------------------------
         */


        //3d Buttons
        // const buttonMaterial = new THREE.MeshBasicMaterial({ color: '#ff0000' })
        // const buttonGeometry = new THREE.SphereGeometry(0.5, 16, 16)
        // const button1 = new THREE.Mesh(buttonGeometry,buttonMaterial)
        // button1.position.set(10.7,1.8,6.2)
        // this.scene.add(button1)
        // clickableObjects.push(button1)

        // const object1 = new THREE.Mesh(
        //     new THREE.SphereGeometry(0.5, 16, 16),
        //     new THREE.MeshStandardMaterial({ color: '#ff0000' })
        // )
        // object1.position.x = - 2
        // this.scene.add(object1)
        // clickableObjects.push(object1)
       

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

        const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
        directionalLightHelper.visible = false
        this.scene.add(directionalLightHelper)

        
        /**
         * GUI ------------------------------------------------------------------------------
         */
        

        //Focus and cursor
        let focus,cursor = null
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

        function getCamByWindowWidth(camSetting){
            if(sizes.width > 2000){
                return(camSetting.ultrawide)
            } 
            else if(sizes.width < 1000){
                return(camSetting.mobile)
            } 
            else {
                return(camSetting.base)
            }
        }
        //Debug functions
        const debugObject = {}
        debugObject.placefocus = () => {
            let setting = getCamByWindowWidth(this.state.camHistory.current)
            params.focusx = setting.targetx
            params.focusy = setting.targety
            params.focusz = setting.targetz
            console.log("placing focus", params.focusx,  params.focusy,  params.focusz )
            if(!focus){
                focus = createBox(
                    1,
                    1,
                    1,
                {
                    x: params.focusx,
                    y: params.focusy,
                    z: params.focusz,
                })
                this.scene.add(focus)
            } else {
                focus.position.set(
                    params.focusx,
                    params.focusy,
                    params.focusz
                    );
            }
        }
        debugObject.placecursor = () => {
            console.log("placing cursor", params.cursorx,  params.cursory,  params.cursorz )
            if(!cursor){
                cursor = createBox(
                    1,
                    1,
                    1,
                {
                    x: params.cursorx,
                    y: params.cursory,
                    z: params.cursorz,
                })
                this.scene.add(cursor)
            } 
        }
        debugObject.toggleControls = () =>{
            if(this.controls){
                this.controls.enabled = !this.controls.enabled
            } else {
                console.log("controls not found")
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

        
        // Focus
        var focusGUI = gui.addFolder("Focus Object")
        focusGUI.add(debugObject, 'placefocus')
        focusGUI.add(params, 'focusx').min(-100).max(100).step(0.001)
        focusGUI.add(params, 'focusy').min(-100).max(100).step(0.001)
        focusGUI.add(params, 'focusz').min(-100).max(100).step(0.001)

        // Cursor
        var cursorGUI = gui.addFolder("3D Cursor")
        cursorGUI.add(debugObject, 'placecursor')
        cursorGUI.add(params, 'cursorx').min(-100).max(100).step(0.001)
        cursorGUI.add(params, 'cursory').min(-100).max(100).step(0.001)
        cursorGUI.add(params, 'cursorz').min(-100).max(100).step(0.001)
        
        // Camera GUI
        var cameraGUI = gui.addFolder("Camera")
        cameraGUI.add(debugObject, 'logCamera')
        cameraGUI.add(params, 'positionChangeFactor').min(.1).max(1).step(0.001).name("Position Change Factor")
        cameraGUI.add(params, 'quaternionChangeFactor').min(.1).max(1).step(0.001).name("Quaternion Change Factor")
        cameraGUI.add(params, 'fovChangeFactor').min(.1).max(1).step(0.001).name("FOV Change Factor")
        cameraGUI.add(params, 'targetChangeFactor').min(.1).max(1).step(0.001).name("Target Change Factor")
        cameraGUI.add(debugObject, 'toggleControls').name('Toggle Controls')

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
            //adjust text
            if(this.state.loaded){
                adjustScene()
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
                    // case object1:
                    //     console.log('click on object 1')
                    //     removeListeners()
                    //     this.route("/projects")
                    //     break
                    // case button1:
                    //     changeScene(cameraSettings.cam2, this.camera, this.controls)
                    //     break
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
        // function removeListeners(){
        //     window.removeEventListener('resize',handleResize)
        //     window.removeEventListener('mousemove',handleMouseMove)
        //     window.removeEventListener('click',handleClick)

        //     //Hide the gui first so it doesnt require reload to go away
        //     gui.hide()
        //     gui = null
        // }


        /**
        * Camera Movement ---------------------------------------------------------------------
        */
        const adjustScene = () => {

            let size = ""
            if( sizes.width > 2000 ){ size='large' } 
            else if( sizes.width < 1000 ){ size='small' } 
            else { size='medium' }

            if(this.state.windowSize !== size){
                switch(size){
                    case 'small':
                        console.log("windowSize:", size)
                        greetingText.scale.set(.8,.8,.8)
                        greetingText.position.set(19.9,1.2,9.6)

                        professionText.scale.set(1.7,1.7,1.7)
                        professionText.position.set(-49,7,-30)
                        
                        professionText1.scale.set(1.5,1.5,1.5)
                        professionText1.position.set(-49,5.9,-30)

                        cityText.position.set(9.5,6,55.374)
                        cityText.scale.set(4,4,4)
                        changeScene(this.state.camHistory.current, this.camera, this.controls)
                        this.setState({windowSize: "small"})
                        break
                    case 'medium':
                        console.log("windowSize:", size)
                        greetingText.scale.set(.7,.7,.7)
                        greetingText.position.set(19,1.2,9.6)

                        professionText.scale.set(3.5,3.5,3.5)
                        professionText.position.set(-57.2,9.5,-30)

                        professionText1.position.set(-57.2,7.5,-30)
                        professionText1.scale.set(2.7,2.7,2.7)

                        cityText.position.set(9.5,4.7,55.374)
                        cityText.scale.set(4,4,4)
                        changeScene(this.state.camHistory.current, this.camera, this.controls)
                        this.setState({windowSize: "medium"})
                        break
                    case 'large':
                        console.log("windowSize:", size)
                        greetingText.scale.set(1,1,1)
                        greetingText.position.set(19,1.2,9.6)

                        professionText.scale.set(5,5,5)
                        professionText.position.set(-55,11,-30)

                        professionText1.scale.set(3.5,3.5,3.5)
                        professionText1.position.set(-55,7.5,-30)

                        cityText.position.set(9.5,5.5,55.374)
                        cityText.scale.set(4,4,4)
                        changeScene(this.state.camHistory.current, this.camera, this.controls)
                        this.setState({windowSize: "large"})
                        break
                    default:
                        console.log("invalid text size, nothing set")
                        break
                }
            }
        }
        function changeScene(camSetting, camera, controls){
            if(sizes.width > 2000){
                // console.log('seting: ultrawide ', camSetting.name)
                cameraToMarker(camSetting.ultrawide,camera, controls)
            } 
            else if(sizes.width < 1000){
                // console.log('seting: mobile ', camSetting.name)
                cameraToMarker(camSetting.mobile,camera,controls)
            } 
            else {
                // console.log('s eting: base ', camSetting.name)
                cameraToMarker(camSetting.base,camera, controls)
            }
        }

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
                .to({t: 1}, params.animationDuration * params.quaternionChangeFactor)
                .onStart(() =>{
                    new TWEEN.Tween(currentFov)
                    .to({fov: marker.fov}, params.animationDuration * params.fovChangeFactor)
                    .onStart(() =>{
                        new TWEEN.Tween(camera.position)
                        .to({
                            x: marker.cameraPositionX,
                            y: marker.cameraPositionY,
                            z: marker.cameraPositionZ,
                        }, params.animationDuration * params.positionChangeFactor)
                        .onStart(() => {
                            new TWEEN.Tween(currentTarget)
                            .to({
                                x: marker.targetx,
                                y: marker.targety,
                                z: marker.targetz
                            }, params.animationDuration * params.targetChangeFactor)
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
            this.camera = new THREE.PerspectiveCamera(cameraSettings.cam0.base.fov, sizes.width / sizes.height, 0.1, 1000)
            this.camera.position.set(cameraSettings.cam0.base.cameraPositionX,cameraSettings.cam0.base.cameraPositionY,cameraSettings.cam0.base.cameraPositionZ)
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
            this.controls.target.set(cameraSettings.cam0.base.targetx,cameraSettings.cam0.base.targety,cameraSettings.cam0.base.targetz)
            this.controls.enableDamping = true
            var centerPosition = this.controls.target.clone();
            centerPosition.y = 0;
            var groundPosition = this.camera.position.clone();
            groundPosition.y = 0;
            var d = (centerPosition.distanceTo(groundPosition));

            var origin = new THREE.Vector2(this.controls.target.y,0);
            var remote = new THREE.Vector2(0,d); // replace 0 with raycasted ground altitude
            var angleRadians = Math.atan2(remote.y - origin.y, remote.x - origin.x);
            this.controls.maxPolarAngle = angleRadians;
            this.controls.enabled = false;
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

            // Focus
            if(focus){ 
                focus.position.set(params.focusx,params.focusy,params.focusz)
                this.camera.lookAt(focus)
                this.controls.target.set(
                    focus.position.x,
                    focus.position.y,
                    focus.position.z
                )
            }
            //3D cursor    
            if(cursor){ 
                cursor.position.set(params.cursorx,params.cursory,params.cursorz)
            }    

            if(this.mixer){
                this.mixer.update(deltaTime)
            }

            //camera moves
            if(this.state.doCameraMove != null){
                let next = this.state.camHistory.next;
                let previous = this.state.camHistory.previous;
                let current = this.state.camHistory.current;
                let newSetting = null

                for(var setting in cameraSettings){
                    let data = cameraSettings[setting]
                    if(this.state.doCameraMove === "forward" && data.name === next.next){
                        newSetting = data
                    } else if (this.state.doCameraMove === "back" && data.name === previous.previous){
                        newSetting = data
                    }
                }
               
                switch(this.state.doCameraMove){
                    case "forward":
                        // console.log("Navigate forward")
                        changeScene(next, this.camera, this.controls)
                        this.setState({camHistory: {
                            previous: current,
                            current: next,
                            next: newSetting
                        }})
                        break
                    case "back":
                        // console.log("Navigate back")
                        changeScene(previous, this.camera, this.controls)
                        this.setState({camHistory: {
                            previous: newSetting,
                            current: previous,
                            next: current
                        }})
                        break
                    default:
                        console.log("invalid doCameraMove value")
                        break
                }
                // console.log(this.state.camHistory)
                this.setState({doCameraMove: null})
            }

            // Animate objects
            // object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5

            //Raycasting from mouse pointer
            if(this.camera != null && this.state.doRouting){
                raycaster.setFromCamera(mouse,  this.camera)

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
        this.mixer = null
    }
    render(){
        if(this.state.target != null){
            return <Redirect target="_blank" to={this.state.target}/>
        } else {
            return (
                <>
                    <RoutedSideBar isOpen = {this.state.isOpen} toggle = {() => this.setState({isOpen: !this.state.isOpen})} theme = {theme}/>
                    <LinkBar toggle = {() => this.setState({isOpen: !this.state.isOpen})} title = "About" theme = {theme} transparent = {true}/>
                    {!this.state.loaded && <ProgressBar value={Math.ceil(this.state.progress)} max={100} text={this.state.progressText}/>}
                    <div ref={ref => (this.mount = ref)} />
                    {this.state.loaded && <FooterController nav={this.navigate}/>}
                </>
            )
        }
    }
}

export default virtualportfolio