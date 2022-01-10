jQuery(document).ready( function($){

  $( "#log_in_btn" ).click(function(e) {

    e.preventDefault();

    $.ajax({
      url: everscale_login_var.ajaxurl,
      type: 'post',
      data: {
        action: 'everscale_form',
        nonce: everscale_login_var.nonce,
        did: $('#log_in_did').val(),
        token: $('#log_in_token').val(),
        name: $('#log_in_name').val(),
      },
      success: function(data){
        console.log(data)
      },
      error: function(error){
        console.log(error)
      }
    })

  });

});