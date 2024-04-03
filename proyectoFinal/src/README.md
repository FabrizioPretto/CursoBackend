# Backend de Aplicación E-commerce

Backend de una aplicación de e-commerce desarrollada en Node.js utilizando type modules. Proporciona una API para gestionar usuarios, productos, carritos y generar tickets de compra.

## Instalación

1. Clonar este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar todas las dependencias.

### Iniciar el servidor

Ejecutar el siguiente comando:

`npm start MONGO` o `npm run dev MONGO`

El servidor se iniciará en el puerto especificado en la configuración.

### Endpoints

#### Usuarios

- **POST /api/users/register:** Registra un usuario nuevo.
- **POST /api/users/login:** Inicia sesión y actualiza la última fecha de conexión del usuario.
- **GET /api/users/getAllUsers:** Accede a todos los usuarios. Solo los usuarios con rol de administrador pueden realizar dicha acción.
- **DELETE /api/users/deleteUsers:** Elimina los usuarios que tengan 2 o más días de inactividad. Solo los usuarios con rol de administrador pueden realizar dicha acción.
- **POST /api/users/profile:** Se obtiene información del usuario actualmente logueado.

#### Productos

- **GET /api/products/:** Se obtienen todos los productos disponibles.
- **POST /api/products/:** Crea un nuevo producto. Solo los roles de administrador y premium pueden crear productos.
- **GET /api/products/dto/{id}:** Busca un producto por ID.
- **DELETE /api/products/{id}:** Se elimina un producto por ID. Solo el administrador puede eliminar productos, y si los mismos fueron creados por un usuario premium, éste último recibirá un correo donde se le notificará dicha acción.
- **PUT /api/products/{idProd}:** Se modificará la información del producto con el ID indicado, de acuerdo a los datos recibidos en el body. Solo puede hacerlo el administrador.

#### Carritos

- **POST /api/carts/:** Crea un carrito para el usuario actualmente logueado.
- **GET /api/carts/:** Se obtienen todos los carritos del usuario.
- **GET /api/carts/{id}:** Busca un carrito por ID. Cada usuario tiene acceso a sus propios carritos.
- **POST /api/carts/{idCart}/products/{idProd}:** Agrega un producto al carrito (de a 1 unidad).
- **DELETE /api/carts/{idCart}:** Elimina el carrito con el ID indicado.
- **PUT /api/carts/{idCart}/products/{idProd}:** En el ID de carrito indicado, se modifican la cantidad de unidades del ID de producto indicado.
- **DELETE /api/carts/{idCart}/products/{idProd}:** Elimina un producto del carrito (de a 1 unidad).
- **DELETE /api/tickets/clearcart/{cartId}:** Vacía el carrito.

#### Ticket

- **POST /ticket/{idCart}:** Se generará el ticket del ID del carrito indicado.

## Configuración

Antes de ejecutar la aplicación, configurar las  variables de entorno:

REVISAR ARCHIVO .env.example

## Documentación

La documentación de la API está disponible en Swagger. Para acceder a ella visita la ruta `/docs` cuando el servidor esté en funcionamiento. O a través del link: https://backend-coderhouse-fabrizio-pretto.koyeb.app/docs/
