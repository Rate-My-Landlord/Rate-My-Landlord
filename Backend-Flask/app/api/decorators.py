from functools import wraps
from flask import g
# from .errors import forbidden


# def test_dec():
def test_decorator(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        print("HERE")
        return f(*args, **kwargs)
    return decorated_function

# def permission_required(permission):
#     def decorator(f):
#         @wraps(f)
#         def decorated_function(*args, **kwargs):
#             if not g.current_user.can(permission):
#                 return forbidden('Insufficient permissions')
#             return f(*args, **kwargs)
#         return decorated_function
#     return decorator