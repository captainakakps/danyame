import type { ListViewServerProps } from "payload";
import { Button, Gutter, Link } from "@payloadcms/ui";
import React from "react";

import {
  getMenuQrTargetUrl,
  getMenuSettings,
} from "@/lib/cms/menu";
import { generateMenuQrDataUrl } from "@/lib/qr/menu-qr";

export async function MenuQrListView(_props: ListViewServerProps) {
  const settings = await getMenuSettings();
  const targetUrl = getMenuQrTargetUrl(settings);
  const qrDataUrl = await generateMenuQrDataUrl(targetUrl);

  return (
    <Gutter className="menu-qr-view">
      <div className="menu-qr-view__intro">
        <h1 className="menu-qr-view__title">Menu QR Code</h1>
        <p className="menu-qr-view__text">
          This QR code always points to your public menu page. Update menu items
          in the dashboard — the printed code stays the same.
        </p>
      </div>

      <div className="menu-qr-view__panel">
        <p className="menu-qr-view__label">Target URL</p>
        <p className="menu-qr-view__url">{targetUrl}</p>
        <p className="menu-qr-view__hint">
          Override in Menu Settings → QR Target URL.
        </p>
      </div>

      <div className="menu-qr-view__preview">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrDataUrl}
          alt={`QR code for ${targetUrl}`}
          className="menu-qr-view__image"
        />
      </div>

      <div className="menu-qr-view__actions">
        <a
          className="btn btn--style-primary btn--size-medium"
          download="danyame-menu-qr.png"
          href={qrDataUrl}
        >
          Download PNG
        </a>
        <Link href="/globals/menu-settings">
          <Button buttonStyle="secondary">Menu Settings</Button>
        </Link>
      </div>
    </Gutter>
  );
}
