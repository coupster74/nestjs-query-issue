FROM postgres:14.2

ADD init-user-db.sql /docker-entrypoint-initdb.d/init-user-db.sql
#RUN chown postgres:postgres /docker-entrypoint-initdb.d/init-user-db.sql