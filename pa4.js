"use strict";

var gl;   // The webgl context.

var a_coords_loc;       // Location of the a_coords attribute variable in the shader program.
var a_normal_loc;       // Location of a_normal attribute.

var a_coords_buffer;    // Buffer for a_coords.
var a_normal_buffer;    // Buffer for a_normal.
var index_buffer;       // Buffer for indices.

var u_diffuseColor;     // Locations of uniform variables in the shader program
var u_specularColor;
var u_specularExponent;
var u_lightPosition;
var u_modelview;
var u_modelMat;
var u_projection;
var u_normalMatrix;   
var u_ambient
var u_diffuse
var u_specular

var projection = mat4.create();    // projection matrix
var modelview;                     // modelview matrix; value comes from rotator
var modelMat = mat4.create();
var angle = Math.PI / 180; // specify the rotation angle in radians
var axis = [0, 1, 0]; // specify the rotation axis (y-axis in this case)
var normalMatrix = mat3.create();  // matrix, derived from modelview matrix, for transforming normal vectors
var rotator;                       // A TrackballRotator to implement rotation by mouse.

var lightPositions = [             // values for light position, selected by popup menu 
    [0,0,1,0], 
    [0,1,0,0], 
    [0,0,-1,0], 
    [0,-1,0,0], 
    [0,0,-10,1], 
    [2,3,5,0],
];

var objects = [                     // Objects for display
    uvCube(2)
];

var shaderProgramNames = ["none", "gouraud", "phong"];
var shaderPrograms = [];

var currentModelNumber;             // contains data for the current object
var currentShaderType;


function draw() { 

    GetUniforms(currentShaderType);
    //  sets background color
    gl.clearColor(0.15,0.15,0.3,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // transforms 3D points to 2D points
    // (projection, fovY, aspect ratio, nearClippingPlane, farClippingPlane)
    mat4.perspective(projection, Math.PI/5, 1, 10, 20);
    
    // get the view matrix
    // transforms 3D pts of cube to the viewpoint coord system
    modelview = rotator.getViewMatrix();
    
    if (document.getElementById("ambient").checked) {
        gl.uniform1i(u_ambient, 1);
    }else{
        gl.uniform1i(u_ambient, 0);
    }

    if (document.getElementById("diffuse").checked) {
        gl.uniform1i(u_diffuse, 1);
    }else{
       gl.uniform1i(u_diffuse, 0); 
    }

    if (document.getElementById("specular").checked) {
        gl.uniform1i(u_specular, 1);
    }else{
       gl.uniform1i(u_specular, 0); 
    }

    /* Get the matrix for transforming normal vectors from the modelview matrix,
       and send matrices to the shader program*/   
    mat3.normalFromMat4(normalMatrix, modelview);

    gl.uniformMatrix3fv(u_normalMatrix, false, normalMatrix);
    gl.uniformMatrix4fv(u_modelview, false, modelview );
    gl.uniformMatrix4fv(u_modelMat, false, modelMat );
    gl.uniformMatrix4fv(u_projection, false, projection );
    
    /* Draw the model.  The data for the model was set up in installModel() */
    gl.drawElements(gl.TRIANGLES, objects[currentModelNumber].indices.length, gl.UNSIGNED_SHORT, 0);

}


/* 
 * Called and data for the model are copied into the appropriate buffers, and the 
 * scene is drawn.
 */
function installModel(modelData) {
     gl.bindBuffer(gl.ARRAY_BUFFER, a_coords_buffer);
     gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexPositions, gl.STATIC_DRAW);
     //              (location in GPU, size, type, normalized, stride, offset)
     //                 size = # of components per attribute: 3 == (X,Y,Z)
     //                   can ignore the last 3 - normalized, stride, offset
     gl.vertexAttribPointer(a_coords_loc, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(a_coords_loc);
     gl.bindBuffer(gl.ARRAY_BUFFER, a_normal_buffer);
     gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexNormals, gl.STATIC_DRAW);
     gl.vertexAttribPointer(a_normal_loc, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(a_normal_loc);
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);
}


/* Initialize the WebGL context.  Called from init() */
function initGL() {
    var i;
    var prog;
    for(i = 0; i < shaderProgramNames.length; i++) {
        var vertexShaderName = "vshader-source-" + shaderProgramNames[i];
        var fragmentShaderName = "fshader-source-" + shaderProgramNames[i];
        console.log("createProgram with '"+vertexShaderName+"' and '"+fragmentShaderName+"'")
        prog = createProgram(gl, vertexShaderName, fragmentShaderName);

        gl.useProgram(prog);
        a_coords_loc =  gl.getAttribLocation(prog, "a_coords");
        a_normal_loc =  gl.getAttribLocation(prog, "a_normal");
        u_modelview = gl.getUniformLocation(prog, "modelview");
        u_modelMat = gl.getUniformLocation(prog, "modelMat");
        u_projection = gl.getUniformLocation(prog, "projection");
        u_normalMatrix =  gl.getUniformLocation(prog, "normalMatrix");
        u_lightPosition=  gl.getUniformLocation(prog, "lightPosition");
        u_diffuseColor =  gl.getUniformLocation(prog, "diffuseColor");
        u_specularColor =  gl.getUniformLocation(prog, "specularColor");
        u_specularExponent = gl.getUniformLocation(prog, "specularExponent");
        u_ambient = gl.getUniformLocation(prog, "ambient");
        u_diffuse = gl.getUniformLocation(prog, "diffuse");
        u_specular = gl.getUniformLocation(prog, "specular");

        a_coords_buffer = gl.createBuffer();
        a_normal_buffer = gl.createBuffer();
        index_buffer = gl.createBuffer();
        gl.enable(gl.DEPTH_TEST);

        gl.uniform1i(u_ambient, 0);
        gl.uniform1i(u_diffuse, 0);
        gl.uniform1i(u_specular, 0 );
        gl.uniform3f(u_specularColor, 0.5, 0.5, 0.5);   
        gl.uniform4f(u_diffuseColor, 0, 1, 0, 1);       
        gl.uniform1f(u_specularExponent, 10);  
        gl.uniform4f(u_lightPosition, 0, 0, 1, 0); 

        shaderPrograms.push(prog);
    } 
}

function GetUniforms(shaderNumber) {
    var prog = shaderPrograms[shaderNumber];
    gl.useProgram(prog);
    //a_coords_loc =  gl.getAttribLocation(prog, "a_coords");
    //a_normal_loc =  gl.getAttribLocation(prog, "a_normal");
    u_modelview = gl.getUniformLocation(prog, "modelview");
    u_modelMat = gl.getUniformLocation(prog, "modelMat");
    u_projection = gl.getUniformLocation(prog, "projection");
    u_normalMatrix =  gl.getUniformLocation(prog, "normalMatrix");
    u_lightPosition=  gl.getUniformLocation(prog, "lightPosition");
    u_diffuseColor =  gl.getUniformLocation(prog, "diffuseColor");
    u_specularColor =  gl.getUniformLocation(prog, "specularColor");
    u_specularExponent = gl.getUniformLocation(prog, "specularExponent");
    u_ambient = gl.getUniformLocation(prog, "ambient");
    u_diffuse = gl.getUniformLocation(prog, "diffuse");
    u_specular = gl.getUniformLocation(prog, "specular");

    var val = Number(document.getElementById("lightpos").value);
    gl.uniform4fv(u_lightPosition, lightPositions[val]);

    val = Number(document.getElementById("exponent").value);
    gl.uniform1f(u_specularExponent, val);
}

/* Creates a program for use in the WebGL context gl, and returns the
 * identifier for that program.  If an error occurs while compiling or
 * linking the program, an exception of type String is thrown.  The error
 * string contains the compilation or linking error.  If no error occurs,
 * the program identifier is the return value of the function.
 *    The second and third parameters are the id attributes for <script>
 * elements that contain the source code for the vertex and fragment
 * shaders.
 */
function createProgram(gl, vertexShaderID, fragmentShaderID) {
    function getTextContent( shaderType ) {
        // This nested function retrieves the shader source code
        // from the string variables defined in shaders.js.
        var str = "";
        switch(shaderType) {
            case 'vshader-source-none':
                str = vshader_none;
                break;
            case 'fshader-source-none':
                str = fshader_none;
                break;
            case 'vshader-source-gouraud':
                str = vshader_gouraud;
                break;
            case 'fshader-source-gouraud':
                str = fshader_gouraud;
                break;
            case 'vshader-source-phong':
                str = vshader_phong;
                break;
            case 'fshader-source-phong':
                str = fshader_phong;
                break;
            default:
              // Handle invalid shader type
                console.error(`Invalid shader type: ${shaderType}`);
          }
          return str;
    }
    try {
        var vertexShaderSource = getTextContent( vertexShaderID );
        var fragmentShaderSource = getTextContent( fragmentShaderID );
    }
    catch (e) {
        throw "Error: Could not get shader source code from script elements.";
    }
    var vsh = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource(vsh,vertexShaderSource);
    gl.compileShader(vsh);
    if ( ! gl.getShaderParameter(vsh, gl.COMPILE_STATUS) ) {
        throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
     }
    var fsh = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource(fsh, fragmentShaderSource);
    gl.compileShader(fsh);
    if ( ! gl.getShaderParameter(fsh, gl.COMPILE_STATUS) ) {
       throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
    }
    var prog = gl.createProgram();
    gl.attachShader(prog,vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    if ( ! gl.getProgramParameter( prog, gl.LINK_STATUS) ) {
       throw "Link error in program:  " + gl.getProgramInfoLog(prog);
    }
    return prog;
}


/**
 * initialization function that will be called when the page has loaded
 */
function init() {
    try {
        var canvas = document.getElementById("myGLCanvas");
        gl = canvas.getContext("webgl") || 
                         canvas.getContext("experimental-webgl");
        if ( ! gl ) {
            throw "Browser does not support WebGL";
        }
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML =
            "<p>Sorry, could not get a WebGL graphics context.</p>";
        return;
    }
    try {
        initGL();  // initialize the WebGL graphics context
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML =
            "<p>Sorry, could not initialize the WebGL graphics context:" + e + "</p>";
        return;
    }

    document.getElementById("ambient").checked = false;
    document.getElementById("diffuse").checked = false;
    document.getElementById("specular").checked = false;

    document.getElementById("shaderType").value = "0";
    document.getElementById("lightpos").value = "0";
    document.getElementById("exponent").value = "10";

    document.getElementById("ambient").onchange = draw;
    document.getElementById("diffuse").onchange = draw;
    document.getElementById("specular").onchange = draw;
    
    document.getElementById("shaderType").onchange = function() {
        var val = Number(this.value);
        currentShaderType = val;
        draw();
    };

    document.getElementById("lightpos").onchange = function() {
        var val = Number(this.value);
        gl.uniform4fv(u_lightPosition, lightPositions[val]);
        draw();
    };

    document.getElementById("exponent").onchange = function() {
        var val = Number(this.value);
        gl.uniform1f(u_specularExponent, val);
        draw();
    };

    installModel(objects[0]);
    currentModelNumber = 0;
    currentShaderType = 0;
    rotator = new TrackballRotator(canvas, draw, 15);

    function rotate(now) {
        angle = 0.01; // rotate by a small amount
        draw();
        mat4.rotate(modelMat, modelMat, angle, axis);
        requestAnimationFrame(rotate);
      }
      requestAnimationFrame(rotate);
}

