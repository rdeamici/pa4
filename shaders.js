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

    const float Ka = 0.1;
    const float Kd = 0.8;
    const float Ks = 0.4;

    varying vec3 pixelColor;

    void main(void) {        
        vec4 position = modelview * vec4(a_coords, 1.0);
        vec4 lightPosTr = modelview * lightPosition;

        vec3 L = normalize(lightPosTr.xyz); // - position.xyz);
        vec3 N = normalize(normalMatrix * a_normal);
        vec3 V = normalize(-position.xyz);
        vec3 R = reflect(-L, N);

        vec3 ambientPart = Ka * diffuseColor.xyz * float(ambient);
        vec3 diffusePart = Kd * diffuseColor.xyz * max(dot(L,N), 0.0) * float(diffuse);
        vec3 specularPart = Ks * specularColor * pow(max(dot(R, V),0.0), specularExponent) * float(specular);

        pixelColor = ambientPart + diffusePart + specularPart;
        
        gl_Position = projection * position;
    }`;

var fshader_gouraud = `
    // Use K_a = 0.1, K_d = 0.8, K_s = 0.4.
    
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    varying vec3 pixelColor;

    void main(void){
        
        gl_FragColor = normalize(vec4(pixelColor,1.0));
}`;

var vshader_phong = `
    // TODO: Your code goes here.
    // Vertex Shader computes the coordinates for all the vertices which are being drawn.
    // Fragment Shader computes the color for those vertices.
    // You can also pass variables from the vertex shader to the fragment shader.
    // Look into the pa2.js and see what attributes and uniforms are being transferred to both the
    // shaders. Write the code in both the shaders appropriately.

    }`;

var fshader_phong = `
    // TODO: Your code goes here.
    // Vertex Shader computes the coordinates for all the vertices which are being drawn.
    // Fragment Shader computes the color for those vertices.
    // You can also pass variables from the vertex shader to the fragment shader.
    // Look into the pa2.js and see what attributes and uniforms are being transferred to both the
    // shaders. Write the code in both the shaders appropriately.
    `;
