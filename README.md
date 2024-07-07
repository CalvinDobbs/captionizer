# Captionizer

This is an AI image captioning app using LLaVA. Users can upload one or more images. These images can be combined with a prompt used to generate captions for each image. The result can then be viewed in the browser.

Try it out: [captionizer.calvindobbs.com](https://captionizer.calvindobbs.com)

## Usage

Click "Select Images" and select one or more images to be captioned:
![Basic captions being generated for images](/README/basic-captioning.png)

Optionally an extra prompt can be used to fine tune output for specific use cases:
![An extra prompt being used to generate alt tags style captions in French](/README/advanced-captioning.png)

## Setup Instructions

To get started you'll want to install Docker Desktop [docs.docker.com/engine/install](https://docs.docker.com/engine/install/)

If you're on Linux you may also need to install the Docker Compose plugin [docs.docker.com/compose/install](https://docs.docker.com/compose/install/)

Next, make a Replicate account and grab your API token [replicate.com/account](http://replicate.com/account).

Create a file called `.env` in the root project directory and set the following environment variables:

```console
export REPLICATE_API_TOKEN=... (required)
export PORT=... (default 3000)
```

Then open the project directory in your terminal and run the app:

```console
docker compose up
```
