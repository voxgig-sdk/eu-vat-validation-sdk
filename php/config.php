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
            'now' => '`$FUNCTION`',
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
              'name' => 'checked_at',
              'title' => 'Checked At',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Timestamp of the validation check',
              'format' => 'date-time',
            ],
            [
              'name' => 'country_code',
              'title' => 'Country Code',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Two-letter ISO country code',
            ],
            [
              'name' => 'country_name',
              'title' => 'Country Name',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Full country name',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'title' => 'Source',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Source of validation',
            ],
            [
              'name' => 'valid',
              'title' => 'Valid',
              'type' => '`$BOOLEAN`',
              'req' => true,
              'short' => 'Whether the VAT number format is valid according to country-specific rules',
            ],
            [
              'name' => 'vat_number',
              'title' => 'Vat Number',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'VAT number without country code prefix',
            ],
            [
              'name' => 'vat_number_full',
              'title' => 'Vat Number Full',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Full VAT number including country code prefix',
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
                  'parts' => [
                    'vat',
                    'validate-format',
                    '{country}',
                    '{number}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'DE',
                      ],
                      [
                        'name' => 'number',
                        'orig' => 'number',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '190119364',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'number',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'vat' => [
          'fields' => [
            [
              'name' => 'checked_at',
              'title' => 'Checked At',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Timestamp of the validation check',
              'format' => 'date-time',
            ],
            [
              'name' => 'company_address',
              'title' => 'Company Address',
              'type' => '`$STRING`',
              'short' => 'Registered company address from VIES',
            ],
            [
              'name' => 'company_name',
              'title' => 'Company Name',
              'type' => '`$STRING`',
              'short' => 'Registered company name from VIES',
            ],
            [
              'name' => 'country_code',
              'title' => 'Country Code',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Two-letter ISO country code',
            ],
            [
              'name' => 'country_name',
              'title' => 'Country Name',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Full country name',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'title' => 'Source',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Source of validation data',
            ],
            [
              'name' => 'valid',
              'title' => 'Valid',
              'type' => '`$BOOLEAN`',
              'req' => true,
              'short' => 'Whether the VAT number is valid according to VIES',
            ],
            [
              'name' => 'vat_number',
              'title' => 'Vat Number',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'VAT number without country code prefix',
            ],
            [
              'name' => 'vat_number_full',
              'title' => 'Vat Number Full',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Full VAT number including country code prefix',
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
                  'parts' => [
                    'vat',
                    '{country}',
                    '{number}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'DE',
                      ],
                      [
                        'name' => 'number',
                        'orig' => 'number',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '190119364',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'number',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
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
