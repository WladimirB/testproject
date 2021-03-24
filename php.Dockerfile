FROM php:8.0.0-apache
RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY ./.htaccess /var/www/html/

RUN a2enmod rewrite
