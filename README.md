# Modena Demo site

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) utilizing Uniform Edge components and a [Cloudflare Workers](https://workers.cloudflare.com/) serverless application.
> Using Cloudflare workers is optional but encouraged if you decide to use the edge-side personalization mode.

During a Next.js export, Uniform components will render all variants into the HTML wrapped in tags that contain personalization information for each variant and list options. The Next.js will build using Static Generation into the `out` directory. The Cloudflare Worker application is configured to use the `out` directory as it's site root and the contents of this directory are deployed to Cloudflare Workers KV.

When a request comes through the Cloudflare Worker, the file is retrieved from Workers KV and processed using the visitor intent scores on Edge. The markup generated by the Edge components is removed, leaving behind just the personalized components.

## Getting Started

### Install packages

1. Set the `NPM_TOKEN` environment variable to the value provided by your Uniform account manager (see the `.npmrc` file).

1. Install dependencies
    ```shell
    npm install
    # or
    yarn
    ```

### Importing content into Contentful

The Modena demo site comes with some sample content that must be imported into your CMS.
At this time, only the export dump for Contentful is available, content for other CMSs can be provided on demand.

1. Make sure you have an account with Contentful and an empty space (recommended). You can sign up for a free account at Contentful.com.
1. Login to Contentful via CLI: `contentful login` and follow the steps.
1. Run `contentful space import --space-id <your-space-id> --content-file content/contentful-modena-export.json` to import the content (change space id to your Contentful space id).

    Learn more about Contentful export/import in the official docs [here](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/).

1. Create Content delivery / API key tokens in Contentful under `https://app.contentful.com/spaces/your-space/api/keys`. You would need the following values for later:
    - Space ID
    - Content Delivery API - access token
    - Content Preview API - access token

### Create API key in Uniform.app

In order for this app to communicate with Uniform, you need to provision a new API key within your project.

1. Navigate to `Your Project / Settings / API Keys`
1. Create a new API key and toggle all the permissions (for simplicity).
1. Copy the API key to the clipboard.

This value will be used for the following two environment variables:
- `UNIFORM_PRESENTATION_API_TOKEN`
- `UNIFORM_API_KEY`

### Configure environment variables

1. Copy `.env.example` as `.env`
1. Set the required Contentful variable values to match your setup made earlier.

### Run the development server without local Cloudflare

1. Run the following command:

    ```shell
    npm run dev
    # or
    yarn dev
    ```

1. Open <http://localhost:4120> with your browser to see the result.

### Run the development server with local Cloudflare workers

1. Set `UNIFORM_NESI_ENABLED=true` in .env file to enable edge-side personalization execution mode.

1. Run the following command:
    ```shell
    npm run dev:all
    # or
    yarn dev:all
    ```

1. Open <http://localhost:8787> with your browser to see the result.

## Production build and deployment

### Without Cloudflare
1. Run the following command:
    ```shell
    npm run ci:build
    # or
    yarn ci:build

1. To test the statically exported site, run `npx serve out` and check if the site renders on `localhost:5000`.

1. To deploy, run the command required to transfer the contents of the `./out` directory to your hosting service.

### With Cloudflare

1. Copy `wrangler.toml.example` as `wrangler.toml`
1. Populate `account_id` and `zone_id` with values from your Cloudflare account.
1. Enable edge-side personalization mode by setting this env var to true:
 
    ```bash
    UNIFORM_NESI_ENABLED=true
    ```

1. Run the following command:
    ```shell
    npm run yolo
    # or
    yarn yolo

At the end of this step, the app will be deployed to Worker Sites (static files and the worker code that run edge personalization and a/b testing).

## Run preview server

The preview service can run anywhere, even locally.

1. Make sure `UNIFORM_PREVIEW_ENABLED=true` is set to true in .env file.
1. Set the preview secret in this env var within .env file: `UNIFORM_PREVIEW_SECRET=your-secret`.
1. Run build: `npm run build`.
1. Run start: `npm run start`. This will start the next.js server in preview on `localhost:4120`
1. Open the preview url by passing the following query string parameters:
    - `slug` - the value of the slug of your composition
    - `secret` - the value of the `UNIFORM_PREVIEW_SECRET` env var.
  
  for example:
    `http://localhost:4120/api/preview?slug=/landing&secret=your-secret`

This will enable preview mode, allowing you to change composition, save and see hot reloaded composition without refreshes or publishing.

## Configuring webhooks

If you are running a Jamstack-style deployment (kudos if you do :)) then you would need to kick off a site build when anything is changed within your project (whether it is a new intent added / changed, or a composition is created or updated).

Uniform allows you to configure webhooks allowing to trigger site builds (in Netlify, for example).

In order to create a new webhook:

1. Navigate to `Your Project / Settings / Webhooks`
1. Create a new webhook with a memorable name.
1. For the URL, use the webhook that your build system provided you with.

# Troubleshooting

1. You may get the following error during next build/export if `UNIFORM_PREVIEW_ENABLED=true`. Set this value to false and re-run the build/export process.

    ```
    info  - Launching 23 workers
    Error: Found pages with `fallback` enabled:
    /[id]
    Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export

        at C:\Users\alex\source\modena\node_modules\next\dist\export\index.js:25:196
        at async Span.traceAsyncFn (C:\Users\alex\source\modena\node_modules\next\dist\telemetry\trace\trace.js:6:584)
    ```# modena