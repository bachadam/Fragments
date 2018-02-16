#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

mat2 shear( in vec2 _scale )
{

    return mat2( 1.0, _scale.x,
                 _scale.y, 1.0 );

}

float s( in float _rate )
{
    return sin(time * _rate );
}

void main () {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec3 col = vec3( 0.0 );


    float d = length( abs(st) - vec2( 0.5, 0.5) );
    col = vec3( smoothstep(0.5, .91, fract(d * 200.0)),
	       st.y*(0.5+0.5*s(0.52)),
	       st.x * (0.5+.5*s(.7)) );

    d = length( abs(st) - vec2( 0.51, 0.5) );
    col *= vec3( smoothstep(0.5, .91, fract(d * (200. + 20. * s(0.15) ) ) ) );

	gl_FragColor = vec4(col, 1.0);

}
