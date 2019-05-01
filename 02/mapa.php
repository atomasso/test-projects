<?php 
// include database connection object
include "db.php"
?>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Mapa Hrvatske</title>
  <style>
    .container {
      margin: 60px auto;
      width: 80%;
    }
    .map {
      padding-top: 30px;
    }
  </style>
</head>

<body>

<?php

$date = "";
$db_date = "";

/**
 * Check date format
 * 
 * @param  {String}  $raw_date  string representing the date in format YYYYMMDD
 * @return {Boolean}            True if the date is real, false otherwise
 */
function checkMyDate($raw_date) {
  // check if the format is numeric
  if (is_numeric($raw_date)) { 
    // checki if there are 8 characteds in the string
    if (strlen($raw_date) == 8) {
	  // extract year, month, day
      $year = substr($raw_date, 0, 4);
      $month = substr($raw_date, 4, 2);
      $day = substr($raw_date, 6, 2);
	  
	  // If date is real, save it to global variables
      if (checkdate($month, $day, $year)) {
        global $date;
        global $db_date;
        
        $date = $day . '.' . $month . '.' . $year;        
        $db_date = $year . '-' . $month . '-' . $day;  
        return true;
      }      
    }
  }
  // If date is not real, return false
  return false;  
}

// Check if GET variable 'd' is sent
if (isset($_GET['d'])) {
  // if date format is not correct, send 404 error
  if (!checkMyDate($_GET['d'])) {
    //Send 404 response to client.
    http_response_code(404);
    //Include custom 404.php message
    include '404.php';
    //Kill the script.
    exit;  
  }
// If GET variable 'd' is not sent, set current date
} else {
    $date = date('d.m.Y');
}

?>

<div class="container">
  <h1>Mapa Hrvatske</h1>
  <h2>Datum: <?php echo $date; ?></h2>

  <div class="map">
  
    <svg baseprofile="tiny" fill="#7c7c7c" height="981" stroke="#FA9CA0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" version="1.2"    viewbox="0 0 1000 981" width="1000" xmlns="http://www.w3.org/2000/svg">
      <?php
	  
	  // select all rows from county table
      global $connection;
      $query = "SELECT * FROM county";
      $select_all_posts_query = mysqli_query($connection, $query);
	  // fetch each row with county data
      while ($row = mysqli_fetch_assoc($select_all_posts_query)) {
        global $db_date;      
        $county_id = $row['county_id'];
        $name = $row['name'];
        $svg_path = $row['svg_path'];  
		
        // fetch stats for given date and county from county_stats table
        $query_stats = "SELECT * FROM county_stats WHERE stats_date = '" . $db_date . "' AND county_id = " . $county_id;
        $select_county_stats_row = mysqli_query($connection, $query_stats);
        $stats_row = mysqli_fetch_assoc($select_county_stats_row);
		
		// store fetched colors
        $red = $stats_row['red'];
        $blue = $stats_row['blue'];
          
      ?>
	  
	   <!-- render county map with fetched colors -->
      <path fill="rgb(<?php echo $red; ?>, 0, <?php echo $blue; ?>)" d="<?php echo $svg_path; ?>" id="<?php echo $county_id; ?>" name="<?php echo $name; ?>"></path>
                 
      <?php } ?> 
       
      <circle cx="240.3" cy="371.7" id="0">
      </circle>
      <circle cx="313.3" cy="308" id="1">
      </circle>
      <circle cx="649.3" cy="859" id="2">
      </circle>
    </svg>
  </div>  
</div>

</body>
</html>