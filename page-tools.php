
<?php 
  /* Template Name: Tools Template */

  get_header(); 

  $slug = get_post_field( 'post_name', get_the_ID() ); 

?>

<main role="main" id="tools">

  <?php wp_nav_menu( array( 
    'theme_location' => 'tools-menu',
    'container' => 'nav',
    'container_class' => 'knobs' 
  ) ); ?>

  <article id="<?php echo $slug; ?>">

  </article>



</main>

<?php get_footer(); ?>