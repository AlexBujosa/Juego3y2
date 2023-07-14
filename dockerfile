FROM nginx:stable

WORKDIR /usr/share/nginx/html

COPY . .

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
