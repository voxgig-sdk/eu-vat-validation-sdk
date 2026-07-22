<?php
declare(strict_types=1);

// EuVatValidation SDK base feature

class EuVatValidationBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(EuVatValidationContext $ctx, array $options): void {}
    public function PostConstruct(EuVatValidationContext $ctx): void {}
    public function PostConstructEntity(EuVatValidationContext $ctx): void {}
    public function SetData(EuVatValidationContext $ctx): void {}
    public function GetData(EuVatValidationContext $ctx): void {}
    public function GetMatch(EuVatValidationContext $ctx): void {}
    public function SetMatch(EuVatValidationContext $ctx): void {}
    public function PrePoint(EuVatValidationContext $ctx): void {}
    public function PreSpec(EuVatValidationContext $ctx): void {}
    public function PreRequest(EuVatValidationContext $ctx): void {}
    public function PreResponse(EuVatValidationContext $ctx): void {}
    public function PreResult(EuVatValidationContext $ctx): void {}
    public function PreDone(EuVatValidationContext $ctx): void {}
    public function PreUnexpected(EuVatValidationContext $ctx): void {}
}
