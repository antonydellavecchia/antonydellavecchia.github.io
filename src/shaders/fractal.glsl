#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D tAudioData;

vec2 mul(vec2 u, vec2 w) {
  return vec2(u.x * w.x - u.y * w.y, u.x * w.y + u.y * w.x);
}

vec2 mandelbrot(vec2 u, vec2 c){
  return mul(u, u) + c;
}

void main() {
  vec2 center = vec2(0.5, 0.5);
  vec2 uv = gl_FragCoord.xy/u_resolution.xy - center;
  mat2 scale = mat2(1.0 / u_time, 0.0, 0.0, 1.0 / u_time);
  vec2 relative_uv = uv + (1.0 - u_time) / u_time * uv;
  int iterations = 0;
  float inf = 1000.0;
  vec2 current_z = vec2(0.0, 0.0);
  
  for(int i = 0; i < 1000; ++i) {
    if (length(current_z) > inf && iterations == 0) {
      iterations = i;
    }
    current_z = mandelbrot(current_z, relative_uv);
  }

  float iterations_f = float(iterations);
  float iter_ratio = iterations_f / 1000.0;
  gl_FragColor = vec4(vec3(iter_ratio, 0.0, 0.0), 1.0);
}
