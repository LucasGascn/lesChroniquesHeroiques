import { useRef, useEffect } from "react"
import SimplexNoise from "simplex-noise";
import { CanvasTexture, DataTexture, Group, LuminanceFormat, MeshPhongMaterial, MOUSE, PlaneGeometry, Raycaster, ShaderMaterial, Vector2, Vector3} from "three";
import { 
    BoxGeometry, SphereGeometry,
    CylinderGeometry, DoubleSide, PCFSoftShadowMap, PointLight,
     FloatType, 
     MeshStandardMaterial, 
     MeshPhysicalMaterial,
     PMREMGenerator, 
     Scene, 
     PerspectiveCamera, WebGLRenderer, 
     ACESFilmicToneMapping, TextureLoader, 
     sRGBEncoding, Mesh, Color} from 'three'
     import { RGBELoader, OrbitControls} from 'three-stdlib'
     import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'



const WorldMap = () =>{

    const mount = useRef(null)
    const windowSize = useRef([window.innerWidth, window.innerHeight])

    const loadEnvMapTexture = async(renderer) => {
        // renders the texture of our environment map
        let pmrem = new PMREMGenerator(renderer);
        let envmapTexture = await new RGBELoader().setDataType(FloatType).loadAsync(require("../assets/envmap.hdr"))
        let envmap = pmrem.fromEquirectangular(envmapTexture).texture;
        return envmap
    }

    const getTextures = async() =>{
        let textures = {
            dirt: await new TextureLoader().loadAsync(require("../assets/dirt.png")),
            dirt2: await new TextureLoader().loadAsync(require("../assets/dirt2.jpg")),
            grass: await new TextureLoader().loadAsync(require("../assets/grass.jpg")),
            sand: await new TextureLoader().loadAsync(require("../assets/sand.jpg")),
            stone: await new TextureLoader().loadAsync(require("../assets/stone.png")),
            water: await new TextureLoader().loadAsync(require("../assets/water.jpg"))
        }
        return textures;
    }

    useEffect(()=>{
        (async function(){
            const scene = new Scene()
            scene.background = new Color("#f3daa1")

            const camera = new PerspectiveCamera(45, windowSize.current[0] / windowSize.current[1], 10, 1000)
            camera.position.set(-60,80,80);
            
            const renderer = new WebGLRenderer({antialias: true})
            renderer.setSize(windowSize.current[0],windowSize.current[1]) // innerwidth et innerheight
            renderer.toneMapping = ACESFilmicToneMapping;
            renderer.outputEncoding = sRGBEncoding;
            renderer.physicallyCorrectLights = true;
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = PCFSoftShadowMap;
            
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0,0,0)
            controls.dampingFactor = 0.05
            controls.enableDamping = true

            mount.current.appendChild(renderer.domElement)

            let textures = await getTextures();

            let envmap = await loadEnvMapTexture(renderer)
            let heightmap = await new TextureLoader().loadAsync(require("../assets/heightMapHR.png"))
            let planeGeometries = new BoxGeometry(0,0,0)

            const light = new PointLight( new Color("#FFCB8E").convertSRGBToLinear().convertSRGBToLinear(), 400, 150)
            light.position.set(10,15,10);
    
            light.castShadow = true;
            light.shadow.mapSize.width = 512
            light.shadow.mapSize.height = 512
            light.shadow.camera.near = 0.5
            light.shadow.camera.far = 500




            const uniforms = {
                color: { value: new Color(0xffffff) },
                heightMap: { value : heightmap }, // displacementMap
                bumpScale: { value : 24.0}, // displacementScale
            }

            let vertexShader = `
                varying vec2 vUv;
                varying vec3 vNormal;

                uniform sampler2D heightMap;
                uniform float bumpScale;

                void main(){
                    vUv = uv;
                    vNormal = normalMatrix * normal;

                    float height = texture2D(heightMap, vUv).r * bumpScale;
                    vec3 newPosition = position + vNormal * height;


                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `

            let fragmentShader = `
                uniform vec3 color;

                void main(){
                    gl_FragColor = vec4(color, 1.0);
                }
            `

            const shader = new ShaderMaterial({
                uniforms:uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side:DoubleSide,
            })

            makePlane() // creates a plane and a merge the plane with a central boxGeometry(0,0,0)
                    // let planeShader = new Mesh(planeGeometries,shader)

            let planeMesh = new Mesh(planeGeometries,
                new MeshPhysicalMaterial({
                    envMap: envmap,
                    flatShading: true,
                    side: DoubleSide,
                    displacementMap: heightmap,
                    displacementScale: 24,
                    roughness: 1,
                    metalness: 0,
                }))
            planeMesh.rotation.x = - Math.PI / 2;

            let mapContainer = new Mesh(
                new CylinderGeometry(
                    108, // radius top
                    108, // radius bottom
                    10, // height
                    4, // segments
                    1, // heightsegments
                    true, // openEnded ?
                ),
                new MeshPhysicalMaterial({
                    envMap: envmap,
                    map: textures.dirt,
                    envMapIntensity: 0.2,
                    side: DoubleSide
                })
            )

            mapContainer.rotation.y = 0.8

            // const shadeMesh = new Mesh(planeGeometries,shader)
            // shadeMesh.rotation.x = - Math.PI / 2;
            scene.add(planeMesh, mapContainer,light)

            // let mouse = new Vector2()
            // let raycaster = new Raycaster()

            // window.addEventListener('pointHexMap', (e)=>{
            //     mouse.set((e.clientX / width * 2 - 1, -(e.clientY / height) * 2 + 1))
            //     raycaster.setFromCamera(mouse, camera)
            // })
            
    
            

            renderer.setAnimationLoop(()=>{
                controls.update()
                //renders the scene at 60fps
                renderer.render(scene, camera)
            })

            // FUNCTIONS -------------------
            function planeGeometry(){
                let plane = new PlaneGeometry(150,150,285,285)
                return plane
            }

            function makePlane(){
                let geo = planeGeometry()
                // geo = mergeBufferGeometries([geo, shader])
                planeGeometries = mergeBufferGeometries([planeGeometries, geo])
            }

        })()
    })



    return(
        <div ref={mount}/>
    )
}

export default WorldMap