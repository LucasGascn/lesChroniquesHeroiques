import { useEffect, useRef} from 'react'
import { CylinderGeometry } from 'three'
import { BoxGeometry } from 'three'
import { Vector2 } from 'three'
// import { MeshBasicMaterial } from 'three'
import { FloatType, MeshStandardMaterial, PMREMGenerator, SphereGeometry, Scene, PerspectiveCamera, WebGLRenderer, ACESFilmicToneMapping, sRGBEncoding, Mesh, Color} from 'three'
import { RGBELoader, OrbitControls } from 'three-stdlib'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'


// FloatType, MeshStandardMaterial, PMREMGenerator

const Hexmap = () => {
    const mount = useRef(null)
    // const [reactScene, setReactScene] = useState()


    

    const loadEnvMapTexture = async(renderer,envmap) => {
        // renders the texture of our environment map
        let pmrem = new PMREMGenerator(renderer);
        let envmapTexture = await new RGBELoader().setDataType(FloatType).loadAsync()
        envmap = pmrem.fromEquirectangular(envmapTexture).texture;
        return envmap
    }

    


    useEffect(()=>{
        const scene = new Scene()
        scene.background = new Color("honeydew")

        let hexagonGeometries = new BoxGeometry(0,0,0) // stocks all hex to avoid overloading cpu
    
        const camera = new PerspectiveCamera(45, 1000 / 1000, 0.1, 1000)
        // camera.position.set(-17,31,33);
        camera.position.set(0,0,50);
    
        const renderer = new WebGLRenderer({antialias: true})
        renderer.setSize(1000,1000)
        renderer.toneMapping = ACESFilmicToneMapping;
        renderer.outputEncoding = sRGBEncoding;
        // renderer.physicallyCorrectLights = true;

        console.log(renderer)

        mount.current.appendChild(renderer.domElement) 
        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0,0,0)
        controls.dampingFactor = 0.05
        controls.enableDamping = true

        let envmap;
        loadEnvMapTexture(renderer,envmap)


        // let sphereMesh = new Mesh(
        //     new SphereGeometry(5,10,10),
        //     new MeshStandardMaterial({
        //         envMap: envmap,
        //         roughness: 0,
        //         metalness:1,
        //     })
        //     // new MeshBasicMaterial({ color: 0xff0000})
        // )
        // scene.add(sphereMesh)
        makeHex(3, new Vector2(0,0))
        let hexagonMesh = new Mesh(
            hexagonGeometries,
            new MeshStandardMaterial({
                envMap: envmap,
                flatShading:true
            })
            )
        scene.add(hexagonMesh)
        
        renderer.setAnimationLoop(()=>{
            controls.update()
            //renders the scene at 60fps
            renderer.render(scene, camera)
        })
        
        function hexGeometry(height, position){
            let geo = new CylinderGeometry(1,1,height, 6, 1, false)
            geo.translate(position.x,height * 0.5, position.y)

            return geo
        }

        function makeHex(height, position){
            let geo = hexGeometry(height, position)
            hexagonGeometries = mergeBufferGeometries([hexagonGeometries, geo])
        }
    },[])

    return(
        <div ref={mount} />
    )
}
export default Hexmap