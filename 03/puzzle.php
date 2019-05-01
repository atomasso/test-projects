<?php

/*
 * Returns list of available puzzle images
 **/
function getPuzzleImages()
{
	return [[
			'title' => 'Pokemon',
			'image' => 'pikachu.jpg'
		],[
			'title' => 'Flowers',
			'image' => 'flowers.jpg'
		],[
			'title' => 'Solving the puzzle you are, yes?',
			'image' => 'yoda.jpg'
		],[
			'title' => 'Bang!',
			'image' => 'bebop.jpg'
		],[
			'title' => 'Doggy style',
			'image' => 'dog-and-cat.jpg'
		]
	];
}
?>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <title>Puzzle</title>
  <style>
   .container {
     margin: 60px auto;
     width: 800px;
		 text-align: center;
   }

	 select {
		 width: 500px;
		 height: 30px;
		 margin: 0;
		 padding: 0;
	 }

	 button {
		 width: 300px;
		 height: 30px;
		 margin-left: -33px;
	 }

   .map {
     padding-top: 30px;
   }

	 .flex-container {
		 display: flex;
	 }
  </style>
</head>

<!-- Render puzzle board on page load -->
<body onload="draw()">

<div class="container">
  <div class="row">
    <div class="col-sm-8">
	<!-- Dropdown selector for background image -->
    <select id="backgroundSelector" onchange="selectBackground()">
    <?php
	  // get all images
      $images = getPuzzleImages();
		// list images' titles for selection in dropdown
	    foreach($images as $imageEl) {
	      echo "<option value='" . $imageEl['image'] . "'>" . $imageEl['title'] . "</option>";
	    }
    ?>  		  
    </select>
    </div>	
    <div class="col-sm-4">
	  <!-- Click on the randomly shuffles the puzzle board -->
      <button onclick="shuffle()">Shuffle</button>
    </div>
  </div>
  
  <!-- Include JS file with main logic -->
  <canvas id="canvas" width="800" height="800"></canvas>
  <!-- Background source image will be not displayed -->
  <div style="display:none;">
    <!-- Background image in original size - selection via dropdown -->
    <img id="source" src="img/pikachu.jpg" width="1024" height="1024">
  </div>
</div>

<!-- Include JS file with main logic -->
<script src="puzzle.js"></script>

</body>
</html>