> Buen trabajo `Fabrizio`! Tu proyecto cumple con los requisitos minimos para poder aprobar esta entrega. Te sugiero que revises nuevamente la consigna y esta corrección para que lo que has hecho aquí te sirva para siguientes entregas.

A continuación tendras una devolución de mi parte sobre los aspectos que se toman en cuenta durante la corrección

> Te dejaré a continuación el significado de la simbología que empleo  
> |Significado|Simbolo empleado|
> |--:|:--|
> |¡Excelente! |💯|
> |¡Muy bien!. Se puede optimizar/mejorar|✅|
> |Está mal... pero no tan mal |❎|
> |Falta / No se cumple |❌|

-----------------------Desafío 02---------------------------

Realizar una clase de nombre "ProductManager", el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1)

**Aspectos a incluir**

- _La clase debe contar con una variable "this.path" el cual se inicializara desde un constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia_ ✅

> `Has hecho un buen trabajo aqui. La clase efectivamente se contruye con un "this.path" preasignado. Algo que podrías hacer es que este path no esté preasingado sino que se modifique según lo que se le pase al constructor como un argumento llamado "path".`  

- _Debe guardar objetos con el siguiente formato:_

```js
{
  id: 'se debe incrementar automáticamente, no enviarse desde el cuerpo',  ✅
  title: 'nombre del producto',  ✅
  description: 'descripción del producto',  ✅
  price: 'precio',  ✅
  thumbnail: 'ruta de imagen',  ✅
  code: 'código identificador',  ✅
  stock: 'número de piezas disponibles',  ✅
}
```

> `Efectivamente tiene todos los parametros, incluso el ID autoincremental. Está bien hecho. Sin embrago, necesitan estar validados tanto aquí como en el siguiente punto`  

- _Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo com un array en el archivo)_ ✅

> `Est abien hecho. La imagen efectivamente se sube agrega al archivo. Sin embargo, al igual que en la entrega anterior, esto debe tener las validaciones`_`dentro`_`del addProducts, no cuando los vas a añadir`  

- _Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo_ 💯

> `Bien resuelto este punto. Devuelve todos los elementos en formato de arreglo. Muy bien`  

- _Debe tener un metodo getProductById, y tras leer el archivo debe buscar el producto con el id especificado y devolverlo en formato **objeto**_ ❎

> `Esto no es correcto en la normalidad. Primero, está devolviendo el ID en base a la posición en el arreglo, cosa que aquí te funciona, porque basas el id en la longitud del array, sin embargo, lo correcto es utilizar un metodo como el "find" para buscar el elemento. Hay varias formas y te recomiendo que las revises.`  
> `A su vez, el enunciado dice que debes devolver la respuesta en formato objeto, y tu lo estás devolviendo como string.`  

- _Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, asi también como el campo a actualizar (puede ser el objeto completo, como en una DB) y debe actualizar el producto que tenga ese id en el arrchivo. **NO DEBE BORRARSE SU ID**_ ❎

> `Esto es funcional. Esta muy buena la logica de como lo has resuelto. Sin embargo, estas obligando al que utilice el metodo a que cambie cada campo. es decir, está en la obligación de actualizarlo completo. En el enunciado dice`_` Puede ser el objeto completo`_` no necesariamente será el objeto completo`  
> `Algo que tambien me gustaría comentar es sobre el uso del switch-case. En el caso del manejador que estamos construyendo, no es necesario utilizar switch-case y nisiquiera un if o un concatenador de arreglos. Con un par de "spread Operator" sería suficiente. Algo así:`  

```js
class ProductManager {
...
  async updateProduct (id, newProduct) {
    try{
      const products = JSON.parse(await fs.promise.readFile(this.path, 'utf-8'))
      if (!products.length) {
        return 'There are no products to update'
      }
      const product = products.find((product) => product.id === id)
      if (!product){
        return 'There is no product with that id'
      }
      product = {...product, ...newProduct, id} //Para conservar el id que me pasaron por argumento y que no esté cambiado dentro de "newProduct"
      return product
    } catch(error){
      console.error(error)
      throw new Error(error)
    }
  }
...
}
```

- _Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo_ 💯

> `Muy bien. El metodo enargado de borrar está muy bien logrado, incluso has verificado existencia de productos y del producto en sí `  

**Extras:**

> `Has hecho un buen trabajo. Tengo las sospechas de que tú trabajas o has trabajado anteriormente en C# por la forma en que has trabajado ciertas cosas del codigo. Solo para recordartelo, a pesar de que se parezcan un poco, cuando entres a typescript, este lenguaje no es lo mismo. Instanciar tantas variables vacías e instanciarlas antes de utilizarlas, en Javascript no es necesario. Puedes instanciarla y darle el valor y la logica dentro de la misma linea.`  
>`Tambien me gustaría aclararte que aquí no estamos haciendo un CLI (Comand Line Interface), por lo que varias de las cosas que has escrito no son necesarias y deberás borrarlas y refactorizarlas para cuando se utilice la creación de la API. Ten mucho cuidado con esto.`


**Aviso:**

> `Ante cualquier duda o consulta, sabes que me puedes encontrar en el chat de la plataforma. Sin mas que añadir. Muchos exitos`
