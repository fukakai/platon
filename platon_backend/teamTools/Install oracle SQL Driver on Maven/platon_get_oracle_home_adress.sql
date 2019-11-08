var OHM varchar2(100);
EXEC dbms_system.get_env('ORACLE_HOME', :OHM) ;
PRINT OHM
exit