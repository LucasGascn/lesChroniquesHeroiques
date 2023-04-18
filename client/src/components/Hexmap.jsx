import { useEffect, useRef} from 'react'
// import { MeshBasicMaterial } from 'three'
import { FloatType, MeshStandardMaterial, PMREMGenerator, SphereGeometry, Scene, PerspectiveCamera, WebGLRenderer, ACESFilmicToneMapping, sRGBEncoding, Mesh, Color} from 'three'
import { RGBELoader, OrbitControls } from 'three-stdlib'


// FloatType, MeshStandardMaterial, PMREMGenerator

const Hexmap = () => {
    const mount = useRef(null)
    // const [reactScene, setReactScene] = useState()


    

    const loadEnvMapTexture = async(renderer,envmap) => {
        let envTexture = require("../assets/envmap.hdr")
        // renders the texture of our environment map
        let pmrem = new PMREMGenerator(renderer);
        let envmapTexture = await new RGBELoader().setDataType(FloatType).loadAsync(envTexture)
        envmap = pmrem.fromEquirectangular(envmapTexture).texture;
        return envmap
    }


    useEffect(()=>{
        const scene = new Scene()
        scene.background = new Color("honeydew")
    
        const camera = new PerspectiveCamera(45, 1000 / 1000, 0.1, 1000)
        // camera.position.set(-17,31,33);
        camera.position.set(0,0,50);
    
        const renderer = new WebGLRenderer({antialias: true})
        renderer.setSize(1000,1000)
        renderer.toneMapping = ACESFilmicToneMapping;
        renderer.outputEncoding = sRGBEncoding;
        renderer.physicallyCorrectLights = true;

        console.log(renderer)

        mount.current.appendChild(renderer.domElement) 
        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0,0,0)
        controls.dampingFactor = 0.05
        controls.enableDamping = true

        let envmap;
        loadEnvMapTexture(renderer,envmap)


        let sphereMesh = new Mesh(
            new SphereGeometry(5,10,10),
            new MeshStandardMaterial({
                envMap: envmap,
                roughness: 0,
                metalness:1,
            })
            // new MeshBasicMaterial({ color: 0xff0000})
        )
        scene.add(sphereMesh)

        
        renderer.setAnimationLoop(()=>{
            controls.update()
            //renders the scene at 60fps
            renderer.render(scene, camera)
        })
    },[])

    return(
        <div ref={mount} />
    )
}
export default Hexmap