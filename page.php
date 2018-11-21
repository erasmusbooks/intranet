
<?php get_header(); ?>

<main role="main">

  <article>
    <?php while (have_posts()) : the_post(); ?>

      <header>
        <h2>
          <?php the_title(); ?><?php edit_post_link('Edit', '<small> ', '</small>'); ?>
        </h2>
      </header>
     
      <section><?php the_content(); ?></section>

    <?php endwhile; ?>
  </article>

</main>

<?php get_footer(); ?>