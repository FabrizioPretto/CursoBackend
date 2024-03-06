export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Tienda',
            version: '1.0.0',
            description: 'Api de gestión y venta de productos'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./src/docs/*.yml'],
};