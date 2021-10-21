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
import { useLoader } from '@react-three/fiber'


class About extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            doRouting: false,
            target: null
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
        let gui = new dat.GUI()
        gui.domElement.id = 'gui';
        this.scene = new THREE.Scene()
        let currentIntersect = null
        const mouse = new THREE.Vector2()
        const fs = require('fs');


        /**
         * Set Up File loaders-----------------------------------------------------------------------
         */


        //Loading Manager
        const loadingManager = new THREE.LoadingManager()

        loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };
        loadingManager.onLoad = function ( ) {
            // const loadingScreen = document.getElementById('loading-screen')
            // loadingScreen.classList.add( 'fade-out' );
            // loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
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
            console.log(scene)
            return model
        }

        function applyModelSettings(model){
            model.scale.set(0.5, 0.5, 0.5)
        }


        /**
         * Constants----------------------------------------------------------------------------
         */


        const cameraSettings = {
            cameraPositionX: 0,
            cameraPositionY: 0,
            cameraPositionZ: 3,
            fov: 75,
            targetx: 0,
            targety: 0,
            targetz: 0
        }

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }


        /**
         * Imported Models --------------------------------------------------------------------
         */
        //Bug Light
        let BugLight = doLoading(
            '/models/BugLight/glTF-Draco/BugLight.glb', gltfLoader,
            '/textures/BugLight/BugLight.png', textureLoader,
            this.scene
        )

        
        // //Fort Gorges
        // let FortGorges = doLoading(
        //     '/models/FortGorges/glTF-Draco/FortGorges.glb', gltfLoader,
        //     '/textures/FortGorges/FortGorges.png', textureLoader,
        //     this.scene
        // )


        /**
         * Generated Mesh ---------------------------------------------------------------------
         */
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

        /**
         * Raycaster
         */
        const raycaster = new THREE.Raycaster() 

       
        /**
         * Lights ---------------------------------------------------------------------------
         */


        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        // this.scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.camera.far = 15
        directionalLight.shadow.camera.left = - 7
        directionalLight.shadow.camera.top = 7
        directionalLight.shadow.camera.right = 7
        directionalLight.shadow.camera.bottom = - 7
        directionalLight.position.set(5, 5, 5)
        this.scene.add(directionalLight)


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
                removeListeners()
                switch(currentIntersect.object)
                {
                    case object1:
                        console.log('click on object 1')
                        this.route("/projects")
                        break

                    case object2:
                        console.log('click on object 2')
                        this.route("/photography")
                        break

                    case object3:
                        console.log('click on object 3')
                        this.route("/")
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

        // //Fort Gorges
        // // let gltfdata = useLoader(GLTFLoader, '/models/FortGorges/glTF-Draco/FortGorges.glb')
        // let FortGorges = doLoading(
        //     './models/FortGorges/glTF-Draco/FortGorges.glb', gltfLoader,
        //     './textures/FortGorges/FortGorges.png', textureLoader,
        //     this.scene
        // )
        /**
         * Animation Loop ---------------------------------------------------------------------
         */


        const clock = new THREE.Clock()
        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()

            // Animate objects
            object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
            object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
            object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

            //Raycasting from mouse pointer
            if(this.camera != null && this.state.doRouting){
                raycaster.setFromCamera(mouse,  this.camera)

                const objectsToTest = [object1, object2, object3]
                let intersects = null
                intersects = raycaster.intersectObjects(objectsToTest)

                if(intersects.length)
                {
                    if(!currentIntersect)
                    {
                        // console.log('mouse enter')
                    }

                    currentIntersect = intersects[0]
                }
                else
                {
                    if(currentIntersect)
                    {
                        // console.log('mouse leave')
                    }

                    currentIntersect = null
                }

                for(const object of objectsToTest)
                {
                    object.material.color.set('#ff0000')
                }
                for(const intersect of intersects)
                {
                    intersect.object.material.color.set('#0000ff')
                }
            }

            // Update controls
            if(this.controls != null){
                this.controls.update()
            }
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
                    <div ref={ref => (this.mount = ref)} />
                </>
            )
        }
    }
}

export default About