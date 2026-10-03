<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title inertia>{{ config('app.name', 'SkyBooking') }}</title>
    @vite(['resources/css/app.css', 'resources/js/main.ts'])
    @inertiaHead
  </head>
  <body class="antialiased">
    @inertia
  </body>
</html>
