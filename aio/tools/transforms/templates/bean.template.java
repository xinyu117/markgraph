
@Entity
@Table(name = "{$ doc.fileInfo.baseName $}")	
public class {$ doc.className $} extends Model {
	
{% for item in doc.data -%}
@Column{% if item.type_length %}(length = {$ item.type_length $} ){% endif %} 
private {$ item.type  $} {$ item.property $};

 {% endfor -%}
 
{% for item in doc.data -%}
public {$ item.type  $} get{$ item.property | toPascalCase $}() {
return this.{$ item.property $};
}
public void set{$ item.property | toPascalCase $}({$ item.type  $} {$ item.property $}_) {
return this.{$ item.property $} = {$ item.property $}_;
}
{% if  loop.last %} } {% endif %}
  {% endfor -%}