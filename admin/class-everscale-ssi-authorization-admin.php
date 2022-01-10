<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @since      1.0.0
 *
 * @package    Everscale_Ssi_Authorization
 * @subpackage Everscale_Ssi_Authorization/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Everscale_Ssi_Authorization
 * @subpackage Everscale_Ssi_Authorization/admin
 * @author     Sergey Gerasimov
 */
class Everscale_Ssi_Authorization_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $everscale_ssi_authorization    The ID of this plugin.
	 */
	private $everscale_ssi_authorization;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $everscale_ssi_authorization       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $everscale_ssi_authorization, $version ) {

		$this->everscale_ssi_authorization = $everscale_ssi_authorization;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Everscale_Ssi_Authorization_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Everscale_Ssi_Authorization_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->everscale_ssi_authorization, plugin_dir_url( __FILE__ ) . 'css/everscale-ssi-authorization-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Everscale_Ssi_Authorization_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Everscale_Ssi_Authorization_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->everscale_ssi_authorization, plugin_dir_url( __FILE__ ) . 'js/everscale-ssi-authorization-admin.js', array( 'jquery' ), $this->version, false );

	}

}
