
const liquibase = require('liquibase');

liquibase({
    liquibase: 'lib/liquibase-core-3.5.3.jar',
    driver: 'org.postgresql.Driver',
    classpath: 'lib/postgresql-42.2.8.jar',
    url: 'jdbc:postgresql://localhost:5432/postgres',
    username: 'postgres',
    password: 'test.123',
    changeLogFile: 'resources/liquibase/db.changelog.xml'
})
    .run('update')
    .then(() => console.log('success'))
    .catch((err) => console.log('fail', err));
