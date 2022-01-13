<?php


require($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');

global $wpdb;
$table_name = $wpdb->prefix . 'auth_qr';
$results = $wpdb->get_results( $wpdb->prepare('SELECT * FROM '.$table_name.' WHERE token = %s', $_POST['token']) );


if(!$results){
    echo 'false';
    die;
} elseif ($results[0]->value == 1){

    wp_clear_auth_cookie();
    wp_set_current_user ( 10 ); // Set the current user detail
    wp_set_auth_cookie  ( 10 ); // Set auth details in cookie
echo 'true';
}
//var_dump( $_POST);