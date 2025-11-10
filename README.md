Gestión de Citas para Salón de Belleza
Aplicación web para la gestión de citas en un salón de belleza, desarrollada con Firebase Studio y Firestore.

Descripción
Esta aplicación permite a los clientes reservar servicios seleccionando fecha, hora y tipo de tratamiento. Está diseñada para facilitar la administración de reservas, evitando solapamientos y mejorando la experiencia tanto para el personal como para los clientes.

Funcionalidades
Registro y gestión de clientes

Catálogo de servicios personalizables (uñas, peinados, masajes, etc.)

Reserva de citas (día, hora, servicio)

Modificación y cancelación de citas

Visualización de historial de reservas

Interfaz intuitiva y responsive

Tecnologías Utilizadas
Firebase Studio (para frontend low-code)

Firestore (base de datos en tiempo real)

Cloud Functions (opcional, para lógica de negocio y notificaciones)

Autenticación de Firebase (opcional)

Modelo de Datos
clients: nombre, teléfono

services: nombre, descripción, precio

appointments: cliente, servicio, fecha/hora, estado

Para más detalles, revisa la documentación del modelo de datos incluida en este repositorio.

Instalación y Despliegue
Clonar el repositorio en tu máquina local

Configurar un proyecto en Firebase y agregar credenciales en la app

Crear las colecciones en Firestore según el modelo de datos

Desplegar el frontend usando Firebase Hosting o directamente desde Firebase Studio

Uso
Accede desde cualquier navegador

Ingresa tus datos, selecciona el servicio y el horario deseado

Recibe confirmación automática de la reserva
