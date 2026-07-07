# Blog images

Drop screenshots here with these exact filenames — the MCP post has styled
placeholder slots waiting for each. Once a file exists, replace the matching
`<div class="img-placeholder">…</div>` in `blog/mcp-server.html` with:

```html
<img src="../assets/blog/FILENAME.png" alt="describe it">
```

(keep it inside the `<figure class="post-figure">`; the `<figcaption>` stays).

| Filename | What to capture |
|----------|-----------------|
| `consent-screen.png` | The OAuth login/consent page — "Connect to an AI assistant", company / email / password, approve permissions. |
| `inspector-tools.png` | MCP Inspector connected to the server, tool list visible, ideally one tool result. |
| `claude-chat.png` | Claude in a normal chat calling a BizAlign tool and returning real data (e.g. list of sites). |
| `mongo-query-shapes.png` | Atlas "Top Query Shapes" profiler with the Docs Examined : Returned column. |

Optional extras you could add later: the Claude "Add custom connector" dialog,
and the connected connector's tool-permissions screen.

Recommended: PNG, ~1600px wide, and crop out anything sensitive (real names,
emails, tokens) before committing — this repo is public.
```
