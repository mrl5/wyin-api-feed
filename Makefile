SHELL=/bin/sh

.PHONY: all build run

all: help

build:
	docker build -t wyin-api-feed .

run:
	docker run -p 3000:3000 wyin-api-feed:latest

