<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Everscale</title>
</head>
<body>
Your log in authorisation was succesful with your DID <?=$_GET['did']?>
</body>
</html>

<?php

$did = $_GET['did'];
$token = $_GET['token'];

if(!$did){
    echo '404';
    die;
}
require($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');
global $wpdb;



$wpdb->insert(
    'wp_auth_qr',
    array(
        'token' => $token,
        'value' => 1,
        ),
        array(
        '%s',
        '%s'
        )
        );