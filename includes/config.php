<?php

/**
 * Used to store website configuration information.
 *
 * @var string or null
 */
function config($key = '')
{
    $config = [
        'name' => 'Simple PHP Website',
        'site_url' => '',
        'pretty_uri' => true,
        'nav_menu' => [
            'home' => 'STRONA GŁÓWNA',
            'service' => 'ŚWIADCZONE USŁUGI',
            'cities' => 'OBSŁUGIWANE MIASTA',
            'help' => 'Pomoc zdalna',
            'about' => 'O Nas',
            'contact' => 'Kontakt',
        ],
        'city_menu' => [
            'home' => 'STRONA GŁÓWNA',
            'service' => 'ŚWIADCZONE USŁUGI',
            'cities' => 'OBSŁUGIWANE MIASTA',
            'help' => 'Pomoc zdalna',
            'about' => 'O Nas',
            'contact' => 'Kontakt',
        ],
        'template_path' => 'layout',
        'content_path' => 'views',
        'version' => 'v3.1',
    ];

    return isset($config[$key]) ? $config[$key] : null;
}
