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
    register_nav_menu('tools-menu',__( 'Tools Menu' ));
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
  <?php } 

  // CURRENCY CONVERSION

  function update_currencies() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'currency';

    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {

      $sql = "CREATE TABLE $table_name (
        curr varchar(3),
        rate float(10,5),
        updated date,
        UNIQUE KEY curr (curr)
      );";

      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
      dbDelta($sql);
    }

    $result = $wpdb->get_row("SELECT * FROM {$wpdb->prefix}currency");
    
    if (empty($result) || $result->updated < date('Y-m-d')) {

      $json = file_get_contents('http://data.fixer.io/api/latest?access_key=4593a19afef23e4177d37744660fd8f9');
      $currencies = json_decode($json);
      $when = $currencies->date;

      foreach ($currencies->rates as $curr => $rate) {

          $sql = "INSERT INTO {$wpdb->prefix}currency (curr, rate, updated) VALUES (%s, %f, STR_TO_DATE(%s, '%%Y-%%m-%%d')) ON DUPLICATE KEY UPDATE rate=%f, updated=STR_TO_DATE(%s, '%%Y-%%m-%%d')";
          $sql = $wpdb->prepare($sql, array($curr, $rate, $when, $rate, $when));
          $wpdb->query($sql);
      }
    }
  }
  add_action('init', 'update_currencies');

  function fetch_currency() {
    global $wpdb;
    $currencies = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}currency");
    
    $payload = new stdClass;
    $payload->date = '';
    $payload->rates = new stdClass;
    foreach ($currencies as $c) {
      $payload->rates->{$c->curr} = $c->rate;
      $payload->date = $c->updated;
    }
    return $payload;
  }
  
  add_action('rest_api_init', function() {
    register_rest_route('curr', '/newest', array(
      'methods' => 'GET',
      'callback' => 'fetch_currency'
    ));
  })

?>