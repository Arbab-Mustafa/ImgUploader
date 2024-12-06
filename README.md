Steps to Run the Dockerized Application on Any PC

1. Install Docker
2. Log in to Docker Hub
   command =>>> 'docker login '.

3. Pull the Docker Image

command ==> 'docker pull arbabmustafa/img-upload:v1.0.0'

If the image is already up to date, you'll see a message like:

Status: Image is up to date for arbabmustafa/img-upload:v1.0.0

4. Run the Docker Container

command =>=> 'docker run -d -p 3000:3000 --name img-upload-container arbabmustafa/img-upload:v1.0.0'

If the container starts successfully, it will display a unique container ID like this:

666989582effa0c85f7bae22cf0d0ef8b6a6ece29c0b472b5a9681c0e970690a 5. Verify the Running Container
command => 'docker ps'

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

666989582eff arbabmustafa/img-upload:v1.0.0 "docker-entrypoint.s…" 36 seconds ago Up 35 seconds 0.0.0.0:3000->3000/tcp img-upload-container

6. Access the Application
   http://localhost:3000

7. Stopping the Container
   docker stop img-upload-container
