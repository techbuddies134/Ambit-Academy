import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export type RoomView = 'overview' | 'board' | 'library';
export function makeClassroom(host: HTMLDivElement) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#f3f1fc');
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:false, powerPreference:'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.2;
  host.appendChild(renderer.domElement); renderer.domElement.setAttribute('aria-label','Rotatable 3D model of an Ambit classroom');
  const camera = new THREE.PerspectiveCamera(35,1,.08,110);
  const controls = new OrbitControls(camera,renderer.domElement);
  controls.enableDamping=true; controls.dampingFactor=.08; controls.minDistance=3.2; controls.maxDistance=23; controls.enablePan=false; controls.zoomSpeed=.76;
  controls.minPolarAngle=.32; controls.maxPolarAngle=Math.PI*.48; controls.minAzimuthAngle=-Math.PI*.27; controls.maxAzimuthAngle=Math.PI*.51;
  controls.cursorStyle='grab';
  const ambient = new THREE.HemisphereLight(0xfffeff,0xb5afcc,2.2); scene.add(ambient);
  const sun = new THREE.DirectionalLight(0xfff0dc,3); sun.position.set(3,9,5); sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-7;sun.shadow.camera.right=7;sun.shadow.camera.top=7;sun.shadow.camera.bottom=-7;sun.shadow.normalBias=.035;sun.shadow.bias=-.0005;scene.add(sun);
  const rim = new THREE.DirectionalLight(0xcddeff,2);rim.position.set(-3,6,-3);scene.add(rim);
  const materials=new Map<string,THREE.MeshStandardMaterial>(), geometries=new Map<string,THREE.BufferGeometry>();
  function material(color:string){let m=materials.get(color);if(!m){m=new THREE.MeshStandardMaterial({color,roughness:.67,metalness:0.015});materials.set(color,m);}return m;}
  function box(w:number,h:number,d:number,x:number,y:number,z:number,c:string,r=.045){const k=[w,h,d,r].join('/');let g=geometries.get(k);if(!g){g=new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/4,h/4,d/4));geometries.set(k,g);}const m=new THREE.Mesh(g,material(c));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;scene.add(m);return m;}
  function cylinder(top:number,bottom:number,height:number,x:number,y:number,z:number,c:string){const key=[top,bottom,height,'cylinder'].join('/');let g=geometries.get(key);if(!g){g=new THREE.CylinderGeometry(top,bottom,height,24);geometries.set(key,g);}const m=new THREE.Mesh(g,material(c));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;scene.add(m);return m;}
  const soft='#eeeafa',wood='#ddb788',purple='#6151b3',leg='#dddbe8';
  box(6.8,.28,5.2,0,0,0,'#8274c6',.12);box(6.68,.13,5.08,0,.18,0,wood,.06);
  for(let i=0;i<14;i++)box(.009,.004,4.95,-3.04+i*.46,.247,0,'#c49e78',0);
  box(6.76,3.05,.18,0,1.73,-2.48,'#c3bcdf',.065);box(.17,3.04,4.98,-3.28,1.73,0,'#d7d1ea',.065);
  box(6.54,.15,.06,0,.34,-2.352,'#9385c0'); box(.06,.16,4.9,-3.17,.34,0,'#9385c0');
  box(3.9,1.95,.14,.32,2,-2.31,'#282d55',.12);
  const c=document.createElement('canvas');c.width=900;c.height=442;const ctx=c.getContext('2d')!;
  ctx.fillStyle='#293456';ctx.fillRect(0,0,900,442);ctx.fillStyle='#b9b7ed';ctx.font='22px sans-serif';ctx.fillText('AMBIT  /  GEOMETRY',42,46);ctx.strokeStyle='#647193';ctx.lineWidth=2;ctx.setLineDash([7,8]);ctx.beginPath();ctx.moveTo(58,348);ctx.lineTo(518,348);ctx.moveTo(101,386);ctx.lineTo(101,76);ctx.stroke();ctx.setLineDash([]);ctx.strokeStyle='#d7d6ff';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(132,321);ctx.lineTo(425,102);ctx.lineTo(425,321);ctx.closePath();ctx.stroke();ctx.strokeStyle='#f5c365';ctx.beginPath();ctx.arc(666,180,71,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#a7decf';ctx.font='italic 35px serif';ctx.fillText('a² + b² = c²',534,332);ctx.fillStyle='#f7cf8a';ctx.font='27px serif';ctx.fillText('A',115,357);ctx.fillText('B',424,81);ctx.fillText('C',437,342);
  const boardTexture=new THREE.CanvasTexture(c);boardTexture.colorSpace=THREE.SRGBColorSpace;const screenMat=new THREE.MeshBasicMaterial({map:boardTexture});const screenGeom=new THREE.PlaneGeometry(3.72,1.8);const screen=new THREE.Mesh(screenGeom,screenMat);screen.position.set(.32,2,-2.232);scene.add(screen);
  box(1.04,.06,.2,.3,.99,-2.21,'#4a496b');
  // Window with individual panes and a wood sill.
  box(.08,1.65,2.25,-3.155,2.1,.38,soft);box(.035,1.49,2.08,-3.09,2.1,.38,'#9acfeb');
  box(.06,1.5,.065,-3.05,2.1,.38,'#fffaf3');box(.065,.065,2.09,-3.05,2.1,.38,'#fffaf3');box(.2,.07,2.35,-3.06,1.23,.38,wood);
  // A clock, white frame and hands.
  const clock=cylinder(.24,.24,.05,2.8,2.7,-2.32,'#fffdf9');clock.rotation.x=Math.PI/2;
  const hand=box(.028,.165,.03,2.79,2.75,-2.28,'#41455e');hand.rotation.z=-.38;box(.135,.025,.03,2.85,2.69,-2.27,'#41455e');
  const covers=['#8a76c7','#86c1ae','#df9968','#eec76d','#908dc7'];
  const book=(x:number,y:number,z:number,color:string,s=1)=>{box(.42*s,.06*s,.32*s,x,y,z,color,.012);box(.4*s,.037*s,.30*s,x,y+.035*s,z,'#f4eddd',.006);};
  // Four study stations: each desk has its own notebook and pencil pot.
  for(let row=0;row<2;row++){for(let col=0;col<2;col++){
    const x=-.5+col*2.05,z=-.59+row*1.57;
    box(1.39,.12,.79,x,.99,z,'#e9c79d',.065);
    for(const dx of [-.58,.58])for(const dz of [-.285,.285])box(.062,.70,.064,x+dx,.59,z+dz,leg,.014);
    const cz=z+.65;box(.64,.095,.58,x,.57,cz,purple,.07);const back=box(.64,.59,.09,x,.85,cz+.23,purple,.08);back.rotation.x=-.12;
    for(const dx of [-.24,.24])for(const dz of [-.18,.18])box(.055,.29,.055,x+dx,.39,cz+dz,leg,.01);
    book(x+.25,1.08,z,covers[row*2+col]);cylinder(.09,.074,.17,x-.44,1.13,z-.15,'#eaa15d');
    for(let j=0;j<3;j++){const pen=cylinder(.011,.011,.19,x-.47+j*.023,1.29,z-.16+j*.01,covers[j]);pen.rotation.z=(j-1)*.14;}
  }}
  // Bookshelf and the reading nook.
  box(1.14,1.08,.45,-2.51,.80,-1.93,'#c19469');
  for(let row=0;row<2;row++){box(1,.44,.03,-2.51,.55+row*.49,-1.68,'#8f6e60');for(let j=0;j<7;j++){box(.09,.29+(j%3)*.04,.17,-2.94+j*.133,.52+row*.49,-1.61,covers[(j+row)%5],.007);}}
  cylinder(.19,.135,.29,-2.52,1.47,-1.94,'#fff8e9');
  const leafGeo=new THREE.SphereGeometry(.16,10,8);geometries.set('leaf',leafGeo);for(let j=0;j<9;j++){const leaf=new THREE.Mesh(leafGeo,material(j%2?'#639564':'#438176'));const th=2*Math.PI*j/9;leaf.position.set(-2.52+Math.sin(th)*.105,1.7+(j%3)*.065,-1.94+Math.cos(th)*.085);leaf.scale.set(.65,1.35,.62);leaf.rotation.z=Math.sin(th)*.62;scene.add(leaf);}
  // Teacher's desk and open laptop.
  box(1.37,.12,.6,2.34,1,-1.88,wood);box(.12,.72,.49,1.79,.61,-1.88,'#faf0df');box(.12,.72,.49,2.89,.61,-1.88,'#faf0df');
  box(.4,.035,.29,2.35,1.079,-1.87,'#6e7695');const laptop=box(.4,.26,.027,2.35,1.205,-1.985,'#435179');laptop.rotation.x=-.12;
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(120,120),new THREE.ShadowMaterial({opacity:.1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.16;floor.receiveShadow=true;scene.add(floor);
  let targetCam:THREE.Vector3|null=null,targetLook:THREE.Vector3|null=null;
  const poses = {overview:[[7.4,6.25,8.8],[0,1.15,0]],board:[[2.5,2.9,4.55],[.28,1.88,-2.12]],library:[[-.7,2.7,2.52],[-2.25,1.13,-1.74]]};
  function preset(view:RoomView,immediate=false){const a=poses[view];const origin=new THREE.Vector3(...a[0]);const look=new THREE.Vector3(...a[1]);if(host.clientWidth<500&&view==='overview')origin.multiplyScalar(1.27);if(immediate){camera.position.copy(origin);controls.target.copy(look);controls.update();}else{targetCam=origin;targetLook=look;}}
  const interrupt=()=>{targetCam=targetLook=null;};controls.addEventListener('start',interrupt);
  const resize=()=>{if(host.clientWidth&&host.clientHeight){camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight,false);}};
  const observer=new ResizeObserver(resize);observer.observe(host);resize();preset('overview',true);
  let auto=false,rotationDirection=1,previous=performance.now();
  renderer.setAnimationLoop(()=>{const now=performance.now();const delta=Math.min((now-previous)/1000,.06);previous=now;if(targetCam&&targetLook){const t=1-Math.exp(-7*delta);camera.position.lerp(targetCam,t);controls.target.lerp(targetLook,t);if(camera.position.distanceTo(targetCam)<.006)interrupt();}else if(auto){const azimuth=controls.getAzimuthalAngle();if(azimuth<controls.minAzimuthAngle+.08)rotationDirection=-1;else if(azimuth>controls.maxAzimuthAngle-.08)rotationDirection=1;controls.rotateLeft(rotationDirection*.12*delta);};controls.update(delta);renderer.render(scene,camera);});
  return {
    preset:(v:RoomView)=>preset(v), auto:(v:boolean)=>{auto=v;}, rotate:(amount:number)=>{interrupt();controls.rotateLeft(amount);}, zoom:(direction:number)=>{interrupt();if(direction>0)controls.dollyIn(.83);else controls.dollyOut(.83);},
    dispose:()=>{renderer.setAnimationLoop(null);observer.disconnect();controls.removeEventListener('start',interrupt);controls.dispose();for(const g of geometries.values())g.dispose();for(const m of materials.values())m.dispose();screenMat.dispose();screenGeom.dispose();boardTexture.dispose();floor.geometry.dispose();floor.material.dispose();sun.shadow.map?.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();scene.clear();},
  };
}
