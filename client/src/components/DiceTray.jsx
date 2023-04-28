import { useEffect, useRef, useState } from "react"
import { Color } from "three";
import { CylinderGeometry, DoubleSide, Mesh, MeshPhysicalMaterial, PerspectiveCamera, Scene, Vector3, PMREMGenerator, TextureLoader, FloatType, ACESFilmicToneMapping, WebGLRenderer, sRGBEncoding, PCFSoftShadowMap, BoxGeometry } from "three"
import { RGBELoader, OrbitControls } from "three-stdlib";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
// import * as rapier from "@dimforge/rapier3d"

const DiceTray = () =>{
    const mount = useRef(null);
    const scene = new Scene();
    scene.background = new Color("#f3daa1");
    const [prepDice, setPrepDice] = useState(false);

    let diceTypes = ["D4","D6","D8","D10","D12","D20",]
    // let world = new World()

    // world.gravity.set(0,-9.82 * 20, 0);
    // world.broadphase = new NaiveBroadphase();
    // world.solver.iterations = 16;

    // DiceManager.setWorld(world)

    // let D4 = new DiceD4({size:1.5, backColor:"white"}); 
    // let D6 = new DiceD6({size:1.5, backColor:"white"});
    // let D8 = new DiceD8({size:1.5, backColor:"white"});
    // let D10 = new DiceD10({size:1.5, backColor:"white"});
    // let D12 = new DiceD12({size:1.5, backColor:"white"});
    // let D20 = new DiceD20({size:1.5, backColor:"white"});

    // const throwDice =(dice)=>{
    //     let diceValues = []
    //     dice.getObject().position.x = -15 - ( 1 % 3) * 1.5;
    //     dice.getObject().position.y = 20 + Math.floor(1 / 3) * 1.5;
    //     dice.getObject().position.z = -15 - ( 1 % 3) * 1.5;

    //     dice.getObject().quaternion.x = ((Math.random()* 90 - 45)* Math.PI) / 180;
    //     dice.getObject().quaternion.y = ((Math.random()* 90 - 45)* Math.PI) / 180;



    //     dice.updateBodyFromMesh()
    //     let yRandom = Math.random() * 20;
    //     let random = Math.random() * 5;
    //     let min = 1; 
    //     let max = 6;
    //     dice.getObject().body.velocity.set(25 + random, 40 + yRandom,15 + random);
    //     dice.getObject()
    //     .body.angularVelocity.set(
    //         20 * Math.random() - 10,
    //         20 * Math.random() - 10,
    //         20 * Math.random() - 10
    //     );

    //     let value = Math.random() * (max - min) + min;

    //     diceValues.push({dice: dice, value: value})

    //     setInterval(throwDice,3000)

    //     DiceManager.prepareValues(diceValues)
    //     setPrepDice(true)



    //     // requestAnimationFrame(animate)
    // }





    // function updatePhysics(dice){
    //     world.step(1.0/60.0)

    //     if(prepDice == true){
    //         dice.updateMeshFromBody();
    //     }
    // }

    let listDices = diceTypes.map((d)=>{
        return(
            <div>
                <button>{d}</button>
            </div>
        )
    })



    

    const windowSize = useRef([window.innerWidth,window.innerHeight])

    let width = windowSize.current[0];
    let height = windowSize.current[1];

    const getTextures = async() =>{
        let textures = {
            dirt: await new TextureLoader().loadAsync(require("../assets/dirt.png")),
            dirt2: await new TextureLoader().loadAsync(require("../assets/dirt2.jpg")),
            grass: await new TextureLoader().loadAsync(require("../assets/grass.jpg")),
            sand: await new TextureLoader().loadAsync(require("../assets/sand.jpg")),
            stone: await new TextureLoader().loadAsync(require("../assets/stone.png")),
            water: await new TextureLoader().loadAsync(require("../assets/water.jpg")),
            D6: await new TextureLoader().loadAsync(require("../assets/dice.jpg"))
        }
        return textures;
    }

    const loadEnvMapTexture = async(renderer) => {
        // renders the texture of our environment map
        let pmrem = new PMREMGenerator(renderer);
        let envmapTexture = await new RGBELoader().setDataType(FloatType).loadAsync(require("../assets/envmap.hdr"))
        let envmap = pmrem.fromEquirectangular(envmapTexture).texture;
        return envmap
    }


    useEffect(()=>{

        (async function(){
            
            // const size = useRef([mount.innerWidth, mount.innerHeight])
    
            const renderer = new WebGLRenderer({antialias: true})
                renderer.setSize(width,height) // innerwidth et innerheight
                renderer.toneMapping = ACESFilmicToneMapping;
                renderer.outputEncoding = sRGBEncoding;
                renderer.physicallyCorrectLights = true;
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = PCFSoftShadowMap;
                
            const camera = new PerspectiveCamera(45, windowSize.current[0] / windowSize.current[1], 0.1, 1000)
                camera.position.set(0,80,-30)
                let target = new Vector3(0,0,0)
                camera.lookAt(target)
                
            const controls = new OrbitControls(camera, renderer.domElement);
                controls.target.set(0,0,0)
                controls.dampingFactor = 0.05
                controls.enableDamping = true
            
            mount.current.appendChild(renderer.domElement);
    
            let textures = await getTextures();
            let envmap = await loadEnvMapTexture(renderer)
            let planeGeometries = new BoxGeometry(0,0,0)


            let dice6 = new Mesh( 
                new BoxGeometry(5,5,5),
                new MeshPhysicalMaterial({ 
                    envMap: envmap,
                    envMapIntensity: 0.1,
                    color: new Color("white")
                }),
            )

            // const gravity = new rapier.Vector3(0, -9.81, 0);
            // const world = new rapier.World(gravity);
        
            // const shape = rapier.Shape.cuboid(5,5,5);
        
            // // dice body
            // const rigidBodyDesc = new rapier.RigidBodyDesc(rapier.RigidBodyType.Dynamic)
            // .setTranslation(0,5,0)
            // .setMass(1.0)
        
        
            // const rigidBody = world.createRigidBody(rigidBodyDesc);
            // const colliderDesc = new rapier.ColliderDesc(shape).setRestitution(0.9).build();
        
            // const collider = world.createCollider(colliderDesc, rigidBody.handle)
            // dice6.userData.physics = {rigidBody, collider};
    
            let trayFloor = new Mesh(
                new CylinderGeometry(50,50,1,4,1),
                new MeshPhysicalMaterial({
                    envMap: envmap,
                    map: textures.dirt2,
                    envMapIntensity: 0.1,
                    side: DoubleSide,
                })
            )
        
            let traySides = new Mesh(
                new CylinderGeometry(50.1, 50.1,20,4,1,true),
                new MeshPhysicalMaterial({
                    envMap: envmap,
                    map: textures.dirt2,
                    envMapIntensity: 0.1,
                    side: DoubleSide,
                })
            )
    
            traySides.rotation.y = 0.8
            trayFloor.rotation.y = 0.8


            dice6.position.set(0, 20, 0)

            scene.add(traySides, trayFloor, camera, dice6)


            renderer.setAnimationLoop(()=>{
                // const force = new rapier.Vector3(0,0,-10);
                // rigidBody.applyImpulse(force,true)

                // const pos = rigidBody.translation()
                // const quaternion = rigidBody.rotation();
                // dice6.position.set(pos.x, pos.y, pos.z)
                // dice6.quaternion.set(quaternion.x,quaternion.y,quaternion.z, quaternion.w)
                // world.step()
                controls.update()
                //renders the scene at 60fps
                renderer.render(scene, camera)
            })
            
            
        })()
    })


    




    return(
        <>
        <div ref={mount}>
        </div>
        <div id='diceListContainer'>{listDices}</div>
        </>
    )
}

export default DiceTray