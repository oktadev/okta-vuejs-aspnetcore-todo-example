# ASP.NET Core API with Vue UI

This example app shows how to build a simple to-do manager with an ASP.NET Core backend API and a Vue.js frontend.

Read [Build a Secure To-Do App with Vue, ASP.NET Core, and Okta](https://scotch.io/tutorials/build-a-secure-to-do-app-with-vuejs-aspnet-core-and-okta) to see how this app was created.

**Prerequisites:** [.NET Core 2.0] [Java 8](https://dot.net/core) and [Node.js](https://nodejs.org/).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting started

To install this example application, run the following commands:

```bash
git clone git@github.com:oktadeveloper/okta-vuejs-aspnetcore-todo-example.git
cd okta-vuejs-aspnetcore-todo-example
```

This will get a copy of the project locally. To install all of the dependencies and start the app, run:

```bash
npm instal

dotnet run
```

### Create an application in Okta

You will need to create an OpenID Connect application in Okta to get your values to perform authentication. 

Log in to your Okta Developer account (or [sign up](https://developer.okta.com/signup/) if you don’t have an account) and navigate to **Applications** > **Add Application**. Click **Single-Page App**, click **Next**, and give the app a name you’ll remember. Change both the Base URI and Login redirect URI to `http://localhost:5000` and click **Done**.

#### Server configuration

Set the issuer (authority) in `Startup.cs`.

**Note:** The value of `{yourOktaDomain}` should be something like `dev-123456.oktapreview.com`. Make sure you don't include `-admin` in the value!

```properties
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = "https://{yourOktaDomain}.com/oauth2/default";
    options.Audience = "api://default";
});
```

#### Client configuration

For the client, set the `issuer` and copy the `clientId` of the Okta application into `ClientApp/oktaAuth.js`.

```javascript
const org = 'https://{yourOktaDomain}.com',
      clientId = '{clientId}',
      redirectUri = 'http://localhost:5000',
      authorizationServer = 'default'
```

## Links

This example uses the following libraries provided by Okta:

* [Okta Auth SDK](https://github.com/okta/okta-auth-js)

## Help

Please post any questions as comments on the [blog post](https://scotch.io/tutorials/build-a-secure-to-do-app-with-vuejs-aspnet-core-and-okta), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if you would like to create a support ticket.

## License

MIT, see [LICENSE](LICENSE).
