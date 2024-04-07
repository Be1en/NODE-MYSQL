<strong><h1>Paso 1: Construir la imagen del contenedor</h1></strong>
Primero, construimos la imagen del contenedor Docker ejecutando el siguiente comando en la terminal:

<strong>docker build -t node-web . </strong>

<p>Este comando utiliza el archivo Dockerfile presente en el directorio del proyecto para construir la imagen node-web</p>

<strong><h1>Paso 2: Crear una red Docker</h1></strong>
Para permitir la comunicación entre los contenedores de MySQL y Node.js, creamos una red Docker ejecutando el siguiente comando:


<strong>docker network create node-network</strong>

<p>Esto crea una red llamada node-network que será utilizada por los contenedores Docker.</p>


<strong><h1>Paso 3: Iniciar el contenedor MySQL</h1></strong>

A continuación, iniciamos un contenedor Docker para MySQL con la siguiente configuración:


<strong>docker run \
--rm \
-d \
--name node_mysql \
-e MYSQL_DATABASE='nodedb' \
-e MYSQL_USER='valeria' \
-e MYSQL_PASSWORD='valeria' \
-e MYSQL_ROOT_PASSWORD='valeria' \
--network node-network \
mysql:8.0 
</strong>

<p>Esto crea una red llamada node-network que será utilizada por los contenedores Docker.</p>

<strong><h1>Paso 4: Iniciar el contenedor Node.js</h1></strong>

Finalmente, iniciamos un contenedor Docker para nuestra aplicación Node.js con el siguiente comando:


<strong>docker run \
--rm \
--name node-app \
--network node-network \
-p 5000:9000 \
-v $(pwd):/app \
node-web 
</strong>

<p>Este comando inicia nuestro contenedor llamado node-app. Dentro del contenedor, nuestra aplicación Node.js se ejecuta en el puerto 9000. Pero para acceder a nuestra aplicación desde fuera del contenedor, hacemos que el puerto 5000 de nuestra máquina se comunique con el puerto 9000 del contenedor. Esto significa que cuando accedemos a localhost:5000 en nuestro navegador, estamos viendo nuestra aplicación Node.js que se ejecuta en el contenedor en el puerto 9000.</p>

