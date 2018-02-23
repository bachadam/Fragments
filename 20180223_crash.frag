
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rand(const in vec2 n) { return fract(1e4 * sin(17.0 * n.x + n.y * 0.1) * (0.1 + abs(sin(n.y * 13.0 + n.x))));
}

vec2 crash ( vec2 uv ) {

    float vari = 0.15 + 0.15 * sin( u_time * 0.3 );

    vec2 lod = u_resolution.xy/8.2;

    uv += ( rand( floor( uv * lod ) / lod ) * 2.0 - 1.0 ) * .1;
    lod = u_resolution.xy/8.1;
    uv += ( rand( floor( uv * lod ) / lod ) * 2.0 - 1.0 ) * vari;
    lod = u_resolution.xy/8.0;
    uv += ( rand( floor( uv * lod ) / lod ) * 2.0 - 1.0 ) * .1;

    return uv;

}

void main () {

     vec2 st = gl_FragCoord.xy/u_resolution;
    st = st * 2.0 - 1.;

     vec2 modMouse = u_mouse.xy  / u_resolution * 2. -1.;

    modMouse.y = -modMouse.y;

    vec2 m = modMouse.xy;

    float sphere = distance(st, -m );
    float sphere1 = distance(st, m  );
    float sphere2 = distance(st, m );
    float sphere3 = distance(st, m );

    st = abs( st * sphere * sphere1 );
    st = crash(st);

    vec3 color = vec3( st, 0.5);

	gl_FragColor = vec4(color, 1.0);

}
