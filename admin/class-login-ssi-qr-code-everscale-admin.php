<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @since      1.0.0
 *
 * @package    Login_Ssi_Qr_Code_Everscale
 * @subpackage Login_Ssi_Qr_Code_Everscale/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Login_Ssi_Qr_Code_Everscale
 * @subpackage Login_Ssi_Qr_Code_Everscale/admin
 * @author     Sergey Gerasimov
 */
class Login_Ssi_Qr_Code_Everscale_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $login_ssi_qr_code_everscale    The ID of this plugin.
	 */
	private $login_ssi_qr_code_everscale;

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
	 * @param      string    $login_ssi_qr_code_everscale       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $login_ssi_qr_code_everscale, $version ) {

		$this->login_ssi_qr_code_everscale = $login_ssi_qr_code_everscale;
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
		 * defined in Login_Ssi_Qr_Code_Everscale_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Login_Ssi_Qr_Code_Everscale_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->login_ssi_qr_code_everscale, plugin_dir_url( __FILE__ ) . 'css/login-ssi-qr-code-everscale-admin.css', array(), $this->version, 'all' );

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
		 * defined in Login_Ssi_Qr_Code_Everscale_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Login_Ssi_Qr_Code_Everscale_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->login_ssi_qr_code_everscale, plugin_dir_url( __FILE__ ) . 'js/login-ssi-qr-code-everscale-admin.js', array( 'jquery' ), $this->version, false );

	}

}
