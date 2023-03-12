function uvCube(width) {

   width = Math.abs(width);
   var vertexPosition = width/2;
   var vertexCount = 24;
   var triangleCount = 12;

   var vertices = new Float32Array(vertexCount*3);
   var normals = new Float32Array(vertexCount*3);
   var texCoords = new Float32Array(vertexCount*2);
   var indices = new Uint16Array(triangleCount*3);

   var vIdx;
   //Front face - 0-3
   vIdx=0; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 0
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 1
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 2
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 3

   //Back face - 4-7
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 4
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 5
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 6
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 7

   //Top face - 8-11
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 0
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 4
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 5
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 1

   //Bottom face - 12-15
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 3
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 7
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 6
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 2

   //Left face - 16-19
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 0
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 4
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 7
   vIdx++; vertices[3 * vIdx + 0] = -vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 3

   //Right face - 20-23
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 1
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] =  vertexPosition; // 5
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] = -vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 6
   vIdx++; vertices[3 * vIdx + 0] =  vertexPosition; vertices[3 * vIdx + 1] =  vertexPosition; vertices[3 * vIdx + 2] = -vertexPosition; // 2

   var nIdx;
   //Front face - 0-3
   nIdx=0; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] =  1; normals[3 * nIdx + 2] = 0; // 0
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] =  1; normals[3 * nIdx + 2] = 0; // 1
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] =  1; normals[3 * nIdx + 2] = 0; // 2
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] =  1; normals[3 * nIdx + 2] = 0; // 3

   //Back face - 4-7
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = -1; normals[3 * nIdx + 2] = 0; // 4
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = -1; normals[3 * nIdx + 2] = 0; // 5
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = -1; normals[3 * nIdx + 2] = 0; // 6
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = -1; normals[3 * nIdx + 2] = 0; // 7

   //Top face - 8-11
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] =  1; // 0 - 8
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] =  1; // 4 - 9
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] =  1; // 5 - 10
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] =  1; // 1 - 11

   //Bottom face - 12-15
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = -1; // 3 - 12
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = -1; // 7 - 13
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = -1; // 6 - 14
   nIdx++; normals[3 * nIdx + 0] = 0; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = -1; // 2 - 15

   //Left face - 16-19
   nIdx++; normals[3 * nIdx + 0] = -1; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = 0; // 0 - 16
   nIdx++; normals[3 * nIdx + 0] = -1; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = 0; // 4 - 17
   nIdx++; normals[3 * nIdx + 0] = -1; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = 0; // 7 - 18
   nIdx++; normals[3 * nIdx + 0] = -1; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = 0; // 3 - 19

   //Right face - 20-23
   nIdx++; normals[3 * nIdx + 0] =  1; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = 0; // 1 - 20
   nIdx++; normals[3 * nIdx + 0] =  1; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = 0; // 5 - 21
   nIdx++; normals[3 * nIdx + 0] =  1; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = 0; // 6 - 22
   nIdx++; normals[3 * nIdx + 0] =  1; normals[3 * nIdx + 1] = 0; normals[3 * nIdx + 2] = 0; // 2 - 23

   var trIdx;
   trIdx=0; indices[3 * trIdx + 0] = 0; indices[3 * trIdx + 1] = 2; indices[3 * trIdx + 2] = 1; //Front faces
   trIdx++; indices[3 * trIdx + 0] = 2; indices[3 * trIdx + 1] = 0; indices[3 * trIdx + 2] = 3;

   trIdx++; indices[3 * trIdx + 0] = 5; indices[3 * trIdx + 1] = 7; indices[3 * trIdx + 2] = 4; //Back faces
   trIdx++; indices[3 * trIdx + 0] = 5; indices[3 * trIdx + 1] = 6; indices[3 * trIdx + 2] = 7;

   trIdx++; indices[3 * trIdx + 0] = 9; indices[3 * trIdx + 1] = 11; indices[3 * trIdx + 2] = 10; //Top faces
   trIdx++; indices[3 * trIdx + 0] = 9; indices[3 * trIdx + 1] = 8; indices[3 * trIdx + 2] = 11;

   trIdx++; indices[3 * trIdx + 0] = 12; indices[3 * trIdx + 1] = 14; indices[3 * trIdx + 2] = 15; //Bottom faces
   trIdx++; indices[3 * trIdx + 0] = 12; indices[3 * trIdx + 1] = 13; indices[3 * trIdx + 2] = 14;

   trIdx++; indices[3 * trIdx + 0] = 17; indices[3 * trIdx + 1] = 19; indices[3 * trIdx + 2] = 16; //Left faces
   trIdx++; indices[3 * trIdx + 0] = 17; indices[3 * trIdx + 1] = 18; indices[3 * trIdx + 2] = 19;

   trIdx++; indices[3 * trIdx + 0] = 20; indices[3 * trIdx + 1] = 22; indices[3 * trIdx + 2] = 21; //Right faces
   trIdx++; indices[3 * trIdx + 0] = 20; indices[3 * trIdx + 1] = 23; indices[3 * trIdx + 2] = 22;

   return {
       vertexPositions: vertices,
       vertexNormals: normals,
       vertexTextureCoords: texCoords,
       indices: indices
   };
}