FROM httpd:2.4

RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/LoadModule mod_autoindex/s/^#//g' /usr/local/apache2/conf/httpd.conf

RUN rm -rf /usr/local/apache2/htdocs
RUN mkdir /usr/local/apache2/htdocs

ARG USERNAME='vscode'
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
  && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
  && apt-get update \
  && apt-get install -y sudo \
  && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME

RUN usermod -a -G www-data vscode

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends git

RUN mkdir /var/www && chown -R vscode:vscode /var/www 
RUN chown -R www-data:www-data /usr/local/apache2/htdocs
