{$ doc.data $}
aaaaa

@Entity
@Table(name = "{$ doc.fileInfo.baseName $}")	
public class {$ doc.fileInfo.baseName |  toPascalCase $} extends Model {
{% for item in doc.data -%}
{$ item.name | toCamelCase $}
{% if  loop.last %} } {% endif %}
  {% endfor -%}