<?php 
class Everscale_Ssi_Authorization_login {

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
		add_filter( 'login_redirect', array( $this, 'redirect_after_login' ), 10, 3 );
      //  add_action('wp_ajax_everscale_form', array( $this, 'everscale_form'));
      //  add_action('wp_ajax_nopriv_everscale_form', array( $this, 'everscale_form'));

	}


    public function enqueue_scripts(){

        wp_enqueue_script( 'everscale_login_js', plugin_dir_url( __FILE__ ) . 'js/login.js', array( 'jquery' ), time(), true);

        wp_localize_script('everscale_login_js', 'everscale_login_var',array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('_wpnonce'),
            'title' => esc_html__('Filter Form', 'everscale')
            
		));

    }

    function everscale_form(){

        check_ajax_referer('_wpnonce','nonce');

			$username = $_POST['name'];
			$did = $_POST['did'];
			$token = $_POST['token'];

			$jwtChec = $this->check_jwt($did, $token);

			if(!$jwtChec){
				wp_die();
			}
			// First get the user details
			$user_query = new WP_User_Query( array( 'meta_key' => 'did', 'meta_value' => $did )  );

			if (!empty($user_query->results)) {
				foreach ($user_query->results as $user) {
					echo '<p>' . $user->ID . '</p>';
					if ( !is_wp_error( $user ) )
						{
							wp_clear_auth_cookie();
							wp_set_current_user ( $user->ID ); // Set the current user detail
							wp_set_auth_cookie  ( $user->ID ); // Set auth details in cookie
							$message = "Logged in successfully";
						} else {
							$message = "Failed to log in";
						}

						echo $message;
					}
			} else {
				$userdata = [
					'user_login'           => $username,      // (string) Имя пользователя для входа в систему.
					'user_pass'        => wp_generate_password(), 
					'did'        => $did, 
				];
				$user = wp_insert_user($userdata);
				var_dump($user);
				if ( !is_wp_error( $user ) )
				{
					wp_clear_auth_cookie();
					wp_set_current_user ( $user ); // Set the current user detail
					wp_set_auth_cookie  ( $user ); // Set auth details in cookie
					$message = "Logged in successfully";
				} else {
					$message = "Failed to log in";
				}

				echo $message;

				}




        wp_die();
    }

	public function redirect_after_login( $redirect_to, $requested_redirect_to, $user ) {
		$redirect_url = home_url();
	
		if ( ! isset( $user->ID ) ) {
			return $redirect_url;
		}
	
		if ( user_can( $user, 'manage_options' ) ) {
			// Используем параметр redirect_to, если в нём было передано значение.
			if ( $requested_redirect_to == '' ) {
				$redirect_url = admin_url();
			} else {
				$redirect_url = $requested_redirect_to;
			}
		} else {
			// Не администраторы будут направляться на страницу информаци о профиле
			$redirect_url = home_url( 'member-account' );
		}
	
		return wp_validate_redirect( $redirect_url, home_url() );
	}

	private function check_jwt($did, $token){


		$url = 'https://ssi.defispace.com/auth/jwt';
		$data = array('jwt' => $token);

		// use key 'http' even if you send the request to https://...
		$options = array(
			'http' => array(
				'header'  => "Content-Type: application/json\r\n",
				'method'  => 'POST',
				'content' => json_encode($data)
			)
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
		$res = json_decode($result);
		if ($result === FALSE) { 
			echo 'jwt error'; 
			wp_die();
		}  elseif ($did !== $res->did) {
			echo 'did not jwt error'; 
			wp_die();
		}
		return 'true';
	
	}

}

//$everscale_form = new everscale_form();