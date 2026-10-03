<?php

use App\Providers\AppServiceProvider;

return [
    AppServiceProvider::class,
    Spatie\Activitylog\ActivitylogServiceProvider::class,
    Barryvdh\DomPDF\ServiceProvider::class,
];
