ALTER SESSION SET NLS_DATE_FORMAT = 'DD-MON-YYYY HH24:MI:SS';
spool logSQL.log
select sys_context( 'userenv', 'os_user' ) AS COMPUTER_USER from dual;
SELECT CURRENT_DATE AS OPERATION_TIME FROM DUAL;
set echo on 
create user platonBackend identified by platonPassword DEFAULT TABLESPACE users;
grant DBA to platonBackend;
alter session set current_schema = platonBackend;
commit;
/
exit