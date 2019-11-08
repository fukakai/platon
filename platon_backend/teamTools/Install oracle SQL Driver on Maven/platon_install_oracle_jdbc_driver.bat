@echo off
set ESC=
set Red=%ESC%[91m
set White=%ESC%[37m
set Cyan=%ESC%[96m

sqlplus / as sysdba @platon_get_oracle_home_adress.sql

echo %Red% Please copy/paste the given adress one line before %Cyan%( C:\oraclexe....)
echo %White%
set /P ORACLE_HOME="Oracle Home: "

call mvn install:install-file -DgroupId=com.oracle -DartifactId=ojdbc6_g -Dversion=11.2.0 -Dpackaging=jar -Dfile=%ORACLE_HOME%\jdbc\lib\ojdbc6_g.jar
pause
