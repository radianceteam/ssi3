<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @since      1.0.0
 *
 * @package    Everscale_Ssi_Authorization
 * @subpackage Everscale_Ssi_Authorization/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Everscale_Ssi_Authorization
 * @subpackage Everscale_Ssi_Authorization/public
 * @author     Sergey Gerasimov
 */

 //require __DIR__ . 'class-evescale-ssi-login.php';

class Everscale_Ssi_Authorization_Public {

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
	 * @param      string    $everscale_ssi_authorization       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
    public function __construct( $everscale_ssi_authorization, $version ) {

        $this->everscale_ssi_authorization = $everscale_ssi_authorization;
        $this->version = $version;
        self::addPage();
        add_shortcode( 'custom-login-form', array( $this, 'render_login_form' ) );


    }

    public function render_login_form( $attributes, $content = null ) {
        // Разбор атрибутов шорткода
        $default_attributes = array( 'show_title' => false );
        $attributes = shortcode_atts( $default_attributes, $attributes );
        $show_title = $attributes['show_title'];

        if ( is_user_logged_in() ) {
            return __( 'You are already signed in.', 'personalize-login' );
        }

        // Передаём параметр для перенаправления: по умолчанию,
        // Если будет передан валиндый параметр, то
        // обрабатываем его.
        $attributes['redirect'] = '';
        if ( isset( $_REQUEST['redirect_to'] ) ) {
            $attributes['redirect'] = wp_validate_redirect( $_REQUEST['redirect_to'], $attributes['redirect'] );
        }

        // Отображаем форму входа
        return $this->get_template_html( 'login_form', $attributes );
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

        return $html;
    }


    function add_user_contact_did( $method ) {
    
        $custom_contact = [
            'did'=> 'DID'
        ];
    
        $method = array_merge( $method, $custom_contact );
    
        return $method;
    
    }

    static function addPage() {
        // Information needed for creating the plugin's pages
        $page_definitions = array(
            'member-login' => array(
                'title' => __( 'Sign In', 'personalize-login' ),
                'content' => '[custom-login-form]'
            ),
            'member-account' => array(
                'title' => __( 'Your Account', 'personalize-login' ),
                'content' => '[account-info]'
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
		 * defined in Everscale_Ssi_Authorization_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Everscale_Ssi_Authorization_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->everscale_ssi_authorization, plugin_dir_url( __FILE__ ) . 'css/everscale-ssi-authorization-public.css', array(), $this->version, 'all' );

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
		 * defined in Everscale_Ssi_Authorization_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Everscale_Ssi_Authorization_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
        wp_register_script( 'react', ( 'https://unpkg.com/react@17/umd/react.production.min.js' ), false, null, false );
        wp_enqueue_script( 'react' );
        wp_register_script( 'react-dom', ( 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js' ), false, null, false );
        wp_enqueue_script( 'react-dom' );

	//	wp_enqueue_script( $this->everscale_ssi_authorization, plugin_dir_url( __FILE__ ) . 'js/everscale-ssi-authorization-public.js', array( 'jquery' ),time(), true );
		wp_enqueue_script( $this->everscale_ssi_authorization, plugin_dir_url( __FILE__ ) . 'js/main.js', array( 'jquery' ),time(), true );
	//	wp_enqueue_script( 'api', plugin_dir_url( __FILE__ ) . 'js/login.js', array( 'jquery' ), time(), true);

	}

}
