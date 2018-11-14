<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  
  <link rel="icon" sizes="192x192" type="image/png" href="<?php echo get_template_directory_uri(); ?>/images/nausikaa.png">

  <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:100,100i,300,300i,400,400i,700,700i|IBM+Plex+Sans:100,100i,300,300i,400,400i,700,700i|IBM+Plex+Serif:100,100i,300,300i,400,400i,700,700i" rel="stylesheet">   
  <link href="<?php echo get_template_directory_uri(); ?>/style.css" rel="stylesheet">

  <?php wp_head(); ?>
</head>
<body>

  <div class="wrapper">

    <header class="navbar">
      <a href="<?php echo home_url(); ?>" id="brand" title="<?php echo bloginfo('name') ?> - <?php echo bloginfo('description') ?>">
        <img src="<?php echo get_template_directory_uri(); ?>/images/nausikaa.png">
      </a>

      <div class="spacer"></div>
      
      <div class="group">
        <svg class="icon">
          <use xlink:href="<?php echo get_template_directory_uri(); ?>/icons/icons.svg#search"></use>
        </svg>
        <input id="prepend-icon" class="prepend-icon" type="text">        
      </div>

      <button class="primary">
        </span>
        Login        
      </button>

    </header>