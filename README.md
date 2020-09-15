# ReactJS

MIT License


### API Postman Collection
* https://documenter.getpostman.com/view/2025350/RWaEzAiG


heroku apps:create stage-react-frontend
heroku apps:rename dev-react-frontend
heroku git:remote -a dev-react-frontend
git remote rename heroku heroku-staging

heroku plugins:install heroku-builds
heroku builds -a YOUR_APP_NAME
heroku builds:cancel BUILD_ID -a YOUR_APP_NAME

heroku git:clone -a stark-river-10341

### Heroku
* sudo snap install --classic heroku

* heroku login

* heroku open


#### CI
* https://devcenter.heroku.com/articles/heroku-ci

#### CD
* https://devcenter.heroku.com/articles/pipelines

#### Config
heroku config
heroku config:get KEY
heroku config:set KEY=VALUE
heroku config:unset KEY

git push heroku master
heroku ps
heroku logs

heroku local -e .env -p 5000



docker build ./
docker-compose up --build

docker-compose up -d
docker-compose logs
docker ps

heroku container:push web

docker exec <container> bash
docker-compose exec <container> bash 
heroku run bash
docker run -i --env-file .env -p 5000 <image>





heroku init
heroku create

heroku addons:create mongolab
git push heroku master
heroku open

npm i --save preact-compat
npm i --save preact



docker-compose run web

docker-compose up -d 

docker-compose down

docker-compose build


heroku login
heroku container:login
heroku create
heroku container:push web
heroku container:release web
heroku open

Get IN Touch 
------------
>Web : https://sarvesh18.github.io <br>
>Email : sarvesh.singh18@hotmail.com <br>
>Github : https://www.github.com/sarvesh18 <br>
>LinkedIn : https://www.linkedin.com/in/sarvesh18 <br>
>StackOverflow : https://stackoverflow.com/users/5485623/sarvesh-18 <br>
><hr>
