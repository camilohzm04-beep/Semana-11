# Informe de despliegue en AWS EC2

## 1. Datos generales

**Proyecto:** Relatos de Papel  
**Plataforma:** AWS EC2  
**Sistema operativo sugerido:** Ubuntu Server  
**Backend:** Spring Boot + Eureka + Cloud Gateway + microservicios  
**Frontend:** React con Vite  
**Base de datos:** H2 en memoria, usada para prueba academica  

## 2. Objetivo

Desplegar la aplicacion Relatos de Papel en una instancia EC2 para validar que los servicios backend se ejecutan correctamente, que Eureka registra los microservicios y que el frontend puede abrirse desde el navegador usando la IP publica de la instancia.

## 3. Arquitectura desplegada

Servicios utilizados:

| Servicio | Puerto | Funcion |
|---|---:|---|
| eureka-server | 8761 | Registro y descubrimiento de servicios |
| cloud-gateway | 8080 | Puerta de entrada a las APIs |
| ms-books-catalogue | 8081 | Microservicio de catalogo de libros |
| ms-books-payments | 8084 | Microservicio de pagos |
| frontend Vite | 5173 | Interfaz web de Relatos de Papel |

Rutas de prueba por gateway:

| Ruta | Descripcion |
|---|---|
| `http://IP_PUBLICA:8080/api/catalogue/books` | Consulta libros por medio del gateway |
| `http://IP_PUBLICA:8080/api/payments` | Consulta pagos por medio del gateway |
| `http://IP_PUBLICA:8761` | Consola de Eureka |
| `http://IP_PUBLICA:5173` | Frontend |

## 4. Inspeccion local antes del despliegue

Antes de activar la instancia EC2, se puede probar el sistema en el computador local usando `localhost`.

Puertos locales:

| Servicio | URL local |
|---|---|
| Eureka | `http://localhost:8761` |
| Gateway | `http://localhost:8080` |
| Catalogo directo | `http://localhost:8081/books` |
| Pagos directo | `http://localhost:8084/payments` |
| Frontend | `http://localhost:5173` |

Comandos de inspeccion en PowerShell:

```powershell
Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -in 8761,8080,8081,8084,5173 }
```

Ver procesos Java:

```powershell
Get-Process java
```

Probar Eureka:

```powershell
Invoke-WebRequest http://localhost:8761 -UseBasicParsing
```

Probar catalogo directamente:

```powershell
Invoke-WebRequest http://localhost:8081/books -UseBasicParsing
```

Probar pagos directamente:

```powershell
Invoke-WebRequest http://localhost:8084/payments -UseBasicParsing
```

Probar rutas por gateway:

```powershell
Invoke-WebRequest http://localhost:8080/api/catalogue/books -UseBasicParsing
Invoke-WebRequest http://localhost:8080/api/payments -UseBasicParsing
```

Pantallazos sugeridos:

- Eureka abierto en `localhost:8761`.
- PowerShell mostrando los puertos activos.
- Respuesta JSON de `localhost:8081/books`.
- Respuesta JSON de `localhost:8084/payments`.

## 5. Creacion y activacion de la instancia EC2

1. Entrar a AWS Console.
2. Buscar el servicio **EC2**.
3. Seleccionar **Launch instance**.
4. Asignar un nombre, por ejemplo: `relatos-de-papel-ec2`.
5. Seleccionar una AMI Ubuntu Server.
6. Seleccionar un tipo de instancia. Para cuatro servicios Java, es recomendable usar una instancia con al menos 2 GB de RAM.
7. Crear o seleccionar un par de llaves `.pem`.
8. Configurar el Security Group con estas reglas de entrada:

| Tipo | Puerto | Origen | Uso |
|---|---:|---|---|
| SSH | 22 | Mi IP | Conexion a la instancia |
| Custom TCP | 8080 | 0.0.0.0/0 | Gateway/API |
| Custom TCP | 8761 | Mi IP o 0.0.0.0/0 | Consola Eureka para evidencia |
| Custom TCP | 5173 | 0.0.0.0/0 | Frontend Vite |

9. Crear la instancia.
10. Esperar a que el estado sea **Running** y copiar la **Public IPv4 address**.

Pantallazo sugerido: instancia EC2 en estado `Running` mostrando la IP publica.

## 6. Conexion por SSH

Desde Windows PowerShell, ubicarse donde esta la llave `.pem` y ejecutar:

```powershell
ssh -i "mi-llave.pem" ubuntu@IP_PUBLICA
```

Ejemplo:

```powershell
ssh -i "relatos-key.pem" ubuntu@54.123.45.67
```

Pantallazo sugerido: terminal conectada a Ubuntu por SSH.

## 7. Instalacion de dependencias en EC2

En la instancia ejecutar:

```bash
sudo apt update
sudo apt install -y openjdk-21-jdk maven curl unzip
```

Instalar Node.js para el frontend:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verificar versiones:

```bash
java -version
mvn -version
node -v
npm -v
```

Si la instancia tiene poca memoria, crear swap:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
free -h
```

Pantallazo sugerido: versiones de Java, Maven, Node y NPM instaladas.

## 8. Subida del proyecto a EC2

Desde PowerShell, en la carpeta local del proyecto, ejecutar:

```powershell
scp -i "mi-llave.pem" -r Backend Frontend ubuntu@IP_PUBLICA:/home/ubuntu/relatos-de-papel
```

Despues entrar otra vez por SSH:

```powershell
ssh -i "mi-llave.pem" ubuntu@IP_PUBLICA
```

Ubicarse en el proyecto:

```bash
cd /home/ubuntu/relatos-de-papel
```

Pantallazo sugerido: listado de carpetas `Backend` y `Frontend` dentro de EC2.

## 9. Compilacion del backend

Compilar cada servicio:

```bash
cd /home/ubuntu/relatos-de-papel/Backend/eureka-server
mvn clean package -DskipTests

cd /home/ubuntu/relatos-de-papel/Backend/cloud-gateway
mvn clean package -DskipTests

cd /home/ubuntu/relatos-de-papel/Backend/ms-books-catalogue
mvn clean package -DskipTests

cd /home/ubuntu/relatos-de-papel/Backend/ms-books-payments
mvn clean package -DskipTests
```

Pantallazo sugerido: compilacion terminada con `BUILD SUCCESS`.

## 10. Ejecucion de servicios

Abrir cuatro terminales SSH o usar `nohup` para dejar servicios activos.

Primero iniciar Eureka:

```bash
cd /home/ubuntu/relatos-de-papel/Backend/eureka-server
nohup java -jar target/eureka-server-0.0.1-SNAPSHOT.jar > eureka.log 2>&1 &
```

Iniciar catalogo:

```bash
cd /home/ubuntu/relatos-de-papel/Backend/ms-books-catalogue
nohup java -jar target/ms-books-catalogue-0.0.1-SNAPSHOT.jar > catalogue.log 2>&1 &
```

Iniciar pagos:

```bash
cd /home/ubuntu/relatos-de-papel/Backend/ms-books-payments
nohup java -jar target/ms-books-payments-0.0.1-SNAPSHOT.jar > payments.log 2>&1 &
```

Iniciar gateway, configurando el origen del frontend:

```bash
cd /home/ubuntu/relatos-de-papel/Backend/cloud-gateway
export FRONTEND_ORIGIN=http://IP_PUBLICA:5173
nohup java -jar target/cloud-gateway-0.0.1-SNAPSHOT.jar > gateway.log 2>&1 &
```

Ver procesos:

```bash
ps aux | grep java
```

Ver logs:

```bash
tail -f /home/ubuntu/relatos-de-papel/Backend/eureka-server/eureka.log
tail -f /home/ubuntu/relatos-de-papel/Backend/cloud-gateway/gateway.log
```

Pantallazo sugerido: procesos Java corriendo.

## 11. Pruebas del backend

Abrir en navegador:

```text
http://IP_PUBLICA:8761
```

En Eureka deben aparecer:

- `CLOUD-GATEWAY`
- `MS-BOOKS-CATALOGUE`
- `MS-BOOKS-PAYMENTS`

Crear un libro desde la instancia:

```bash
curl -X POST http://localhost:8080/api/catalogue/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Cien anos de soledad","author":"Gabriel Garcia Marquez","publicationDate":"1967-05-30","category":"Novela","isbn":"9780307474728","rating":5,"visible":true,"stock":10}'
```

Consultar libros por IP publica:

```bash
curl http://IP_PUBLICA:8080/api/catalogue/books
```

Crear un pago:

```bash
curl -X POST http://localhost:8080/api/payments \
  -H "Content-Type: application/json" \
  -d '{"orderId":1,"amount":45000,"method":"CARD","status":"PENDING"}'
```

Consultar pagos:

```bash
curl http://IP_PUBLICA:8080/api/payments
```

Pantallazos sugeridos:

- Eureka con los servicios registrados.
- Respuesta JSON de `/api/catalogue/books`.
- Respuesta JSON de `/api/payments`.

## 12. Ejecucion del frontend

Instalar dependencias y ejecutar Vite:

```bash
cd /home/ubuntu/relatos-de-papel/Frontend/relatos-de-papel-front-main
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

Abrir en navegador:

```text
http://IP_PUBLICA:5173
```

Pantallazos sugeridos:

- Terminal mostrando Vite activo.
- Pagina principal del frontend cargando desde la IP publica.

## 13. Evidencias recomendadas para el informe

| No. | Evidencia | Descripcion |
|---:|---|---|
| 1 | Instancia EC2 | Estado `Running` e IP publica |
| 2 | Security Group | Puertos 22, 8080, 8761 y 5173 habilitados |
| 3 | SSH | Conexion exitosa a Ubuntu |
| 4 | Dependencias | Versiones de Java, Maven, Node y NPM |
| 5 | Build backend | `BUILD SUCCESS` en los servicios |
| 6 | Procesos Java | Servicios ejecutandose |
| 7 | Eureka | Microservicios registrados |
| 8 | API catalogo | JSON de libros desde gateway |
| 9 | API pagos | JSON de pagos desde gateway |
| 10 | Frontend | Aplicacion abierta desde navegador |

## 14. Conclusion

Se desplego la aplicacion Relatos de Papel en AWS EC2. La instancia ejecuto los servicios Spring Boot, Eureka registro los microservicios y el gateway permitio consultar las rutas principales. Finalmente, el frontend se ejecuto con Vite y quedo disponible desde la IP publica de la instancia, permitiendo validar el funcionamiento general del sistema en la nube.
