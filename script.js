const container = document.body;

let viewport = {
  width: container.clientWidth,
  height: container.clientHeight,
  aspectRatio: container.clientWidth / container.clientHeight };


const scene = new THREE.Scene();
scene.background = new THREE.Color(000000);

const renderer = new THREE.WebGLRenderer({
  antialias: false,
  alpha: false });


renderer.setSize(viewport.width, viewport.height);
renderer.setPixelRatio = window.devicePixelRatio;
container.appendChild(renderer.domElement);

const FOV = 100;
const CAMERA_NEAR = 0.5;
const CAMERA_FAR = 200;
const ASPECT_RATIO = viewport.aspectRatio;

const camera = new THREE.PerspectiveCamera(
FOV,
ASPECT_RATIO,
CAMERA_NEAR,
CAMERA_FAR);

//카메라-시작 위치
camera.position.set(0, 0, 25);

//안개
{
  const near = 1;
  const far = 300;
  const color = 0x000000;
  scene.fog = new THREE.Fog(color, near, far);
}

const sectionsInfo = [
{
  images: [
  "https://chungboklee.github.io/thedimension/asset/1.png",
  "https://chungboklee.github.io/thedimension/asset/2.png",
  "https://chungboklee.github.io/thedimension/asset/3.png",
  "https://chungboklee.github.io/thedimension/asset/4.png",
  "https://chungboklee.github.io/thedimension/asset/5.png",
  "https://chungboklee.github.io/thedimension/asset/6.png",
  "https://chungboklee.github.io/thedimension/asset/7.png",
  "https://chungboklee.github.io/thedimension/asset/8.png",
  "https://chungboklee.github.io/thedimension/asset/9.png",
  "https://chungboklee.github.io/thedimension/asset/10.png",
  "https://chungboklee.github.io/thedimension/asset/11.png",
  "https://chungboklee.github.io/thedimension/asset/12.png",
  "https://chungboklee.github.io/thedimension/asset/13.png",
  "https://chungboklee.github.io/thedimension/asset/14.png",
  "https://chungboklee.github.io/thedimension/asset/15.png",
  "https://chungboklee.github.io/thedimension/asset/16.png"],

  title: "THE DIMENSION\nTODAY"},

{
  images: [
    "https://chungboklee.github.io/thedimension/asset/1.png",
    "https://chungboklee.github.io/thedimension/asset/2.png",
    "https://chungboklee.github.io/thedimension/asset/3.png",
    "https://chungboklee.github.io/thedimension/asset/4.png",
    "https://chungboklee.github.io/thedimension/asset/5.png",
    "https://chungboklee.github.io/thedimension/asset/6.png",
    "https://chungboklee.github.io/thedimension/asset/7.png",
    "https://chungboklee.github.io/thedimension/asset/8.png",
    "https://chungboklee.github.io/thedimension/asset/9.png",
    "https://chungboklee.github.io/thedimension/asset/10.png",
    "https://chungboklee.github.io/thedimension/asset/11.png",
    "https://chungboklee.github.io/thedimension/asset/12.png",
    "https://chungboklee.github.io/thedimension/asset/13.png",
    "https://chungboklee.github.io/thedimension/asset/14.png",
    "https://chungboklee.github.io/thedimension/asset/15.png",
    "https://chungboklee.github.io/thedimension/asset/16.png"],

  title: "29th\nSEP"},
{
  images: [
    "https://chungboklee.github.io/thedimension/asset/1.png",
  "https://chungboklee.github.io/thedimension/asset/2.png",
  "https://chungboklee.github.io/thedimension/asset/3.png",
  "https://chungboklee.github.io/thedimension/asset/4.png",
  "https://chungboklee.github.io/thedimension/asset/5.png",
  "https://chungboklee.github.io/thedimension/asset/6.png",
  "https://chungboklee.github.io/thedimension/asset/7.png",
  "https://chungboklee.github.io/thedimension/asset/8.png",
  "https://chungboklee.github.io/thedimension/asset/9.png",
  "https://chungboklee.github.io/thedimension/asset/10.png",
  "https://chungboklee.github.io/thedimension/asset/11.png",
  "https://chungboklee.github.io/thedimension/asset/12.png",
  "https://chungboklee.github.io/thedimension/asset/13.png",
  "https://chungboklee.github.io/thedimension/asset/14.png",
  "https://chungboklee.github.io/thedimension/asset/15.png",
  "https://chungboklee.github.io/thedimension/asset/16.png"],

  title: "28th\nSEP"},

{
  images: [
  "https://chungboklee.github.io/thedimension/asset/12.png",
  "https://chungboklee.github.io/thedimension/asset/13.png",
  "https://chungboklee.github.io/thedimension/asset/14.png",
  "https://chungboklee.github.io/thedimension/asset/15.png",
  "https://chungboklee.github.io/thedimension/asset/5.png",
  "https://chungboklee.github.io/thedimension/asset/6.png",
  "https://chungboklee.github.io/thedimension/asset/7.png"],

  title: "27th\nSEP"}];



const raycaster = new THREE.Raycaster();
let intersections = [];
const textureLoader = new THREE.TextureLoader();
const fontLoader = new THREE.FontLoader();
const font = "https://chungboklee.github.io/thedimension/font.json";

const makePlane = (width, height, image) => {
  const geometry = new THREE.PlaneBufferGeometry(width, height, 1);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: image });

  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};

// 이미지 나열 (메인 뉴스)
const setImagesPositions = (image, index) => {
  if (index === 0) {
//1
    gsap.set(image, { x: -12, y: 12, z: "-=20" });
  } else if (index === 1) {
//2
    gsap.set(image, { x: 10, y: 8, z: "-=24" });
  } else if (index === 2) {
//3
    gsap.set(image, { x: 12, y: -10, z: "-=20" });
  } else if (index === 3) {
//4
    gsap.set(image, { x: -12, y: -12, z: "-=20" });
  } else if (index === 4) {
//1-a
    gsap.set(image, { x: -28, y: 20, z: "-=18" });
  } else if (index === 5) {
//1-b
    gsap.set(image, { x: -30, y: 4, z: "-=18" });
  } else if (index === 6) {
//3-a
    gsap.set(image, { x: 34, y: -18, z: "-=24" });
  } else if (index === 7) {
 //4-a
    gsap.set(image, { x: -30, y: -24, z: "-=24" });
  } else if (index ===8) {
//21
  gsap.set(image, { x: -12, y: 4, z: "-=40" });
} else if (index === 9) {
//22
  gsap.set(image, { x: 12, y: -12, z: "-=40" });
} else if (index === 10) {
//23
  gsap.set(image, { x: 10, y: 8, z: "-=40" });
} else if (index === 11) {
//32-a
  gsap.set(image, { x: -16, y: 16, z: "-=64" });
} else if (index === 12) {
//32
  gsap.set(image, { x: 0, y: 8, z: "-=60" });
} else if (index === 13) {
//33
  gsap.set(image, { x: 12, y: -10, z: "-=60" });
} else if (index === 14) {
//34
  gsap.set(image, { x: -12, y: -8, z: "-=60" });
} else if (index === 15) {
//32-b
  gsap.set(image, { x: 20, y: 16, z: "-=64" });
} else if (index === 16) {

gsap.set(image, { x: 16, y: -16, z: "-=60" });
}
  return;
};

const months = [];

sectionsInfo.forEach((section, index) => {
  const sectionGroup = new THREE.Group();

  fontLoader.load(font, font => {
    const geometry = new THREE.TextBufferGeometry(section.title, {
      font: font,
      size: 3,
      height: 0.2,
      curveSegments: 4 }).
    center();

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff });


    const mesh = new THREE.Mesh(geometry, material);

    sectionGroup.add(mesh);
  });
  

  section.images.forEach((image, index) => {
    const plane = makePlane(
    20,
    20,
    textureLoader.load(image, texture => {
      plane.scale.set(
      1.0,
      texture.image.height / texture.image.width,
      1.0);

    }));

    intersections.push(plane);
    setImagesPositions(plane.position, index);

    sectionGroup.add(plane);
    months.push(sectionGroup);
  });

  gsap.set(sectionGroup.position, {
    z: () => -index * 100 });

  scene.add(sectionGroup);
});

let mouse = new THREE.Vector2();

let mousePerspective = {
  x: 0,
  y: 0 };


const onMouseMove = event => {
  mouse.set(
  event.clientX / window.innerWidth * 2 - 1,
  event.clientX / window.innerWidth * -2 + 1);


  raycaster.intersectObjects(intersections, true).forEach(intersection => {
    console.log("Over");
    // intersection.object.scale.divideScalar(1.5);
  });

  mousePerspective.x = event.clientX / window.innerWidth - 0.5;
  mousePerspective.y = event.clientY / window.innerHeight - 0.5;

  gsap.to(camera.rotation, 4, {
    x: -mousePerspective.y * 0.5,
    y: -mousePerspective.x * 0.5,
    ease: "power4.out" });

};

window.addEventListener("mousemove", onMouseMove, false);

const onWindowResize = () => {
  viewport.width = container.clientWidth;
  viewport.height = container.clientHeight;
  viewport.aspectRatio = container.clientWidth / container.clientHeight;

  camera.aspect = viewport.aspectRatio;
  camera.updateProjectionMatrix();
  renderer.setSize(viewport.width, viewport.height);
};

window.addEventListener("resize", onWindowResize);

document.addEventListener("mousewheel", event => {
  camera.position.z -= event.deltaY / 10 * 0.25;
});

const render = () => {
  renderer.render(scene, camera);
  raycaster.setFromCamera(mouse, camera);

  requestAnimationFrame(() => {
    render();
  });
};

render();