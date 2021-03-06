<?php
/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app/main.php and [web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 */
if (getenv('REDIS_ENABLED') == 'true') {
    return [
        'modules' => [
        ],
        'bootstrap' => [],
        'components' => [
            'deprecator' => [
                'throwExceptions' => getenv('THROW_DEPRECIATION_EXCEPTIONS'),
            ],
            'redis' => [
                'class' => yii\redis\Connection::class,
                'hostname' => getenv('REDIS_HOSTNAME'),
                'port' => getenv('REDIS_PORT'),
                'database' => getenv('REDIS_DEFAULT_DB'),
            ],
            'cache' => [
                'class' => yii\redis\Cache::class,
                'redis' => [
                    'hostname' => getenv('REDIS_HOSTNAME'),
                    'port' => getenv('REDIS_PORT'),
                    'database' => getenv('REDIS_CRAFT_DB'),
                ],
            ],
            'session' => [
                'class' => \yii\redis\Session::class,
                'redis' => [
                    'hostname' => getenv('REDIS_HOSTNAME'),
                    'port' => getenv('REDIS_PORT'),
                    'database' => getenv('REDIS_CRAFT_DB'),
                ],
                'as session' => [
                    'class' => \craft\behaviors\SessionBehavior::class,
                ],
            ],
        ],
    ];
} else {
    return [
        'modules' => [
        ],
        'bootstrap' => [],
        'components' => [
            'deprecator' => [
                'throwExceptions' => getenv('THROW_DEPRECIATION_EXCEPTIONS'),
            ],
        ],
    ];
}