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
                "slug" => "eu-vat-validation",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://kiprio.com/v1",
                "auth" => [
                    "prefix" => "",
                    "name" => "X-API-Key",
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
              'format' => 'date-time',
              'name' => 'checked_at',
              'req' => true,
              'short' => 'Timestamp of the validation check',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_code',
              'req' => true,
              'short' => 'Two-letter ISO country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_name',
              'req' => true,
              'short' => 'Full country name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'req' => true,
              'short' => 'Source of validation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'valid',
              'req' => true,
              'short' => 'Whether the VAT number format is valid according to country-specific rules',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'vat_number',
              'req' => true,
              'short' => 'VAT number without country code prefix',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'vat_number_full',
              'req' => true,
              'short' => 'Full VAT number including country code prefix',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'from' => [
              'country' => 'country_name',
            ],
            'name' => 'id',
            'parts' => [
              'country',
              'number',
            ],
            'sep' => '/',
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
                  'segments' => [
                    [
                      'lit' => 'vat',
                    ],
                    [
                      'lit' => 'validate-format',
                    ],
                    [
                      'var' => 'country',
                    ],
                    [
                      'var' => 'number',
                    ],
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
                  'parts' => [
                    'vat',
                    'validate-format',
                    '{country}',
                    '{number}',
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
              'format' => 'date-time',
              'name' => 'checked_at',
              'req' => true,
              'short' => 'Timestamp of the validation check',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'company_address',
              'short' => 'Registered company address from VIES',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'company_name',
              'short' => 'Registered company name from VIES',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_code',
              'req' => true,
              'short' => 'Two-letter ISO country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_name',
              'req' => true,
              'short' => 'Full country name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'req' => true,
              'short' => 'Source of validation data',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'valid',
              'req' => true,
              'short' => 'Whether the VAT number is valid according to VIES',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'vat_number',
              'req' => true,
              'short' => 'VAT number without country code prefix',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'vat_number_full',
              'req' => true,
              'short' => 'Full VAT number including country code prefix',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'from' => [
              'country' => 'country_name',
            ],
            'name' => 'id',
            'parts' => [
              'country',
              'number',
            ],
            'sep' => '/',
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
                  'segments' => [
                    [
                      'lit' => 'vat',
                    ],
                    [
                      'var' => 'country',
                    ],
                    [
                      'var' => 'number',
                    ],
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
                  'parts' => [
                    'vat',
                    '{country}',
                    '{number}',
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
