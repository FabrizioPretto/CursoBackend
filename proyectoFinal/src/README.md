# Backend de Aplicación E-commerce

Este es el backend de una aplicación de e-commerce desarrollada en Node.js utilizando type modules. Proporciona una API para gestionar usuarios, productos, carritos y tickets de compra.

## Instalación

1. Clonar este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar todas las dependencias.

### Iniciar el servidor

Para iniciar el servidor, ejecuta el siguiente comando:

`npm start MONGO`

El servidor se iniciará en el puerto especificado en la configuración.

### Endpoints

#### Usuarios

- **POST /api/users/register:** Registra un usuario nuevo.
- **POST /api/users/login:** Inicia sesión del usuario y actualiza la fecha de conexión.
- **GET /api/users/getAllUsers:** Accede a todos los usuarios. Solo los usuarios con rol de administrador pueden usar este endpoint.
- **DELETE /api/users/deleteUsers:** Borra los usuarios que tengan más de 2 días de inactividad. Solo los usuarios con rol de administrador pueden usar este endpoint.
- **POST /api/users/profile:** Se obtiene información del usuario actualmente logueado.

#### Productos

- **GET /api/products/:** Se obtienen todos los productos disponibles.
- **POST /api/products/:** Crea un nuevo producto. Solo el administrador puede crear productos.
- **GET /api/products/{id}:** Busca un producto por ID.
- **DELETE /api/products/{id}:** Se elimina un producto por ID. Solo el administrador puede eliminar productos, y si los mismos fueron creados por un usuario premium, éste último recibirá un correo donde se le notificará dicha acción.
- **PUT /api/products/{idProd}:** Se modificará la información del producto con el ID indicado, de acuerdo a los datos recibidos en el body.

#### Carritos

- **POST /api/carts/:** Crea un carrito para el usuario actualmente logueado.
- **GET /api/carts/{id}:** Busca un carrito por ID. Cada usuario tiene acceso a sus propios carritos.
- **PUT /api/carts/{idCart}/products/{idProd}:** Agrega un producto al carrito.
- **DELETE /api/carts/{idCart}/products/{idProd}:** Elimina un producto del carrito.
- **DELETE /api/tickets/{cartId}:** Vacía el carrito.

#### Ticket

- **POST /ticket/{idCart}:** Se generará el ticket del ID del carrito indicado.

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las  variables de entorno:

REVISAR ARCHIVO .env.example

## Documentación

La documentación de la API está disponible en Swagger. Puedes acceder a ella visitando la ruta `/docs` cuando el servidor esté en funcionamiento. O a través del siguiente link: https://backend-coderhouse-fabrizio-pretto.koyeb.app/docs/
