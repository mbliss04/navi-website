<?php

    $db = 'discovernavicom.ipagemysql.com';
    $usr = 'lohtuslabs';
    $pass = '#Stoked123!';

    $link = mysqli_connect($db, $usr, $pass, 'emails'); 

    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        die();
    }
         
    $sql = 'SELECT COUNT( * ) AS `Rows` , `email` FROM `users` GROUP BY `email` ORDER BY `email` LIMIT 0, 30 ';
    $result = mysql_query($sql);
    $num = mysql_numrows($result);
    mysqli_close($link);

    echo "<b>
    <center>Database Output</center>
    </b>
    <br>
    <br>";
    $i = 0;
    while ($i < $num) {
        $email = mysql_result($result, $i, "email");
        echo "<b>
        $email</b>
        <br>";$i++;}
?>