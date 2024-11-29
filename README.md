    <h1>Steps to Run the Dockerized Application on Any PC</h1>

    <p>Follow the steps below to successfully run the Dockerized <strong>img-upload</strong> application on any machine. This guide includes Docker commands for pulling the image, running the container, and accessing the application.</p>

    <h2>1. Install Docker</h2>
    <p>Make sure that Docker is installed on your machine.
    Follow the installation guides below based on your operating system:</p>

    <ul>
        <li><a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank">Install Docker for Windows</a></li>
        <li><a href="https://docs.docker.com/desktop/install/mac-install/" target="_blank">Install Docker for Mac</a></li>
        <li><a href="https://docs.docker.com/desktop/install/linux-install/" target="_blank">Install Docker on Linux</a></li>
    </ul>

    <p>After installation, ensure that Docker is running before proceeding.</p>

    <h2>2. Log in to Docker Hub</h2>
    <p>In order to pull the Docker image, you need to be logged in to Docker Hub.</p>

    <p><strong>Run the following command:</strong></p>
    <pre><code>docker login</code></pre>
    <p>Enter your Docker Hub <strong>username</strong> and <strong>password</strong> when prompted. Once successfully logged in, Docker will authenticate your session.</p>

    <h2>3. Pull the Docker Image</h2>
    <p>Next, pull the pre-built Docker image from Docker Hub to your local machine.</p>

    <p><strong>Use this command to pull the image:</strong></p>
    <pre><code>docker pull arbabmustafa/img-upload:v1.0.0</code></pre>

    <p>If the image is already up to date, you will see a message like this:</p>
    <pre><code>Status: Image is up to date for arbabmustafa/img-upload:v1.0.0</code></pre>

    <h2>4. Run the Docker Container</h2>
    <p>Once the image is pulled, run it inside a Docker container.</p>

    <p><strong>Use this command to start the container:</strong></p>
    <pre><code>docker run -d -p 3000:3000 --name img-upload-container arbabmustafa/img-upload:v1.0.0</code></pre>

    <ul>
        <li><strong>-d</strong>: Runs the container in detached mode (in the background).</li>
        <li><strong>-p 3000:3000</strong>: Maps port <strong>3000</strong> inside the container to port <strong>3000</strong> on your local machine.</li>
        <li><strong>--name img-upload-container</strong>: Assigns the name <strong>img-upload-container</strong> to the running container.</li>
        <li><strong>arbabmustafa/img-upload:v1.0.0</strong>: Specifies the image to run.</li>
    </ul>

    <p>If the container starts successfully, you will see a unique container ID like this:</p>
    <pre><code>666989582effa0c85f7bae22cf0d0ef8b6a6ece29c0b472b5a9681c0e970690a</code></pre>

    <h2>5. Verify the Running Container</h2>
    <p>To confirm that your container is running, use the following command:</p>
    <pre><code>docker ps</code></pre>

    <p>This command will list all the currently running containers. You should see the <strong>img-upload-container</strong> with its details, such as:</p>
    <pre><code>

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
666989582eff arbabmustafa/img-upload:v1.0.0 "docker-entrypoint.s…" 36 seconds ago Up 35 seconds 0.0.0.0:3000->3000/tcp img-upload-container
</code></pre>

    <h2>6. Access the Application</h2>
    <p>Now that the container is running, you can access the application.</p>

    <p><strong>On the same machine (localhost):</strong>
    Open your web browser and go to the following URL:</p>
    <pre><code>http://localhost:3000</code></pre>

    <p><strong>From a different machine or server:</strong>
    If you're running this on a remote server, replace <strong>localhost</strong> with the IP address of the host machine:</p>
    <pre><code>http://<host-ip>:3000</code></pre>

    <p>This should open the <strong>img-upload</strong> application in your browser.</p>

    <h2>7. Stopping the Container</h2>
    <p>When you are done with the application and want to stop the running container, use the following command:</p>
    <pre><code>docker stop img-upload-container</code></pre>

    <p>This command will stop the container. If you need to remove the container as well, run:</p>
    <pre><code>docker rm img-upload-container</code></pre>

    <h2>Additional Commands for Managing Docker Containers</h2>
    <p>Here are a few additional commands you might find helpful for managing Docker containers:</p>
    <ul>
        <li><strong>List all containers (running and stopped):</strong>
            <pre><code>docker ps -a</code></pre>
        </li>
        <li><strong>View logs of a container:</strong>
            <pre><code>docker logs img-upload-container</code></pre>
        </li>
        <li><strong>Restart a running container:</strong>
            <pre><code>docker restart img-upload-container</code></pre>
        </li>
        <li><strong>Remove an image:</strong>
            <pre><code>docker rmi arbabmustafa/img-upload:v1.0.0</code></pre>
        </li>
    </ul>
