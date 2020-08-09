FROM php:7.4-fpm-alpine

# Installe essential packages
RUN apk --update add wget \
	git \
	nodejs \
	npm \
	openssh \
  build-base \
	nginx \
	python2 \
  libmcrypt-dev \
  oniguruma-dev \
  libxml2-dev \
  pcre-dev \
  zlib-dev \
  autoconf \
  cyrus-sasl-dev \
  libgsasl-dev \
  supervisor

RUN docker-php-ext-install mbstring pdo tokenizer xml pcntl
RUN pecl channel-update pecl.php.net && pecl install mcrypt

# ZIP
RUN	apk --update add libzip-dev && \
	docker-php-ext-install zip && \
	docker-php-ext-configure zip

# PSQL
RUN	apk --update add postgresql-dev \
	&& docker-php-ext-install pdo_pgsql

# GMP
RUN apk add --update --no-cache gmp gmp-dev \
	&& docker-php-ext-install gmp

# Install Redis Extension
RUN	printf "\n" | pecl install -o -f redis \
	&&  rm -rf /tmp/pear \
	&&  docker-php-ext-enable redis

# imagick
RUN apk add --update --no-cache g++ imagemagick imagemagick-dev libtool  \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && apk del g++ libtool

# BCMATH
RUN	docker-php-ext-install bcmath

# GD
RUN apk add --update --no-cache libpng-dev && \
	docker-php-ext-install gd


# Clean up
RUN rm /var/cache/apk/* \
    && mkdir -p /var/www

# BUILD APP
COPY --from=composer /usr/bin/composer /usr/bin/composer


ARG CACHE_DATE=2020-03-10

# COPY NGINX CONFIG
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/site.conf /etc/nginx/conf.d/default.conf

# COPY SUPERVISOR CONF

COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ARG UID=100
ARG GID=100

RUN addgroup --gid ${GID} app
RUN adduser --disabled-password --ingroup app --uid ${UID} app

# Make sure files/folders needed by the processes are accessable when they run under the nobody user
RUN mkdir -p /var/tmp/nginx /var/log/nginx /var/www/letsencrypt && \
	chown -R ${UID}.${GID} /var/www/html && \
	chown -R ${UID}.${GID} /var/www/letsencrypt && \
  chown -R ${UID}.${GID} /run && \
  chown -R ${UID}.${GID} /var/lib/nginx && \
  chown -R ${UID}.${GID} /var/tmp/nginx && \
	chown -R ${UID}.${GID} /var/log/nginx

USER ${UID}:${GID}

# Add application
WORKDIR /var/www/html

# Expose the port nginx is reachable on
EXPOSE 8080

# Let supervisord start nginx & php-fpm
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# Configure a healthcheck to validate that everything is up&running
# HEALTHCHECK --timeout=10s CMD curl --silent --fail http://127.0.0.1:8080/fpm-ping



