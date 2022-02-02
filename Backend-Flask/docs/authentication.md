# Authentication

This API authenticates users with [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) (JWts). 

Mutations NewUser, Login return are currently the only Mutations that return a token, so make sure you save the token on the frontend.  

## Attaching a token
## Tokens MUST be attached to the Authorization header (as a Bearer token) of each request that requires a token  
Read more about HTTP authorization [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)  
Read more about Bearer Authentication [here](https://swagger.io/docs/specification/authentication/bearer-authentication/)  
Read more about Axios authorization [here](https://flaviocopes.com/axios-send-authorization-header/)
### Axios example:
```
axios.post(url, data, {
    headers: {
        'Authorization': `Bearer {token}`
    }
})
```