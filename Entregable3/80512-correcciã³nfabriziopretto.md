A continuación tendras una devolución de mi parte sobre los aspectos que se toman en cuenta durante la corrección

> Te dejaré a continuación el significado de la simbología que empleo  
> |Significado|Simbolo empleado|
> |--:|:--|
> |¡Excelente!                           |💯|
> |¡Muy bien!. Se puede optimizar/mejorar|✅|
> |Está mal... pero no tan mal           |❎|
> |Falta / No se cumple                  |❌|

-----------------------Desafío 03--------------------------- 

Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.

**Aspectos a incluir**

Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. ❌

>`No has utilizado la clase correspondiente a lo indicado en el enunciado. Ten en cuenta que es necesario`  

Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.  ❌

>`Has creado el servidor, pero no has importado al archivo ProductManager`  

El servidor debe contar con los siguientes endpoints:  

1. **ruta ‘/products’**: la cual debe leer el archivo de productos y devolverlos dentro de un objeto agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados. ✅ 

>`La ruta funciona de manera correcta en su logica. Sin embargo, la razón de utilizar la clase ProductManager es que no sea necesario crear mucha logica desde este lado.`  

>- Si no se recibe query de límite, se devolverán todos los productos  ✅

>`Excelente desarollo de esto, y muy bien por corroborar que primero sea un numero y luego que tambien si es cero.`

>- Si se recibe un límite, sólo devolver el número de productos solicitados  ✅

>`Bien hecho el desarrollo de este punto, donde devuelve exactamente lo que le pido.`  
>`Pero, ¿que sucede si le paso un valor negativo? Ten cuidado, porque eso romperá y hará incontables calculos de la forma que los has hecho, por lo que te sugiero no utilizar el método "for" en este caso, sino que utiliza mejor el metodo "splice"`  
>[Array.prototype.splice()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)  

2. **ruta ‘/products/:pid’**: la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. ✅

>`La logica de este punto está bien. Sin embargo, necesitas utilizar los metodos que has creado en la clase "productManager". Ten cuidado con eso.`  

  __Extras:__

> `No has resuelto lo más importante del desafío, por lo que el desafío está desaprobado. Te sugiero leer y revisar mis anteriores correcciones en los anteriores desafíos para que pueda funcionar como corresponde. Es importante entender que los desafíos y los entregables están concatenados con respecto a su desarrollo, para que el día de mañana, cuando tengas que entregar el proyecto final, tengas gran parte del desarrollo listo.`
  
  __Aviso:__

> `Ante cualquier duda o consulta, sabes que me puedes encontrar en el chat de la plataforma. Sin mas que añadir. Muchos exitos`