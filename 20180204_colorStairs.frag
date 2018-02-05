#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3( 0.0 );

    // bottom-left
    //vec2 bl = step( vec2(0.1),st );
    float offx = st.x * 16.0;
    float offy = st.y * 8.0;

    float sinf = 2.5 * sin( u_time * 0.38 );
    float sin2 = 3.5 * sin( u_time * 0.35 );
    float sin3 = 4.5 * sin( u_time * 0.4 );

    vec2 br = floor( vec2( st * 16.0 ) ) + ( offx * sinf );
    vec2 bg = floor( vec2( st * 16.0 ) ) + ( offy * sin3 );
    vec2 bb = (0.1+ floor( vec2( 1.0-st * -16.0 ) )) + ( offy * -sin2 );

    color.r = clamp( br.x, 0.4, 0.8 ) * clamp( br.y, 0.4, 0.8 );
    color.g = clamp( bg.x, 0.4, 0.8 ) * clamp( bg.y, 0.4, 0.9 );
    color.b = clamp( bb.x,  0.3, 0.6 ) * clamp( bb.y, 0.2, 0.6 );

    color.rgb = color.rgb;

    gl_FragColor = vec4( color, 1.0 );

}
