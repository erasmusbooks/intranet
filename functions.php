<?php 
  add_theme_support( 'title-tag' );

  function remove_admin_login_header() {
      remove_action('wp_head', '_admin_bar_bump_cb');
  }
  add_action('get_header', 'remove_admin_login_header');

  function reset_permalinks() {
    global $wp_rewrite;
    $wp_rewrite->set_permalink_structure( '/%postname%/' );
  }
  add_action( 'init', 'reset_permalinks' );

  function register_my_menu() {
    register_nav_menu('header-menu',__( 'Header Menu' ));
  }
  add_action( 'init', 'register_my_menu' );

  function deregister_stuff() {
    wp_deregister_style( 'wp-block-library' );
    wp_deregister_style( 'wp-block-library-theme' );
  }
  add_action('wp_enqueue_scripts', 'deregister_stuff', 100);


  // SIDEBAR MENU

  function sortPageOrder($a, $b) {
    if($a->menu_order == $b->menu_order){ return 0 ; }
    return ($a->menu_order < $b->menu_order) ? -1 : 1;
  }

  function navPanel($slug, $className = false) {
    global $post;
    $parent = get_page_by_path($slug);
    $pages = get_pages(array( 'child_of' => $parent->ID));
    usort($pages, 'sortPageOrder');
    ?>
      <nav class="nav-panel <?php if ($className) { echo $className; }; ?>">
        <h6><?php echo $parent->post_title; ?></h6>
        <ul>
          <?php
            foreach ($pages as $page) :
              if ($page->post_parent == $parent->ID) : 
                $children = array();
                foreach ($pages as $check) {
                  if ($check->post_parent == $page->ID) {
                    array_push($children, $check);
                  }
                }

                if ($children) {
                  usort($children, 'sortPageOrder');
                  ?>
                  <li class="subnav <?php if ($post->ID == $page->ID) { echo 'active'; } ?>">
                    <input type="checkbox" id="<?php echo $page->ID; ?>" <?php 
                    if ($post->ID == $page->ID) { echo 'checked'; } ?>>
                    <label for="<?php echo $page->ID; ?>">
                      <?php echo $page->post_title; ?>
                      <svg class="icon">
                        <use xlink:href="<?php echo get_template_directory_uri(); ?>/icons/icons.svg#chevron-down"></use>
                      </svg>
                    </label>
                    <ul>
                      <?php foreach ($children as $child) { ?>
                      <li>
                        <a href="<?php echo get_permalink($page->ID) . '#' . $child->post_name; ?>"><?php echo $child->post_title; ?></a>
                      </li>
                      <?php } ?>
                    </ul>
                  </li>
                  <?php
                } else {
                  ?>
                    <li class="<?php if ($post->ID == $page->ID) { echo 'active'; } ?>">
                      <a href="<?php echo get_permalink($page->ID); ?>"><?php echo $page->post_title; ?></a>
                    </li>
                  <?php
                }
              ?>
                
             
          <?php endif; endforeach; ?>
        </ul>
      </nav>
<?php } ?>