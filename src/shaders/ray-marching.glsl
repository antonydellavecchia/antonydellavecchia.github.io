#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec4 vUv;

vec4 quat_from_axis_angle(vec3 axis, float angle)
{ 
  vec4 qr;
  float half_angle = (angle * 0.5) * 3.14159 / 180.0;
  qr.x = axis.x * sin(half_angle);
  qr.y = axis.y * sin(half_angle);
  qr.z = axis.z * sin(half_angle);
  qr.w = cos(half_angle);
  return qr;
}

vec4 quat_conj(vec4 q)
{ 
  return vec4(-q.x, -q.y, -q.z, q.w); 
}

vec4 quat_mult(vec4 q1, vec4 q2)
{ 
  vec4 qr;
  qr.x = (q1.w * q2.x) + (q1.x * q2.w) + (q1.y * q2.z) - (q1.z * q2.y);
  qr.y = (q1.w * q2.y) - (q1.x * q2.z) + (q1.y * q2.w) + (q1.z * q2.x);
  qr.z = (q1.w * q2.z) + (q1.x * q2.y) - (q1.y * q2.x) + (q1.z * q2.w);
  qr.w = (q1.w * q2.w) - (q1.x * q2.x) - (q1.y * q2.y) - (q1.z * q2.z);
  return qr;
}

vec3 rotate_vertex_position(vec3 position, vec3 axis, float angle)
{ 
  vec4 qr = quat_from_axis_angle(axis, angle);
  vec4 qr_conj = quat_conj(qr);
  vec4 q_pos = vec4(position.x, position.y, position.z, 0);
  
  vec4 q_tmp = quat_mult(qr, q_pos);
  qr = quat_mult(q_tmp, qr_conj);
  
  return vec3(qr.x, qr.y, qr.z);
}

float polynomial(vec3 normal) {
  return pow(normal.x, 3.0) * normal.z - pow(normal.y, 2.0) * pow(normal.x, 2.0) + 3.0 * cos(sqrt(2.0) * u_time) *normal.z * normal.x * pow(normal.y, 2.0) * 10.0 * u_time * sin(1.0);
}

void main() {
  vec3 ray_origin = vec3(0.0, 0.0, 1.0);
  vec2 uv =  gl_FragCoord.xy / u_resolution.xy;
  vec3 P = rotate_vertex_position(normalize(vUv.xyz), vec3(0.0, cos(u_time),sin(u_time)), 10.0 * u_time);
  vec3 color = vec3(0.7 * smoothstep(0.0, 0.01, abs(polynomial(P))) + 0.3, 0.3 * smoothstep(0.0, 0.001, abs(polynomial(P))) + 0.7, P.z * P.y * 0.1);
  gl_FragColor = vec4(abs(color), 0.3);
}
