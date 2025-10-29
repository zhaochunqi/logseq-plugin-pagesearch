# Logseq Plugin Page Search

A simple plugin to render a list of pages based on search queries for tags and topics.

## Usage

Use the macro `{{renderer :pagesearch, arg1[, arg2][, arg3]}}` to search for pages with specific tags/topics and render a styled list of matching page names.

The macro searches for pages where the properties `:tags` or `:topics` contain all the specified arguments (1-3 parameters), and displays them in a bordered box with clickable links.

### Tips

You can place the macro anywhere in your notes. Example:

```md
{{renderer :pagesearch, telegram, download}}
```

This will show a styled list of pages that have tags/topics containing "telegram" and "download". The list appears in a bordered box to distinguish it from regular content.
