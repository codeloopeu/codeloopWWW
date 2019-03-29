<?php declare(strict_types = 1);

class DatabaseHelper {

    public static function createDatabaseConnection() {
        $db_conf = parse_ini_file(".user.ini");

        $host = $db_conf['datasource.host'];
        $dbname = $db_conf['datasource.dbname'];
        $user = $db_conf['datasource.user'];
        $password = $db_conf['datasource.password'];

        return pg_connect("host=$host dbname=$dbname user=$user password=$password");
    }
}
