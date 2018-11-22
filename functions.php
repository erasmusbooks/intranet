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

  function sidebarMenu($slug, $className = false) {
    global $post;
    $parent = get_page_by_path($slug);
    $pages = get_pages(array( 'child_of' => $parent->ID));
    usort($pages, 'sortPageOrder');
    ?>
      <nav class="<?php if ($className) { echo $className; }; if ($post->post_parent == $parent->ID) { echo ' active'; } ?>">
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

function checkboxesShort () {
  ?>
  <div class="basic-form"><label>Checkboxes</label><ul class="checkboxes"><li><input name="checkbox1" id="labelOne3" type="checkbox"checked><label for="labelOne3">Label 1 <small>checked</small></label></li><li><input name="checkbox1" id="labelTwo3" type="checkbox"><label for="labelTwo3">Label 2</label></li><li><input name="checkbox1" id="labelThree3" type="checkbox"><label for="labelThree3">Label 3</label></li><li><input name="checkbox1" id="labelFour3" type="checkbox" disabled><label for="labelFour3">Label 4 <small>disabled</small></label></li><li><input name="checkbox1" id="labelFive3" type="checkbox" disabled checked><label for="labelFive3">Label 5 <small>checked &amp; disabled</small></label></li></ul><small class="help">Help messages where appropriate.</small><label>Inline checkboxes</label><ul class="checkboxes inline"><li><input id="labelOne4" type="checkbox" checked><label for="labelOne4">Label 1 <small>checked</small></label></li><li><input id="labelTwo4" type="checkbox"><label for="labelTwo4">Label 2</label></li><li><input id="labelThree4" type="checkbox"><label for="labelThree4">Label 3</label></li><li><input id="labelFour4" type="checkbox" disabled><label for="labelFour4">Label 4 <small>disabled</small></label></li></ul><small class="help">Help messages where appropriate.</small><label>Button checkboxes</label><ul class="checkboxes buttons"><li><input name="checkbox5" id="checkBoxlabelOne5" type="checkbox"><label class="button" for="checkBoxlabelOne5">Label 1</label></li><li><input name="checkbox5" id="checkBoxlabelTwo5" type="checkbox"><label class="button" for="checkBoxlabelTwo5">Label 2</label></li><li><input name="checkbox5" id="checkBoxlabelThree5" type="checkbox"><label class="button" for="checkBoxlabelThree5">Label 3</label></li><li><input name="checkbox5" id="checkBoxlabelFour5" type="checkbox" disabled><label class="button" for="checkBoxlabelFour5">Label 4</label></li></ul><ul class="checkboxes buttons"><li><input name="checkbox6" id="checkBoxlabelOne6" type="checkbox"><label class="button primary" for="checkBoxlabelOne6">1</label></li><li><input name="checkbox6" id="checkBoxlabelTwo6" type="checkbox"><label class="button primary" for="checkBoxlabelTwo6">2</label></li><li><input name="checkbox6" id="checkBoxlabelThree6" type="checkbox"><label class="button primary" for="checkBoxlabelThree6">3</label></li></ul><ul class="checkboxes buttons"><li><input name="checkbox7" id="checkBoxlabelOne7" type="checkbox"><label class="button secondary" for="checkBoxlabelOne7">1</label></li><li><input name="checkbox7" id="checkBoxlabelTwo7" type="checkbox"><label class="button secondary" for="checkBoxlabelTwo7">2</label></li><li><input name="checkbox7" id="checkBoxlabelThree7" type="checkbox"><label class="button secondary" for="checkBoxlabelThree7">3</label></li></ul><ul class="checkboxes buttons"><li><input name="checkbox8" id="checkBoxlabelOne8" type="checkbox"><label class="button positive" for="checkBoxlabelOne8">1</label></li><li><input name="checkbox8" id="checkBoxlabelTwo8" type="checkbox"><label class="button positive" for="checkBoxlabelTwo8">2</label></li><li><input name="checkbox8" id="checkBoxlabelThree8" type="checkbox"><label class="button positive" for="checkBoxlabelThree8">3</label></li></ul><ul class="checkboxes buttons"><li><input name="checkbox9" id="checkBoxlabelOne9" type="checkbox"><label class="button negative" for="checkBoxlabelOne9">1</label></li><li><input name="checkbox9" id="checkBoxlabelTwo9" type="checkbox"><label class="button negative" for="checkBoxlabelTwo9">2</label></li><li><input name="checkbox9" id="checkBoxlabelThree9" type="checkbox"><label class="button negative" for="checkBoxlabelThree9">3</label></li></ul><small class="help">Help messages where appropriate.</small></div>
  <?php
}
add_shortcode('checkboxes', 'checkboxesShort');

function radioButtonsShort () {
  ?>
    <div class="basic-form"><label>Radios</label><ul class="radios"><li><input name="radio1" id="labelOne1" type="radio"><label for="labelOne1">Label 1 <small>checked</small></label></li><li><input name="radio1" id="labelTwo1" type="radio"><label for="labelTwo1">Label 2</label></li><li><input name="radio1" id="labelThree1" type="radio"><label for="labelThree1">Label 3</label></li><li><input name="radio1" id="labelFour1" type="radio" disabled><label for="labelFour1">Label 4 <small>disabled</small></label></li></ul><small class="help">Help messages where appropriate.</small><label>Inline radios</label><ul class="radios inline"><li><input name="radio2" id="labelOne2" type="radio"><label for="labelOne2">Label 1 <small>checked</small></label></li><li><input name="radio2" id="labelTwo2" type="radio"><label for="labelTwo2">Label 2</label></li><li><input name="radio2" id="labelThree2" type="radio"><label for="labelThree2">Label 3</label></li><li><input name="radio2" id="labelFour2" type="radio" disabled><label for="labelFour2">Label 4 <small>disabled</small></label></li></ul><small class="help">Help messages where appropriate.</small><label>Button radios</label><ul class="radios buttons"><li><input name="radio5" id="labelOne5" type="radio"><label class="button" for="labelOne5">Label 1</label></li><li><input name="radio5" id="labelTwo5" type="radio"><label class="button" for="labelTwo5">Label 2</label></li><li><input name="radio5" id="labelThree5" type="radio"><label class="button" for="labelThree5">Label 3</label></li><li><input name="radio5" id="labelFour5" type="radio" disabled><label class="button" for="labelFour5">Label 4</label></li></ul><ul class="radios buttons"><li><input name="radio6" id="labelOne6" type="radio"><label class="button primary" for="labelOne6">1</label></li><li><input name="radio6" id="labelTwo6" type="radio"><label class="button primary" for="labelTwo6">2</label></li><li><input name="radio6" id="labelThree6" type="radio"><label class="button primary" for="labelThree6">3</label></li></ul><ul class="radios buttons"><li><input name="radio7" id="labelOne7" type="radio"><label class="button secondary" for="labelOne7">1</label></li><li><input name="radio7" id="labelTwo7" type="radio"><label class="button secondary" for="labelTwo7">2</label></li><li><input name="radio7" id="labelThree7" type="radio"><label class="button secondary" for="labelThree7">3</label></li></ul><ul class="radios buttons"><li><input name="radio8" id="labelOne8" type="radio"><label class="button positive" for="labelOne8">1</label></li><li><input name="radio8" id="labelTwo8" type="radio"><label class="button positive" for="labelTwo8">2</label></li><li><input name="radio8" id="labelThree8" type="radio"><label class="button positive" for="labelThree8">3</label></li></ul><ul class="radios buttons"><li><input name="radio9" id="labelOne9" type="radio"><label class="button negative" for="labelOne9">1</label></li><li><input name="radio9" id="labelTwo9" type="radio"><label class="button negative" for="labelTwo9">2</label></li><li><input name="radio9" id="labelThree9" type="radio"><label class="button negative" for="labelThree9">3</label></li></ul><small class="help">Help messages where appropriate.</small></div>
  <?php
}
add_shortcode('radiobuttons', 'radioButtonsShort');

?>