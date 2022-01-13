<?php

require($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');


 global $wpdb;
//  $table_name = $wpdb->prefix . 'auth_qr';
//  $sql = "CREATE TABLE $table_name (
//  id int(11) NOT NULL AUTO_INCREMENT,
//  token varchar(255) DEFAULT NULL,
//  value BOOLEAN,
//  UNIQUE KEY id (id)
//  );";
//  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
//  dbDelta( $sql );

// $wpdb->insert(
// 'wp_auth_qr',
// array(
// 'token' => '12344',
// ),
// array(
// '%d',
// )
// );

// $table_name = $wpdb->prefix . 'auth_qr';
// $results = $wpdb->get_results( $wpdb->prepare('SELECT * FROM '.$table_name ));

$user_query = new WP_User_Query( array( 'meta_key' => 'did', 'meta_value' => '3152b85a7e12fed7be0eecdd11dd7bab7311b196a2d9e49ec5fdc10c17b748e4' )  );

echo '<pre>';
var_dump($user_query);

