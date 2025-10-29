import React from "react";

export function PageList({ pages }: { pages: any[] }) {
  if (!pages || pages.length === 0) {
    return <div className="pagesearch-list">No pages found.</div>;
  }
  return (
    <div className="pagesearch-list">
      <ul>
        {pages.map(page => (
          <li key={page.id}>
            <a href={`#/page/${encodeURIComponent(page.originalName)}`}>
              {page.originalName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
