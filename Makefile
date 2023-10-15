build:
	docker build -t nasa_bot .
run:
	docker run -d -p 3050:3050 --name nasa_bot --rm nasa_bot