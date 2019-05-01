<?php

// array with database name, host and login data
$db['db_host'] = '127.0.0.1';
$db['db_user'] = 'root';
$db['db_pass'] = 'root';
$db['db_name'] = 'map_stats';

// define constants from the array
foreach($db as $key => $value) {    
  define(strtoupper($key), $value);
}

// create database connection 
$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME, 3307);