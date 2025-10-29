import { BlockEntity } from "@logseq/libs/dist/LSPlugin.user";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { PageList } from "./pagelist";

type Status = { pages: any[]; mode: string };
import style from "./style.tcss?raw";

const macroPrefix = ":pagesearch";



function buildQuery(params: string[]): string {
  const conditions = params.map(arg => `(or (page-property :tags [[${arg}]]) (page-property :topics [[${arg}]]) (page-property :topics "${arg}"))`);
  return `(and ${conditions.join(' ')})`;
}

async function getPageSearchStats(
  params: string[]
): Promise<Status | null> {
  if (params.length < 1 || params.length > 3) {
    return null; // Support 1-3 parameters
  }
  const query = buildQuery(params);
  const pages = await logseq.DB.q(query);
  if (!pages || pages.length === 0) return null;
  return { pages, mode: "pagesearch" };
}

async function getStats(key: string): Promise<Status | null> {
  const params = JSON.parse(key.substring("pagesearch:".length));
  return getPageSearchStats(params);
}


const pluginId = "pagesearch";





async function render(key: string, slot: string, counter: number) {
  try {
    const status = await getStats(key);
    const template = ReactDOMServer.renderToStaticMarkup(
      <PageList pages={status?.pages || []} />
    );

    logseq.provideUI({
      key: pluginId + "__" + slot,
      slot,
      reset: true,
      template: template,
    });
  } catch (err: any) {
    console.error(err);
  }
}

async function startRendering(key: string, slot: string) {
  await render(key, slot, 0);
}

export function registerCommand() {
  logseq.provideStyle(style);

  logseq.App.onMacroRendererSlotted(async ({ payload, slot }) => {
    const [type, ...params] = payload.arguments;
    if (type !== macroPrefix || params.length === 0) {
      return;
    }

    logseq.provideStyle({
      key: slot,
      style: `#${slot} {display: inline-block;}`,
    });

    const key = "pagesearch:" + JSON.stringify(params);
    startRendering(key, slot);
  });

  logseq.Editor.registerSlashCommand(
    "[Page Search] Insert Macro",
    async () => {
      const content = `{{renderer :pagesearch, }}`;
      await logseq.Editor.insertAtEditingCursor(content);
    }
  );

}
