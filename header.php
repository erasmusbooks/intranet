<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  
  <link rel="icon" sizes="36x36" type="image/png" href="<?php echo get_template_directory_uri(); ?>/images/humphrey-icon.png">

  <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:100,100i,300,300i,400,400i,700,700i|IBM+Plex+Sans:100,100i,300,300i,400,400i,700,700i|IBM+Plex+Serif:100,100i,300,300i,400,400i,700,700i" rel="stylesheet">   
  <link href="<?php echo get_template_directory_uri(); ?>/style.css" rel="stylesheet">

  <script src="<?php echo get_template_directory_uri(); ?>/scripts/dialog-polyfill.js"></script>

  <?php wp_head(); ?>

</head>
<body>

  <header class="navbar">
    <a href="<?php echo home_url(); ?>" id="brand" title="<?php echo bloginfo('name') ?> - <?php echo bloginfo('description') ?>">
        <!-- <img src="<?php echo get_template_directory_uri(); ?>/images/humphrey.png"> -->
        <svg>
          <use xlink:href="<?php echo get_template_directory_uri(); ?>/icons/icons.svg#library"></use>
        </svg>
    </a>

    <?php wp_nav_menu( array( 
      'theme_location' => 'header-menu',
      'container' => 'nav',
      'container_class' => 'knobs transparent' 
    ) ); ?>

    <div class="spacer"></div>
    
    <form role="search" method="get" class="group" action="<?php echo home_url( '/' ); ?>" class="group">
      <svg class="icon">
        <use xlink:href="<?php echo get_template_directory_uri(); ?>/icons/icons.svg#search"></use>
      </svg>
      <input id="s" name="s" class="prepend-icon" type="search" placeholder="Search..." value="<?php if (htmlspecialchars($_GET["s"])) echo htmlspecialchars($_GET["s"]); ?>">
<!--       <button type="submit" class="primary">
        <svg class="icon">
          <use xlink:href="<?php echo get_template_directory_uri(); ?>/icons/icons.svg#search"></use>
        </svg>
      </button>   -->      
    </form>

    <nav>
      <ul>
        <?php if (is_user_logged_in()) { ?>
          <li>
            <a href="<?php echo admin_url(); ?>">Admin</a>              
          </li>
          <li>
            <?php wp_loginout($_SERVER['REQUEST_URI']); ?>              
          </li>
        <?php } else { ?>
          <li >
            <?php wp_loginout($_SERVER['REQUEST_URI']); ?>         
          </li>
        <?php } ?>
      </ul>
    </nav>

  </header>