import { Renderer, Camera, Transform, Plane, OGLRenderingContext } from 'ogl';
import { GalleryItem, AppConfig } from './types';
import { Media } from './webgl-media';
import { debounce, lerp } from './utils';

export class App {
  container: HTMLDivElement;
  scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  onCheckDebounce: () => void;
  
  renderer!: Renderer;
  gl!: OGLRenderingContext;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  
  mediasImages: GalleryItem[] = [];
  medias: Media[] = [];
  
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf!: number;
  
  isDown = false;
  start = 0;
  
  boundOnResize!: () => void;
  boundOnWheel!: (e: any) => void;
  boundOnTouchDown!: (e: any) => void;
  boundOnTouchMove!: (e: any) => void;
  boundOnTouchUp!: () => void;

  isDriven = false;

  constructor(container: HTMLDivElement, config: AppConfig & { isDriven?: boolean }) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.scrollSpeed = config.scrollSpeed;
    this.scroll = { ease: config.scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.isDriven = !!config.isDriven;
    
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(config.items, config.bend, config.textColor, config.borderRadius, config.font);
    this.update();
    
    if (!this.isDriven) {
      this.addEventListeners();
    } else {
      this.boundOnResize = this.onResize.bind(this);
      window.addEventListener('resize', this.boundOnResize);
    }
  }
  
  setScrollProgress(progress: number) {
    if (this.medias && this.medias[0]) {
      const totalWidth = this.medias[0].widthTotal;
      // Map progress (0 to 1) to target position.
      // A full loop of all items is exactly half of totalWidth (since they are concatenated once).
      const loopWidth = totalWidth * 0.5;
      this.scroll.target = progress * loopWidth;
    }
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)
    });
    this.gl = this.renderer.gl;
    if (!this.gl) {
      throw new Error('WebGL context could not be created');
    }
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
    this.scene.position.y = 0.5;
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }

  createMedias(items: GalleryItem[] | undefined, bend: number, textColor: string, borderRadius: number, font: string) {
    const defaultItems: GalleryItem[] = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' }
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
    });
  }

  onTouchDown(e: any) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: any) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position || 0) + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e: any) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('mousewheel', this.boundOnWheel);
    window.addEventListener('wheel', this.boundOnWheel);
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove', this.boundOnTouchMove);
    window.addEventListener('touchend', this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    if (!this.isDriven) {
      window.removeEventListener('mousewheel', this.boundOnWheel);
      window.removeEventListener('wheel', this.boundOnWheel);
      window.removeEventListener('mousedown', this.boundOnTouchDown);
      window.removeEventListener('mousemove', this.boundOnTouchMove);
      window.removeEventListener('mouseup', this.boundOnTouchUp);
      window.removeEventListener('touchstart', this.boundOnTouchDown);
      window.removeEventListener('touchmove', this.boundOnTouchMove);
      window.removeEventListener('touchend', this.boundOnTouchUp);
    }
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}
