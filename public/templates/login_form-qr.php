<h2> Scan the QR code using a mobile device to log in</h2>
<div class="qrcode alignfull" style="line-height: initial; font-size: 0.6rem; line-height: 1.2; letter-spacing: unset;"><?php

$codeContents = $_SERVER['HTTP_HOST'] . '/wp-content/plugins/login-ssi-qr-code-everscale/endpoint.php?token='. 
$attributes['token'] .
'&did=' . $attributes['did'];

;

// generating
$text = QRcode::text($codeContents);
 $raw = join("<br/>", $text);

$raw = strtr($raw, array(
    '0' => '<span style="color:white; font-size: 0.6rem; ">&#9608;&#9608;</span>',
    '1' => '&#9608;&#9608;'
));

// displaying

echo $raw;
?>
</div>

<input id="token" class="hide" value="<?=$attributes['token']?>" />