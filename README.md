# Allegro Buddy

## Prerequisites

- GNU make
- docker
- docker-compose

## Configuration

```
cp ./docker/env-example ./docker/.env
cp ./src/.env-example ./src/.env
```
And fill out the missing variables these files

## Running

`make up`

### After First time run

```
make shell

composer install

# generate encryption key 
php artisan key:generate

# run database migrations
php artisan october:up

exit
```




