# WebGL Shading Demo

This repository contains JavaScript code that implements three different shading techniques using WebGL. The shading techniques are None Shader, Gouraud Shader, and Phong Shader.

## Getting Started

To get started with this project, you will need to clone this repository to your local machine. You can do this by running the following command:

```sh
$ git clone https://github.com/rdeamici/pa4.git
```

After cloning the repository, open `index.html` in your web browser to see the demo in action. 

## Usage

The main script for the demo is stored in `pa4.js`, and the three shaders are stored in `shaders.js`. You can modify the shaders and the main script to experiment with different effects and techniques.

## Shading Techniques

### None Shader

The None Shader is a simple shader that does not apply any shading to the model. It just renders the model as it is.

### Gouraud Shader

The Gouraud Shader is a per-vertex shading technique that computes the lighting values at each vertex and interpolates them across the surface of the model to create a smooth shading effect.

### Phong Shader

The Phong Shader is a per-pixel shading technique that computes the lighting values at each pixel based on the surface normal and the position of the light sources. This results in a more realistic shading effect than the Gouraud Shader.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was inspired by the [WebGL Fundamentals tutorial](https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html) by Gregg Tavares.

Further inspiration was taken from [drawmindmap's webgl2-training repo](https://github.com/drawmindmap/webgl2-training)

This readme was written entirely with chatGPT  :)

We tried to use chatGPT to write the project for us, but sadly we had to do all the work ourselves :(