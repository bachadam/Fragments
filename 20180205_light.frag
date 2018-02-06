#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(  in vec2 _st,  in vec2 _loc,  in float _radius, in vec2 _angle ) {

    float pct = pow( distance( _st, _loc ), distance( _st, _angle ) );

    float c = smoothstep(pct, 1.0,  _radius );

    return c;

}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution;

    float radius1 = 0.5 + 0.2 * sin(u_time/2.0);
    vec2 angle1 = vec2( 0.0 );
    angle1.x = 0.5 + 0.4 * sin(u_time * 2.0);
    angle1.y = 0.5 + 0.4 * sin(u_time * 1.5);
    vec2 loc1 = vec2( 0.5, 0.5 );

    float cv1 = circle( st, loc1, radius1, angle1 );

    vec3 color = vec3( cv1, cv1-0.3, cv1- 0.2);

    float radius2 = 0.5 + 0.3 * sin( cos(u_time/80.0) * u_time/80.0 );
    vec2 angle2 = vec2( 0.0 );
    angle2.x = 0.5 + 0.4 * -sin( u_time * -2.0 );
    angle2.y = 0.5 + 0.4 * sin( u_time * -1.5 );
    vec2 loc2 = vec2( 0.5, 0.5 );

    float cv2 = circle( st, loc2, radius2, angle2 );

    vec3 colorValue = vec3( 0.0 );
    colorValue.x = 0.25 + 0.25 * sin( u_time * 0.5 );
    colorValue.y = 0.25 + 0.25 * sin( u_time * 0.6 );
    colorValue.z = 0.25 + 0.25 * sin( u_time * 0.7 );
    color = color + vec3( cv2 - colorValue.x, cv2-colorValue.y, cv2 - colorValue.z );

    float radius3 = 0.5 + 0.4 * sin( u_time * 1.0 );
    vec2 angle3 = vec2( 0.0 );
    angle3.x = 0.4 + 0.5 * sin( u_time * -2.0 );
    angle3.y = 0.4 + 0.5 * sin( u_time * -1.5 );
    vec2 loc3 = vec2( 0.0 );
    loc3.x = 0.5 + 0.2 * sin( u_time * 5.0 );
    loc3.y = 0.5 + 0.2 * sin( u_time * 5.1 );

    float cv3 = circle( st, loc3, radius3, angle3 );
	vec3 tiny = vec3( 0.0 );
    tiny.x = 0.35 + 0.35 * cos( u_time * 0.65 );
    tiny.y = 0.35 * sin( u_time * 0.80 );
    tiny.z = 0.7 * cos( u_time * 0.55 );

    color = color + vec3( cv3 - tiny.x, cv3-tiny.y, cv3-tiny.z );

	gl_FragColor = vec4( color, 1.0 );

}
