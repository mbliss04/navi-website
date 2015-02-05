<?php

    $db = 'discovernavicom.ipagemysql.com';
    $usr = 'lohtuslabs';
    $pass = '#Stoked123!';

    if(isset($_POST['email'])) {

        $email = $_POST['email'];
        $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

        function clean_string($string) {
            $bad = array("content-type","bcc:","to:","cc:","href");
            return str_replace($bad,"",$string);
        }

        if(preg_match($email_exp, $email)) {

            $link = mysqli_connect($db, $usr, $pass, 'emails');

            if (mysqli_connect_errno()) {
                echo "Failed to connect to MySQL: " . mysqli_connect_error();
                die();
            }
            mysqli_query($link,"INSERT INTO users (email) 
                                VALUES ('$email')");
            mysqli_close($link);

            $email_subject = "Navi - Email List";
            $email_from = "info@discovernavi.com";
            $email_message = "Thank you for your interest in Navi!\n We will contact you when the beta launches :D\n";

            $headers =  'From: '.$email_from."\r\n".
                        'Reply-To: '.$email_from."\r\n" .
                        'X-Mailer: PHP/' . phpversion();

            mail($email, $email_subject, $email_message, $headers);
        }
    } else {
        echo 'Post request invalid.';
    }

?>