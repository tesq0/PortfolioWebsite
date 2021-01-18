# PortfolioWebsite based on OctoberCMS

## Prerequisites

- GNU make
- docker
- docker-compose

## Configuration

```
cp ./docker/env-example ./docker/.env
cp ./config/.env-example ./config/.env
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

php artisan october:mirror public/

exit
```




