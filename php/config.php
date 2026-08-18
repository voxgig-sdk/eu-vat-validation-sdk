<?php
declare(strict_types=1);

// EuVatValidation SDK configuration

class EuVatValidationConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "EuVatValidation",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://kiprio.com/v1",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "validate_format" => [],
                    "vat" => [],
                ],
            ],
            "entity" => [
        'validate_format' => [
          'fields' => [
            [
              'name' => 'checked_at',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_code',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'valid',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'vat_number',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'vat_number_full',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'validate_format',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'DE',
                        'kind' => 'param',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '190119364',
                        'kind' => 'param',
                        'name' => 'number',
                        'orig' => 'number',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/vat/validate-format/{country}/{number}',
                  'parts' => [
                    'vat',
                    'validate-format',
                    '{country}',
                    '{number}',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'number',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'validate_format',
              ],
            ],
          ],
        ],
        'vat' => [
          'fields' => [
            [
              'name' => 'checked_at',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'company_address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'company_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_code',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'valid',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'vat_number',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'vat_number_full',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'vat',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'DE',
                        'kind' => 'param',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '190119364',
                        'kind' => 'param',
                        'name' => 'number',
                        'orig' => 'number',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/vat/{country}/{number}',
                  'parts' => [
                    'vat',
                    '{country}',
                    '{number}',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'number',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'vat',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return EuVatValidationFeatures::make_feature($name);
    }
}
