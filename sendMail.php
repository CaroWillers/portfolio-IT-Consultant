<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): // Allow preflighting to take place
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case ("POST"): // Send the email
        header("Access-Control-Allow-Origin: *");

        // Get the JSON payload from the input
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $email = $params->email; // Email address of the sender from the form
        $name = $params->name;
        $message = $params->message;

        // Your own email address (you receive the message)
        $recipient = 'contact@caro-willers.com';  
        
        // The subject of the email to you
        $subject = "Contact Form: Message from " . $name;

        // The message itself (can be HTML)
        $messageBody = "From: " . $name . " (" . $email . ")<br><br>" . $message;

        // Email headers
        $headers = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: " . $name . " <" . $email . ">";  // Set sender to user's email
        $headers[] = "Reply-To: " . $name . " <" . $email . ">";  // Reply-to is set to user's email

        // Send the email to you
        if(mail($recipient, $subject, $messageBody, implode("\r\n", $headers))) {
            echo 'Email sent successfully';
        } else {
            echo 'Email sending failed';
        }

        // Send confirmation email to the user
        $confirmationSubject = "Thank you for your message!";
        $confirmationMessage = "
          <p>Hello $name,</p>
          <p>Thank you for reaching out to me. I have received your message and will get back to you shortly.</p>
          <p>Here is a copy of your message:</p>
          <blockquote>$message</blockquote>
          <p>Best regards,<br>Caro Willers</p>
        ";
        $confirmationHeaders = array();
        $confirmationHeaders[] = 'MIME-Version: 1.0';
        $confirmationHeaders[] = 'Content-type: text/html; charset=utf-8';
        $confirmationHeaders[] = "From: noreply@caro-willers.com";  // Set this as no-reply
        $confirmationHeaders[] = "Reply-To: noreply@caro-willers.com";  // Prevent replies

        // Send the confirmation email to the user
        mail($email, $confirmationSubject, $confirmationMessage, implode("\r\n", $confirmationHeaders));

        break;

    default: // Reject any non-POST or OPTIONS requests
        header("Allow: POST", true, 405);
        exit;
}
