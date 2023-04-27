import { useEffect, useRef} from 'react'
import { Vector2 } from 'three'
// import { MeshBasicMaterial } from 'three'
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
import { SimplexNoise } from "simplex-noise"


const Hexmap = () => {
    const mount = useRef(null)
    // const [reactScene, setReactScene] = useState()
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

    

    const windowSize = useRef([window.innerWidth, window.innerHeight])

    useEffect(()=>{
        (async function(){
            // wrap in an IIFE function to allow dismount of component
            const scene = new Scene()
            scene.background = new Color("#f3daa1")
    
            // let hexagonGeometries = new BoxGeometry(0,0,0) // stocks all hex to avoid overloading cpu
            //stocks all hexagons by type to avoid overloading cpu
            let stoneGeo = new BoxGeometry(0,0,0)
            let dirtGeo = new BoxGeometry(0,0,0)
            let dirt2Geo = new BoxGeometry(0,0,0)
            let grassGeo = new BoxGeometry(0,0,0)
            let sandGeo = new BoxGeometry(0,0,0)
    
        
            const camera = new PerspectiveCamera(45, windowSize.current[0] / windowSize.current[1], 0.1, 1000)
            camera.position.set(-17,31,33);
            // camera.position.set(0,0,50);
        
            const renderer = new WebGLRenderer({antialias: true})
            renderer.setSize(windowSize.current[0],windowSize.current[1]) // innerwidth et innerheight
            renderer.toneMapping = ACESFilmicToneMapping;
            renderer.outputEncoding = sRGBEncoding;
            renderer.physicallyCorrectLights = true;
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = PCFSoftShadowMap;
    
            mount.current.appendChild(renderer.domElement) 
    
    
            
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0,0,0)
            controls.dampingFactor = 0.05
            controls.enableDamping = true
    
            let textures = await getTextures();
    
            let envmap = await loadEnvMapTexture(renderer)
            let simplex = new SimplexNoise() // must use simplxe-noise 3.0.1
            const maxHeight = 10
            const stoneHeight = maxHeight * 0.8
            const dirtHeight = maxHeight * 0.7
            const grassHeight = maxHeight * 0.5
            const sandHeight = maxHeight * 0.3
            const dirt2Height = maxHeight * 0
    
            for(let i = -10; i <= 10; i++){
                for(let j = -10; j <= 10; j++){
                    let position = tileToPosition(i,j)
    
                    if(position.length() > 16) continue;
    
                    //slightly move the tile position, and ensuring it's still a number between 0 and 1,
                    let noise = (simplex.noise2D(i * 0.1, j * 0.1)+ 1) * 0.5;
                    noise = Math.pow(noise, 1.5) // makes mountain a bit stiffer
    
                    makeHex(noise * maxHeight, position)
                }
            }
    
    
            let stoneMesh = hexMesh(stoneGeo, textures.stone)
            let dirtMesh = hexMesh(dirtGeo, textures.dirt)
            let grassMesh = hexMesh(grassGeo, textures.grass)
            let sandMesh = hexMesh(sandGeo, textures.sand)
            let dirt2Mesh = hexMesh(dirt2Geo, textures.dirt2)
    
            let seaMesh = new Mesh(
                new CylinderGeometry(17, 17, maxHeight * 0.2, 50),
                new MeshPhysicalMaterial({
                    envMap: envmap,
                    color: new Color("#55aaff").convertSRGBToLinear().multiplyScalar(3),
                    ior: 1.4,
                    transmission: 1,
                    transparent: true,
                    thickness:1.5,
                    envMapIntensity: 0.2,
                    roughness:1,
                    metalness:0.025,
                    roughnessMap: textures.water,
                    metalnessMap: textures.water,
                })
            )
            seaMesh.receiveShadow = true
            seaMesh.position.set(0, maxHeight * 0.1, 0)
    
            //double convert makes the light more vibrant ( makes no sense tho )
            const light = new PointLight( new Color("#FFCB8E").convertSRGBToLinear().convertSRGBToLinear(), 400, 150)
            light.position.set(10,15,10);
    
            light.castShadow = true;
            light.shadow.mapSize.width = 512
            light.shadow.mapSize.height = 512
            light.shadow.camera.near = 0.5
            light.shadow.camera.far = 500
    
    
            let mapContainer = new Mesh(
                new CylinderGeometry(17.1,17.1, maxHeight * 0.25,50,1,true),
                new MeshPhysicalMaterial({
                    envMap: envmap,
                    map: textures.dirt,
                    envMapIntensity: 0.2,
                    side: DoubleSide,
                })
            )
            mapContainer.receiveShadow = true;
            mapContainer.position.set(0,maxHeight * 0.125, 0)
    
            let mapFloor = new Mesh(
                new CylinderGeometry(18.5, 18.5, maxHeight * 0.1, 50),
                new MeshPhysicalMaterial({
                    envMap: envmap,
                    map: textures.dirt2,
                    envMapIntensity: 0.1,
                    side: DoubleSide,
                })
            )
            mapFloor.receiveShadow = true;
            mapFloor.position.set(0, -maxHeight * 0.05, 0)
    
            // scene.add(light)
            let cloudmesh = clouds()
            scene.add(stoneMesh,dirtMesh,grassMesh,sandMesh,dirt2Mesh,light,seaMesh, mapContainer, mapFloor, cloudmesh)
            
            renderer.setAnimationLoop(()=>{
                controls.update()
                //renders the scene at 60fps
                renderer.render(scene, camera)
            })
    
    
            // FUNCTIONS -----------
            
            function hexGeometry(height, position){
                let geo = new CylinderGeometry(1,1,height, 6, 1, false)
                geo.translate(position.x,height * 0.5, position.y)
    
                return geo
            }
    
            function makeHex(height, position){
                //creates hexagons with various textures
                let geo = hexGeometry(height, position)
                if(height > stoneHeight){
                    stoneGeo = mergeBufferGeometries([geo, stoneGeo])
                    let makeStone = Math.random()
                    if(makeStone > 0.8){
                        stoneGeo = mergeBufferGeometries([stoneGeo, stone(height, position)])
                    }
                }
                else if(height > dirtHeight){
                    dirtGeo = mergeBufferGeometries([geo, dirtGeo])
    
                    let makeTrees = Math.random()
    
                    if(makeTrees > 0.5){
                        grassGeo = mergeBufferGeometries([grassGeo, tree(height, position)])
                    }
                }
                else if(height > grassHeight){
                    grassGeo = mergeBufferGeometries([geo, grassGeo])
                }
                else if(height > sandHeight){
                    sandGeo = mergeBufferGeometries([geo, sandGeo])
    
                    let makeStone = Math.random()
                    if(makeStone > 0.8 && stoneGeo){
                        stoneGeo = mergeBufferGeometries([stoneGeo, stone(height, position)])
                    }
                }
                else if(height > dirt2Height){
                    dirt2Geo = mergeBufferGeometries([geo, dirt2Geo])
                }
            }
    
            function hexMesh(geo,map) {
                let mat = new MeshPhysicalMaterial({
                    envMap: envmap,
                    // envMapIntensity: 1,
                    envMapIntensity: 0.135,
                    flatShading: true,
                    map
                })
    
                let mesh = new Mesh(geo,mat);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
    
                return mesh
            }
    
            function tileToPosition(tileX, tileY){
                // every time tileY is odd we offset the X slightly to make an hex grid
                // ( offset, spacing )
                return new Vector2((tileX + (tileY % 2)* 0.5)*1.77, tileY * 1.535) 
            }
    
            function stone(height, position){
                const px = Math.random() * 0.4
                const pz = Math.random() * 0.4
    
                const geo = new SphereGeometry(Math.random()* 0.3 + 0.1, 7, 7);
                geo.translate(position.x + px, height, position.y + pz)
    
                return geo;
            }
    
            function tree(height, position){
                const treeHeight = Math.random() * 1 + 1.25
    
                const geo = new CylinderGeometry(0, 1.5, treeHeight, 3);
                geo.translate(position.x, height + treeHeight * 0 + 1, position.y)
    
                const geo2 = new CylinderGeometry(0, 1.15, treeHeight, 3)
                geo2.translate(position.x, height + treeHeight * 0.6 + 1, position.y)
                
                const geo3 = new CylinderGeometry(0, 0.8, treeHeight, 3)
                geo3.translate (position.x, height + treeHeight * 1.25 + 1, position.y)
    
                return mergeBufferGeometries([geo, geo2, geo3])
            }
    
            function clouds(){
                let geo = new SphereGeometry(0,0,0)
                let count = Math.floor(Math.pow(Math.random(), 0.45) * 4); // equivalent to math.pow * 4 but with more variance
    
                for(let i = 0; i < count; i++ ){
                    // three spheres for a cloud 1 offset to left one to right
                    const puff1 = new SphereGeometry(1.2, 7, 7)
                    const puff2 = new SphereGeometry(1.5, 7, 7)
                    const puff3 = new SphereGeometry(0.9, 7, 7)
        
                    // translate the 3 spheres once they've been merged
                    puff1.translate(-1.85, Math.random() * 0.3, 0)
                    puff2.translate(0, Math.random() * 0.3, 0)
                    puff3.translate(1.85, Math.random() * 0.3, 0)
        
                    const cloudGeo = mergeBufferGeometries([puff1, puff2, puff3]);
                    cloudGeo.translate(
                        Math.random() * 20 - 10,
                        Math.random() * 7 + 7,
                        Math.random() * 20 - 10,
                    )
                    cloudGeo.rotateY(Math.random() * Math.PI * 2);
        
                    geo = mergeBufferGeometries([geo, cloudGeo])
                }
    
                const mesh = new Mesh(
                    geo,
                    new MeshStandardMaterial({
                        envMap: envmap,
                        envMapIntensity: 0.75,
                        flatShading: true
                    })
                );
    
                return mesh
    
            }
        })()



    },[])

    return(
        <div ref={mount} />
    )
}
export default Hexmap