# Configuration
This page documents the configuration options and requirements of uppics.

### Environment variables 
uppics requires the following environment variables to be set. 

`UPPICS_ROOT` <br>
This is the env var that states the path of the root folder where all the uppics data is going to be stored. <br>
It is mandatory. <br>
The folder does not have to exist: it will be created if it doesn't.<br>
You won't have to set that: it's part of the out-of-the-box configuration of the container, but you can change that if you want. To change it, just change the value in the K8S deployment file, located under k8s. 

`UPPICS_TMP` <br>
All uploaded media is temporarily stored under a folder. This environment variable defines the path of that folder.<br>
It is mandatory. <br>
You won't have to set that: it's part of the out-of-the-box configuration of the container, but you can change that if you want. To change it, just change the value in the K8S deployment file, located under k8s. 
