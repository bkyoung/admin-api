# admin-api
GraphQL graph for self-hosted components of the internal admin tooling api.

## Description
The scope of this api is intended to evolve over time.  In general, its purpose is to provide a server-side automation hub against which different client types can initiate and control administrative operations through an API.  This allows the same information and activities to be exposed in a secure way to the appropriate contexts while maintaining consistency in how the information is being managed and actions are being performed downstream of the admin server.

### Capabilities
The admin api exposes its core functionality through a GraphQL api.  Every request must present a valid auth token from Cloudflare Access, with approriate claims and scopes to authorize the request.  Different subgraphs will require different claims and scopes to gain authorization and acess.

### Graphs
In GraphQL the whole graph is known as the _supergraph_, which can be composed of one or more subgraphs from unrelated sources, such as the graphs from multiple microservices.  Every graphql graph can be both a supergraph and a subgraph, depending on frame of reference.  A supergraph, being a composition of data types from many sources, also describes the relationships between the datatypes in the graph.  As this composition grows to include more and more details of different types, their relationships, and (possibly) how to update them it becomes _extremely_ powerful.  This gives rise to an infrastructure "data layer".  

The most obvious benefit of the data layer is the freeing of all other data consumers from needing to manage the myriad connection methods, credentials, and libraries needed to access the data.  Said differently, it reduces the complexity required for data consumers to access and manage data.  Further, it simplifies the software requirments; it standardizes access methods; it standardizes security methods; it provides composibility where it did not exist before - by allowing us to define data types that do not exist at the source, which are composed from multiple sources; it provides the ability to define interreltionships of data where that may not have existed before because we can define relations _across_ sources; it decouples the shape of the data available to data consumers from what is provided by the canonical source - allowing for the data to be presented in a shape that makes more sense for data consumers in our business/domain rather than the original source provided.  Finally, GraphQL provides strongly typed data types as part of its api contract which dramatically improves developer experience and testability.

## Development
This project is set up to manage all aspects of the admin api service's lifecycle using yarn commands.  While developing, it is expected that developers will leverage a local dev environment to develop their changesets on a branch, prior to pushing commits to origin for code review, before being merged to `main`.  To maximize the benefit of this approach, and minimize the friction involved with developing this way, this project has a full suite of `npm` scripts that target each activity, automating as much as possible, and going to great lengths to enable continuous feedback during the development process.

### Local Development
The normal local dev flow can be executed as follows:
```
$ yarn dev
```

This will launch the main server with a supervisor process that reloads the server whenever any source file is edited.  Additionally, any files which affect the GraphQL schema are watched and will cause the regeneration of a types library that defines custom Typescript types for the api service to leverage in defining its endpoints.  This maintains strong consistency between the types being served externally in GraphQL and handled internally by the graphql resolvers, and use of the custom type library in the server code will catch divergence much earlier, making it easy to correct.

This command will re-run all tests whenever any relevant file in the `src/` directory changes.

### Remote Testing
There are additional steps necessary when you wish to access the remote dev server, as it is behind the Cloudflare Access portal.  In order to interact with the api through the portal, you will need an access token.  This is true whether you are interacting via the command line or with a tool such as Apollo Studio.  In either case, the following steps are required to obtain the token:

PREREQUISITE: `brew install cloudflared` or [download the package](https://github.com/cloudflare/cloudflared/releases/)

1. Log into cloudflare access from your terminal:
    ```
    cloudflared access login admin-api.example.com
    ```
    This will launch a browser tab and require you to approve the action.  Once it has been approved, you may close the tab.
1. Back in your terminal, you should see a message that your token was successfully fetched and a big long string that is the token itself.  You can copy and paste this.  If you need to review it at any time, you can use the following command to print it again:
    ```
    cloudflared access token -app=https://admin-api.example.com
    ```
1. In another browser tab, log into [https://admin-api.example.com/api](https://admin-api.example.com/api).  This should launch the Apollo Studio application in sandbox mode.  However, it will not work until you configure it with your access token.
1. In Apollo Studio, in the center column, at the bottom, select the **Headers** tab.  Input a header key of `cf-access-token` and for the value use the token you copied.  Ensure The sandbox address is also pointing to the correct url of https://admin-api.example.com/api, and Apollo Studio should now work as expected.

## Releasing
Every merge to `main` results in a deployment of an alpha release into the `dev` environment.  This can be thought of as the running release candidate and integration environment.  When a feature set is complete and ready to be released to production, all that is normally required is:

```
$ yarn release
```
