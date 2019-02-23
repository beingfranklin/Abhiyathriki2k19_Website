/*
Theme Name: HUGE
Description: Creative Coming Soon Template
Author: SquirrelLabs
Author URI: https://themeforest.net/user/squirrellabs/portfolio?ref=SquirrelLab
Version: 1.0
License: https://themeforest.net/licenses/standard
*/

$(window).on("load",function(){$("#countdown").countdown($("#countdown").attr("data-time"),function(a){$(this).html(a.strftime("<div>%D<span>Days</span></div> <div>%H<span>Hours</span></div> <div>%M<span>Minutes</span></div> <div>%S<span>Seconds</span></div>"))})});var camera,controls,scene,renderer,mouseX=0,mouseY=0;scene=new THREE.Scene;scene.fog=new THREE.FogExp2(401713,.002);renderer=new THREE.WebGLRenderer;renderer.setClearColor(scene.fog.color);renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);var container=document.getElementById("triangles");container.appendChild(renderer.domElement);camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,3E3);camera.position.z=600;var geometry=new THREE.CylinderGeometry(0,10,15,3,1),materials=[new THREE.MeshLambertMaterial({color:2701106}),new THREE.MeshLambertMaterial({color:668489}),new THREE.MeshLambertMaterial({color:1780033})],tris=[],pivot=new THREE.Object3D;
pivot.position=scene.position;for(var i=0;500>i;i++)tris[i]=new THREE.Mesh(geometry,materials[getRandom(0,2)]),tris[i].position.x=1E3*(Math.random()-.5),tris[i].position.y=1E3*(Math.random()-.5),tris[i].position.z=1E3*(Math.random()-.5),tris[i].rotation.x=1E3*(Math.random()-.5),tris[i].rotation.y=1E3*(Math.random()-.5),tris[i].o_pos_x=tris[i].position.x,tris[i].o_pos_y=tris[i].position.y,pivot.add(tris[i]);scene.add(pivot);
var size=200,point,outerGeo=new THREE.CylinderGeometry(size,size,20,3,20),innerGeo=new THREE.CylinderGeometry(size-5,size-5,20,3,20),outerBSP=new ThreeBSP(outerGeo),innerBSP=new ThreeBSP(innerGeo),intersections=outerBSP.subtract(innerBSP),mainMat=new THREE.MeshBasicMaterial({color:16777215,vertexColors:THREE.FaceColors}),faceIndices=["a","b","c"],mainGeo=intersections.toGeometry();
for(i=0;i<mainGeo.faces.length;i++)for(var face=mainGeo.faces[i],numberOfSides=3,j=0;j<numberOfSides;j++)vertexIndex=face[faceIndices[j]],point=mainGeo.vertices[vertexIndex],color=new THREE.Color(16777215),color.setRGB(.5+point.x/size,.5+point.y/size,.5+point.z/size),face.vertexColors[j]=color;var mainTri=new THREE.Mesh(mainGeo,mainMat),ambientLight=new THREE.AmbientLight(16777215);scene.add(ambientLight);var lights=[];lights[0]=new THREE.PointLight(16777215,1,0);
lights[1]=new THREE.PointLight(16777215,1,0);lights[2]=new THREE.PointLight(16777215,1,0);lights[0].position.set(0,200,0);lights[1].position.set(100,200,100);lights[2].position.set(-100,-200,-100);scene.add(lights[0]);scene.add(lights[1]);scene.add(lights[2]);window.addEventListener("resize",onWindowResize,!1);function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight)}
function onDocumentMouseMove(a){mouseX=a.clientX-window.innerWidth/2;mouseY=a.clientY-window.innerHeight/2}document.addEventListener("mousemove",onDocumentMouseMove,!1);var tween;function onClick(a){TWEEN.removeAll();tween=(new TWEEN.Tween({x:camera.position.x,y:camera.position.y,z:camera.position.z})).to({x:camera.position.x+10,y:camera.position.y+10,z:camera.position.z+10},2E3).onUpdate(function(){camera.position.set(this.x);camera.lookAt(scene.position)}).start()}
var cameraAngle=0,orbitRange=800,orbitSpeed=.02,desiredAngle=6*Math.PI/2,inc=.06,rev_inc=!1;camera.position.set(orbitRange,100,500);camera.lookAt(mainTri.position);animate();
function animate(){Date.now();1<=inc&&(rev_inc=!0);inc=rev_inc?inc-.005:inc+.005;.06>=inc&&(rev_inc=!1);requestAnimationFrame(animate);TWEEN.update();camera.position.x+=.05*(mouseX-camera.position.x);camera.position.y+=.05*(-mouseY-camera.position.y);camera.lookAt(scene.position);for(var a=0;a<mainTri.geometry.faces.length;a++)for(var b=mainTri.geometry.faces[a],c=0;3>c;c++)vertexIndex=b[faceIndices[c]],point=mainTri.geometry.vertices[vertexIndex],b.vertexColors[c].setHSL(inc+point.x/size,.6,.5);
mainTri.geometry.colorsNeedUpdate=!0;pivot.rotation.y+=.001;pivot.rotation.x+=.001;render()}function render(){renderer.render(scene,camera)}function getRandom(a,b){return Math.floor(Math.random()*(b-a+1)+a)};