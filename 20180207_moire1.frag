#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float pedalsLeft( in vec2 _st, in vec2 _pos, float _size, float _speed, float _wind ) {

    vec2 pos = _pos + _st;

    float radius = length( pos ) * _size;
    float angle = atan( pos.y, pos.x );

    //triangle shaping function, from 0.0 to _wind
    float winding = abs( mod( u_time * _speed, _wind ) - _wind/2.0 );

    float f = -cos( angle * winding );

	return 1.0 - smoothstep( f, f + .53, radius );

}

float pedalsRight( in vec2 _st, in vec2 _pos, float _size, float _speed, float _wind ) {

    vec2 pos = _pos + _st;

    float radius = length( pos ) * _size;
    //flip everything on the x-axis
    float angle = atan( pos.y, -pos.x );

    //triangle shaping function, from 0.0 to _wind
    float winding = abs( mod( u_time * _speed, _wind ) - _wind/2.0 );

    float f = -cos( angle * winding );

	return 1.0 - smoothstep( f, f + 1.03, radius );

}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    //remap so that (0.0,0.0) is in the center
    st = st * 2.0 - 1.0;

	vec2 position = vec2( 0., 0. );

    //setting windings to 0.0, makes that magic happen
	float pedalLeft1 = pedalsLeft( st, position, 1.0, 1.0, .0 );
    float pedalRight1 = pedalsRight( st, position, 1.5, 1.0, .0 );
    float smallLeft = pedalsLeft( st, position, 7.0, 1.0, 0.0 );

    vec3 color1 = vec3( pedalLeft1, 0., pedalLeft1 );
    vec3 color2 = vec3( pedalRight1-0.2, pedalRight1, 0.0 );
    vec3 color3 = vec3( smallLeft, 0., 0. );

	vec3 color = mix(color1, color2, 0.5) + color3;
    gl_FragColor = vec4(color, 1.0);
}
