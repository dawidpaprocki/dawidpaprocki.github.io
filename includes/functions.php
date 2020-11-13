<?php

/**
 * Displays site name.
 */
function site_name()
{
    echo config('name');
}

/**
 * Displays site url provided in config.
 */
function site_url()
{
    echo config('site_url');
}

/**
 * Displays site version.
 */
function site_version()
{
    echo config('version');
}
/**
 * Website navigation.
 */
function nav_menu($menuName)
{
    $nav_menu = '';
    $nav_items = config($menuName);
    
    foreach ($nav_items as $uri => $name) {
        $query_string = str_replace('page=', '', $_SERVER['QUERY_STRING'] ?? '');
        $class = $query_string == $uri ? ' active' : '';
//        if($uri === "help"){
//            https://get.teamviewer.com/wdtvy83
//            $url = config('site_url') . '/' . (config('pretty_uri') || $uri == '' ? '' : '?page=') . $uri;
//            // Add nav item to list. See the dot in front of equal sign (.=)
//            $nav_menu .= '<li><a href="https://get.teamviewer.com/wdtvy83" title="' . $name . '" class="item ' . $class . '">' . $name . '</a>' .
//                '</li>';
//        }else {
            $url = config('site_url') . '/' . (config('pretty_uri') || $uri == '' ? '' : '?page=') . $uri;
            // Add nav item to list. See the dot in front of equal sign (.=)
            $nav_menu .= '<li><a href="' . $url . '" title="' . $name . '" class="item ' . $class . '">' . $name . '</a>' .
                '</li>';
//        }
    }

    echo trim($nav_menu);
}
function custom_link($name, $uri){
    $url = config('site_url') . '/' . (config('pretty_uri') || $uri == '' ? '' : '?page=') . $uri;

    // Add nav item to list. See the dot in front of equal sign (.=)
    $link = '<a href="' . $url .'">' . $name . '</a>';
    echo trim($link);
}
/**
 * Displays page title. It takes the data from
 * URL, it replaces the hyphens with spaces and
 * it capitalizes the words.
 */
function page_title()
{
    $page = isset($_GET['page']) ? htmlspecialchars($_GET['page']) : 'Home';

    echo ucwords(str_replace('-', ' ', $page));
}

/**
 * Displays page content. It takes the data from
 * the static pages inside the pages/ directory.
 * When not found, display the 404 error page.
 */
function page_content()
{
    $page = isset($_GET['page']) ? $_GET['page'] : 'home';
    $path = getcwd() . '/' . config('content_path') . '/' . $page . '.phtml';

    if (! file_exists($path)) {
        $path = getcwd() . '/' . config('content_path') . '/404.phtml';
    }
    ob_start();
    include($path);
    $output = ob_get_contents();
    ob_end_clean();
    echo $output;
}

/**
 * Starts everything and displays the template.
 */
function init()
{
    require config('template_path') . '/layout.phtml';
}
