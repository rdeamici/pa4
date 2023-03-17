var vshader_none = `
    // TODO: Your code goes here.
    // Vertex Shader computes the coordinates for all the vertices which are being drawn.
    // Fragment Shader computes the color for those vertices.
    // You can also pass variables from the vertex shader to the fragment shader.
    // Look into the pa2.js and see what attributes and uniforms are being transferred to both the
    // shaders. Write the code in both the shaders appropriately.
    
    attribute vec3 a_coords;
    attribute vec3 a_normal;

    uniform mat4 modelview;
    uniform mat4 modelMat;
    uniform mat4 projection;

    uniform mat3 normalMatrix;

    uniform vec4 lightPosition;
    uniform vec4 diffuseColor;

    uniform vec3 specularColor;

    uniform float specularExponent;

    uniform int ambient;
    uniform int diffuse;
    uniform int specular;

    void main(void) {
        gl_Position = projection * modelview * vec4(a_coords,1.0);
    }`;


var fshader_none = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    uniform vec4 lightPosition;
    uniform vec4 diffuseColor;

    uniform vec3 specularColor;

    uniform float specularExponent;

    uniform int ambient;
    uniform int diffuse;
    uniform int specular;

    // TODO: Your code goes here.
    // Fragment Shader computes the color for those vertices.
    // You can also pass variables from the vertex shader to the fragment shader.
    // Look into the pa2.js and see what attributes and uniforms are being transferred to both the
    // shaders. Write the code in both the shaders appropriately.
    // Use the diffuse_color to compute both ambient and diffuse lighting.
    // Use the specular_color to compute the specular lighting.
    // Use K_a = 0.1, K_d = 0.8, K_s = 0.4.

    void main(void){
        gl_FragColor = diffuseColor;
}`;


var vshader_gouraud = `
    // TODO: Your code goes here.
    // Vertex Shader computes the coordinates for all the vertices which are being drawn.
    // Fragment Shader computes the color for those vertices.
    // You can also pass variables from the vertex shader to the fragment shader.
    // Look into the pa2.js and see what attributes and uniforms are being transferred to both the
    // shaders. Write the code in both the shaders appropriately.
    attribute vec3 a_coords;
    attribute vec3 a_normal;

    uniform mat4 modelview;
    uniform mat4 modelMat;
    uniform mat4 projection;

    uniform mat3 normalMatrix;

    uniform vec4 lightPosition;
    uniform vec4 diffuseColor;

    uniform vec3 specularColor;

    uniform float specularExponent;

    uniform int ambient;
    uniform int diffuse;
    uniform int specular;

    vec4 Ka = vec4(0.1, 0.1, 0.1, 1.0);
    vec4 Kd = vec4(0.8, 0.8, 0.8, 1.0);
    vec4 Ks = vec4(0.4, 0.4, 0.4, 1.0);

    varying vec4 pixelColor;

    void main(void) {        
        gl_Position = projection * modelview * modelMat * vec4(a_coords,1.0);
        vec4 Ia = vec4(0,0,0,1);
        vec4 Id = vec4(0,0,0,1);
        vec4 Is = vec4(0,0,0,1);

        vec4 N = modelMat * vec4(a_normal, 1.0);
        vec4 V = normalize(modelview * modelMat * vec4(a_coords,1.0));
        vec4 R = reflect(lightPosition, N);

        if (ambient == 1) {
            Ia = Ka * diffuseColor;
        }
        if (diffuse == 1) {
            Id = Kd * diffuseColor * max(0.0, dot(N,lightPosition));            
        }
        if(specular == 1) {
            // check if specularExponent is 0 and ensure no values to pow are 0^0, which is undefined in GLSL
            Is = Ks * vec4(specularColor,1.0) * pow(max(0.0,dot(R,V)), specularExponent);
        }

        pixelColor = Ia + Id + Is;
        // pixelColor = vec4(0,0,0,3);
}`;

var fshader_gouraud = `
    // Use K_a = 0.1, K_d = 0.8, K_s = 0.4.
    
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    varying vec4 pixelColor;

    void main(void){
        
        gl_FragColor = pixelColor;
}`;

var vshader_phong = `
    // TODO: Your code goes here.
    // Vertex Shader computes the coordinates for all the vertices which are being drawn.
    // Fragment Shader computes the color for those vertices.
    // You can also pass variables from the vertex shader to the fragment shader.
    // Look into the pa2.js and see what attributes and uniforms are being transferred to both the
    // shaders. Write the code in both the shaders appropriately.

    attribute vec3 a_coords;
    attribute vec3 a_normal;

    uniform mat4 modelview;
    uniform mat4 modelMat;
    uniform mat4 projection;

    uniform mat3 normalMatrix;

    uniform vec4 lightPosition;
    uniform vec4 diffuseColor;

    uniform vec3 specularColor;

    uniform float specularExponent;

    uniform int ambient;
    uniform int diffuse;
    uniform int specular;

    vec4 Ka = vec4(0.1, 0.1, 0.1, 1.0);
    vec4 Kd = vec4(0.4, 0.8, 0.8, 1.0);
    vec4 Ks = vec4(0.4, 0.4, 0.4, 1.0);

    varying vec4 pixelColor;

    void main(void) {        
        gl_Position = projection * modelview * modelMat * vec4(a_coords,1.0);
        float fambient = float(ambient);
        float fdiffuse = float(diffuse);
        float fspecular = float(specular);

        vec4 vAmbient = vec4(fambient, fambient, fambient, fambient);
        vec4 vDiffuse = vec4(fdiffuse,fdiffuse,fdiffuse, fdiffuse);
        vec4 vSpecular = vec4(fspecular, fspecular, fspecular, fspecular);
        
        vec4 N = modelMat * vec4(a_normal, 1.0);
        vec4 V = normalize(modelview * modelMat * vec4(a_coords,1.0));
        vec4 R = reflect(lightPosition, N);

    }`;

var fshader_phong = `
    // TODO: Your code goes here.
    // Vertex Shader computes the coordinates for all the vertices which are being drawn.
    // Fragment Shader computes the color for those vertices.
    // You can also pass variables from the vertex shader to the fragment shader.
    // Look into the pa2.js and see what attributes and uniforms are being transferred to both the
    // shaders. Write the code in both the shaders appropriately.
    
    vec4 Ia = Ka * diffuseColor * vAmbient;
    vec4 Id = Kd * diffuseColor * max(0.0, dot(N,lightPosition)) * vDiffuse;
    vec4 Is = Ks * vec4(specularColor,1.0) * pow(max(0.0,dot(R,V)), specularExponent) * vSpecular;

    pixelColor = Ia + Id + Is;

    `;
