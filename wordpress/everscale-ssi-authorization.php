<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @since             1.0.0
 * @package           Everscale_Ssi_Authorization
 *
 * @wordpress-plugin
 * Plugin Name:       Everscale ssi authorization
 * Plugin URI:        defispace.com
 * Description:       Everscale ssi authorization
 * Version:           1.0.0
 * Author:            Sergey Gerasimov
 * Author URI:        pexl.ru
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       everscale-ssi-authorization
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Update it as you release new versions.
 */
define( 'EVERSCALE_SSI_AUTHORIZATION_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-everscale-ssi-authorization-activator.php
 */
function activate_everscale_ssi_authorization() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-everscale-ssi-authorization-activator.php';
	Everscale_Ssi_Authorization_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-everscale-ssi-authorization-deactivator.php
 */
function deactivate_everscale_ssi_authorization() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-everscale-ssi-authorization-deactivator.php';
	Everscale_Ssi_Authorization_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_everscale_ssi_authorization' );
register_deactivation_hook( __FILE__, 'deactivate_everscale_ssi_authorization' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-everscale-ssi-authorization.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_everscale_ssi_authorization() {

	$plugin = new Everscale_Ssi_Authorization();
	$plugin->run();

}
run_everscale_ssi_authorization();
