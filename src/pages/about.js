import React, {useState} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import { theme } from '../components/About/theme'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as THREE from "three";

const About = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    /**
     * Base
     */
    // Debug
    const gui = new dat.GUI()

    // Canvas
    // const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()

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

    scene.add(object1, object2, object3)

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


    function initializeListeners(){
        //Resize
        window.addEventListener('resize', () =>
        {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
    
            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()
    
            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        //Mouse
        window.addEventListener('mousemove', (event) =>
            {
                mouse.x = event.clientX / sizes.width * 2 - 1
                mouse.y = - (event.clientY / sizes.height) * 2 + 1
            })

        window.addEventListener('click', () =>
        {
            if(currentIntersect)
            {
                switch(currentIntersect.object)
                {
                    case object1:
                        console.log('click on object 1')
                        break

                    case object2:
                        console.log('click on object 2')
                        break

                    case object3:
                        console.log('click on object 3')
                        break
                }
            }
        })
    }

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 3
    scene.add(camera)


    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    document.body.appendChild( renderer.domElement );
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    //Initialize Listeners
    const mouse = new THREE.Vector2()
    let currentIntersect = null
    initializeListeners()

    
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        // Animate objects
        object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
        object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
        object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

        //Raycasting from mouse pointer
        raycaster.setFromCamera(mouse, camera)

        const objectsToTest = [object1, object2, object3]
        const intersects = raycaster.intersectObjects(objectsToTest)

        if(intersects.length)
        {
            if(!currentIntersect)
            {
                console.log('mouse enter')
            }

            currentIntersect = intersects[0]
        }
        else
        {
            if(currentIntersect)
            {
                console.log('mouse leave')
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

        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()

    return (
        <>
            {/* <RoutedSideBar isOpen = {isOpen} toggle = {toggle} theme = {theme}/> */}
            {/* <LinkBar toggle = {toggle} title = "About" theme = {theme}/> */}
        </>
    )
}

export default About