# POSTMAN REQUESTS

################## INSTALL #################
- https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-8.0.zip
1. exec the install_sonarqube_backend.bat
2. Go to the wrapper file conf: C:\----your extracted sonarqube folder-------\conf\wrapper.conf
3. replace the values of theses lines with:
- wrapper.java.command=%JAVA_HOME%\bin\java
- #wrapper.java.command=java

################## CONTAINS #################
This folder contains:
- install_sonarqube_backend.bat - Contain the Batch command to run the sonarqube installer

################## HOW TO USE SONARCLOUD.IO #################
1. Go to your project in cmd line and run: 
- sonar-scanner
2. find your results at the url: https://sonarcloud.io

