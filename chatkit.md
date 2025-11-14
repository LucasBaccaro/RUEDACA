ChatKit
=======

Build and customize an embeddable chat with ChatKit.

ChatKit is the best way to build agentic chat experiences. Whether you’re building an internal knowledge base assistant, HR onboarding helper, research companion, shopping or scheduling assistant, troubleshooting bot, financial planning advisor, or support agent, ChatKit provides a customizable chat embed to handle all user experience details.

Use ChatKit's embeddable UI widgets, customizable prompts, tool‑invocation support, file attachments, and chain‑of‑thought visualizations to build agents without reinventing the chat UI.

Overview
--------

There are two ways to implement ChatKit:

*   **Recommended integration**. Embed ChatKit in your frontend, customize its look and feel, let OpenAI host and scale the backend from [Agent Builder](/docs/guides/agent-builder). Requires a development server.
*   **Advanced integration**. Run ChatKit on your own infrastructure. Use the ChatKit Python SDK and connect to any agentic backend. Use widgets to build the frontend.

Get started with ChatKit
------------------------

[

![Embed ChatKit in your frontend](https://cdn.openai.com/API/docs/images/misc-3.png)

Embed ChatKit in your frontend

Embed a chat widget, customize its look and feel, and let OpenAI host and scale the backend

](#embed-chatkit-in-your-frontend)[

![Advanced integration](https://cdn.openai.com/API/docs/images/misc-4.png)

Advanced integration

Use any backend and the ChatKit SDKs to build your own custom ChatKit user experience

](/docs/guides/custom-chatkit)

Embed ChatKit in your frontend
------------------------------

At a high level, setting up ChatKit is a three-step process. Create an agent workflow, hosted on OpenAI servers. Then set up ChatKit and add features to build your chat experience.

  

![OpenAI-hosted ChatKit](https://cdn.openai.com/API/docs/images/openai-hosted.png)

### 1\. Create an agent workflow

Create an agent workflow with [Agent Builder](/docs/guides/agent-builder). Agent Builder is a visual canvas for designing multi-step agent workflows. You'll get a workflow ID.

The chat embedded in your frontend will point to the workflow you created as the backend.

### 2\. Set up ChatKit in your product

To set up ChatKit, you'll create a ChatKit session and create a backend endpoint, pass in your workflow ID, exchange the client secret, add a script to embed ChatKit on your site.

1.  On your server, generate a client token.
    
    This snippet spins up a FastAPI service whose sole job is to create a new ChatKit session via the [OpenAI Python SDK](https://github.com/openai/chatkit-python) and hand back the session's client secret:
    
    server.py
    
    ```python
    from fastapi import FastAPI
    from pydantic import BaseModel
    from openai import OpenAI
    import os
    
    app = FastAPI()
    openai = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
    
    @app.post("/api/chatkit/session")
    def create_chatkit_session():
        session = openai.chatkit.sessions.create({
          # ...
        })
        return { client_secret: session.client_secret }
    ```
    
2.  In your server-side code, pass in your workflow ID and secret key to the session endpoint.
    
    The client secret is the credential that your ChatKit frontend uses to open or refresh the chat session. You don’t store it; you immediately hand it off to the ChatKit client library.
    
    See the [chatkit-js repo](https://github.com/openai/chatkit-js) on GitHub.
    
    chatkit.ts
    
    ```typescript
    export default async function getChatKitSessionToken(
    deviceId: string
    ): Promise<string> {
    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        Authorization: "Bearer " + process.env.VITE_OPENAI_API_SECRET_KEY,
        },
        body: JSON.stringify({
        workflow: { id: "wf_68df4b13b3588190a09d19288d4610ec0df388c3983f58d1" },
        user: deviceId,
        }),
    });
    
    const { client_secret } = await response.json();
    
    return client_secret;
    }
    ```
    
3.  In your project directory, install the ChatKit React bindings:
    
    ```bash
    npm install @openai/chatkit-react
    ```
    
4.  Add the ChatKit JS script to your page. Drop this snippet into your page’s `<head>` or wherever you load scripts, and the browser will fetch and run ChatKit for you.
    
    index.html
    
    ```html
    <script
    src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
    async
    ></script>
    ```
    
5.  Render ChatKit in your UI. This code fetches the client secret from your server and mounts a live chat widget, connected to your workflow as the backend.
    
    Your frontend code
    
    ```react
    import { ChatKit, useChatKit } from '@openai/chatkit-react';
    
       export function MyChat() {
         const { control } = useChatKit({
           api: {
             async getClientSecret(existing) {
               if (existing) {
                 // implement session refresh
               }
    
               const res = await fetch('/api/chatkit/session', {
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                 },
               });
               const { client_secret } = await res.json();
               return client_secret;
             },
           },
         });
    
         return <ChatKit control={control} className="h-[600px] w-[320px]" />;
       }
    ```
    
    ```javascript
    const chatkit = document.getElementById('my-chat');
    
      chatkit.setOptions({
        api: {
          getClientSecret(currentClientSecret) {
            if (!currentClientSecret) {
              const res = await fetch('/api/chatkit/start', { method: 'POST' })
              const {client_secret} = await res.json();
              return client_secret
            }
            const res = await fetch('/api/chatkit/refresh', {
              method: 'POST',
              body: JSON.stringify({ currentClientSecret })
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const {client_secret} = await res.json();
            return client_secret
          }
        },
      });
    ```
    

### 3\. Build and iterate

See the [custom theming](/docs/guides/chatkit-themes), [widgets](/docs/guides/chatkit-widgets), and [actions](/docs/guides/chatkit-actions) docs to learn more about how ChatKit works. Or explore the following resources to test your chat, iterate on prompts, and add widgets and tools.

#### Build your implementation

[

ChatKit docs on GitHub

Learn to handle authentication, add theming and customization, and more.

](https://openai.github.io/chatkit-python)[

ChatKit Python SDK

Add server-side storage, access control, tools, and other backend functionality.

](https://github.com/openai/chatkit-python)[

ChatKit JS SDK

Check out the ChatKit JS repo.

](https://github.com/openai/chatkit-js)

#### Explore ChatKit UI

[

chatkit.world

Play with an interactive demo of ChatKit.

](https://chatkit.world)[

Widget builder

Browse available widgets.

](https://widgets.chatkit.studio)[

ChatKit playground

Play with an interactive demo to learn by doing.

](https://chatkit.studio/playground)

#### See working examples

[

Samples on GitHub

See working examples of ChatKit and get inspired.

](https://github.com/openai/openai-chatkit-advanced-samples)[

Starter app repo

Clone a repo to start with a fully working template.

](https://github.com/openai/openai-chatkit-starter-app)

Next steps
----------

When you're happy with your ChatKit implementation, learn how to optimize it with [evals](/docs/guides/agent-evals). To run ChatKit on your own infrastructure, see the [advanced integration docs](/docs/guides/custom-chatkit).

Was this page useful?




Theming and customization in ChatKit
====================================

Configure colors, typography, density, and component variants.

After following the [ChatKit quickstart](/docs/guides/chatkit), learn how to change themes and add customization to your chat embed. Match your app’s aesthetic with light and dark themes, setting an accent color, controlling the density, and rounded corners.

Overview
--------

At a high level, customize the theme by passing in an options object. If you followed the [ChatKit quickstart](/docs/guides/chatkit) to embed ChatKit in your frontend, use the React syntax below.

*   **React**: Pass options to `useChatKit({...})`
*   **Advanced integrations**: Set options with `chatkit.setOptions({...})`

In both integration types, the shape of the options object is the same.

Explore customization options
-----------------------------

Visit [ChatKit Studio](https://chatkit.studio) to see working implementations of ChatKit and interactive builders. If you like building by trying things rather than reading, these resources are a good starting point.

#### Explore ChatKit UI

[

chatkit.world

Play with an interactive demo of ChatKit.

](https://chatkit.world)[

Widget builder

Browse available widgets.

](https://widgets.chatkit.studio)[

ChatKit playground

Play with an interactive demo to learn by doing.

](https://chatkit.studio/playground)

#### See working examples

[

Samples on GitHub

See working examples of ChatKit and get inspired.

](https://github.com/openai/openai-chatkit-advanced-samples)[

Starter app repo

Clone a repo to start with a fully working template.

](https://github.com/openai/openai-chatkit-starter-app)

Change the theme
----------------

Match the look and feel of your product by specifying colors, typography, and more. Below, we set to dark mode, change colors, round the corners, adjust the information density, and set the font.

For all theming options, see the [API reference](/chatkit-js-internal/api/openai/chatkit/type-aliases/themeoption/).

```jsx
const options: Partial<ChatKitOptions> = {
  theme: {
    colorScheme: "dark",
    color: { 
      accent: { 
        primary: "#2D8CFF", 
        level: 2 
      }
    },
    radius: "round", 
    density: "compact",
    typography: { fontFamily: "'Inter', sans-serif" },
  },
};
```

Customize the start screen text
-------------------------------

Let users know what to ask or guide their first input by changing the composer’s placeholder text.

```jsx
const options: Partial<ChatKitOptions> = {
  composer: {
    placeholder: "Ask anything about your data…",
  },
  startScreen: {
    greeting: "Welcome to FeedbackBot!",
  },
};
```

Show starter prompts for new threads
------------------------------------

Guide users on what to ask or do by suggesting prompt ideas when starting a conversation.

```js
const options: Partial<ChatKitOptions> = {
  startScreen: {
    greeting: "What can I help you build today?",
    prompts: [
      { 
        name: "Check on the status of a ticket", 
        prompt: "Can you help me check on the status of a ticket?", 
        icon: "search"
      },
      { 
        name: "Create Ticket", 
        prompt: "Can you help me create a new support ticket?", 
        icon: "write"
      },
    ],
  },
};
```

Add custom buttons to the header
--------------------------------

Custom header buttons help you add navigation, context, or actions relevant to your integration.

```jsx
const options: Partial<ChatKitOptions> = {
  header: {
    customButtonLeft: {
      icon: "settings-cog",
      onClick: () => openProfileSettings(),
    },
    customButtonRight: {
      icon: "home",
      onClick: () => openHomePage(),
    },
  },
};
```

Enable file attachments
-----------------------

Attachments are disabled by default. To enable them, add attachments configuration. Unless you are doing a custom backend, you must use the `hosted` upload strategy. See the Python SDK docs for more information on other upload strategies work with a custom backend.

You can also control the number, size, and types of files that users can attach to messages.

```jsx
const options: Partial<ChatKitOptions> = {
  composer: {
    attachments: {
      uploadStrategy: { type: 'hosted' },
      maxSize: 20 * 1024 * 1024, // 20MB per file
      maxCount: 3,
      accept: { "application/pdf": [".pdf"], "image/*": [".png", ".jpg"] },
    },
  },
}
```

Enable @mentions in the composer with entity tags
-------------------------------------------------

Let users tag custom “entities” with @-mentions. This enables richer conversation context and interactivity.

*   Use `onTagSearch` to return a list of entities based on the input query.
*   Use `onClick` to handle the click event of an entity.

```jsx
const options: Partial<ChatKitOptions> = {
  entities: {
    async onTagSearch(query) {
      return [
        { 
          id: "user_123", 
          title: "Jane Doe", 
          group: "People", 
          interactive: true, 
        },
        { 
          id: "document_123", 
          title: "Quarterly Plan", 
          group: "Documents", 
          interactive: true, 
        },
      ]
    },
    onClick: (entity) => {
      navigateToEntity(entity.id);
    },
  },
};
```

Customize how entity tags appear
--------------------------------

You can customize the appearance of entity tags on mouseover using widgets. Show rich previews such as a business card, document summary, or image when the user hovers over an entity tag.

[

Widget builder

Browse available widgets.

](https://widgets.chatkit.studio)

```jsx
const options: Partial<ChatKitOptions> = {
  entities: {
    async onTagSearch() { /* ... */ },
    onRequestPreview: async (entity) => ({
      preview: {
        type: "Card",
        children: [
          { type: "Text", value: `Profile: ${entity.title}` },
          { type: "Text", value: "Role: Developer" },
        ],
      },
    }),
  },
};
```

Add custom tools to the composer
--------------------------------

Enhance productivity by letting users trigger app-specific actions from the composer bar. The selected tool will be sent to the model as a tool preference.

```jsx
const options: Partial<ChatKitOptions> = {
  composer: {
    tools: [
      {
        id: 'add-note',
        label: 'Add Note',
        icon: 'write',
        pinned: true,
      },
    ],
  },
};
```

Toggle UI regions and features
------------------------------

Disable major UI regions and features if you need more customization over the options available in the header and want to implement your own instead. Disabling history can be useful when the concept of threads and history doesn't make sense for your use case—e.g., in a support chatbot.

```jsx
const options: Partial<ChatKitOptions> = {
  history: { enabled: false },
  header: { enabled: false },
};
```

Override the locale
-------------------

Override the default locale if you have an app-wide language setting. By default, the locale is set to the browser's locale.

```jsx
const options: Partial<ChatKitOptions> = {
  locale: 'de-DE',
};
```

Was this page useful?