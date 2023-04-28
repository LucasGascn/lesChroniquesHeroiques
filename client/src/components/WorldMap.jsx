import { useRef, useEffect } from "react";
import { PlaneGeometry, Raycaster, Vector2, Vector3 } from "three";
import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  PCFSoftShadowMap,
  PointLight,
  FloatType,
  MeshPhysicalMaterial,
  PMREMGenerator,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  ACESFilmicToneMapping,
  TextureLoader,
  sRGBEncoding,
  Mesh,
  Color,
} from "three";
import { RGBELoader, OrbitControls } from "three-stdlib";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { useNavigate, useLocation } from "react-router-dom";


const WorldMap = () => {
  const {state} = useLocation();
  const adventureId = state.adventureId;

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const mount = useRef(null);

  const navigate = useNavigate();

  const scene = new Scene();
  scene.background = new Color("#f3daa1");

  let width = windowSize.current[0];
  let height = windowSize.current[1];
  let intersects = [];
  let hovered = {};

  let mouse = new Vector2();
  let raycaster = new Raycaster();

  const camera = new PerspectiveCamera(
    45,
    windowSize.current[0] / windowSize.current[1],
    10,
    1000
  );
  camera.position.set(0, 30, 160);
  let target = new Vector3(0, 0, 0);
  camera.lookAt(target);

  window.addEventListener("pointermove", (e) => {
    mouse.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children, true);

    // Object.keys(hovered).forEach((key) => {
    //   const hit = intersects.find((hit) => hit.object.uuid === key);
    //   if (hit === undefined) {
    //     const hoveredItem = hovered[key];
    //     if (hoveredItem.object.onPointerOver)
    //       hoveredItem.object.onPointerOut(hoveredItem);
    //   }
    // });
    // console.log(mouse);

    // intersects.forEach((hit) => {
    //   if (!hovered[hit.object.uuid]) {
    //     hovered[hit.object.uuid] = hit;
    //     if (hit.object.onPointerOver) hit.object.onPointerOver(hit);
    //   }

    //   if (hit.object.onPointerMove) hit.object.onClick(hit);
    // });
  });

  window.addEventListener("click", (e) => {
    intersects.forEach((hit) => {
      if (hit.object.onClick) hit.object.onClick(hit);
    });
  });

  const loadEnvMapTexture = async (renderer) => {
    // renders the texture of our environment map
    let pmrem = new PMREMGenerator(renderer);
    let envmapTexture = await new RGBELoader()
      .setDataType(FloatType)
      .loadAsync(require("../assets/envmap.hdr"));
    let envmap = pmrem.fromEquirectangular(envmapTexture).texture;
    return envmap;
  };

  const getTextures = async () => {
    let textures = {
      dirt: await new TextureLoader().loadAsync(require("../assets/dirt.png")),
      dirt2: await new TextureLoader().loadAsync(
        require("../assets/dirt2.jpg")
      ),
      grass: await new TextureLoader().loadAsync(
        require("../assets/grass.jpg")
      ),
      sand: await new TextureLoader().loadAsync(require("../assets/sand.jpg")),
      stone: await new TextureLoader().loadAsync(
        require("../assets/stone.png")
      ),
      water: await new TextureLoader().loadAsync(
        require("../assets/water.jpg")
      ),
    };
    return textures;
  };

  useEffect(() => {
    (async function () {
      const renderer = new WebGLRenderer({ antialias: true });
      renderer.setSize(windowSize.current[0], windowSize.current[1]); // innerwidth et innerheight
      renderer.toneMapping = ACESFilmicToneMapping;
      renderer.outputEncoding = sRGBEncoding;
      renderer.physicallyCorrectLights = true;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = PCFSoftShadowMap;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.dampingFactor = 0.05;
      controls.enableDamping = true;

      mount.current.appendChild(renderer.domElement);
      // mount.current.addEventListener('click', onClick);

      let textures = await getTextures();

      let envmap = await loadEnvMapTexture(renderer);
      let heightmap = await new TextureLoader().loadAsync(
        require("../assets/heightMapHR.png")
      );
      let planeGeometries = new BoxGeometry(0, 0, 0);

      const light = new PointLight(
        new Color("#FFCB8E").convertSRGBToLinear().convertSRGBToLinear(),
        400,
        150
      );
      light.position.set(10, 15, 10);

      light.castShadow = true;
      light.shadow.mapSize.width = 512;
      light.shadow.mapSize.height = 512;
      light.shadow.camera.near = 0.5;
      light.shadow.camera.far = 500;

      makePlane(); // creates a plane and a merge the plane with a central boxGeometry(0,0,0)
      let mapColor = new Color(0x42974a);

      let planeMesh = new Mesh(
        planeGeometries,
        new MeshPhysicalMaterial({
          envMap: envmap,
          flatShading: true,
          side: DoubleSide,
          displacementMap: heightmap,
          displacementScale: 24,
          roughness: 1,
          metalness: 0,
          color: mapColor,
        })
      );
      planeMesh.rotation.x = -Math.PI / 2;

      let seaMesh = new Mesh(
        new CylinderGeometry(107, 107, 4.5, 4, 1),
        new MeshPhysicalMaterial({
          envMap: envmap,
          color: new Color("#3884d0").convertSRGBToLinear().multiplyScalar(3),
          ior: 1.4,
          transmission: 1,
          transparent: true,
          thickness: 1.5,
          envMapIntensity: 0.2,
          roughness: 1,
          metalness: 0.025,
          roughnessMap: textures.water,
          metalnessMap: textures.water,
        })
      );

      let mapContainer = new Mesh(
        new CylinderGeometry(
          108, // radius top
          108, // radius bottom
          10, // height
          4, // segments
          1, // heightsegments
          true // openEnded ?
        ),
        new MeshPhysicalMaterial({
          envMap: envmap,
          map: textures.dirt,
          envMapIntensity: 0.2,
          side: DoubleSide,
        })
      );

      let mapFloor = new Mesh(
        new CylinderGeometry(120, 120, 10 * 0.1, 4, 1),
        new MeshPhysicalMaterial({
          envMap: envmap,
          map: textures.dirt2,
          envMapIntensity: 0.1,
          side: DoubleSide,
        })
      );
      mapFloor.rotation.y = 0.8;
      mapContainer.rotation.y = 0.8;
      seaMesh.rotation.y = 0.8;

      // window.addEventListener('click',onClick)

      // planeMesh.addEventListener('click',onClick)

      // const shadeMesh = new Mesh(planeGeometries,shader)
      // shadeMesh.rotation.x = - Math.PI / 2;

      class clickablePlane extends Mesh {
        //Creates a plane with Onclick pointerOn and pointerOut event
        //to get coords for the mouse, and redirect to /hexMap on click
        constructor() {
          super();
          this.geometry = new PlaneGeometry(150, 150, 285, 285);
          this.material = new MeshPhysicalMaterial({
            envMap: envmap,
            flatShading: true,
            side: DoubleSide,
            displacementMap: heightmap,
            displacementScale: 24,
            roughness: 1,
            metalness: 0,
            color: new Color(0x42974a),
          });
        }

        onClick(e) {
          navigate("/hexmap", { state : { adventureId: adventureId }}, {replace: true});
          window.removeEventListener("click", e);
          window.removeEventListener("pointermove", e);
        }

        onPointerOver(e) {
          console.log("over");
          // this.material.color.set('hotpink')
          // this.material.color.convertSRGBToLinear()
        }

        onPointerOut(e) {
          console.log("out");
          // this.material.color.set(new Color(0x42974a))
          // this.material.color.convertSRGBToLinear()
        }
      }

      let clickPlane = new clickablePlane();

      clickPlane.rotation.x = -Math.PI / 2;
      scene.add(clickPlane, mapContainer, mapFloor, seaMesh, light);

      renderer.setAnimationLoop(() => {
        controls.update();
        //renders the scene at 60fps
        renderer.render(scene, camera);
      });

      // FUNCTIONS -------------------
      function planeGeometry() {
        let plane = new PlaneGeometry(150, 150, 285, 285);
        return plane;
      }

      function makePlane() {
        let geo = planeGeometry();
        // geo = mergeBufferGeometries([geo, shader])
        planeGeometries = mergeBufferGeometries([planeGeometries, geo]);
      }
    })();
  });

  return <div ref={mount} />;
};

export default WorldMap;
