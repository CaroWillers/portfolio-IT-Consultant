<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case ("POST"): // Send the email;
        header("Access-Control-Allow-Origin: *");

        // Get the JSON payload from the input
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $email = $params->email;
        $name = $params->name;
        $message = $params->message;

        $recipient = 'contact@caro-willers.com';  
        $subject = "Contact From <$email>";
        $message = "From: " . $name . "<br>" . $message;

        $headers = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: noreply@caro-willers.com";
        $headers[] = "Reply-To: " . $name . " <" . $email . ">";

        // Send the email
        if(mail($recipient, $subject, $message, implode("\r\n", $headers))) {
            echo 'Email sent successfully';
        } else {
            echo 'Email sending failed';
        }
        break;

    default: // Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
