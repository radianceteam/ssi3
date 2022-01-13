<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @since      1.0.0
 *
 * @package    Login_Ssi_Qr_Code_Everscale
 * @subpackage Login_Ssi_Qr_Code_Everscale/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Login_Ssi_Qr_Code_Everscale
 * @subpackage Login_Ssi_Qr_Code_Everscale/public
 * @author     Sergey Gerasimov
 */
class Login_Ssi_Qr_Code_Everscale_Public {

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
	 * @param      string    $login_ssi_qr_code_everscale       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $login_ssi_qr_code_everscale, $version ) {

		$this->login_ssi_qr_code_everscale = $login_ssi_qr_code_everscale;
		$this->version = $version;
		require plugin_dir_path( __FILE__ ) . '../inc/phpqrcode/qrlib.php';

		self::addPage();
        add_shortcode( 'custom-login-form-qr', array( $this, 'render_login_form' ) );

	} 

	public function render_login_form( $attributes, $content = null ) {
        // Разбор атрибутов шорткода
        $default_attributes = array( 'show_title' => false );
        $attributes = shortcode_atts( $default_attributes, $attributes );
        $show_title = $attributes['show_title'];
        $attributes['token'] = $this->gen_token();
        $attributes['did'] = '3152b85a7e12fed7be0eecdd11dd7bab7311b196a2d9e49ec5fdc10c17b748e4';

		

        // if ( is_user_logged_in() ) {
        //     return __( 'You are already signed in.', 'personalize-login' );
        // }

        // Передаём параметр для перенаправления: по умолчанию,
        // Если будет передан валиндый параметр, то
        // обрабатываем его.
        $attributes['redirect'] = '';
        if ( isset( $_REQUEST['redirect_to'] ) ) {
            $attributes['redirect'] = wp_validate_redirect( $_REQUEST['redirect_to'], $attributes['redirect'] );
        }

        // Отображаем форму входа
        return $this->get_template_html( 'login_form-qr', $attributes );
    }

    private function get_template_html( $template_name, $attributes = null ) {
        if ( ! $attributes ) {
            $attributes = array();
        }

        ob_start();

        do_action( 'personalize_login_before_' . $template_name );

        require( __DIR__ . '/templates/' . $template_name . '.php');

        do_action( 'personalize_login_after_' . $template_name );

        $html = ob_get_contents();
        ob_end_clean();
		//$qr =  QRcode::png("http://phpmaster.com", get_temp_dir() . "test-me.png");
        return $html;
    }

	public function gen_token() {

		if (function_exists('com_create_guid') === true) {

			return trim(com_create_guid(), '{}');

		}

		return sprintf(

			'%04X%04X-%04X-%04X-%04X-%04X%04X%04X',

			mt_rand(0, 65535),

			mt_rand(0, 65535),

			mt_rand(0, 65535),

			mt_rand(16384, 20479),

			mt_rand(32768, 49151),

			mt_rand(0, 65535),

			mt_rand(0, 65535),

			mt_rand(0, 65535)

		);

	}

	static function addPage() {
        // Information needed for creating the plugin's pages
        $page_definitions = array(
            'member-login-qr' => array(
                'title' => __( 'Sign In QR', 'personalize-login-qr' ),
                'content' => '[custom-login-form-qr]'
            ),
            'member-account-qr' => array(
                'title' => __( 'Your Account QR', 'personalize-login-qr' ),
                'content' => '[account-info-qr]'
            ),
        );

        foreach ( $page_definitions as $slug => $page ) {
            // Проверка существования страницы
            $query = new WP_Query( 'pagename=' . $slug );
            if ( ! $query->have_posts() ) {
                // Добавляем страницы, исходя из представленного массива данных
                wp_insert_post(
                    array(
                        'post_content'   => $page['content'],
                        'post_name'      => $slug,
                        'post_title'     => $page['title'],
                        'post_status'    => 'publish',
                        'post_type'      => 'page',
                        'ping_status'    => 'closed',
                    )
                );
            }
        }
    }

	/**
	 * Register the stylesheets for the public-facing side of the site.
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

		wp_enqueue_style( $this->login_ssi_qr_code_everscale, plugin_dir_url( __FILE__ ) . 'css/login-ssi-qr-code-everscale-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
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

		wp_enqueue_script( $this->login_ssi_qr_code_everscale, plugin_dir_url( __FILE__ ) . 'js/login-ssi-qr-code-everscale-public.js', array( 'jquery' ), time(), false );

	}

}
