<?php 

  function sortMenuOrder($a, $b) {
    if($a->menu_order == $b->menu_order){ return 0 ; }
    return ($a->menu_order < $b->menu_order) ? -1 : 1;
  }

  function sidebarMenu($slug) {
    global $post;
    $parent = get_page_by_path($slug);
    $pages = get_pages(array( 'child_of' => $parent->ID));
    usort($pages, 'sortMenuOrder');
    ?>
      <ul>
        <h6><?php echo $parent->post_title; ?></h6>
        <?php
          foreach ($pages as $page) :
            if ($page->post_parent == $parent->ID) : 
              $children = array();
              foreach ($pages as $check) {
                if ($check->post_parent == $page->ID) {
                  array_push($children, $check);
                }
              }
            ?>
              
            <li class="<?php 
              if ($children) { echo ' subnav'; } 
              if ($post->post_parent == $page->ID) { echo ' open'; } 
            ?>">
              <a href="<?php echo $page->guid; ?>"><?php echo $page->post_title; ?></a>
              
              <?php 
                if ($children) : 
                usort($children, 'sortMenuOrder'); ?>
                <ul >
                  <?php foreach ($children as $child) { ?>
                  <li class="<?php if ($child->ID == $post->ID) { echo 'active'; } ?>">
                    <a href="<?php echo $child->guid; ?>"><?php echo $child->post_title; ?></a>
                  </li>
                  <?php } ?>
                </ul>
              <?php endif; ?>

            </li>
        <?php endif; endforeach; ?>
      </ul>
<?php } ?>


<aside class="sidebar">
  <nav aria-labelledby="primary-navigation">
    <?php sidebarMenu('elements'); ?>

  </nav>

  <nav aria-labelledby="primary-navigation">
    <?php sidebarMenu('collections'); ?>
  </nav>
</aside>