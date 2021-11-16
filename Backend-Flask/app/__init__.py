from flask import Flask
from config import config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def create_app(config_name):
    app = Flask(__name__)
    # these two lines don't work, need to look into it more
    # app.config.from_object(config[config_name])
    # config[config_name].init_app(app)
    
    app.config.from_object(config['development'])
    config['development'].init_app(app)
    
    db.init_app(app)
    migrate = Migrate(app, db)
    
    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api/v0')
    
    return app