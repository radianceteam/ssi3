<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 *
 * @package    Login_Ssi_Qr_Code_Everscale
 * @subpackage Login_Ssi_Qr_Code_Everscale/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Login_Ssi_Qr_Code_Everscale
 * @subpackage Login_Ssi_Qr_Code_Everscale/includes
 * @author     Sergey Gerasimov
 */
class Login_Ssi_Qr_Code_Everscale_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'login-ssi-qr-code-everscale',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
