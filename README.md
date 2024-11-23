# Gestion-de-Departamentos-y-Empleados-con-Apollo-Server-y-GraphQL

Este proyecto consiste en una aplicación cliente que interactúa con una API existente a través de GraphQL. El sistema implementa consultas (Querys) y mutaciones para la gestión eficiente de datos en la nube, ofreciendo una interfaz agnóstica para su consulta y manipulación.

## Objetivo

Proveer una solución que integre una API con GraphQL para gestionar datos, permitiendo la creación, consulta, actualización y eliminación de objetos a través de una aplicación cliente.

## Características del Proyecto

- **Implementación de GraphQL**: Uso de Apollo Server para definir y exponer Querys y Mutaciones.
- **Consumo de API**: Conexión directa con un servicio en la nube para manejar datos. Código fuente de la API: [API-RESTFul](https://github.com/RobinsonMolina/API-RESTFul.git).
- **Persistencia de datos en la nube**: Uso de una base de datos gestionada para garantizar seguridad y escalabilidad.
- **Cliente Web Interactivo**: La interfaz de usuario permite interactuar con los datos de forma amigable.
- **Diseño agnóstico**: Compatible con múltiples fuentes de datos.

## Querys y Mutaciones en GraphQL

### Querys
- **`departments`**: Recupera una lista de todos los departamentos.
- **`department(id: String)`**: Obtiene información detallada de un departamento específico.
- **`employees`**: Recupera una lista de todos los empleados.
- **`employee(id: String)`**: Obtiene información detallada de un empleado específico.

### Mutaciones

#### Gestión de Departamentos
- **`createDepartment(input: DepartmentInput!)`**: Crea un nuevo departamento.
- **`updateDepartment(id: String!, input: DepartmentInput!)`**: Actualiza un departamento existente.
- **`deleteDepartment(input: String)`**: Elimina un departamento basado en su identificador único.

#### Gestión de Empleados
- **`createEmployee(input: EmployeeInput!)`**: Crea un nuevo empleado.
- **`updateEmployee(id: String!, input: EmployeeInput!)`**: Actualiza un empleado existente.
- **`deleteEmployee(input: String)`**: Elimina un empleado basado en su identificador único.

## Componentes de la Aplicación Cliente

### Funcionalidades Principales

1. **Formulario de Búsqueda**  
   Permite buscar departamentos y empleados utilizando palabras clave como nombres, identificadores o atributos específicos.  
   - Admite filtros para refinar resultados, como filtrar empleados por departamento o rango salarial.

2. **Formulario de Gestión**  
   Facilita la creación, edición y eliminación de departamentos y empleados.  
   - Incluye validaciones para asegurar que los datos ingresados cumplan con los formatos y requisitos establecidos (correo electrónico, número de teléfono, salario, etc.).

3. **Tabla de Resultados**  
   Presenta los datos obtenidos en búsquedas de forma clara y ordenada.  
   - Funcionalidades: ordenamiento por columnas, paginación y selección de registros para edición o eliminación.

4. **Visualización de Relaciones**  
   Muestra gráficamente las conexiones entre departamentos y empleados, permitiendo:  
   - Identificar jerarquías y dependencias.  
   - Gestionar relaciones, como asignar empleados a departamentos o realizar transferencias entre estos.

5. **Dashboard Resumido (opcional)**  
   Ofrece estadísticas clave, como:  
   - Número total de empleados.  
   - Departamentos activos.  
   - Desglose visual de salarios por departamento.

6. **Notificaciones y Validaciones en Tiempo Real**  
   Informa al usuario sobre errores de entrada o acciones realizadas exitosamente mediante alertas o mensajes emergentes.

7. **Configuración Personalizada (opcional)**  
   Permite ajustar preferencias como:  
   - Tema visual (modo claro u oscuro).  
   - Idioma de la interfaz.  
   - Columnas visibles en las tablas.

### Tecnologías Utilizadas
- **Backend**: Node.js con Apollo Server y GraphQL.  
- **Frontend**: HTML, CSS y JavaScript.

## Despligue



## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/RobinsonMolina/Departments-Employees-Apollo-Server-GraphQL-API.git
   ```
2. Instalar dependencias
```bash
npm install
```

3. Ejecutar servidor
```bash
npm start
```

## Autores
- Jazmin Dajerly Moreno Galindo
- Juan Sebastian Beltran Rodriguez
- Robinson Felipe Molina Granados