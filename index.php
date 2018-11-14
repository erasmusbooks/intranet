<?php get_header(); ?>

<main role="main">

  <article>
    <?php while (have_posts()) : the_post(); ?>

      <h3><?php the_title(); ?></h3>
      
      <?php the_content(); ?>

    <?php endwhile; ?>
  </article>

</main>

<?php get_sidebar(); get_footer(); ?>