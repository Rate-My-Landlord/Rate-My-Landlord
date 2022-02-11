from flask import Flask
from config import config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

db = SQLAlchemy()

def create_app(config_name):
    # print(config[config_name])
    app = Flask(__name__)
    CORS(app)
    # these two lines don't work, need to look into it more
    # app.config.from_object(config[config_name])
    # config[config_name].init_app(app)
    
    app.config.from_object(config['development'])
    config['development'].init_app(app)

    # Loading environment variables
    app.config.from_envvar('ENV_FILE_LOCATION')
    
    jwt = JWTManager(app)
    
    db.init_app(app)
    migrate = Migrate(app, db)
    
    from .commands import commands as commands_blueprint
    app.register_blueprint(commands_blueprint)
    
    
    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')
    
    return app