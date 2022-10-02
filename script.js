const container = document.body;

let viewport = {
  width: container.clientWidth,
  height: container.clientHeight,
  aspectRatio: container.clientWidth / container.clientHeight };


const scene = new THREE.Scene();
scene.background = new THREE.Color(000000);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false });


renderer.setSize(viewport.width, viewport.height);
renderer.setPixelRatio = window.devicePixelRatio;
container.appendChild(renderer.domElement);

const FOV = 120;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 200;
const ASPECT_RATIO = viewport.aspectRatio;

const camera = new THREE.PerspectiveCamera(
FOV,
ASPECT_RATIO,
CAMERA_NEAR,
CAMERA_FAR);


camera.position.set(0, 0, 25);

{
  const near = 1;
  const far = 300;
  const color = 0x000000;
  scene.fog = new THREE.Fog(color, near, far);
}

const sectionsInfo = [
{
  images: [
  "https://chungboklee.github.io/glitch-classic/asset/1.png",
  "https://chungboklee.github.io/glitch-classic/asset/2.png",
  "https://chungboklee.github.io/glitch-classic/asset/3.png",
  "https://chungboklee.github.io/glitch-classic/asset/4.png",
  "https://chungboklee.github.io/glitch-classic/asset/5.png",
  "https://chungboklee.github.io/glitch-classic/asset/6.png",
  "https://chungboklee.github.io/glitch-classic/asset/7.png",
  "https://chungboklee.github.io/glitch-classic/asset/8.png",
  "https://chungboklee.github.io/glitch-classic/asset/9.png",
  "https://chungboklee.github.io/glitch-classic/asset/10.png",
  "https://chungboklee.github.io/glitch-classic/asset/11.png",
  "https://chungboklee.github.io/glitch-classic/asset/12.png",
  "https://chungboklee.github.io/glitch-classic/asset/13.png",
  "https://chungboklee.github.io/glitch-classic/asset/14.png",
  "https://chungboklee.github.io/glitch-classic/asset/15.png",
  "https://chungboklee.github.io/glitch-classic/asset/16.png"],

  title: "THE DIMENSION\nTODAY"},

{
  images: [
  "https://chungboklee.github.io/glitch-classic/asset/5.png",
  "https://chungboklee.github.io/glitch-classic/asset/6.png",
  "https://chungboklee.github.io/glitch-classic/asset/7.png",
  "https://chungboklee.github.io/glitch-classic/asset/8.png",
  "https://chungboklee.github.io/glitch-classic/asset/9.png",
  "https://chungboklee.github.io/glitch-classic/asset/10.png",
  "https://chungboklee.github.io/glitch-classic/asset/11.png"],

  title: "29th\nSEP"},
{
  images: [
  "https://chungboklee.github.io/glitch-classic/asset/8.png",
  "https://chungboklee.github.io/glitch-classic/asset/9.png",
  "https://chungboklee.github.io/glitch-classic/asset/10.png",
  "https://chungboklee.github.io/glitch-classic/asset/11.png",
  "https://chungboklee.github.io/glitch-classic/asset/12.png",
  "https://chungboklee.github.io/glitch-classic/asset/13.png",
  "https://chungboklee.github.io/glitch-classic/asset/14.png"],

  title: "28th\nSEP"},

{
  images: [
  "https://chungboklee.github.io/glitch-classic/asset/12.png",
  "https://chungboklee.github.io/glitch-classic/asset/13.png",
  "https://chungboklee.github.io/glitch-classic/asset/14.png",
  "https://chungboklee.github.io/glitch-classic/asset/15.png",
  "https://chungboklee.github.io/glitch-classic/asset/5.png",
  "https://chungboklee.github.io/glitch-classic/asset/6.png",
  "https://chungboklee.github.io/glitch-classic/asset/7.png"],

  title: "27th\nSEP"}];



const raycaster = new THREE.Raycaster();
let intersections = [];
const textureLoader = new THREE.TextureLoader();
const fontLoader = new THREE.FontLoader();
const font = "https://chungboklee.github.io/glitch-classic/font.json";

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
//1좌부터 시계방향
    gsap.set(image, { x: -8, y: 8, z: "-=20" });
  } else if (index === 1) {
//1-1
    gsap.set(image, { x: -28, y: 22, z: "-=22" });
  } else if (index === 2) {
//1-2
    gsap.set(image, { x: -16, y: -16, z: "-=20" });
  } else if (index === 3) {
//1-3
    gsap.set(image, { x: 8, y: -8, z: "-=20" });
  } else if (index === 4) {

    gsap.set(image, { x: 28, y: -16, z: "-=22" });
  } else if (index === 5) {

    gsap.set(image, { x: -16, y: -16, z: "-=40" });
  } else if (index === 6) {

    gsap.set(image, { x: 16, y: 16, z: "-=20" });
  } else if (index === 7) {
 
    gsap.set(image, { x: 16, y: -16, z: "-=80" });
  } else if (index ===8) {

  gsap.set(image, { x: -28, y: 3, z: "-=21" });
} else if (index === 9) {

  gsap.set(image, { x: -28, y: 22, z: "-=22" });
} else if (index === 10) {

  gsap.set(image, { x: 8, y: 8, z: "-=30" });
} else if (index === 11) {

  //1우-1
  gsap.set(image, { x: 28, y: -16, z: "-=22" });
} else if (index === 12) {

  gsap.set(image, { x: -16, y: 16, z: "-=80" });
} else if (index === 13) {

  gsap.set(image, { x: -16, y: -16, z: "-=40" });
} else if (index === 14) {

  gsap.set(image, { x: 16, y: 16, z: "-=20" });
} else if (index === 15) {

  gsap.set(image, { x: 16, y: -16, z: "-=80" });
} else if (index === 16) {

gsap.set(image, { x: 16, y: -16, z: "-=80" });
}
  return;
};

const months = [];

sectionsInfo.forEach((section, index) => {
  const sectionGroup = new THREE.Group();

  fontLoader.load(font, font => {
    const geometry = new THREE.TextBufferGeometry(section.title, {
      font: font,
      size: 4,
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
    z: () => -index * 200 });

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