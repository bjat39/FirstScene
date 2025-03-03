// FRAGMENT SHADER

#version 330

// Materials
uniform vec3 materialAmbient;
uniform vec3 materialDiffuse;
uniform vec3 materialSpecular;
uniform float shininess;

uniform sampler2D texture0; 

// View Matrix
uniform mat4 matrixView; 

in vec4 position;
in vec3 normal;

in vec2 texCoord0; 

in vec4 color;
out vec4 outColor;

struct POINT
{
vec3 position;
vec3 diffuse;
vec3 specular;
};
uniform POINT lightPoint1,lightPoint2,lightPoint3; 

vec4 PointLight(POINT light)
{
// Calculate Point Light
vec4 color = vec4(0, 0, 0, 0);
vec3 L = (normalize(vec3(matrixView * vec4(light.position, 1.0)) - vec3(position))).xyz;//vec3(matrixModelView * vec4(aVertex, 1.0)))).xyz;//normalize(mat3(matrixView) * light.direction);
float NdotL = dot(normal, L);
color += vec4(materialDiffuse * light.diffuse, 1) * max(NdotL, 0);
return color; 
}

void main(void) 
{
  outColor = color;
  outColor += PointLight(lightPoint1);
  outColor += PointLight(lightPoint2);
  outColor += PointLight(lightPoint3);
  outColor *= texture(texture0, texCoord0);
}