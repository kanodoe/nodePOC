# Node POC

Una simple POC en node para mostrar como implementar
- Versionamiento de base de  datos con Liquibase
- Pruebas unitarias con Cucumber

## Liquibase

Para ejecutar esto se debe considerar que las librerías estén incluidas en el proyecto o puedan ser accesibles para un CI/CD como podría ser Jenkins.

Lo otro a considerar es que los datos tanto de los drivers como las dependencias y credenciales estén disponibles en el archivo liquibase-conf.js como el siguiente ejemplo:

```javascript
liquibase({
    liquibase: 'lib/liquibase-core-3.5.3.jar',
    driver: 'org.postgresql.Driver',
    classpath: 'lib/postgresql-42.2.8.jar',
    url: 'jdbc:postgresql://localhost:5432/postgres',
    username: 'postgres',
    password: 'test.123',
    changeLogFile: 'resources/liquibase/db.changelog.xml'
})
```

### Ejecución del proceso

Para ejecutar el proceso se deberá simplemente ejecutar el comando

```
npm run liquibase
```

### Estructura de las versiones

Los archivos que contendran los cambios deberán estar en la carpeta resources/liquibase en donde se distinguiran dos tipos de XML's, 1) db.changelog.xml: encargado de la orquestación de los otros XML y 2) los archivos de ejecución de los procesos, estos deberán estar orientados a la ejecución de cambios sólo sobre un dominio o tabla de manera tal de facilitar la lectura de los cambios realizados.

```XML
<changeSet id="1" author="alejo">
    <createTable tableName="person">
        <column name="id" type="int" autoIncrement="true">
            <constraints primaryKey="true" nullable="false"/>
        </column>
        <column name="firstname" type="varchar(50)"/>
        <column name="lastname" type="varchar(50)">
            <constraints nullable="false"/>
        </column>
        <column name="state" type="char(2)"/>
    </createTable>
</changeSet>
```

## Creación y ejecución de los Tests

Los tests se pueden hacer en formato ATDD (Acceptance Test Drive Development) de la siguiente forma

```
Feature: Simple maths
  In order to do maths
  As a developer
  I want to increment variables

  Scenario: easy maths
    Given a variable set to 1
    When I increment the variable by 1
    Then the variable should contain 2

  Scenario Outline: much more complex stuff
    Given a variable set to <var>
    When I increment the variable by <increment>
    Then the variable should contain <result>

    Examples:
      | var | increment | result |
      | 100 |         5 |    105 |
      |  99 |      1234 |   1333 |
      |  12 |         5 |     17 |
```

Este a su vez irá conectado a los steps quienes implementaran los cambios, estos pueden revisarse en la carpeta "steps".
