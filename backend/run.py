import os
import boto3
import json
import requests

from requests_aws4auth import AWS4Auth
from flask import Flask, request, g, Response
from flask_cors import CORS, cross_origin


def create_app():
    app = Flask(__name__)
    config_dir = os.path.dirname(os.path.abspath(__file__))
    config_file = os.path.join(config_dir, "config.json")

    with open(config_file, "r") as f:
        config = json.load(f)
    cors = CORS(app, resources={r"/*": {"origins": config["whitelisted_origins"]}})

    app.config.update(config)

    return app


app = create_app()

def proxy():
    config = app.config
    base_url = config['elasticsearch_url']
    if base_url[-1] != '/':
        base_url += '/'

    region = config["aws"]["region"]
    service = config["aws"]["service"]

    if 'asg' in os.getcwd():
        credentials = boto3.Session(profile_name=config["aws"]["user_profile"])
        credentials = credentials.get_credentials()

        aws_auth = AWS4Auth(credentials.access_key, credentials.secret_key,
                            region, service)
    else:
        access_key = os.getenv('AWS_ACCESS_KEY_ID')
        secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
        token = os.getenv('AWS_SESSION_TOKEN')
        print("Access", access_key, secret_key, token)
        aws_auth = AWS4Auth(access_key, secret_key,
                            region, service, session_token=token)

    headers = {key: value for (key, value) in request.headers if key != 'Host'}
    headers["content-type"] = "application/json"
    url = request.url.replace(request.url_root, base_url)

    resp = requests.request(
            method=request.method,
            url=url,
            headers=headers,
            data=request.get_data(),
            cookies=request.cookies,
            auth=aws_auth,
            allow_redirects=False
        )

    excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in resp.raw.headers.items()
            if name.lower() not in excluded_headers]

    response = Response(resp.content, resp.status_code, headers)
    return response

for index in app.config["indices"]:
    app.route('/' + index + '/_msearch', methods=["GET", "POST"])(proxy)