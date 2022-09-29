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

const FOV = 88;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 160;
const ASPECT_RATIO = viewport.aspectRatio;

const camera = new THREE.PerspectiveCamera(
FOV,
ASPECT_RATIO,
CAMERA_NEAR,
CAMERA_FAR);


camera.position.set(0, 0, 50);

{
  const near = 1;
  const far = 150;
  const color = 0x000000;
  scene.fog = new THREE.Fog(color, near, far);
}

const sectionsInfo = [
{
  images: [
  "https://chungboklee.github.io/glitch-classic/asset/1.jpeg",
  "https://images.wsj.net/im-633165?width=1260&height=840&pixel_ratio=2",
  "https://images.wsj.net/im-632559?width=1260&height=840&pixel_ratio=2",
  "https://images.wsj.net/im-633144?width=1260&height=840&pixel_ratio=2"],

  title: "THE DIMENSION\nnews website"},

{
  images: [
  "https://images.wsj.net/im-609750/?width=2000&size=1.5",
  "https://assets.codepen.io/2479807/scroll-2.jpg",
  "https://assets.codepen.io/2479807/scroll-3.jpg"],

  title: "29\nSEP"},
{
  images: [
  "https://assets.codepen.io/2479807/img-5.jpg",
  "https://assets.codepen.io/2479807/img-6.jpg",
  "https://assets.codepen.io/2479807/img-7.jpg",
  "https://assets.codepen.io/2479807/img-8.jpg"],

  title: "28\nSEP"},

{
  images: [
  "https://assets.codepen.io/2479807/bike-1.jpg",
  "https://assets.codepen.io/2479807/bike-2.jpg",
  "https://assets.codepen.io/2479807/bike-3.jpg",
  "https://assets.codepen.io/2479807/grid-photo-1.jpg"],

  title: "27\nSEP"}];



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

const setImagesPositions = (image, index) => {
  if (index === 0) {
    // Top left
    gsap.set(image, { x: -10, y: 10, z: "-=20" });
  } else if (index === 1) {
    // Bottom left
    gsap.set(image, { x: -10, y: -10, z: "-=80" });
  } else if (index === 2) {
    // Top right
    gsap.set(image, { x: 10, y: 10, z: "-=40" });
  } else if (index === 3) {
    // Bottom rightv
    gsap.set(image, { x: 10, y: -10, z: "-=120" });
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