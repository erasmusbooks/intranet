
<?php 
  /* Template Name: Documentation Template */

  get_header(); 

  $isDocs = get_post_field('post_name', get_post()) != 'documentation';
  $children = get_pages(array( 'child_of' => get_the_ID()));
  usort($children, 'sortPageOrder');
?>

<main role="main" class="sidebar-right">

  <article>
    <?php while (have_posts()) : the_post(); ?>

      <header>
        <h2>
          <?php the_title(); ?><?php edit_post_link('Edit', '<small> ', '</small>'); ?>
        </h2>
      </header>

      <section><?php the_content(); ?></section>
     
      <?php if ($children && $isDocs) {

        foreach ($children as $child) {
          ?>
            <section id="<?php echo $child->post_name; ?>">
              <header>
                <h3>
                  <?php echo $child->post_title; ?><?php edit_post_link('Edit', '<small> ', '</small>', $child->ID); ?>
                </h3>
              </header>

              <?php echo $child->post_content; ?>
            </section>
          <?php
        }
      }
      ?>

    <?php endwhile; ?>
  </article>

  <?php get_sidebar('documentation'); ?>

</main>

<?php get_footer(); ?>