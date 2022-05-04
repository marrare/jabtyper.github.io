FROM nginx:stable
WORKDIR /usr/share/nginx/html
COPY . .
EXPOSE 80

## Instructions to execute
#  docker build -t jabtyper-image .
#  docker run --name jabtyper-container -p 80:80 -d jabtyper-image