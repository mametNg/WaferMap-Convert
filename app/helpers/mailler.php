<?php

/**
 * 
 */
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Controller\Controller;

class mailler extends Controller
{
	private $mail;

	function __construct()
	{
		$this->config();
		$this->mail = new PHPMailer(true);
	}

	public function primary_account($params=[])
	{
		// $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;        		//Enable verbose debug output
	    $this->mail->isSMTP();                                 		//Send using SMTP
	    $this->mail->Host       = 'usgmx6.sg.utacgroup.com';   		//Set the SMTP server to send through
	    // $this->mail->Host       = 'uidmx1.id.utacgroup.com';   		//Set the SMTP server to send through || Down
	    // $this->mail->SMTPAuth   = true;                        		//Enable SMTP authentication
	    // $this->mail->Username   = '';   							//SMTP username
	    // $this->mail->Password   = '';                				//SMTP password
	    // $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;	//Enable implicit TLS encryption
	    $this->mail->Port       = 25;                         		//TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS` || 465 => PHPMailer::ENCRYPTION_SMTPS
	    $this->mail->setFrom('uidit_system@utacgroup.com', (isset($params['sender']) ? $params['sender']: 'UID IT System'));
	}

	public function secondary_account($params=[])
	{
		// $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;        		//Enable verbose debug output
	    $this->mail->isSMTP();                                 		//Send using SMTP
	    $this->mail->Host       = 'mail.utac-indonesia.com';  		//Set the SMTP server to send through
	    $this->mail->SMTPAuth   = true;                        		//Enable SMTP authentication
	    $this->mail->Username   = 'e.training@utac-indonesia.com';  //SMTP username
	    $this->mail->Password   = '@Qtvuswr06';                		//SMTP password
	    $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 		//Enable implicit TLS encryption
	    $this->mail->Port       = 465;                         		//TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS` || 465 => PHPMailer::ENCRYPTION_SMTPS
	    $this->mail->setFrom('e.training@utac-indonesia.com', (isset($params['sender']) ? $params['sender']: 'E-Training'));
	}

	public function tree_account($params=[])
	{
		// $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;        		//Enable verbose debug output
	    $this->mail->isSMTP();                                 		//Send using SMTP
	    $this->mail->Host       = 'mail.itinventoryutac.com';  		//Set the SMTP server to send through
	    $this->mail->SMTPAuth   = true;                        		//Enable SMTP authentication
	    $this->mail->Username   = 'info@itinventoryutac.com';  		//SMTP username
	    $this->mail->Password   = '@Qtvuswr06';                		//SMTP password
	    $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 		//Enable implicit TLS encryption
	    $this->mail->Port       = 465;                         		//TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS` || 465 => PHPMailer::ENCRYPTION_SMTPS
	    $this->mail->setFrom('info@itinventoryutac.com', (isset($params['sender']) ? $params['sender']: 'IT Inventory'));
	}

	public function send($params=[])
	{
		if (!$params) return false;
		try {
		    $this->primary_account($params);
		    // $this->secondary_account($params);
		    // $this->tree_account($params);

		    if (isset($params['from'])) $this->mail->setFrom($params['from']);
		    if (isset($params['to'])) foreach ($params['to'] as $to) $this->mail->addAddress($to);
		    if (isset($params['cc'])) foreach ($params['cc'] as $cc) $this->mail->addCC($cc);
		    if (isset($params['file'])) foreach ($params['file'] as $file) $this->mail->addAttachment($file); 
		    if (isset($params['title'])) $this->mail->Subject = $params['title'];
		    if (isset($params['message'])) $this->mail->Body = $params['message'];

		    $this->mail->isHTML(true);
		    $this->mail->send();

		    $this->mail->clearAddresses();
		    $this->mail->clearAllRecipients();
		    $this->mail->clearAttachments();
		    $this->mail->clearBCCs();
		    $this->mail->clearCCs();
		    return $this->invalid(true, 200, "ok");
		} catch (Exception $e) {
			return $this->invalid(false, 403, "Failed to send alert!");
		}
	}
}