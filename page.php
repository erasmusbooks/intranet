
<?php 
  get_header(); 

  $children = get_pages(array( 'child_of' => get_the_ID()));
  usort($children, 'sortPageOrder');
?>

<main role="main">

  <article>
    <?php while (have_posts()) : the_post(); ?>

      <header><h3><?php the_title(); ?></h3></header>
     
      <?php if ($children) {
        ?>
          <section>
            <?php the_content(); ?>
          </section>
        <?php

        foreach ($children as $child) {
          ?>
            <section id="<?php echo $child->post_name; ?>">
              <header><h4><?php echo $child->post_title; ?></h4></header>

              <?php echo $child->post_content; ?>
            </section>
          <?php
        }
      } else {
          ?>
          <section id="introduction">
            <?php the_content(); ?>
          </section>
        <?php
      } ?>

    <?php endwhile; ?>
  </article>

</main>

<?php get_sidebar(); get_footer(); ?>