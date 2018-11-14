<?php 

  function register_my_menus() {
    register_nav_menus(
      array(
        'collections-menu' => __( 'Collections Menu' ),
        'elements-menu' => __( 'Elements Menu' )
      )
    );
  }
  add_action( 'init', 'register_my_menus' );
  
  add_theme_support( 'title-tag' );

?>