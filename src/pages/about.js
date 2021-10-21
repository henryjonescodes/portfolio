import React from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/About/theme'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as THREE from "three";
import { Redirect } from 'react-router'


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
        let currentIntersect = null

        /**
         * Base
         */
        // Debug
        this.route(null)
        this.setState({doRouting: false})
        let gui = new dat.GUI()
        gui.domElement.id = 'gui';

        // Canvas
        // const canvas = document.querySelector('canvas.webgl')

        // Scene
        this.scene = new THREE.Scene()

        /**
         * Objects
         */
        const object1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({ color: '#ff0000' })
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
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }


        /**
         * Event Handlers
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

        attatchListeners()

        /**
         * Camera
         */
        // Base camera
        this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        this.camera.position.z = 3
        this.scene.add(this.camera)


        /**
         * Renderer
         */
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(sizes.width, sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        // document.body.appendChild( renderer.domElement );
        this.mount.appendChild( this.renderer.domElement );

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true

        /**
         * Animate
         */
        const clock = new THREE.Clock()

        //Initialize Listeners
        const mouse = new THREE.Vector2()
        // let currentIntersect = null
        // initializeListeners()

        
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