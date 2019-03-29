
<?php 
  /* Template Name: Dashboard Template */

  get_header(); 

  $col1 = [];
  $col2 = [];
  $col3 = [];
?>

<main role="main" id="dashboard">
  
  <?php 

    while (have_posts()) : the_post(); 

      if ( has_blocks( $post->post_content ) ) {
          $blocks = parse_blocks( $post->post_content );

          foreach ($blocks as $block) {
              
            if (strpos($block['attrs']['className'], 'col1') !== false) {
              array_push($col1, $block['innerHTML']);
            }
              
            if (strpos($block['attrs']['className'], 'col2') !== false) {
              array_push($col2, $block['innerHTML']);
            }
              
            if (strpos($block['attrs']['className'], 'col3') !== false) {
              array_push($col3, $block['innerHTML']);
            }
          }
      }

    endwhile; 

  ?>

  <div class="column-1">
    <?php foreach ($col1 as $c1) { echo $c1; } ?>
  </div>

  <div class="column-2">

    <time datetime="<?php echo date('c'); ?>">
      <div class="weekday"><?php echo date('l'); ?></div>
      <div class="number"><?php echo date('j'); ?></div>
      <div class="month-year"><?php echo date('F Y'); ?></div>
      <div class="week">Week <?php echo date('W'); ?></div>
    </time>

    <?php wp_nav_menu( array( 
      'theme_location' => 'tools-menu',
      'container' => 'nav',
      'container_class' => 'knobs' 
    ) ); ?>
    
    <?php foreach ($col2 as $c2) { echo $c2; } ?>
  </div>

  <div class="column-3">

    <?php foreach ($col3 as $c3) { echo $c3; } ?>

  </div>

</main>

<?php get_footer(); ?>