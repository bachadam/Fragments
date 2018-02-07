#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {

  	vec2 st = gl_FragCoord.xy/u_resolution.xy;

  	vec3 color = vec3( 0.0 );
  	float d = 0.0;

  // Remap the space to -1. to 1.
  	st = st * 2.0 - 1.0;

  // Make the distance field
    float coolx = 0.5 + 0.5 * sin( u_time * 3.1 );
    float cooly = 0.4 + 0.4 * sin( u_time * 3.5 );
    float coolz = 0.72 + 0.36 * sin( u_time * 3.0 );

  	color.x = length( max( abs(st) + .2, coolx ) );
    color.y = length( max( abs(st) - .1, cooly ) );
    color.z = length( min( abs(st) + .2, coolz ) );

	float waves = 5.0 + 10.0 * cos( u_time/5.0 );

    gl_FragColor = vec4( vec3( fract(color*waves) ), 1.0 );

}
